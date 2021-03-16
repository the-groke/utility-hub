import React from 'react';
import background from '../bw-background.svg';
import { Asterisk, Container, Title } from '../styles/HomePage';

const HomePage = () => {
    return (
        <div>
            <Container>
                <Asterisk src={background} alt='' /> 
                <Title>Digital Team<br/> Utility Hub</Title>
            </Container>   
        </div>
    );
};

export default HomePage;