import { NavBar, NavItem, NavSection, NavLink } from '../components/Nav';
import airplane from '../assets/airplane.png';

export const AppNavBar = () => {
    return (
        <NavBar>
            <NavSection jc='flex-start'>
                <NavItem>
                    <NavLink to='/'><img src={airplane} alt='airplane' width='50px'/></NavLink>
                </NavItem>
            </NavSection>
            <NavSection jc='flex-end'>
                <NavItem>
                    <NavLink to='/'>Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to='/flights'>Flights</NavLink>
                </NavItem>
            </NavSection>
        </NavBar>
    );
}