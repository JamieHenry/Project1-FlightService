import { Modal, Button } from 'react-bootstrap';

/**
 * modal for popping up to confirm current flight deletion 
 *      (accessed from flight card's button)
 * upon confirmation, modal will close and delete request will be sent to
 *      database
 * 
 * @params - destructured  showModal function, hideModal function, confirmDeletion function,
 *              and flight specific delete message
 * @returns - Modal for deletion confirmation
 */
export const ConfirmationModal = ({ showModal, hideModal, confirmModal, flightNumber }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body><div className='alert alert-danger'>Are you sure you want to delete Flight Number: {flightNumber}?</div></Modal.Body>
            <Modal.Footer>
            <Button variant='outline-danger' onClick={confirmModal}>
                Delete
            </Button>
            </Modal.Footer>
        </Modal>
    )
}