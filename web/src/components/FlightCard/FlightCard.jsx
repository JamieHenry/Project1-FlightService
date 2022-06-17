import './FlightCard.css';
import 'font-awesome/css/font-awesome.min.css';

export const FlightCard = flight => {
    return (
        <div className='outer-grid-container'>
            <div className='inner-grid-container'>
                <div className='item left flight-no'>15</div>
                <div className='item blank'></div>
                <div className='item right total-time'>11h 41m</div>
                <div className='item left date'>06/16/2022</div>
                <div className='item blank'></div>
                <div className='item right date'>06/16/2022</div>
                <div className='item left time'>9:00 am</div>
                <div className='item blank'><img src={require('./arrow.png')} height='30px' alt='arrow' /></div>
                <div className='item right time'>2:41 pm</div>
                <div className='item left airport'>MCO</div>
                <div className='item blank passengers'>Current Passengers: 10, Passenger limit: 100</div>
                <div className='item right airport'>HNL</div>
            </div>
            <div className='edit-del-box'>
                <button className='button green'><i className='fa fa-edit'/></button>
                <button className='button red'><i className='fa fa-trash'/></button>
            </div>
        </div>
    );
}