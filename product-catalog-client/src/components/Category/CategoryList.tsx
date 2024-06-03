import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import { useAuth } from '../authContext';
import { createCategory, deleteCategory, getCategories, updateCategory } from '../../services/categoryService';


// Определение интерфейса для категории
interface Category {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]); // Типизация состояния
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null); // Типизация редактируемой категории
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        // const categories = response.data;
        // setCategories(categories.map((category: any) => {category['name']}));
      } catch (error) {
        message.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id.toString());
      setCategories(categories.filter((category: Category) => category.id !== id));
      message.success('Category deleted successfully');
    } catch (error) {
      message.error('Failed to delete category');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
  };

  const handleSave = async (values: Category) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id.toString());
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
              <Button onClick={() => handleEdit(record)}>Edit</Button>
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