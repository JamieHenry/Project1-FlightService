import { Modal, Button } from 'react-bootstrap';
import { AppUpdateFlightForm } from '../../features/AppUpdateFlightForm';

export const EditModal = ({ updateFlights, showModal, hideModal, editModal, flight, editFlights }) => {
    return (
        <Modal show={showModal} onHide={hideModal}>
            <Modal.Header closeButton>
            <Modal.Title>Editing Flight Number: {flight.flightNumber}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div style={{textAlign: 'center', justifyContent: 'center'}}>
                    <AppUpdateFlightForm onClick={editModal} editFlights={editFlights} flight={flight} updateFlights={updateFlights} />
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