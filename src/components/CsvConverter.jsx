import React, { Component } from 'react';
import { Container, TextArea } from '../styles/Csv-Converter';
import { UtilityTitle, UploaderFooter, ErrorMessage, UploaderHeader, ButtonWrapper, InnerButtonWrapper, Button, TextInput, Form } from '../styles';
import { returnPlaceholder, validateString, formatData } from '../utils/csv-converter';

class CsvConverter extends Component {
    state = {
        title: "",
        dataString: "",
        errorMessage: "",
        placeholder: returnPlaceholder()
    };
    componentDidMount = () => {
		this.props.leaveHomePage();
		this.props.updateActiveIndex(2);
	};
    handleInput = (e, key) => {
        const state = {}
        state[key] = e.target.value;
		this.setState(state)
	}
    validateString = (str) => {
        const regex = /((?:([^\s]+), ([^\s]+)(?:( [^\s]+)*)?(?:( [^\s]+)*)? <([^\s]+)>; )?)+([^\s]+)(?:( [^\s]+)*)?, ([^\s]+)(?:( [^\s]+)*)? <([^\s]+)>/;
        return regex.test(str);
    }
    onSubmit = (event) => {
        event.preventDefault();
        let { title, errorMessage, dataString } = this.state;
        
        if (this.validateString(dataString) && title !== "") {
            const formattedData = formatData(dataString);
            const blob = new Blob([formattedData], { type: 'csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `${title}.csv`;
            link.href = url;
            link.click();
        } else if (title === "") {
            errorMessage = "Please add a title";
        } else if (dataString === "") {
            errorMessage = "Please add contacts";
        } else {
            errorMessage = "Data in unrecognised format"
        }
        this.setState({
            title,
            dataString,
            errorMessage
        })
      };
    render() {
        return (
            <div>
                <UtilityTitle>Distribution List Exporter</UtilityTitle>
                <Container>
                    <form onSubmit={this.onSubmit}>
                        <UploaderHeader>
                                <TextInput type="text" placeholder="Title" onKeyUp={(event) => this.handleInput(event, "title")}/>
                                <ButtonWrapper>
                                    <InnerButtonWrapper>
                                        <Button type="submit">
                                            <span>Export to CSV</span>
                                        </Button>
                                    </InnerButtonWrapper>
                                </ButtonWrapper>
                        </UploaderHeader>
                        <TextArea placeholder={this.state.placeholder} onKeyUp={(event) => this.handleInput(event, "dataString")}/>
                        <UploaderFooter>
                            {this.state.errorMessage !== '' && (
                                <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                            )}
                        </UploaderFooter>
                    </form>
                </Container>

            </div>
        );
    }
}

export default CsvConverter;