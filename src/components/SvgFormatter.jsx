import React, { Component } from 'react';
import {
	Button,
	Form,
	FileInput,
	FileInputWrapper,
	FileInputLabel,
	UploaderContainer,
	ButtonWrapper,
	InnerButtonWrapper,
	FileInputContainer,
	ErrorMessage,
	UploaderHeader,
	UploaderFooter,
	FileList,
	FileCard,
	Thumbnail,
	FileListContainer,
	TextInput,
	UtilityTitle
} from '../styles';

const { parse, stringify } = require('svgson');

class Uploader extends Component {
	state = {
		SVGString: "",
		fileName: "",
		parsedSVG: {},
		SVGID: "",
		errorMessage: "",
	};
	onChange = (event) => {
		if (!event.target.files[0]) {
			this.setState({
				SVGString: "",
				parsedSVG: {},
				fileName: ""
			})
		} else {
			const fileName = event.target.files[0].name;
			const reader = new FileReader();
			reader.readAsText(event.target.files[0]);
			reader.onload = async (e) => {
				const SVGString = reader.result;
				const parsedSVG = await parse(SVGString);
				this.setState({
					SVGString,
					parsedSVG,
					fileName
				})
			}
		}
		
	};
	onSubmit = async (event) => {
		event.preventDefault();
		const { SVGID, SVGString, fileName} = this.state;
		const classRegex = /\.(st)\d+/g;
		const landmarkIdentifierRegex = /[a-zA-Z]+-\d+_\d+_/g;
		const extraIndexRegex = /_\d+_/;
		let landmarkIDs = [];
		const fixedIDs = [];

		if (SVGID === "") {
			this.setState({
				errorMessage: "Please select an ID"
			})
		} else if (fileName === "") {
			this.setState({
				errorMessage: "Please select a file"
			})
		} else {

			// // identify erroneous landmark IDs
			// if (SVGString.match(landmarkIdentifierRegex)) {
			// 	landmarkIDs = SVGString.match(landmarkIdentifierRegex);
			// }
			// // fix erroneous landmark IDs
			// for (let i = 0; i < landmarkIDs.length; i++) {
			// 	fixedIDs.push(landmarkIDs[i].replace(extraIndexRegex, ''));
			// }
			// add main ID before classes in styles
			const stringWithSVGIDs = SVGString.replace(classRegex, `#${SVGID} $&`);

			// find and replace erroneous IDs with fixed IDs
	
			// let stringWithIDsRemoved = stringWithSVGIDs;
	
			// if (fixedIDs.length !== 0) {
			// 	for (let i = 0; i < landmarkIDs.length; i++) {
			// 		stringWithIDsRemoved = stringWithIDsRemoved.replace(landmarkIDs[i], fixedIDs[i]);
			// 	}
			// }
			// const svgJson = await parse(stringWithIDsRemoved);
			// svgJson.attributes.id = SVGID;

			// rename layers

			// svgJson.children[1].attributes.id = "base";
			// svgJson.children[2].attributes.id = "landmarks";
			// svgJson.children[3].attributes.id = "nopointer";

			// prep and write file
			// const stringifiedJson = stringify(svgJson);
			const blob = new Blob([stringWithSVGIDs], { type: 'svg' });
			const url = URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.download = `${fileName}`;
			link.href = url;
			link.click();
		}
	};
	handleInput = (e) => {
		this.setState({
			SVGID: e.target.value
		})
	}
	componentDidMount = () => {
		this.props.leaveHomePage();
		this.props.updateActiveIndex(1);
		
	};
	render() {
		return (
			<div>
				<UtilityTitle>SVG Map Formatter</UtilityTitle>
				<UploaderContainer>
				<Form onSubmit={this.onSubmit} action="">
					<UploaderHeader>
							<ButtonWrapper>
								<InnerButtonWrapper>
									<FileInputWrapper>
										<FileInput
											type="file"
											id="file"
											name="file"
											accept=".svg"
											onChange={this.onChange}
										/>
										<FileInputLabel htmlFor="file">Select file</FileInputLabel>
									</FileInputWrapper>
								</InnerButtonWrapper>
							</ButtonWrapper>
						<TextInput type="text" id="svg-id" name="svg-id" placeholder="SVG ID" onKeyUp={this.handleInput}/>
						<ButtonWrapper>
							<InnerButtonWrapper>
								<Button type="submit">
									<span>Format</span>
								</Button>
							</InnerButtonWrapper>
						</ButtonWrapper>
						
					</UploaderHeader>
				</Form>
				<FileListContainer>
					<FileList>
						{this.state.fileName !== "" &&
								<FileCard>
									<Thumbnail>.SVG</Thumbnail>
									{this.state.fileName}
								</FileCard>
						}
					</FileList>
				</FileListContainer>

				<UploaderFooter>
					{this.state.errorMessage !== '' && (
						<ErrorMessage>{this.state.errorMessage}</ErrorMessage>
					)}
				</UploaderFooter>
			</UploaderContainer>
			</div>
		);
	}
}

export default Uploader;
