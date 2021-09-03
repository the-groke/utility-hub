import styled, { keyframes } from 'styled-components';
import asterisk from '../asterisk-purple.svg';
import {Link} from 'react-router-dom';

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const AppContainer = styled.div`
	display: flex;
	min-height: 100vh;
	max-height: 100vh;
	overflow: hidden;
	position: relative;
`;

const Logo = styled.img`
	display: block;
	width: 146px;
	height: 22px;
	position: relative;
`;

const SpinAnimation = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

const LogoWrapper = styled(Link)`
	width: 146px;
	height: 22px;
	display: block;
	position: relative;
	z-index: 2;
	&:after {
		content: '';
		z-index: 3;
		display: block;
		width: 13px;
		height: 13px;
		position: absolute;
		top: -0.5px;
		right: -0.5px;
		background: url(${asterisk}) no-repeat center;
		-webkit-animation: spin 2s infinite both linear;
		animation: ${SpinAnimation} 2s infinite both linear;
	}
`;

const LogoContainer = styled.div`
	padding: 50px;
`;

const ButtonText = styled.span`
	 cursor: pointer;
   display: inline-block;
   position: relative;
   transition: 0.4s;
	&:after {
		content: '\00bb';
   position: absolute;
   opacity: 0;
   top: 0;
   right: -20px;
   transition: 0.5s;
	}
`;

const Button = styled.button`
	cursor: pointer;
	background: linear-gradient(225deg, 
		${props => props.theme.lightShade},
    	${props => props.theme.base}
	);
	/* background: #f2f2f2; */
	display: block;
	border-radius: 30px;
	/* border: solid 0.25px #b0b0b0; */
	border: none;
	font-size: 11px;
	letter-spacing: 1.4px;
	text-transform: uppercase;
	padding: 12px 20px 12px 20px;
	max-height: 50px;
	color: ${props => props.theme.bewonderPurple};
	max-width: 340px;
	overflow: hidden;
	transition: all 0.2s;
	border-radius: 50px;
	&:focus { 
		outline: none; 
	}
	&:hover {
		box-shadow: inset -1px 1px 3px ${props => props.theme.darkShade}, inset 1px -1px 3px ${props => props.theme.base};
	}
`;

const ButtonWrapper = styled.div`
	margin: 10px;
	cursor: pointer;

	/* border: solid 2px #9164cc; */
	border: none;

	color: #9164cc;

	overflow: hidden;
	border-radius: 50px;
	box-shadow: -3px 3px 5px ${props => props.theme.darkShade}, 3px -3px 5px ${props => props.theme.lightShade};
`;

const InnerButtonWrapper = styled.div`
	padding: 5px;
	background-image: linear-gradient(
		to left bottom,
		${props => props.theme.lightShade2},
		/* #f1f1f1,
		#f6f6f6,
		#fafafa, */
		${props => props.theme.lightShade}
	);
`;

const Form = styled.form`
	display: flex;
	flex-direction: row;
`;

const FileInput = styled.input`
	opacity: 0;
	width: 0.1px;
	height: 0.1px;
	position: absolute;
`;

const FileInputWrapper = styled.div`
	cursor: pointer;
	display: block;
	border-radius: 30px;
	border: none;
	font-size: 11px;
	letter-spacing: 1.4px;
	text-transform: uppercase;
	padding: 12px 20px 12px 20px;
	max-height: 50px;
	color: #9164cc;
	max-width: 340px;
	overflow: hidden;
	transition: all 0.2s;
	border-radius: 50px;
	background: linear-gradient(225deg, 
		${props => props.theme.lightShade},
    	${props => props.theme.base}
	);
	&:hover {
		box-shadow: inset -1px 1px 3px ${props => props.theme.darkShade}, inset 1px -1px 3px ${props => props.theme.base};
	}
`;

const UploaderContainer = styled.div`
	border-radius: 20px;
	height: 430px;
	width: 600px;
	margin: 25px;
	display: flex;
	flex-direction: column;
	border-radius: 18px;
	border-radius: 18px;
	background: ${props => props.theme.base};
	box-shadow: -5px 5px 10px ${props => props.theme.darkShade}, 5px -5px 10px ${props => props.theme.lightShade};
`;

const UploaderHeader = styled.div`
	border-radius: 20px 20px 0 0;
	max-width: 100%;
	min-width: 100%;
	height: 100px;
	align-self: flex-start;
	display: flex;
	align-items: center;
	padding-left: 30px;
	padding-right: 30px;
	justify-content: space-between;
	box-sizing: border-box;
`;

const UploaderFooter = styled.div`
	border-radius: 0 0 18px 18px;
	width: 100%;
	height: 105px;
	background: ${props => props.theme.bewonderPurple};
	align-self: flex-start;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const FileInputLabel = styled.label`
	cursor: pointer;
`;

const FileName = styled.div`
	min-width: 200px;
	max-width: 200px;
	display: flex;
	align-items: center;
	justify-content: left;
	font-size: 9px;
	padding-left: 10px;
	-webkit-box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.27);
	-moz-box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.27);
	box-shadow: inset 0px 0px 7px 1px rgba(0, 0, 0, 0.27);
	overflow-x: hidden;
`;

const FileInputContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Title = styled.h1`
 	display: inline-block;
	opacity: ${props => props.activeIndex === "" ? 0 : 1};
	color: ${props => props.theme.bewonderPurple};
	font-size: 16px;
	letter-spacing: 3px;
	text-transform: uppercase;
	font-weight: 400;
	margin-top: 20px;
	transition: all 0.5s ease 0.5s;
`;

const ErrorMessage = styled.div`
	min-width: 500px;
	max-width: 500px;
	font-style: italic;
	color: #fff;
	font-weight: 700;
`;

const FileList = styled.div`
	width: 100%;
	height: 225px;
	overflow-y: scroll;
	/* position: relative; */
	&:before {
		top: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1));
		content: '';
		width: 100%;
		height: 8px;
		position: absolute;
		left: 0;
	}
	&:after {
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0));
		content: '';
		width: 100%;
		height: 8px;
		position: absolute;
		left: 0;
	}
`;

const FileListContainer = styled.div`
	/* width: 100%;
	height: 225px; */
	position: relative;
	/* &:before {
		content: '';
		width: 600px;
		height: 225px;
		top: 0;
		left: 0;
		position: absolute;
		z-index: 10;
		-moz-box-shadow: inset 0 8px 8px -8px #696868, inset 0 -8px 8px -8px #696868;
		-webkit-box-shadow: inset 0 8px 8px -8px #696868,
			inset 0 -8px 8px -8px #696868;
		box-shadow: inset 0 8px 8px -8px #696868, inset 0 -8px 8px -8px #696868;
	} */
`;

const FileCard = styled.div`
	position: relative;
	height: 100px;
	width: 596px;
	color: ${props => props.theme.text};
	display: flex;
	align-items: center;
	margin: 5px 2px 5px 2px;
	border-radius: 10px;
	box-shadow: -3px 3px 5px ${props => props.theme.darkShade}, 3px -3px 5px ${props => props.theme.lightShade};
`;

const DownloadButton = styled.a`
	position: absolute;
	top: 15px;
	right: 15px;
	cursor: pointer;
`

const Thumbnail = styled.div`
	background: #ddd;
	color: white;
	min-height: 70px;
	min-width: 70px;
	font-weight: 700;
	font-size: 25px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 30px 0 15px;
`;

const Shadow = styled.div`
	position: absolute;
`;

const SelectWrapper = styled.div`
	position: relative;
	display: inline-block;
	width: 230px;
`;

const SelectCover = styled.div`
	width: 100%;
	height: 100%;
	z-index: 1;
	background: none;
`;

const Select = styled.select`
	padding: 12px 20px 12px 20px;
	z-index: 1;
	font-family: 'Arial';
	display: inline-block;
	width: 230px;
	cursor: pointer;
	outline: 0;
	border: none;
	border-radius: 30px;
	background: ${props => props.theme.base};
	color: ${props => props.theme.bewonderPurple};
	appearance: none;
	&::-ms-expand {
		display: none;
	}
	&:hover {
		/* color: #ffffff; */
		box-shadow: inset -5px 5px 10px ${props => props.theme.darkShade}, inset 6px 0px 10px ${props => props.theme.lightShade};
	}
	&:disabled {
		opacity: 0.5;
		pointer-events: none;
	}
	box-shadow: inset -3px 3px 7px ${props => props.theme.darkShade}, inset 3px -3px 7px ${props => props.theme.lightShade};
`;
const SelectArrow = styled.div`
	z-index: 0;
	position: absolute;
	top: 0.9em;
	right: 1em;
	width: 0px;
	height: 0px;
	border: solid ${props => props.theme.bewonderPurple};
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
`;

const MainContent = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	min-height: 100%;
	overflow: hidden;
	background: ${props =>
		props.onHomepage ? props.theme.bewonderPurple : props.theme.base};
`;

const TextInput = styled.input`
	color: ${props => props.theme.text};
	width: 200px;
	background: ${props => props.theme.base};
	padding: 12px 20px 12px 20px;
	border: none;
	border-radius: 50px;
	box-shadow: inset -3px 3px 7px ${props => props.theme.darkShade}, inset 3px -3px 7px ${props => props.theme.lightShade};
	&:hover {
		/* color: #ffffff; */
		box-shadow: inset -5px 5px 10px ${props => props.theme.darkShade}, inset 6px 0px 10px ${props => props.theme.lightShade};
	}
	&:focus { 
		outline: none; 
		box-shadow: inset -5px 5px 10px ${props => props.theme.darkShade}, inset 6px 0px 10px ${props => props.theme.lightShade};
	}
`

const UtilityTitle = styled.h2`
	padding-left: 30px;
	/* text-transform: uppercase; */
	letter-spacing: 2px;
	color: #9164cc;
	font-weight: 400;
`;

const UploaderHeaderInner = styled.div`
	padding-left: 30px;
	padding-right: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
`;


export {
	Logo,
	LogoWrapper,
	LogoContainer,
	Button,
	Form,
	FileInput,
	FileInputLabel,
	FileInputWrapper,
	UploaderContainer,
	Select,
	SelectArrow,
	SelectWrapper,
	SelectCover,
	FileName,
	FileInputContainer,
	Title,
	ErrorMessage,
	AppContainer,
	UploaderHeader,
	UploaderFooter,
	FileList,
	FileCard,
	DownloadButton,
	Thumbnail,
	FileListContainer,
	ButtonWrapper,
	InnerButtonWrapper,
	MainContent,
	TextInput,
	UtilityTitle,
	UploaderHeaderInner
};
