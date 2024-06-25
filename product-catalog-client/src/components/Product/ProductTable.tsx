import React from 'react';
import { Table, Button, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import { Category } from '../../types';
import PaginatedTable from '../Generic/PaginatedTable';
import { getAllProducts } from '../../services/productService';

interface Product {
  id: string;
  name: string;
  category: { name: string };
  description: string;
  price: number;
}

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  usdExchangeRate: number;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, categories, usdExchangeRate, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'category',
    //   filters: categories.map((category: any) => ({
    //     text: category.name,
    //     value: category.name,
    //   })),
      //onFilter: (value: string | number | boolean, record: Product) => record.category.name === value,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price (BYN)',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: Product, b: Product) => a.price - b.price,
      render: (price: number) => (
        <>
          {price}
          <DollarOutlined
            style={{ marginLeft: 8 }}
            title={`USD: ${(price / usdExchangeRate).toFixed(2)}`}
          />
        </>
      ),
    },
    {
        title: 'GeneralNote',
        dataIndex: 'generalNote',
        key: 'generalNote',
      },
      
      //(currentUser && currentUser.role !== UserRoles.User) ? {
      {
        title: <>SpecialNote <Tag bordered={false} color="#f50">Advanced User</Tag></>,
        dataIndex: 'specialNote',
        key: 'specialNote',
        //render:  (specialNote: any) => ((currentUser && currentUser.role !== UserRoles.User) && <>{specialNote}</>)
      },//:{},
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Product) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => onDelete(record.id)}
          />
        </>
      ),
    },
  ];

  return <PaginatedTable columns={columns} fetchData={getAllProducts} />
  //return <Table columns={columns} dataSource={products} rowKey="id" pagination={{ pageSize: 10 }} />;
};

export default ProductTable;