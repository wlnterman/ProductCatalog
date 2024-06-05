import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../../services/categoryService';


interface CreateCategoryFormValues {
  name: string;
}

const CreateCategory: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: CreateCategoryFormValues = {
    name: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Category name is required')
  });

  const onSubmit = async (values: CreateCategoryFormValues) => {
    try {
      await createCategory(values);
      navigate('/categories');
    } catch (error) {
      console.error('Failed to create category', error);
    }
  };

  return (
    <div>
      <h2>Add Category</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Category Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>
          <button type="submit">Add Category</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateCategory;