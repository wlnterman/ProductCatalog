import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
//123import { useAuth } from '../authContext';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../services/categoryService';
import { useAuth } from '../authContext2';


// Определение интерфейса для категории
interface Category {
  id: string;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Типизация состояния
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null); // Типизация редактируемой категории
  const { currentUser } = useAuth();


  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      message.error('Failed to load categories');
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    console.log(category)
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      onOk: async () => {
        try {
          await deleteCategory(id);
          //setCategories(categories.filter((category: Category) => category.id !== id));
          message.success('Category deleted successfully');
          fetchCategories();
        } catch (error) {
          message.error('Failed to delete category');
        }
      },
    });   
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleSave = async (values: Category) => {
    try {
      if (editingCategory) {
        const updatedValues = { ...values, id: editingCategory.id };
        await updateCategory(editingCategory.id, updatedValues);
        setCategories(categories.map((category: Category) => (category.id === editingCategory.id ? { ...category, ...values } : category)));
        message.success('Category updated successfully');
      } else {
        const response = await createCategory(values);
        setCategories([...categories, response.data]);
        message.success('Category created successfully');
      }
      setIsModalVisible(false);
      setEditingCategory(null);
    } catch (error) {
      message.error('Failed to save category');
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Add Category
      </Button>
      <Table dataSource={categories} rowKey="id" style={{ marginTop: 20 }}>
        <Table.Column title="Name" dataIndex="name" key="name" />
        <Table.Column
          title="Actions"
          key="actions"
          render={(text, record: Category) => (
            <>
              <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>Edit</Button>
              <Button danger onClick={() => handleDelete(record.id)}>Delete</Button>
            </>
          )}
        />
      </Table>
      <Modal
        title={editingCategory ? 'Edit Category' : 'Add Category'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          initialValues={editingCategory || { name: '' }} // Начальные значения для формы
          onFinish={handleSave}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the category name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoryList;