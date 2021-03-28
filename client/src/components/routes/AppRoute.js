import React from "react";
import {Layout, Breadcrumb} from 'antd';
import {Switch, Route, Redirect} from 'react-router-dom';
import MySider from "../layouts/MySider";
import MyHeader from "../layouts/MyHeader";
import HomeScene from "../../scense/HomeScene/HomeScene";
import LoginScene from "../../scense/LoginScene/LoginScene";
import AppURL from "./AppURL";
import ProductScene from "../../scense/ProductScene/ProductScene";
import CreateFormProduct from "../../scense/ProductScene/CreateFormProduct";
import {PrivateRoute} from "./PrivateRoute";

const {Content, Footer} = Layout;

const routes = [
    {
        path: AppURL.home(),
        component: HomeScene
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

const DefaultContainer = () => {
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
                                        <PrivateRoute key={index} path={i.path} component={i.component}
                                                      exact={i.exact}/>
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

const AppRoute = () => {
    return (
        <Switch>
            <Route exact={true} path={AppURL.login()} component={LoginScene}/>
            <Route component={DefaultContainer}/>
        </Switch>
    )
}

export default AppRoute
