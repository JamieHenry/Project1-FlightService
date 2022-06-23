import axios from 'axios';
import arrow from '../assets/arrow.png';
import { useState } from 'react';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { OuterContainer, InnerContainer, Item, TotalTime, Date, Airport, PassengerInfo, ButtonBox, Button, Time, FlightNo } from '../components/FlightCard';
import { EditModal } from '../components/EditModal/EditModal';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * card that holds details of a single flight
 * 
 * @params - destructured flight object, margin value, and updateFlights function
 * @returns - AppFlightCard component
 */
export const AppFlightCard = ({ flight, margin, updateFlights }) => {
    
    // states for delete/edit modal
    const [displayEdit, setDisplayEdit] = useState(false);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);

    /**
     * calculates the hour difference between arrival/departure date
     * 
     * @returns time to add to the total time (in hours)
     */
    const calcHourDiff = () => {
        // split dates into corresponding month, day, year ('mm/dd/yyyy')
        const [startMonth, startDay, startYear] = flight.departureDate.split('/');
        const [endMonth, endDay, endYear] = flight.arrivalDate.split('/');

        // calculate difference and multiply by respective hour amount
        return ((parseInt(endMonth) - parseInt(startMonth)) * 730) +( (parseInt(endDay) - parseInt(startDay)) * 24) + ((parseInt(endYear) - parseInt(startYear)) * 8760);
    }

    /**
     * calculates the total travel time from departure date/time
     *      and arrivale date/time
     * 
     * @returns formatted string '<total hour>h<total min>m'
     */
    const calcTotalTime = () => {
        // get hour diff to add to total hours
        let hourDiff = calcHourDiff();
        // split time into corresponding hour, min, amPm ('hh:mm (A|P)M')
        let [startTime, startAmPm] = flight.departureTime.split(' ');
        let [endTime, endAmPm] = flight.arrivalTime.split(' ');
        let [startHour, startMin] = startTime.split(':');
        let [endHour, endMin] = endTime.split(':');

        // check if time is PM and add 12 hours for better calculation
        if (startAmPm === 'PM') startHour = parseInt(startHour) + 12;
        if (endAmPm === 'PM') endHour = parseInt(endHour) + 12;

        // calculate departure/arrival difference
        const totalHour = endHour - startHour + hourDiff;
        const totalMin = endMin - startMin;

        return `${totalHour}h ${totalMin}m`;
    }

    // confirmed delete sent to database, then close confirmation
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
            <ConfirmationModal showModal={displayConfirmation} confirmModal={submitDelete} hideModal={() => setDisplayConfirmation(false)} flightNumber={flight.flightNumber} />
            <EditModal showModal={displayEdit} editModal={() => setDisplayEdit(false)} hideModal={() => setDisplayEdit(false)} flight={flight} updateFlights={updateFlights} />
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
                    <Button onClick={() => setDisplayEdit(true)} bc='green' bcHover='darkgreen' name='fa fa-edit' />
                    <Button onClick={() => setDisplayConfirmation(true)} bc='red' bcHover='darkred' name='fa fa-trash' />
                </ButtonBox>
            </OuterContainer>
        </> 
    );
}