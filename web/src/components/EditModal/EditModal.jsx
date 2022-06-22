import { Modal, Button } from 'react-bootstrap';
import { AppUpdateFlightForm } from '../../features/AppUpdateFlightForm';

/**
 * modal for popping up to edit current flight (accessed from flight card's button)
 * modal will create an update form (misses flight number) and populate the
 *      form's default values with current flight values
 * Submiting form will perform a put request to database and close the modal
 * 
 * @params - destructured updateFlights function, showModal function, hideModal function,
 *              closeEditModal function, edit Flight function, and current flight info
 * @returns - Modal with update flight form attached
 */
export const EditModal = ({ updateFlights, showModal, hideModal, editModal, flight, editFlights }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
            <Modal.Title>Editing Flight Number: {flight.flightNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{textAlign: 'center', justifyContent: 'center'}}>
                    <AppUpdateFlightForm closeEditModal={editModal} editFlights={editFlights} flight={flight} updateFlights={updateFlights} />
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="default" onClick={hideModal}>
                Cancel
            </Button>
            </Modal.Footer>
        </Modal>
    )
}