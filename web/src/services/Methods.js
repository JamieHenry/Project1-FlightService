/* =================================================== */
/*   File for testing all methods present in project   */
/* =================================================== */


/**
 * takes in user defined flight input fields and checks if it is valid
 * 
 * then the input fields are converted to match Flight schema and sent
 *      back for database insertion
 * 
 * @param {Object} inputs - contains flight input fields
 * @returns - object containing valid boolean value and flight object/msg
 */
const validateInputs = inputs => {
    // first check if any input fields are missing ('')
    for (let field in inputs) {
        if (inputs[field] === '') return {valid: false, msg: 'Missing Input'};
    }

    // converting date-time input fields to seperate fields for Flight schema
    const [departureDate, departureTime] = convertFromDateTime(inputs.departureDateTime);
    const [arrivalDate, arrivalTime] = convertFromDateTime(inputs.arrivalDateTime);

    // split up arrival/departure date into corresponding month, day, year values
    const [departureMonth, departureDay, departureYear] = departureDate.split('/');
    const [arrivalMonth, arrivalDay, arrivalYear] = arrivalDate.split('/');

    // checking for valid dates, times, passengers, airports
    //      - arrival date must be after departure date
    //      - arrival time must be after departure time unless dates are different
    //      - current passenger count must be below or equal to passenger limit
    //      - arrival/departure airport must be not equal and be 3 letters in length
    if (arrivalYear < departureYear) return { valid: false, msg: 'Invalid Date' };
    if (arrivalMonth < departureMonth && arrivalYear === departureYear) return { valid: false, msg: 'Invalid Date' };
    if (arrivalDay < departureDay && arrivalMonth === departureMonth && arrivalYear === departureYear) return { valid: false, msg: 'Invalid Date' };
    if (arrivalTime <= departureTime && arrivalDate === departureDate) return { valid: false, msg: 'Invalid Time' };
    if (parseInt(inputs.currPassengers) > parseInt(inputs.passengerLimit)) return { valid: false, msg: 'Invalid Passenger Count' };
    if (inputs.departureAirport === inputs.arrivalAirport || inputs.departureAirport.length < 3 || inputs.arrivalAirport.length < 3) return { valid: false, msg: 'Invalid Airport' };

    // creating new Flight object with correct fields for schema
    const newFlight = {
        flightNumber: parseInt(inputs.flightNumber),
        departureDate,
        arrivalDate,
        departureTime,
        arrivalTime,
        departureAirport: inputs.departureAirport.toUpperCase(),
        arrivalAirport: inputs.arrivalAirport.toUpperCase(),
        currPassengers: parseInt(inputs.currPassengers),
        passengerLimit: parseInt(inputs.passengerLimit)
    };

    return {valid: true, newFlight};
}

/**
 * convert from JavaScript date-time input to seperate date and time formats
 * 
 * @param {String} dateTime - date-time input string ('yyyy-mm-ddThh:mm')
 * @returns - both converted date (format: 'mm/dd/yyyy') and time (format: 'hh:mm (A|P)M')
 */
const convertFromDateTime = dateTime => {
    // split parameter into its corresponding year, month, day, time values
    let [date, time] = dateTime.split('T');
    let [year, month, day] = date.split('-');

    // re-format date and split time into corresponding hour and min values
    date = `${month}/${day}/${year}`;
    let [hour, min] = time.split(':');

    // convert hour to 12-hour format, adding in lost 0 if needed
    // catching edge case of 12 being 12PM
    // catching edge case of 00 being 12AM
    // then re-format time
    if (hour > '12') {
        hour = parseInt(hour) - 12;
        time = hour >= 10 ? `${hour}:${min} PM` : `0${hour}:${min} PM`;
    } else if (hour === '12') {
        time = `12:${min} PM`;
    } else if (hour === '00') {
        time = `12:${min} AM`;
    } else {
        time = `${hour}:${min} AM`;
    }

    return [date, time];
}

/**
 * takes in date and time and combines into a formatted string
 *      that date-time input and use
 * 
 * @param {String} date - date with format: 'mm/dd/yyyy'
 * @param {String} time - time with format: 'hh:mm (A|P)M'
 * @returns - formatted string for date-time input ('yyyy-mm-ddThh:mm')
 */
 const convertToDateTime = (date, time) => {
    // split into corresponding values
    const [month, day, year] = date.split('/');
    const [hourMin, amPm] = time.split(' ');
    let [hour, min] = hourMin.split(':');

    // convert time to 24-hour format based on AM|PM value
    // check for 12 AM|PM edge cases
    if (amPm === 'PM' && hour !== '12') {
        hour = parseInt(hour) + 12;
    }
    if (amPm === 'AM' && hour === '12') {
        hour = '00';
    }

    // format and return string
    return `${year}-${month}-${day}T${hour}:${min}`;
}

/**
     * calculates the total travel time from departure date/time
     *      and arrivale date/time
     * 
     * @returns formatted string '<total hour>h<total min>m'
     */
 const calcTotalTime = (departureTime, arrivalTime, departureDate, arrivalDate) => {
    // get hour diff to add to total hours
    let hourDiff = calcHourDiff(departureDate, arrivalDate);
    // split time into corresponding hour, min, amPm ('hh:mm (A|P)M')
    let [startTime, startAmPm] = departureTime.split(' ');
    let [endTime, endAmPm] = arrivalTime.split(' ');
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

/**
     * calculates the hour difference between arrival/departure date
     * 
     * @returns time to add to the total time (in hours)
     */
 const calcHourDiff = (departureDate, arrivalDate) => {
    // split dates into corresponding month, day, year ('mm/dd/yyyy')
    const [startMonth, startDay, startYear] = departureDate.split('/');
    const [endMonth, endDay, endYear] = arrivalDate.split('/');

    // calculate difference and multiply by respective hour amount
    return ((parseInt(endMonth) - parseInt(startMonth)) * 730) +( (parseInt(endDay) - parseInt(startDay)) * 24) + ((parseInt(endYear) - parseInt(startYear)) * 8760);
}

module.exports = { validateInputs, convertFromDateTime, convertToDateTime, calcTotalTime, calcHourDiff };