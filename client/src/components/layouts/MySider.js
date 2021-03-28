import React from 'react';
import {Layout, Menu} from "antd";
import {Link} from 'react-router-dom';
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import AppURL from "../routes/AppURL";

const {Sider} = Layout;

const MySider = (props) => {
    const [collapsed, setCollapsed] = React.useState(false)

    const onCollapse = () => {
        setCollapsed(!collapsed)
    };
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key={AppURL.home()} icon={<PieChartOutlined/>}>
                    <Link to={AppURL.home()}>DashBoard</Link>
                </Menu.Item>
                <Menu.Item key={AppURL.product()} icon={<DesktopOutlined/>}>
                    <Link to={AppURL.product()}>Product</Link>
                </Menu.Item>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

export default MySider;
