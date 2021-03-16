import styled from 'styled-components';

const Container = styled.div`
    border-radius: 20px;
	height: 430px;
	width: 500px;
	margin: 25px;
	display: flex;
	flex-direction: column;
	border-radius: 18px;
	border-radius: 18px;
    background: ${props => props.theme.base};
    box-shadow: -5px 5px 10px ${props => props.theme.darkShade}, 5px -5px 10px ${props => props.theme.lightShade};
    display: flex;
    align-items: center;
`;

const TextArea = styled.textarea`
	color: ${props => props.theme.text};
    resize: none;
    width: 400px;
    height: 200px;
    margin: 30px;
    position: relative;
	background: ${props => props.theme.base};
	padding: 12px 20px 12px 20px;
	border: none;
	border-radius: 20px;
	box-shadow: inset -3px 3px 7px ${props => props.theme.darkShade}, inset 3px -3px 7px ${props => props.theme.lightShade};
	&:hover {
		box-shadow: inset -5px 5px 10px ${props => props.theme.darkShade}, inset 6px 0px 10px ${props => props.theme.lightShade};
	}
	&:focus { 
		outline: none; 
		box-shadow: inset -5px 5px 10px ${props => props.theme.darkShade}, inset 6px 0px 10px ${props => props.theme.lightShade};
	}
`

export {
    Container,
    TextArea
};