import { Modal } from 'react-bootstrap';

import { RecordsetAddValueForm } from './RecordsetAddValueForm';

/**
 * Metric Recordset Add Value Modal
 *
 * @param {boolean} show
 * @param {function} onClose
 * @param {function} onSubmit
 */
function RecordsetAddValueModal({ show, onClose, onSubmit, ...rest }) {
  return (
    <Modal show={show} onHide={onClose} {...rest}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new value to recordset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RecordsetAddValueForm onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  );
}

export { RecordsetAddValueModal };
