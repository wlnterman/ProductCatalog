import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';

interface CreateProductFormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  generalNote: string;
  specialNote: string;
}

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  // const [categories, setCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const data = await getCategories();
  //       setCategories(data.map((category: any) => category.name));
  //     } catch (error) {
  //       console.error('Failed to fetch categories', error);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();//axios.get(`${API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Failed to load categories');
      }
    };

    fetchCategories();
  }, []);

  const initialValues: CreateProductFormValues = {
    name: '',
    category: '',
    description: '',
    price: 0,
    generalNote: '',
    specialNote: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    generalNote: Yup.string().required('General note is required'),
    specialNote: Yup.string().required('Special note is required')
  });

  const onSubmit = async (values: CreateProductFormValues) => {
    try {
      await addProduct(values);
      navigate('/products');
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Product Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>
          <div>
            <label htmlFor="category">Category</label>
            <Field as="select" name="category">
              <option value="" label="Select category" />
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <Field name="description" type="text" />
            <ErrorMessage name="description" component="div" />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <Field name="price" type="number" />
            <ErrorMessage name="price" component="div" />
          </div>
          <div>
            <label htmlFor="generalNote">General Note</label>
            <Field name="generalNote" type="text" />
            <ErrorMessage name="generalNote" component="div" />
          </div>
          <div>
            <label htmlFor="specialNote">Special Note</label>
            <Field name="specialNote" type="text" />
            <ErrorMessage name="specialNote" component="div" />
          </div>
          <button type="submit">Add Product</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateProduct;