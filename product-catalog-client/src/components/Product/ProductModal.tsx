import React from 'react';
import { Modal, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

interface Category {
  id: string;
  name: string;
}

interface ProductModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: any;
  categories: Category[];
  editingProduct: any;
}

const ProductModal: React.FC<ProductModalProps> = ({ visible, onOk, onCancel, form, categories, editingProduct }) => {
  return (
    <Modal
      title={editingProduct ? 'Edit Product' : 'Add Product'}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
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
          name="categoryid"
          label="Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select>
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
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
      </Form>
    </Modal>
  );
};

export default ProductModal;