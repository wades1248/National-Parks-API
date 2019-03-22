const apiKey= "8Eynl9WiX8UrUOOlu6ENMYQxj8kxY0ESmDT5Svp8";
const searchURL ="https://developer.nps.gov/api/v1/parks";

function formatQuery(params){
  const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function getParks(query, maxResults = 10){
  const params ={
    stateCode: query, 
    limit: maxResults ||10,
    start: 0,
    //q: query,
    api_key: apiKey
    };
  const queryString = formatQuery(params)
  const url = searchURL + '?' + queryString;

  fetch(url)
    .then(response => {
      if (response.ok){
        return response.json();
      }
      throw new Error (response.statusText);
    })
    .then(responseJson => {displayResults(responseJson,query);})
    .catch(err => { $('.jsError').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson, query){
  $('.results').empty();
  $('.results').append(`<h2>Showing Results for ${query}</h2>`);
  for (let i=0; i < responseJson.data.length; i++){
    $('.results').append(`<a href="${responseJson.data[i].url}"><h2>${responseJson.data[i].fullName}</h2></a><p>${responseJson.data[i].description}</p>`)
  };
  console.log(responseJson);

}

function handleSumbmit(){
  $('form').submit(event => {
    event.preventDefault();
    const query = $('.query').val();
    const maxResults = $('.maxResults').val();
    getParks(query,maxResults);
  })
}
/* If I were to add the address, I would make a call to the google maps api for reverse geocoding with the latLong value converted into just an interger string passed as in the parameters */

$(handleSumbmit())
