import React, {
    useState, 
    useEffect, 
    useRef, 
    useContext, 
    createContext
} from 'react';
import { Form, Input } from 'antd';

// Editable row logic
const EditableContext = createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

// Editable cell logic
const EditableCell = (props) => {
    const {
        title,
        editable,
        children,
        dataIndex,
        record,
        ...restProps
    } = props;

    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) inputRef.current.focus();
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
    };

    const save = () => {
        form.validateFields()
        .then(values => {
            toggleEdit();
            console.log('values:',{...record, ...values});
        })
        .catch(err => console.log('Save failed:', err));
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? 
            (
                <Form.Item
                    style={{ margin: 0,}}
                    name={dataIndex}
                    rules={[
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ]}
                >
                    <Input ref={inputRef} onPressEnter={save} onBlur={save} />
                </Form.Item>
            ) : 
            (
                <div
                    className="editable-cell-value-wrap"
                    style={{paddingRight: 24,}}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
    }
    
    return <td {...restProps}>{childNode}</td>;
};

const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
};

export default components;
