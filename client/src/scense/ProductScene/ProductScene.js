import React from 'react'
import {Table, Button} from "antd";
import { useHistory } from "react-router-dom";
import AppURL from "../../components/routes/AppURL";

const ProductScene = () => {
    let history = useHistory();
    const [datatable, setDataTable] = React.useState([])

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    return (
        <div>
            <div>
                <Button onClick={() => {
                    history.push(AppURL.create('product'))
                }}>Create</Button>
            </div>
            <Table columns={columns} dataSource={datatable}/>
        </div>
    )
}

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        filters: [
            {
                text: 'Joe',
                value: 'Joe',
            },
            {
                text: 'Jim',
                value: 'Jim',
            },
            {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                    {
                        text: 'Green',
                        value: 'Green',
                    },
                    {
                        text: 'Black',
                        value: 'Black',
                    },
                ],
            },
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
    },
    {
        title: 'Age',
        dataIndex: 'age',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.age - b.age,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        filters: [
            {
                text: 'London',
                value: 'London',
            },
            {
                text: 'New York',
                value: 'New York',
            },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
    },
];

export default ProductScene;
