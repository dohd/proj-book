import React, {
    useState, 
    useEffect, 
    useRef, 
    useContext, 
    createContext
} from 'react';
import { Form, Input } from 'antd';

import Api from 'api'
import { useTracked } from 'context';
import { clientSocket } from 'utils';

// fetch narratives
const fetchNarratives = async dispatch => {
    const narratives = await Api.narrative.get();
    dispatch({type: 'addNarratives', payload: narratives});
    clientSocket.emit('narratives', narratives);
}

// on finish editing call update api
const onFinish = ({values, record, dispatch}) => {
    const {key, query, response_id, ...rest} = record;
    const initValue = Object.values(rest)[0];
    const response = Object.values(values)[0];
    if (response === initValue) return;
    // api call
    Api.narrativeResponse.patch(response_id, {response})
    .then(res => fetchNarratives(dispatch));
};

// edit table context 
const EditableContext = createContext(null);
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

    // const dispatch = useTracked()[1];
    const dispatch = useTracked()[1];

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
            onFinish({values, record, dispatch});
        })
        .catch(err => console.log('Save failed:', err));
    };

    let childNode = children;

    if (editable) {
        childNode = (
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
        );
        if (!editing) {
            childNode = (
                <div
                    className="editable-cell-value-wrap"
                    style={{paddingRight: 24,}}
                    onClick={toggleEdit}
                >
                    {children}
                </div>
            );
        }
    }
    
    return <td {...restProps}>{childNode}</td>;
};

// Editable row logic
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

// editable columns
export const editableColumns = (columns=[]) => {
    return columns.map(col => ({
        ...col,
        onCell(record) {
            return {
                record,
                editable: true,
                dataIndex: col.dataIndex,
                title: col.title,
            }
        },
    }));
};

// table components
export const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
};
