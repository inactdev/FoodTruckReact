var rootUrl = 'http://localhost:3000'

module.exports = function(latitude, longitude){
  var searchUrl = `${rootUrl}/?search[latitude]=${latitude}&search[longitude]=${longitude}`;

  return fetch(searchUrl).then((response) => response.json());
}