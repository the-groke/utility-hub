import React, { Component } from 'react';
import {
	validateInputFormat,
	sortDataIntoFiles,
	sortASIDataIntoFiles,
	getExpiryDateFromFileName,
	returnFileName,
} from '../utils';
import {
	createSingleInputFile,
	createLimLGFile,
	createASIFile,
} from '../write-files';
import {
	Button,
	Form,
	FileInput,
	FileInputWrapper,
	FileInputLabel,
	UploaderContainer,
	Select,
	SelectArrow,
	SelectWrapper,
	FileInputContainer,
	ErrorMessage,
	UploaderHeader,
	UploaderFooter,
	FileList,
	FileCard,
	DownloadButton,
	Thumbnail,
	FileListContainer,
	ButtonWrapper,
	InnerButtonWrapper,
	UtilityTitle,
	UploaderHeaderInner,
} from '../styles';
const csv = require('csvtojson');

class Uploader extends Component {
	state = {
		inputFileNames: [],
		outputFileNames: [],
		output: '0',
		files: [],
		filesData: [],
		errorMessage: '',
		uploadedinputFileNames: [],
		selectIsHovered: false,
		sortedData: [],
	};
	onChange = (event) => {
		const inputFileNames = [];
		const outputFileNames = [];
		const filesData = [];
		for (let i = 0; i < event.target.files.length; i++) {
			inputFileNames.push(event.target.files[i].name);
			const reader = new FileReader();
			reader.readAsText(event.target.files[i]);
			reader.onload = async (e) => {
				const fileData = await this.convertCSVToJson(reader.result);
				filesData.push(fileData);
			};
		}
		this.setState({
			files: event.target.files,
			inputFileNames,
			errorMessage: '',
			filesData,
		});
	};
	toggleSelectHover = (e) => {
		this.setState({ selectIsHovered: !this.state.selectIsHovered });
	};
	convertCSVToJson = async (str) => {
		const jsonArr = await csv().fromString(str);
		return jsonArr;
	};
	isInputValid = async () => {
		let count = 0;
		if (this.state.filesData.length === 0) {
			this.setState({
				errorMessage: 'No file to convert',
			});
			return false;
		}
		if (this.state.output === '0') {
			this.setState({
				errorMessage: 'No Wi-Fi provider selected!',
			});
			return false;
		}
		for (let i = 0; i < this.state.filesData.length; i++) {
			count++;
			if (
				validateInputFormat(this.state.filesData[i][0]).dataType ===
				'unrecognised'
			) {
				this.setState({
					errorMessage: 'INVALID FILE: Data in unrecognised format',
				});
				return false;
			} else if (
				validateInputFormat(this.state.filesData[i][0]).dataType !==
				this.state.output
			) {
				this.setState({
					errorMessage: 'INVALID FILE: Wrong provider selected',
				});
				return false;
			} else if (count === this.state.filesData.length) {
				this.setState({
					errorMessage: '',
				});
				return true;
			}
		}
	};
	onSubmit = async (event) => {
		event.preventDefault();
		const { output, inputFileNames, filesData } = this.state;
		const validatedInput = await this.isInputValid();

		if (validatedInput === true && output === '1') {
			// for (let i = 0; i < inputFileNames.length; i++) {
			// 	createSingleInputFile(inputFileNames[i], filesData[i]);
			// }
			this.setState({
				sortedData: filesData,
				outputFileNames: this.state.inputFileNames,
			});
		} else if (validatedInput === true && output === '2') {
			for (let i = 0; i < filesData.length; i++) {
				for (let j = 0; j < filesData[i].length; j++) {
					filesData[i][j]['expiry date'] = getExpiryDateFromFileName(
						inputFileNames[i],
						'bt-mult'
					);
				}
			}
			const sortedData = sortDataIntoFiles(filesData);
			const outputFileNames = [];
			for (let i = 0; i < sortedData.length; i++) {
				outputFileNames.push(
					returnFileName(sortedData[i][0]['Registration Location Name'])
				);
				// 	createLimLGFile(sortedData[i]);
			}
			this.setState({ sortedData, outputFileNames });
		} else if (validatedInput === true && output === '3') {
			const sortedData = sortASIDataIntoFiles(filesData);
			const outputFileNames = [];
			for (let i = 0; i < sortedData.length; i++) {
				outputFileNames.push(returnFileName(sortedData[i][0]['Location Name']));
				// 	createASIFiles(sortedData[i]);
			}
			this.setState({ sortedData, outputFileNames });
		} else if (validatedInput === true && output === '4') {
			for (let i = 0; i < filesData.length; i++) {
				for (let j = 0; j < filesData[i].length; j++) {
					filesData[i][j]['expiry date'] = getExpiryDateFromFileName(
						inputFileNames[i],
						'inkspot'
					);
				}
				// createSingleInputFile(inputFileNames[i], filesData[i]);
				this.setState({
					sortedData: filesData,
					outputFileNames: inputFileNames,
				});
			}
		}
	};
	onSelect = (event) => {
		this.setState({ output: event.target.value });
	};
	componentDidMount = () => {
		this.props.leaveHomePage();
		this.props.updateActiveIndex(0);
	};
	handleDownload = (index) => {
		const { outputFileNames, sortedData, output } = this.state;
		switch (output) {
			case '1':
			case '4':
				createSingleInputFile(outputFileNames[index], sortedData[index]);
				break;
			case '2':
				createLimLGFile(sortedData[index]);
				break;
			case '3':
				createASIFile(sortedData[index]);
				break;
			default:
				createSingleInputFile(outputFileNames[index], sortedData[index]);
		}
	};
	render() {
		return (
			<div>
				<UtilityTitle>Wifi Data Formatter</UtilityTitle>
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
											accept=".csv"
											multiple
											onChange={this.onChange}
										/>
										<FileInputLabel htmlFor="file">
											Select file(s)
										</FileInputLabel>
									</FileInputWrapper>
								</InnerButtonWrapper>
							</ButtonWrapper>

							<SelectWrapper>
								<Select
									value={this.state.output}
									name=""
									id="wifi-provider"
									onChange={this.onSelect}
									onMouseEnter={this.toggleSelectHover}
									onMouseLeave={this.toggleSelectHover}
									hover={this.state.selectIsHovered}
								>
									<option value="0">Select Wi-Fi provider</option>
									<option value="1">Freerunner</option>
									<option value="2">BT(LIM)/BT(L&amp;G)</option>
									<option value="3">BT(ASI)</option>
									<option value="4">Inkspot</option>
								</Select>
								<SelectArrow hover={this.state.selectIsHovered}></SelectArrow>
							</SelectWrapper>
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
							{this.state.outputFileNames.map((fileName, index) => {
								return (
									<FileCard key={index}>
										<DownloadButton
											alt="Download File"
											title="Download File"
											onClick={() => this.handleDownload(index)}
										>
											<i className="fa fa-download"></i>
										</DownloadButton>
										<Thumbnail>.CSV</Thumbnail>
										{fileName}
									</FileCard>
								);
							})}
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
