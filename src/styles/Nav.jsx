import styled, { keyframes } from 'styled-components';
import { Link as RouterLink } from "react-router-dom";

const StyledNav = styled.nav`
    box-shadow: -1px 0px 43px -16px rgba(0, 0, 0, 0.88);
    height: 100vh;
    min-width: 300px;
    padding: 30px;
    background: ${props => props.theme.base};
    position: relative;
    z-index: 2;
`;

const NavItem = styled.li`
    padding: 20px 0 20px;
`;

const NavItemList = styled.ul`
    transition: all 0.5s;
    list-style-type: none;
    padding-left: 0;
    margin-top: ${props => props.activeIndex === "" ? "0px" : "40px"};
`;

const Link = styled(RouterLink)`
    text-decoration: none;
    &:hover {
       color: ${props => props.theme.bewonderPurple}
    }
    color: ${props =>
		props.activeIndex == props.index ? props.theme.bewonderPurple : props.theme.text};
    font-weight: ${props =>
		props.activeIndex == props.index ? '700' : '400'};
`;

const ToggleSwitchLabel = styled.label`
    position: relative;
    display: inline-block;
    width: 50px;
    height: 25px;
`;

const ToggleSwitch = styled.input`
    opacity: 0;
    width: 0;
    height: 0;
`;

const ToggleSpan = styled.span`
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 50px;
    border-radius: 34px;
    background-color: ${props => props.theme.base};
    &:before {
    position: absolute;
    content: '';
    height: 25px;
    width: 25px;
    right: ${props => props.darkMode ? "0%" : "50%"};
    bottom: 0px;
    transition: right 0.4s ease;
    border-radius: 34px;
    background-color: ${props => props.theme.base};
    box-shadow: 0px 0px 10px ${props => props.theme.darkShade}
    }
    box-shadow: inset -3px 3px 7px ${props => props.theme.darkShade}, inset 3px -3px 7px ${props => props.theme.lightShade};
	&:hover {
		box-shadow: inset -5px 5px 10px ${props => props.theme.darkShade}, inset 6px 0px 10px ${props => props.theme.lightShade};
	}
`;

const SwitchContainer = styled.div`
    display: flex;
    position: absolute;
    bottom: 100px;
    color: ${props => props.theme.text};
    width: 160px;
    justify-content: space-between;
    align-items: center;
`

export {
    StyledNav,
    NavItem,
    NavItemList,
    Link,
    ToggleSwitchLabel,
    ToggleSwitch,
    ToggleSpan,
    SwitchContainer
};