require('dotenv').config()
const fetch = require('node-fetch');

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPrompt() {
  rl.question(`Zipcode: `, (zip) => {
  console.log( getZip(zip) );
  getPrompt();
});
}
getPrompt();
let userInput = [];


function getZip() {
const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

    fetch(baseURL + 'locations/?key=' + process.env.KEY + '&postalCode= ' + userInput) 
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(obj => {

        const totalResults = obj.totalResults;
        const data = obj.data[1]; //Make this more dynamic in case there are like 5 breweries around

        const breweryName = data.name;
        const breweryAddress = data.streetAddress;
        const breweryPhone = data.phone;
        const breweryWebsite = data.website;

        console.log(`There are ${totalResults} results in that zip code!`);
        console.log(breweryName);
        console.log(breweryAddress);
        console.log(breweryPhone);
        console.log(breweryWebsite);

    })

    .catch(err => console.log(`Error,  ${err}`))
  }