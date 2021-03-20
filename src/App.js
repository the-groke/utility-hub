
import './App.css';
import WifiFormatter from './components/WifiFormatter';
import SvgFormatter from './components/SvgFormatter';
import HomePage from './components/HomePage';
import CsvConverter from './components/CsvConverter';
import Nav from './components/Nav';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
	AppContainer,
  MainContent,
  UtilityTitle
} from './styles';
import React, { Component } from 'react';


class App extends Component {
  state = {
    onHomepage: true,
    activeIndex : "",
    darkMode: false,
    lightTheme: {
      base: "#f2f2f2",
      lightShade: "#ffffff",
      lightShade2: "#ededed",
      darkShade: "#d0d0d0",
      bewonderPurple: "#9164cc;",
      text: "#696969",
    },
    darkTheme: {
      base: "#292929",
      lightShade: "#313131",
      lightShade2: "#252525",
      darkShade: "#181818",
      bewonderPurple: "#9164cc;",
      text: "#eeeeee",
    },
  };
  leaveHomePage = () => {
    this.setState({
      onHomepage: false
    })
  };
  enterHomePage = () => {
    this.setState({
      onHomepage: true
    })
  };
  updateActiveIndex = index => {
		this.setState({ activeIndex: index });
	};
  toggleDarkTheme = () => {
    this.setState(prevState => ({
      darkMode: !prevState.darkMode
    }));
  };
  render() {
    return (
      <div>
          <ThemeProvider theme={this.state.darkMode ? this.state.darkTheme : this.state.lightTheme}>
            <Router basename={"/digital-team-utility-hub"}>
            <AppContainer>
              <Nav leaveHomePage={this.leaveHomePage} enterHomePage={this.enterHomePage} updateActiveIndex={this.updateActiveIndex} activeIndex={this.state.activeIndex} toggleDarkTheme={this.toggleDarkTheme} darkMode={this.state.darkMode}/>
              <MainContent onHomepage={this.state.onHomepage}>
                <Route path="/wifi-data-formatter" render={props => <WifiFormatter {...props} leaveHomePage={this.leaveHomePage} updateActiveIndex={this.updateActiveIndex}/>} />
                <Route path="/svg-map-formatter" render={props => <SvgFormatter {...props} leaveHomePage={this.leaveHomePage} updateActiveIndex={this.updateActiveIndex} activeIndex={this.state.activeIndex}/>}/>
                <Route path="/distribution-list-exporter" render={props => <CsvConverter {...props} leaveHomePage={this.leaveHomePage} updateActiveIndex={this.updateActiveIndex} activeIndex={this.state.activeIndex}/>}/>
                <Route exact path="/" render={(props) => <HomePage {...props}enterHomePage/>} />
              </MainContent>
              </AppContainer>
            </Router>
          </ThemeProvider>
      </div>
    );
  }
}

export default App;
