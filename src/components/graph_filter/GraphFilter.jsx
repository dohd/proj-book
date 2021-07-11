import React from 'react';
import { Form, DatePicker, Button } from 'antd';
import { FilterFilled } from '@ant-design/icons';

import './graphFilter.css';

export default function GraphFilterView(props) {
    const { onFinish, onFinishFailed } = props;
    return (
        <Form
            layout='inline'
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                className='form-item-filter'
                label='Filter'
                name='filter'
            >
                <DatePicker.RangePicker />
            </Form.Item>
            <Form.Item>
                <Button
                    htmlType='submit'
                    type='link'
                    icon={
                        <FilterFilled 
                            style={{ 
                                color: '#0275d8',
                                fontSize: '22px' 
                            }}
                        />
                    }
                />
            </Form.Item>
        </Form>
    );
}