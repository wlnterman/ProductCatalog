import React, { useState, useEffect } from "react";
import { Button, Form, TablePaginationConfig, notification } from "antd";

import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";
import { getAllProducts, addProduct, updateProduct, deleteProduct, getUsdExchangeRate } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import { PlusOutlined } from "@ant-design/icons";
import SearchBar from "../Generic/SearchBar";

const ProductList2: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [usdExchangeRate, setUsdExchangeRate] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [form] = Form.useForm();

  useEffect(() => {
    fetchProducts();
    fetchUsdExchangeRate();
    fetchCategories();
  }, []);

  useEffect(() => {
    handleSearch(searchText);
  }, [products, searchText]);

  const fetchProducts = async () => {
    const products = await getAllProducts({ page: 1, pageSize: 10, searchTerm: "" });
    setProducts(products.items);
    setFilteredProducts(products.items);
  };

  const fetchUsdExchangeRate = async () => {
    const rate = await getUsdExchangeRate();
    setUsdExchangeRate(rate);
  };

  const fetchCategories = async () => {
    const data = await getCategories();
    setCategories(data);
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
    });
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    notification.success({ message: "Product deleted successfully" });
    fetchProducts();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await updateProduct(editingProduct.id, values);
        notification.success({ message: "Product updated successfully" });
      } else {
        await addProduct(values);
        notification.success({ message: "Product added successfully" });
      }
      fetchProducts();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    const filtered = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Product
      </Button>
      <ProductTable
        products={filteredProducts}
        categories={categories}
        usdExchangeRate={usdExchangeRate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <ProductModal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        form={form}
        categories={categories}
        editingProduct={editingProduct}
      />
    </div>
  );
};

export default ProductList2;
