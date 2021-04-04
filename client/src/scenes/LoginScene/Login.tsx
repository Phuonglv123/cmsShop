import React from 'react';
import {login} from '../../api/AuthAPI';
//import ListErrors from './common/ListErrors';
import useAuth from '../../context/auth';
import {navigate, RouteComponentProps, Redirect} from '@reach/router';
import {IErrors} from '../../types';
import {Form, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
//import style from './login.module.scss'

export default function Login(_: RouteComponentProps) {
    const [username, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<IErrors | null>();
    const {
        state: {payload},
        dispatch,
    } = useAuth();

    const onFinish = async () => {
        setLoading(true);
        try {
            const payload = await login(username, password);
            dispatch({type: 'LOAD_USER', payload});
            navigate('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
            if (error.status === 422) {
                setErrors(error.data.errors);
            }
        }
    };

    if (payload) {
        return <Redirect to="/" noThrow/>;
    }

    return (
        <div id='components-form-demo-normal-login'>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{required: true, message: 'Please input your Username!'}]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"
                           onChange={(e) => {
                               setUserName(e.target.value)
                           }}/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your Password!'}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon"/>}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <a href="">register now!</a>
                </Form.Item>
            </Form>
        </div>
    );
}
