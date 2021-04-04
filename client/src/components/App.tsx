import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import useAuth, {AuthProvider} from '../context/auth';
//import {getCurrentUser} from '../api/AuthAPI';
import {Router} from '@reach/router';
import {RouteComponentProps} from '@reach/router';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined
} from '@ant-design/icons';
import Login from "../scenes/LoginScene/Login";
import MyHeader from "./MyHeader";
import MyFooter from "./MyFooter";
import PrivateRoute from "./PrivateRoute";
import DashBoardScene from "../scenes/DashBoardScene/DashBoardScene";
import ManageProductScene from "../scenes/ManageProductScene/ManageProductScene";
import API from '../api/APIUtils';

const {Sider, Content} = Layout;

function App(_: RouteComponentProps) {
    const {state: {payload, isAuthenticated}, dispatch,} = useAuth();
    const [collapsed, setCollapsed] = React.useState(false);

    React.useEffect(() => {
        debugger
        let ignore = false;

        async function fetchUser() {
            const res = await API.get('/auth/current')
            console.log(res)
            debugger
        }

        if (!payload) {
            fetchUser();
        }

        return () => {
            ignore = true;
        };
    }, [dispatch, isAuthenticated, payload]);

    if (!payload && isAuthenticated) {
        return null;
    }

    const onCollapse = () => {
        setCollapsed(!collapsed)
    };

    return (
        <React.Fragment>
            <Layout style={{minHeight: '100vh'}} id='components-layout-demo-custom-trigger'>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            Option 1
                        </Menu.Item>
                        <Menu.Item key="2" icon={<DesktopOutlined/>}>
                            Option 2
                        </Menu.Item>
                        <Menu.Item key="9" icon={<FileOutlined/>}>
                            Files
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <MyHeader/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <PrivateRoute as={DashBoardScene} path='/'/>
                            <PrivateRoute as={ManageProductScene} path='/product'/>
                        </div>
                    </Content>
                    <MyFooter/>
                </Layout>
            </Layout>
        </React.Fragment>
    );
}

export default () => (
    <AuthProvider>
        <Router>
            <App path='/'/>
            <Login path='/login'/>
        </Router>
    </AuthProvider>
);
