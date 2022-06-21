import axios from 'axios';
import arrow from '../assets/arrow.png';
import { useState } from 'react';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { OuterContainer, InnerContainer, Item, TotalTime, Date, Airport, PassengerInfo, ButtonBox, Button, Time, FlightNo } from '../components/FlightCard';
import 'bootstrap/dist/css/bootstrap.min.css';

export const AppFlightCard = ({ flight, margin, updateFlights }) => {

    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');

    const calcHourDiff = () => {
        const [startMonth, startDay, startYear] = flight.departureDate.split('/');
        const [endMonth, endDay, endYear] = flight.arrivalDate.split('/');

        return ((parseInt(endMonth) - parseInt(startMonth)) * 730) +( (parseInt(endDay) - parseInt(startDay)) * 24) + ((parseInt(endYear) - parseInt(startYear)) * 8760);
    }

    const calcTotalTime = () => {
        let hourDiff = calcHourDiff();
        let [startTime, startAmPm] = flight.departureTime.split(' ');
        let [endTime, endAmPm] = flight.arrivalTime.split(' ');
        let [startHour, startMin] = startTime.split(':');
        let [endHour, endMin] = endTime.split(':');

        if (startAmPm === 'PM') {
            startHour = parseInt(startHour) + 12;
        }
        if (endAmPm === 'PM') {
            endHour = parseInt(endHour) + 12;
        }

        const totalHour = endHour - startHour + hourDiff;
        const totalMin = endMin - startMin;

        return `${totalHour}h ${totalMin}m`;
    }

    const editFlight = () => {
        console.log(flight.flightNumber + " edit flight");
    }

    const showDeleteModal = () => {
        setDeleteMessage(`Are you sure you want to delete Flight: ${flight.flightNumber}?`);
        setDisplayConfirmation(true);
    }

    const hideConfirmation = () => {
        setDisplayConfirmation(false);
    }

    const submitDelete = () => {
        axios.delete(`http://localhost:8080/flights/${flight.flightNumber}`)
            .then(res => {
                console.log(res.data);
                updateFlights();
            })
            .catch(err => console.log(err));
        setDisplayConfirmation(false);
    }

    return (
        <>
            <ConfirmationModal showModal={displayConfirmation} confirmModal={submitDelete} hideModal={hideConfirmation} message={deleteMessage} />
            <OuterContainer margin={margin}>
            <InnerContainer>
                <FlightNo>{flight.flightNumber}</FlightNo>
                <Item />
                <TotalTime>{calcTotalTime()}</TotalTime>
                <Date jc='left'>{flight.departureDate}</Date>
                <Item />
                <Date jc='right'>{flight.arrivalDate}</Date>
                <Time jc='left'>{flight.departureTime}</Time>
                <Item><img src={arrow} height='30px' alt='arrow' /></Item>
                <Time jc='right'>{flight.arrivalTime}</Time>
                <Airport jc='left'>{flight.departureAirport}</Airport>
                <PassengerInfo passengerCount={flight.currPassengers} passengerLimit={flight.passengerLimit} />
                <Airport jc='right'>{flight.arrivalAirport}</Airport>
            </InnerContainer>
            <ButtonBox>
                <Button onClick={editFlight} bc='green' bcHover='darkgreen' name='fa fa-edit' />
                <Button onClick={showDeleteModal} bc='red' bcHover='darkred' name='fa fa-trash' />
            </ButtonBox>
        </OuterContainer>
        </> 
    );
}