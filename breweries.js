require('dotenv').config()
const fetch = require('node-fetch');

const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getPrompt() {
  rl.question('Zipcode: ', (zip) => {
    getBreweries(zip);
});
}

const getBreweries = (zip) => {

    fetch(baseURL + "locations/?key=" + process.env.KEY + "&postalCode=" + zip) 
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(obj => {
      const data = obj.data;
        if (obj.totalResults === undefined) {
          console.log("There are no breweries near this zipcode.");
          getPrompt();
        } else {
          console.log('Total Results: ') + obj.totalResults;
          console.log('');
          printResults(data);
        }
      })
      .catch(err => console.log(`Error,  ${err}`))
    }

    const printResults = (brewery) => {
      brewery.forEach(val => {
        console.log(('Name: ') + val.name);
        console.log(('Phone #: ') + val.phone);
        console.log(('Website: ') + val.website);
        console.log(('Address: ') + val.streetAddress);
        console.log(' ');
      });
      getPrompt();
    }
    
    getPrompt();
    