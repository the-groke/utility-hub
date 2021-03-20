import React, { Component } from 'react';
import {
	Logo,
	LogoContainer,
	LogoWrapper,
    Title
} from '../styles';
import darkLogo from '../bw-logo-dark.svg';
import lightLogo from '../bw-logo-light.svg';
import { StyledNav, NavItem, NavItemList, Link, ToggleSwitch, ToggleSwitchLabel, ToggleSpan, SwitchContainer } from '../styles/Nav';

class Nav extends Component {   
    render() {
        return (
            <div>
                <StyledNav>
                        <LogoWrapper to={'/'} onClick={(props) => {this.props.updateActiveIndex('');
                             this.props.enterHomePage()}} index={''}>
                            <Logo src={this.props.darkMode ? lightLogo : darkLogo} alt={'Bewonder'} />
                        </LogoWrapper>
			       
                    <Title activeIndex={this.props.activeIndex}>Digital Team Utility Hub</Title>
                    <NavItemList activeIndex={this.props.activeIndex}>
                        <NavItem>
                            <Link to={'/wifi-data-formatter'}activeIndex={this.props.activeIndex} 
                             index={'0'}>Wifi Data Formatter
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/svg-map-formatter'} activeIndex={this.props.activeIndex}  index={'1'}>SVG Map Formatter</Link>
                        </NavItem>
                        <NavItem>
                            <Link to={'/distribution-list-exporter'} activeIndex={this.props.activeIndex} index={'2'} >Distribution List Exporter
                            </Link>
                        </NavItem>
                    </NavItemList>
                    <SwitchContainer>
                        Dark mode:
                        <ToggleSwitchLabel HTMLfor="toggle-input">
                            <ToggleSwitch type="checkbox" id="toggle-input" onChange={(event) => this.props.toggleDarkTheme()}
                            checked={this.props.darkmode}/>
                            <ToggleSpan darkMode={this.props.darkMode}></ToggleSpan>
                        </ToggleSwitchLabel>
                    </SwitchContainer>
                </StyledNav>       
            </div>
        );
    }
}

export default Nav;