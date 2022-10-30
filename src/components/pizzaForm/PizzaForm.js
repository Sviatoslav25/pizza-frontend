import React, { useRef } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as yup from 'yup';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import FormikFormControl from '../formik/FormikFormControl';
import FormikFormGroup from '../formik/FormikFormGroup';
import FormikTextAreaField from '../formik/FormikTextAreaField';
import { prepareInitialValues } from '../../utils/form';

const NAME_MIN = 3;
const NAME_MAX = 80;

const schema = yup.object().shape({
  name: yup.string().label('name').required().min(NAME_MIN).max(NAME_MAX),
  img: yup.string().label('Image URL').url().required(),
  price: yup.number().label('Pizza price'),
  description: yup.string().label('Description of the pizza').required().min(5),
});

const defaultValues = {
  name: '',
  img: '',
  price: '',
  description: '',
};

export default function PizzaForm({ textSubmitButton = 'Add Pizza', onSubmit, initialValues = {} }) {
  const initialValuesRef = useRef();
  if (!initialValuesRef.current) {
    initialValuesRef.current = prepareInitialValues(initialValues, defaultValues);
  }

  return (
    <Formik initialValues={initialValuesRef.current} validationSchema={schema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <FormikForm>
          <FormikFormGroup label="Pizza name">
            <FormikFormControl name="name" placeholder="Enter name" required />
          </FormikFormGroup>
          <FormikFormGroup label="Image URL">
            <FormikFormControl name="img" placeholder="Enter url" required type="url" />
          </FormikFormGroup>
          <FormikFormGroup label="Description of the pizza">
            <FormikTextAreaField name="description" required />
          </FormikFormGroup>
          <FormikFormGroup label="Pizza price">
            <FormikFormControl name="price" placeholder="Enter the price of the pizza" required type="number" />
          </FormikFormGroup>
          <ButtonWithSpinner className="mt-3" type="submit" loading={isSubmitting}>
            {textSubmitButton}
          </ButtonWithSpinner>
        </FormikForm>
      )}
    </Formik>
  );
}
