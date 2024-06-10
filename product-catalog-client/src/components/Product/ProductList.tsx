// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { getAllProducts } from '../../services/productService';

// const ProductList: React.FC = () => {
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const data = await getAllProducts();
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       <Link to="/products/add">Add Product</Link>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             {product.name} - {product.price}
//             <Link to={`/products/edit/${product.id}`}>Edit</Link>
//             {/* btn delete item */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, Select, notification, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import { getAllProducts, addProduct, updateProduct, deleteProduct, getUsdExchangeRate } from '../../services/productService';
import { number } from 'yup';
import { getCategories } from '../../services/categoryService';
//123import { useAuth } from '../authContext';
import { UserRoles } from '../../types';
import { useAuth } from '../authContext2';



const { Option } = Select;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usdExchangeRate, setUsdExchangeRate] = useState(0);
  const { currentUser } = useAuth();

  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    fetchUsdExchangeRate();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
    console.log(products)
  };

  const fetchUsdExchangeRate = async () => {
    const rate = await getUsdExchangeRate();
    setUsdExchangeRate(rate);
  };


  const fetchCategories = async () => {

      const data = await getCategories();
      setCategories(data)
      console.log(data)
      // setCategories(data.map((category: any) => category.name));
    
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...product,
      //category: product.categoryid,
    });
  };

  const handleDelete = async (productId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      onOk: async () => {
          await deleteProduct(productId);
          notification.success({ message: 'Product deleted successfully' });
          fetchProducts();
      }
    });   
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        const updatedValues = { ...values, id: editingProduct['id'] };
        await updateProduct(editingProduct['id'], updatedValues);
        notification.success({ message: 'Product updated successfully' });
      } else {
        await addProduct(values);
        notification.success({ message: 'Product added successfully' });
      }
      fetchProducts();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };
  console.log(currentUser)
  console.log(currentUser?.role)
  console.log(currentUser && currentUser.role !== UserRoles.User)
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
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
      render: (price: any) => (
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
      render:  (specialNote: any) => ((currentUser && currentUser.role !== UserRoles.User) && <>{specialNote}</>)
    },//:{},
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: any) => (
         <>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          />
          {currentUser && currentUser.role !== UserRoles.User && (<Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />)}
        </>
      ),
    },
    
   
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>
      <Table columns={columns} dataSource={products} rowKey="id" />

      <Modal
        title={editingProduct ? 'Edit Product' : 'Add Product'}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the product name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoryId"
            label="Category"
            rules={[{ required: true, message: 'Please select a category!' }]}
          >
            <Select>
              {categories.map((category) => (
                <Option key={category['id']} value={category['id']}>
                  {category['name']}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the product description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (BYN)"
            rules={[{ required: true, message: 'Please input the product price!' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="generalNote"
            label="GeneralNote"
            rules={[{ required: true, message: 'Please input the product generalNote!' }]}
          >
            <Input />
          </Form.Item>
            <Form.Item
            name="specialNote"
            label="SpecialNote"
            rules={[{ required: true, message: 'Please input the product specialNote!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductList;