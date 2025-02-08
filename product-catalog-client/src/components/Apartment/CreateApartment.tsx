import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createApartment } from "../../services/apartmentService";

interface CreateApartmentFormValues {
  name: string;
}

const CreateApartment: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: CreateApartmentFormValues = {
    name: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Apartment name is required"),
  });

  const onSubmit = async (values: CreateApartmentFormValues) => {
    try {
      await createApartment(values);
      navigate("/apartments");
    } catch (error) {
      console.error("Failed to create apartment", error);
    }
  };

  return (
    <div>
      <h2>Add Apartment</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <div>
            <label htmlFor="name">Apartment Name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" />
          </div>
          <button type="submit">Add Apartment</button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateApartment;
