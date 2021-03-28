import React from "react";
import {Layout, Menu, Breadcrumb} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';

import MySider from "../layouts/MySider";
import MyHeader from "../layouts/MyHeader";
import HomeScene from "../../scense/HomeScene/HomeScene";
import LoginScene from "../../scense/LoginScene/LoginScene";
import AppURL from "./AppURL";
import ProductScene from "../../scense/ProductScene/ProductScene";
import CreateFormProduct from "../../scense/ProductScene/CreateFormProduct";


const {Content, Footer} = Layout;

const routes = [
    {
        path: AppURL.home(),
        exact: true,
        component: HomeScene
    },
    {
        path: AppURL.login(),
        exact: true,
        component: LoginScene
    },
    {
        path: AppURL.product(),
        exact: true,
        component: ProductScene
    },
    {
        path: AppURL.create('product'),
        component: CreateFormProduct
    }
]

const AppRoute = () => {

    React.useEffect(() => {
        const auth = localStorage.getItem('auth')

        if (auth === undefined || null) {
            return <Redirect to={AppURL.login()}/>
        }
    })

    return (
        <div id='components-layout-demo-side'>
            <Layout style={{minHeight: '100vh'}}>
                <MySider/>
                <Layout className="site-layout">
                    <MyHeader/>
                    <Content style={{margin: '0 16px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                            <Switch>
                                {
                                    routes.map((i, index) => (
                                        <Route key={index} path={i.path} component={i.component} exact={i.exact}/>
                                    ))
                                }
                            </Switch>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        </div>
    )
}

export default AppRoute
