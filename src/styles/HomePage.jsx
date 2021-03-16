import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Asterisk = styled.img`
    width: 800px;
    position: absolute;
    top: -0px;
    right: 0;
    /* transform: translate(-50%, -50%); */
`

const Container = styled.div`
    background: #9164cc;
    height: 100%;
   
`

const Title = styled.div`
    text-transform: uppercase;
    font-weight: 700;
    font-size: 140px;
    color: #fff;
    position: relative;
    animation: 3s ease 0s normal forwards 1 ${fadeIn};
    margin-left: 30px;
   
`;

export {
    Asterisk,
    Container,
    Title
}