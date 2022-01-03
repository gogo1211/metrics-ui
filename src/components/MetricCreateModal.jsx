import { Modal } from 'react-bootstrap';

import { MetricCreateForm } from './MetricCreateForm';

/**
 * Metric Create Modal
 *
 * @param {boolean} show
 * @param {function} onClose
 * @param {function} onSubmit
 */
function MetricCreateModal({ show, onClose, onSubmit, ...rest }) {
  return (
    <Modal show={show} onHide={onClose} {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Metric</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MetricCreateForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
}

export { MetricCreateModal };
