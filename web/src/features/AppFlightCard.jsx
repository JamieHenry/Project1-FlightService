import { OuterContainer, InnerContainer, Item, TotalTime, Date, Airport, PassengerInfo, ButtonBox, Button, Time, FlightNo } from '../components/FlightCard'
import arrow from '../assets/arrow.png';

export const AppFlightCard = ({ flight }) => {

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

    return (
        <OuterContainer>
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
                <Button bc='green' bcHover='darkgreen' name='fa fa-edit' />
                <Button bc='red' bcHover='darkred' name='fa fa-trash' />
            </ButtonBox>
        </OuterContainer>
    );
}