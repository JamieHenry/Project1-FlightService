import airplane from '../assets/airplane.png';
import { Center } from './Error';
import { Button } from 'react-bootstrap';

/**
 * 
 * @returns - simple home page with app logo and button to go to Flights page
 */
export const Landing =() => {
    return (
        <>
            <Center><img src={airplane} alt='airplane' width='400px' /></Center>
            <Center><h1 style={{fontSize: '50px'}}>Flight Service App</h1></Center>
            <Center><Button variant='info' href='/flights'>See Flights</Button></Center>
        </>
    );
}