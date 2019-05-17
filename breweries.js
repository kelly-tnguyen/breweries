require('dotenv').config()
const fetch = require('node-fetch');


const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

    fetch(baseURL + 'locations/?key=' + process.env.KEY + '&postalCode=78758') //+ userInput) (Change this to where the user to input in a zipcode and breweries could pop up)
    .then(res => {
      if(!res.ok) {
        throw Error(res.statusText)
      } return res.json()
    })
    .then(obj => {
        const totalResults = obj.totalResults;
        const data = obj.data[0]; //Make this more dynamic in case there are like 5 breweries around

        const breweryName = data.name;
        const breweryAddress = data.streetAddress;
        const breweryPhone = data.phone;

        console.log(`There are ${totalResults} results in that zip code!`);
        console.log(breweryName);
        console.log(breweryAddress);
        console.log(breweryPhone);

    })

    .catch(err => console.log(`Error,  ${err}`))
  