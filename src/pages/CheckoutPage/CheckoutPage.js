import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ErrorSummary from '../../components/ErrorSummary/ErrorSummary';

import {
  CheckoutContainer,
  Title,
  FormField,
  Label,
  Input,
  SubmitButton,
} from './CheckoutPage.styles';

const CheckoutPage = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'First name must contain only letters')
      .max(20, 'First name must be at most 20 characters')
      .required('First name is a required field'),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'Last name must contain only letters')
      .max(20, 'Last name must be at most 20 characters')
      .required('Last name is a required field'),
    email: Yup.string()
      .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/, 'Email must be valid (e.g., example@gmail.com)')
      .required('Email is a required field'),
    phone: Yup.string()
      .matches(/^\d*$/, 'Phone number must be only digits') // Не обов’язкове, але має бути числовим
      .max(15, 'Phone number must be at most 15 digits'),
    address: Yup.string()
      .max(50, 'Address must be at most 50 characters')
      .required('Address is a required field'),
  });

  const handleSubmit = (values) => {
    console.log(values);
    navigate('/success'); // Перехід на Success сторінку
  };

  return (
    <CheckoutContainer>
      <Title>Checkout</Title>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          address: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <ErrorSummary
              errors={Object.keys(errors).reduce((acc, key) => {
                if (touched[key]) {
                  acc[key] = errors[key];
                }
                return acc;
              }, {})}
            />

            <FormField>
              <Label htmlFor="firstName">First Name</Label>
              <Field as={Input} name="firstName" id="firstName" />
            </FormField>
            <FormField>
              <Label htmlFor="lastName">Last Name</Label>
              <Field as={Input} name="lastName" id="lastName" />
            </FormField>
            <FormField>
              <Label htmlFor="email">Email</Label>
              <Field as={Input} name="email" id="email" type="email" />
            </FormField>
            <FormField>
              <Label htmlFor="phone">Phone</Label>
              <Field as={Input} name="phone" id="phone" />
            </FormField>
            <FormField>
              <Label htmlFor="address">Address</Label>
              <Field as={Input} name="address" id="address" />
            </FormField>
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        )}
      </Formik>
    </CheckoutContainer>
  );
};

export default CheckoutPage;

