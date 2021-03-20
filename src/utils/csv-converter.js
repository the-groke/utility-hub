const fs = require('fs');


const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

const returnPlaceholder = () => {
    const names = [['Donald Duck', 'Homer Simpson', 'Jerry Mouse', 'Bugs Bunny', 'Fred Flintstone', 'Spongebob Squarepants', 'Charlie Brown', 'Scoobie Doo', 'Stewie Griffin', 'Rick Sanchez'], ['Duke Ellington', 'Miles Davis', 'John Coltrane', 'Charles Mingus', 'Ornette Coleman', 'Nina Simone', 'Louis Armstrong', 'Herbie Hancock', 'George Benson', 'Ella Fitzgerald'], ['George Orwell', 'Aldous Huxley', 'Mary Shelley', 'J.G. Ballard', 'William Gibson', 'Jules Verne', 'H.G. Wells', ], ['Marie Curie', 'Rosalind Franklin', 'Lise Meitner', 'Ada Lovelace', 'Rachel Carson', 'Dorothy Hodgkin', 'Mar Anning', 'Chien-Shiung Wu']];

    const randomIndex = getRandomInt(names.length);
    let str = 'ENTER DISTRIBUTION LIST IN THE FOLLOWING FORMAT:\n\n'
    let delimiter = ';'
    for (let i = 0; i< names[randomIndex].length; i++) {
        if (i === names[randomIndex].length-1) delimiter = '';
        str += `${names[randomIndex][i].split(' ')[1]}, ${names[randomIndex][i].split(' ')[0]} <${names[randomIndex][i].split(' ')[0]}.${names[randomIndex][i].split(' ')[1]}@outlook.co.uk>${delimiter} `
    }
    return str;
}

const formatLine = str => {
    if (str === "") return str;
    const emailAddressWithBrackets = str.match(/<.*>/)[0];
    const unformattedName = str.replace(emailAddressWithBrackets, "");
    const dataArray = unformattedName.split(",");
    const unformattedFirstNames = dataArray[1]; 
    const surnames = dataArray[0];
    const firstNamesArr = unformattedFirstNames.split("");
    firstNamesArr.pop();
    firstNamesArr.shift();
    const firstNames = firstNamesArr.join("");
    const fullName = `${firstNames} ${surnames}`;
    const emailAddressArr = emailAddressWithBrackets.split("");
    emailAddressArr.pop();
    emailAddressArr.shift();
    const emailAddress = emailAddressArr.join("");
    return `${fullName},${emailAddress}`;
};

const convertSemicolonToNewLine = str => {
    const arr = str.split("");
    const filteredArr = arr.map((char)=>{
        if (char === ";") {
            return "\n"
        } else return char
    })
    return filteredArr.join("");
};

const formatData = str => {
    const contacts = str.split(";")
    const formattedLines = contacts.map((contact)=> {
        if (contact[0] === " "){
             const charArr = contact.split("");
             charArr.shift();
             return formatLine(charArr.join(""));
        } else {
            return formatLine(contact);
        }
    })
    const result = "Name, Email Address\n" + formattedLines.join("\n");
    return result;
};

module.exports = {
    formatLine,
    convertSemicolonToNewLine,
    formatData,
    returnPlaceholder
}