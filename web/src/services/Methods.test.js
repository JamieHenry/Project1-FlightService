import { validateInputs, convertFromDateTime, convertToDateTime, calcTotalTime, calcHourDiff, compareDates, compareTimes, convertDate, convertTime } from './Methods';

/* Edge Cases For Validating Inputs
    1. Only one input value is missing
        - Expected = valid: false, msg: 'Missing Input'
    2. Arrival/Departure Dates are equal but Arrival Time is after Departure Time
        - Expected = valid: True
    3. Arrival/Departure Dates are equal but Arrival Time is before or equal to Departure Time
        - Expected = valid: false, msg: 'Invalid Time'
    4. Arrival/Departure Times are equal but Arrival Date is after Departure Date
        - Expected = valid: true
    5. Arrival/Departure Times are equal but Arrival Date is before Departure Date
        - Expected = valid: false, msg: 'Invalid Date'
    6. Either Airport input is not 3 caracters long
        - Expected = valid: false, msg: 'Invalid Airport'
    7. Both Airport inputs is converted to uppercase when returned
        - Expected = valid: true
    8. Current Passenger input is greater than Passenger Limit input
        - Expected = valid: false, msg: 'Invalid Passenger Count'
    9. Current Passenger input is equal to Passenger Limit input
        - Expected = valid: true
    10. Arrival/Departure day and month are equal but arrival year is after departure year
        - Expected = valid: true
    11. Arrival/Departure month and year are equal but arrival day is after departure day
        - Expected = valid: true
    12. Arrival/Departure day and year are equal but arrival month is after departure month
        - Expected = valid: true
    13. Arrival/Departure Times are equal but Arrival is PM and Departure is AM and Arrival Date is after Departure Date
        - Expected = valid: true
    14. Arrival/Departure Dates are equal except Arrival day is less than Departure day
            AND Arrival year is after Departure Year
        - Expected = valid: true
    15. Arrival/Departure Dates are equal except Arrival month is less than Departure month
            AND Arrival year is after Departure Year
        - Expected = valid: true
*/
it('validates inputs', () => {
    // missing input is denoted with '' (from JavaScript input)
    const edgeCase1 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult1 = validateInputs(edgeCase1);
    expect(validationResult1.valid).toEqual(false);
    expect(validationResult1.msg).toEqual('Missing Input');

    const edgeCase2 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-22T10:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult2 = validateInputs(edgeCase2);
    expect(validationResult2.valid).toEqual(true);

    const edgeCase3 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-22T09:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult3 = validateInputs(edgeCase3);
    expect(validationResult3.valid).toEqual(false);
    expect(validationResult3.msg).toEqual('Invalid Time');
    
    const edgeCase4 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-23T09:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult4 = validateInputs(edgeCase4);
    expect(validationResult4.valid).toEqual(true);
    
    const edgeCase5 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-21T09:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult5 = validateInputs(edgeCase5);
    expect(validationResult5.valid).toEqual(false);
    expect(validationResult5.msg).toEqual('Invalid Date');
    
    const edgeCase6 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-22T10:00',
        departureAirport: 'HN',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult6 = validateInputs(edgeCase6);
    expect(validationResult6.valid).toEqual(false);
    expect(validationResult6.msg).toEqual('Invalid Airport');
    
    const edgeCase7 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-22T10:00',
        departureAirport: 'hnl',
        arrivalAirport: 'mco',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult7 = validateInputs(edgeCase7);
    expect(validationResult7.valid).toEqual(true);
    expect(validationResult7.newFlight.arrivalAirport).toEqual(edgeCase7.arrivalAirport.toUpperCase());
    expect(validationResult7.newFlight.departureAirport).toEqual(edgeCase7.departureAirport.toUpperCase());
    
    const edgeCase8 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-22T10:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 101,
        passengerLimit: 100
    };
    const validationResult8 = validateInputs(edgeCase8);
    expect(validationResult8.valid).toEqual(false);
    expect(validationResult8.msg).toEqual('Invalid Passenger Count');
    
    const edgeCase9 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-22T10:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 100,
        passengerLimit: 100
    };
    const validationResult9 = validateInputs(edgeCase9);
    expect(validationResult9.valid).toEqual(true);
    
    const edgeCase10 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2023-06-22T10:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult10 = validateInputs(edgeCase10);
    expect(validationResult10.valid).toEqual(true);
    
    const edgeCase11 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-06-23T10:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult11 = validateInputs(edgeCase11);
    expect(validationResult11.valid).toEqual(true);
    
    const edgeCase12 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2022-07-22T10:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult12 = validateInputs(edgeCase12);
    expect(validationResult12.valid).toEqual(true);
    
    const edgeCase13 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T01:00',
        arrivalDateTime: '2022-06-22T13:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult13 = validateInputs(edgeCase13);
    expect(validationResult13.valid).toEqual(true);

    const edgeCase14 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2023-06-20T09:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult14 = validateInputs(edgeCase14);
    expect(validationResult14.valid).toEqual(true);

    const edgeCase15 = {
        flightNumber: 4,
        departureDateTime: '2022-06-22T09:00',
        arrivalDateTime: '2023-04-22T09:00',
        departureAirport: 'HNL',
        arrivalAirport: 'MCO',
        currPassengers: 10,
        passengerLimit: 100
    };
    const validationResult15 = validateInputs(edgeCase15);
    expect(validationResult15.valid).toEqual(true);
});

/* Edge Cases For Converting from DateTime 
    ****FORMAT FROM JAVASCRIPT INPUT = 'YYYY-MM-DDThh:mm'****
    1. DateTime Input has hour value of 00
        - Expected = date: 'MM/DD/YYYY', time: '12:mm AM'
    2. DateTime Input has hour value of 12
        - Expected = date: 'MM/DD/YYYY', time: '12:mm PM'
    3. DateTime Input has hour value greater than 12
        - Expected = date: 'MM/DD/YYYY', time: '0(hh - 12):mm PM'
    4. DateTime Input has hour value less than 12
        - Expected = date: 'MM/DD/YYYY', time: 'hh:mm AM'
*/
it('converts from datetime', () => {
    const edgeCase1 = '2022-06-22T00:56';
    const [date1, time1] = convertFromDateTime(edgeCase1);
    expect(date1).toEqual('06/22/2022');
    expect(time1).toEqual('12:56 AM');

    const edgeCase2 = '2022-06-22T12:56';
    const [date2, time2] = convertFromDateTime(edgeCase2);
    expect(date2).toEqual('06/22/2022');
    expect(time2).toEqual('12:56 PM');

    const edgeCase3 = '2022-06-22T15:56';
    const [date3, time3] = convertFromDateTime(edgeCase3);
    expect(date3).toEqual('06/22/2022');
    expect(time3).toEqual('03:56 PM');

    const edgeCase4 = '2022-06-22T03:56';
    const [date4, time4] = convertFromDateTime(edgeCase4);
    expect(date4).toEqual('06/22/2022');
    expect(time4).toEqual('03:56 AM');
});

/* Edge Cases For Converting to DateTime 
    ****FORMAT FROM Database = Date: 'MM/DD/YYYY' Time: 'hh:mm (A|P)M'****
    1. Time input has hour value of 12 but is PM
        - Expected = dateTime: 'YYYY-MM-DDT12:mm'
    2. Time input has hour value of 12 but is AM
        - Expected = dateTime: 'YYYY-MM-DDT00:mm'
    3. Time input has hour value less than 12 but is PM
        - Expected = dateTime: 'YYYY-MM-DDT(hh + 12):mm'
    4. Time input has hour value less than 12 but is AM
        - Expected = dateTime: 'YYYY-MM-DDThh:mm'
*/
it('converts to datetime', () => {
    const edgeCaseDate1 = '06/22/2022';
    const edgeCaseTime1 = '12:56 PM';
    const dateTime1 = convertToDateTime(edgeCaseDate1, edgeCaseTime1);
    expect(dateTime1).toEqual('2022-06-22T12:56');

    const edgeCaseDate2 = '06/22/2022';
    const edgeCaseTime2 = '12:56 AM';
    const dateTime2 = convertToDateTime(edgeCaseDate2, edgeCaseTime2);
    expect(dateTime2).toEqual('2022-06-22T00:56');

    const edgeCaseDate3 = '06/22/2022';
    const edgeCaseTime3 = '03:56 PM';
    const dateTime3 = convertToDateTime(edgeCaseDate3, edgeCaseTime3);
    expect(dateTime3).toEqual('2022-06-22T15:56');

    const edgeCaseDate4 = '06/22/2022';
    const edgeCaseTime4 = '03:56 AM';
    const dateTime4 = convertToDateTime(edgeCaseDate4, edgeCaseTime4);
    expect(dateTime4).toEqual('2022-06-22T03:56');
});

/* Edge Cases For Calculating Total Travel Time 
    ****FORMAT FROM Database = Date: 'MM/DD/YYYY' Time: 'hh:mm (A|P)M'****
    1. Arrival/Departure Time HH values are equal but one is AM and one is PM
        AND Arrival/Departure Date inputs are equal
        - Expected = totalTime: '12h (minute difference)m'
    2. Arrival/Departure Time hh values are equal
        AND Arrival/Departure Date DD values have a difference of 1
        - Expected = totalTime: '24h (minute difference)m'
    3. Arrival Time input is PM while Departure Time input is AM
        AND Arrival/Departure Date inputs are equal
        - Expected = totalTime: '(12 + hour difference)h (minute difference)m'
*/
it('calculates total travel time', () => {
    const edgeCaseDepartureDate1 = '06/22/2022';
    const edgeCaseArrivalDate1 = '06/22/2022';
    const edgeCaseDepartureTime1 = '12:36 AM';
    const edgeCaseArrivalTime1 = '12:56 PM';
    const totalTime1 = calcTotalTime(edgeCaseDepartureTime1, edgeCaseArrivalTime1, edgeCaseDepartureDate1, edgeCaseArrivalDate1);
    expect(totalTime1).toEqual('12h 20m');

    const edgeCaseDepartureDate2 = '06/22/2022';
    const edgeCaseArrivalDate2 = '06/23/2022';
    const edgeCaseDepartureTime2 = '12:50 PM';
    const edgeCaseArrivalTime2 = '12:56 PM';
    const totalTime2 = calcTotalTime(edgeCaseDepartureTime2, edgeCaseArrivalTime2, edgeCaseDepartureDate2, edgeCaseArrivalDate2);
    expect(totalTime2).toEqual('24h 6m');

    const edgeCaseDepartureDate3 = '06/22/2022';
    const edgeCaseArrivalDate3 = '06/22/2022';
    const edgeCaseDepartureTime3 = '09:13 AM';
    const edgeCaseArrivalTime3 = '06:56 PM';
    const totalTime3 = calcTotalTime(edgeCaseDepartureTime3, edgeCaseArrivalTime3, edgeCaseDepartureDate3, edgeCaseArrivalDate3);
    expect(totalTime3).toEqual('9h 43m');
});

/* Edge Cases For Calculating Hour Difference
    ****FORMAT FROM Database = Date: 'MM/DD/YYYY'****
    1. Arrival/Departure Date DD and YYYY values are equal
        - Expected = hourDiff: (month difference * 730)
    2. Arrival/Departure Date DD and MM values are equal
        - Expected = hourDiff: (year difference * 8760)
    3. Arrival/Departure Date MM and YYYY values are equal
        - Expected = hourDiff: (day difference * 24)
    4. Arrival/Departure Date MM, DD, and YYYY values are not equal
        AND Arrival values are greater than Departure values
        - Expected = hourDiff: (month difference * 730) + (day difference * 24) + (year difference * 8760)
    5. Arrival/Departure Date YYYY are not equal
        AND Arrival Date MM is less than Departure Date MM
        AND Arrival/Departure Date DD are equal
        - Expected = hourDiff: (month difference * 730) + (day difference * 24) + (year difference * 8760)
    6. Arrival/Departure Date DD, MM, and YYYY values are not equal
        AND some Arrival values are less than Departure values
        - Expected = hourDiff: (month difference * 730) + (day difference * 24) + (year difference * 8760)
*/
it('calculates hour difference', () => {
    const edgeCaseDepartureDate1 = '06/22/2022';
    const edgeCaseArrivalDate1 = '09/22/2022';
    const hourDiff1 = calcHourDiff(edgeCaseDepartureDate1, edgeCaseArrivalDate1);
    expect(hourDiff1).toEqual(2190);

    const edgeCaseDepartureDate2 = '06/22/2022';
    const edgeCaseArrivalDate2 = '06/22/2024';
    const hourDiff2 = calcHourDiff(edgeCaseDepartureDate2, edgeCaseArrivalDate2);
    expect(hourDiff2).toEqual(17520);

    const edgeCaseDepartureDate3 = '06/22/2022';
    const edgeCaseArrivalDate3 = '06/30/2022';
    const hourDiff3 = calcHourDiff(edgeCaseDepartureDate3, edgeCaseArrivalDate3);
    expect(hourDiff3).toEqual(192);

    const edgeCaseDepartureDate4 = '06/22/2022';
    const edgeCaseArrivalDate4 = '07/25/2023';
    const hourDiff4 = calcHourDiff(edgeCaseDepartureDate4, edgeCaseArrivalDate4);
    expect(hourDiff4).toEqual(9562);

    const edgeCaseDepartureDate5 = '06/22/2022';
    const edgeCaseArrivalDate5 = '02/22/2024';
    const hourDiff5 = calcHourDiff(edgeCaseDepartureDate5, edgeCaseArrivalDate5);
    expect(hourDiff5).toEqual(14600);

    const edgeCaseDepartureDate6 = '06/22/2022';
    const edgeCaseArrivalDate6 = '04/10/2026';
    const hourDiff6 = calcHourDiff(edgeCaseDepartureDate6, edgeCaseArrivalDate6);
    expect(hourDiff6).toEqual(33292);
});

/* Edge Cases For Comparing Dates (Date1 >= Date2)
    ****FORMAT FROM Database = Date: 'MM/DD/YYYY'****
    1. Date1 and Date2 are the same date
        - Expected = true
    2. Date1 and Date2 have the same MM and DD but Date1 has a larger YYYY
        - Expected = true
    3. Date1 and Date2 have the same DD and YYYY but Date1 has a larger MM
        - Expected = true
    4. Date1 and Date2 have the same MM and YYYY but Date1 has a larger DD
        - Expected = true;
    5. Date1 has lesser MM and DD but a larger YYYY
        - Expected = true;
*/
it('compares dates', () => {
    const edgeCase1Date1 = '06/22/2022';
    const edgeCase1Date2 = '06/22/2022';
    expect(compareDates(edgeCase1Date1, edgeCase1Date2)).toEqual(true);

    const edgeCase2Date1 = '06/22/2025';
    const edgeCase2Date2 = '06/22/2022';
    expect(compareDates(edgeCase2Date1, edgeCase2Date2)).toEqual(true);

    const edgeCase3Date1 = '07/22/2022';
    const edgeCase3Date2 = '06/22/2022';
    expect(compareDates(edgeCase3Date1, edgeCase3Date2)).toEqual(true);

    const edgeCase4Date1 = '06/30/2022';
    const edgeCase4Date2 = '06/22/2022';
    expect(compareDates(edgeCase4Date1, edgeCase4Date2)).toEqual(true);

    const edgeCase5Date1 = '06/22/2023';
    const edgeCase5Date2 = '08/30/2022';
    expect(compareDates(edgeCase5Date1, edgeCase5Date2)).toEqual(true);
});

/* Edge Cases For Comparing Times (Time1 >= Time2)
    ****FORMAT FROM Database = Time: 'hh:mm (A|P)M'****
    1. Time1 and Time2 are the same time
        - Expected = true
    2. Time1 and Time2 have the same HH but Time1 has a larger MM
        - Expected = true
    3. Time1 and Time2 have the same time but Time1 is PM
        - Expected = true
    4. Time1 and Time2 are both 12 but Time1 is PM
        - Expected = true;
    5. Time1 has lesser HH and MM but Time1 is PM
        - Expected = true;
*/
it('compares times', () => {
    const edgeCase1Time1 = '09:00 AM';
    const edgeCase1Time2 = '09:00 AM';
    expect(compareTimes(edgeCase1Time1, edgeCase1Time2)).toEqual(true);

    const edgeCase2Time1 = '09:01 AM';
    const edgeCase2Time2 = '09:00 AM';
    expect(compareTimes(edgeCase2Time1, edgeCase2Time2)).toEqual(true);

    const edgeCase3Time1 = '09:00 PM';
    const edgeCase3Time2 = '09:00 AM';
    expect(compareTimes(edgeCase3Time1, edgeCase3Time2)).toEqual(true);

    const edgeCase4Time1 = '12:00 PM';
    const edgeCase4Time2 = '12:00 AM';
    expect(compareTimes(edgeCase4Time1, edgeCase4Time2)).toEqual(true);

    const edgeCase5Time1 = '01:00 PM';
    const edgeCase5Time2 = '10:15 AM';
    expect(compareTimes(edgeCase5Time1, edgeCase5Time2)).toEqual(true);
});

/* Edge Cases For Converting Dates
    ****FORMAT FROM JavaScript Input = Date: 'YYYY-MM-DD'****
    ****FORMAT FROM Database = Date: 'MM/DD/YYYY'****
    1. Input Date is '2025-06-15'
        - Expected = Date: '06/15/2025'
*/
it('converts dates', () => {
    const edgeCase1 = '2025-06-15';
    expect(convertDate(edgeCase1)).toEqual('06/15/2025');
});

/* Edge Cases For Converting Times (Date1 >= Date2)
    ****FORMAT FROM JavaScript Input = Time: 'HH:MM'****
    ****FORMAT FROM Database = Time: 'hh:mm (A|P)M'****
    1. Input Time is '00:mm'
        - Expected = Time: '12:mm AM'
    2. Input Time is '12:mm'
        - Expected = Time: '12:mm PM'
    3. Input Time is '15:mm'
        - Expected = Time: '03:mm PM'
    4. Input Time is '11:mm'
        - Expected = Time: '11:mm AM'
*/
it('converts times', () => {
    const edgeCase1 = '00:54';
    expect(convertTime(edgeCase1)).toEqual('12:54 AM');

    const edgeCase2 = '12:54';
    expect(convertTime(edgeCase2)).toEqual('12:54 PM');

    const edgeCase3 = '15:54';
    expect(convertTime(edgeCase3)).toEqual('03:54 PM');

    const edgeCase4 = '11:54';
    expect(convertTime(edgeCase4)).toEqual('11:54 AM');
});