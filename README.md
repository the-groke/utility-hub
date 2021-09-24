# Digital Team Utility Hub

This hub combines a couple of utilities built for the purpose of aiding day to day tasks at Bewonder\*

A hosted version can be found [here](https://bewonder.digital/digital-team-utility-hub/)

## Available Scripts for Development

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Utilities

1. Wifi Data Formatter
2. Distribution List Exporter

## Wifi Data Formatter

Original repo found here: [GitHub - BenRut/wifi-data-formatter](https://github.com/BenRut/wifi-data-formatter)

### What it does

Bewonder\* collects sets of data in CSV form obtained via WiFi sign-ups across various centres managed by the company. This data is provided by a few different WiFi providers in different formats. They are variously provided as weekly CSVs, monthly CSVs, CSVs containing one centre, CSVs containing a number of centres. Additionally, the data is often formatted in ways which make it less useful once uploaded into Force24, the platform we use for sending marketing communications across schemes.

This tool takes what used to be a laborious manual task of sorting the data into individual files for each centre which can then be uploaded to Force24 to add to its marketing lists.

### Testing the tool

Included in the repository is a set of test files in `./test-data/` , which can be run through the tool to see it in action. Alternatively, real data can be used.

Multiple files from the same provider can be uploaded at once and the tool will sort and format the data and produce a list of files which can be downloaded.

### Updating the tool

Occasionally, Wifi providers (BT, Freerunner etc) may change the format in which we receive their data. For example, they may add, delete or change the names of columns within the CSV or XLSX files they provide. In this instance the tool will need to be updated as it will not recognise the data and will throw up an error message.

To update the tool, go to `./src/utils/index.js` and ensure the columns in the array for the relevant centre in `exports.validateInputFormat`
match those in the file being uploaded e.g.

```js
this.arrayCompare(Object.keys(object), [
            ‘Email’,
            ‘Estate Name’,
            ‘Federated Group Name’,
            ‘First Name’,
            ‘Last Name’,
            ‘Location Name’,
            ‘Marketing Consent’,
            ‘Postcode’,
            ‘Week Ending’,
        ])
```

## Distribution List Exporter

Original repo found here: [GitHub - BenRut/csv-converter](https://github.com/BenRut/csv-converter)

### What it does

Internal communications within JLL for Consulting and Managed Services are built, sent and managed through Poppulo. The distribution lists within Poppulo are independent of the distribution lists accessible via Outlook. Occasionally Client Services will provide a list of contacts in a string copied from an expanded distribution list from Outlook in the format `Curie, Marie <Marie.Curie@outlook.co.uk>; Franklin, Rosalind <Rosalind.Franklin@outlook.co.uk>; Meitner, Lise <Lise.Meitner@outlook.co.uk>; Lovelace, Ada <Ada.Lovelace@outlook.co.uk>; Carson, Rachel <Rachel.Carson@outlook.co.uk>; Hodgkin, Dorothy <Dorothy.Hodgkin@outlook.co.uk>; Anning, Mar <Mar.Anning@outlook.co.uk>; Wu, Chien-Shiung <Chien-Shiung.Wu@outlook.co.uk> `.

This string can be entered into the tool which can then loop through the string and organise the data into a CSV before forcing the download to the browser. This CSV can then be uploaded to Poppulo in order to create or update a distribution list.

### Extra features

The tool displays a placeholder in the textarea giving an example of the format the string should be entered in. This will display one set of random names set around a theme. New sets can be added by adding a new array within the `names` array in the `returnPlaceholder` function in `./src/utils/csv-converter.js`
