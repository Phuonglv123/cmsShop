import React from 'react'
import {Form, Input, InputNumber, Button, Upload} from 'antd';
import {UploadOutlined, StarOutlined} from '@ant-design/icons';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const CreateFormProduct = () => {
    const [form, setForm] = React.useState({
        name: '',
        price: '',
        unitAmount: '',
        stock: '',
        desc: '',
    })
    const [image, setImage] = React.useState({})

    const propsUpload = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange({file, fileList}) {
            if (file.status !== 'uploading') {
                setImage(file.originFileObj)
            }
        },
        showUploadList: {
            showDownloadIcon: true,
            downloadIcon: 'download ',
            showRemoveIcon: true,
            removeIcon: <StarOutlined onClick={e => console.log(e, 'custom removeIcon event')}/>,
        },
    };

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.currentTarget.name]: event.currentTarget.value,
        });
    };

    const onFinish = (values: any) => {

    };

    return (
        <div>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name" rules={[{required: true}]}>
                    <Input type='text' name='name' onChange={handleChange}/>
                </Form.Item>
                <Form.Item name={['user', 'price']} label="Price" rules={[{type: 'number'}]}>
                    <Input type='number' name='price' onChange={handleChange}/>
                </Form.Item>
                <Form.Item name={['user', 'Unit Amount']} label="Unit Amount" rules={[{type: 'number'}]}>
                    <InputNumber name='unitAmount' onChange={handleChange}/>
                </Form.Item>
                <Form.Item name={['user', 'stock']} label="Stock">
                    <Input name='stock' onChange={handleChange}/>
                </Form.Item>
                <Form.Item name={['user', 'image']} label="Image">
                    <Upload {...propsUpload}>
                        <Button icon={<UploadOutlined/>}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item name={['user', 'desc']} label="Desc">
                    <Input.TextArea name='desc' onChange={handleChange}/>
                </Form.Item>
                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateFormProduct;
