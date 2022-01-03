import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';

/**
 * Recordset Value Create form
 *
 * @param {function} onSubmit
 */
function RecordsetAddValueForm({ onSubmit, ...rest }) {
  const schema = yup.object({
    value: yup.number().typeError('Value should be number.').required('Value is required.')
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
      <Form.Group controlId="value">
        <Form.Label>Value*</Form.Label>
        <Form.Control
          {...register('value')}
          isValid={touchedFields.value && !errors.value}
          isInvalid={!!errors.value}
        />
        <Form.Control.Feedback type="invalid">{errors.value?.message}</Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="btn-blue w-100 mt-3" disabled={isSubmitting}>
        Add
      </Button>
    </Form>
  );
}

export { RecordsetAddValueForm };
