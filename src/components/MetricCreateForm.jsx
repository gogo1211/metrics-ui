import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';

/**
 * Metric Create form
 *
 * @param {function} onSubmit
 */
function MetricCreateForm({ onSubmit, ...rest }) {
  const schema = yup.object({
    name: yup.string().required('Name is required.')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur'
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate {...rest}>
      <Form.Group controlId="name">
        <Form.Label>Name*</Form.Label>
        <Form.Control {...register('name')} isValid={touchedFields.name && !errors.name} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="btn-blue w-100 mt-3" disabled={isSubmitting}>
        Create
      </Button>
    </Form>
  );
}

export { MetricCreateForm };
