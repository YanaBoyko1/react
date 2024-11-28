import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import {
  CheckoutContainer,
  Title,
  FormField,
  Label,
  Input,
  SubmitButton,
} from './CheckoutPage.styles';

// Компонент для помилок
const ErrorSummary = ({ errors }) => (
  <div style={{ color: 'red', marginBottom: '10px' }}>
    {Object.keys(errors).map((key) => (
      <div key={key}>{errors[key]}</div>
    ))}
  </div>
);

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Схема валідації форми
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      )
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits') // Регулярний вираз для телефону
      .notRequired(),  // Робимо телефон необов'язковим
    address: Yup.string().required('Address is required'),
  });

  // Обробник відправки форми
  const handleSubmit = async (values) => {
    try {
      console.log('Order details:', values);
      navigate('/success');  // Перехід на сторінку успішного оформлення
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '', // Початкове значення порожнє для телефону
          address: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <ErrorSummary errors={errors} />  {/* Виведення повідомлень про помилки */}

            <FormField>
              <Label htmlFor="firstName">First Name</Label>
              <Field as={Input} name="firstName" id="firstName" />
              {errors.firstName && touched.firstName && <div>{errors.firstName}</div>}
            </FormField>
            <FormField>
              <Label htmlFor="lastName">Last Name</Label>
              <Field as={Input} name="lastName" id="lastName" />
              {errors.lastName && touched.lastName && <div>{errors.lastName}</div>}
            </FormField>
            <FormField>
              <Label htmlFor="email">Email</Label>
              <Field as={Input} name="email" id="email" type="email" />
              {errors.email && touched.email && <div>{errors.email}</div>}
            </FormField>
            <FormField>
              <Label htmlFor="phone">Phone (Optional)</Label>
              <Field as={Input} name="phone" id="phone" />
              {errors.phone && touched.phone && <div>{errors.phone}</div>}
            </FormField>
            <FormField>
              <Label htmlFor="address">Address</Label>
              <Field as={Input} name="address" id="address" />
              {errors.address && touched.address && <div>{errors.address}</div>}
            </FormField>
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        )}
      </Formik>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
