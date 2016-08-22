var rootUrl = 'http://localhost:3000'

module.exports = function(southwestPoint, northeastPoint){
  if ((typeof(southwestPoint) != "undefined") && (typeof(northeastPoint) != "undefined")) {
    var searchUrl = `${rootUrl}/?search[northeastPoint][]=${northeastPoint[0]}&search[northeastPoint][]=${northeastPoint[1]}&search[southwestPoint][]=${southwestPoint[0]}&search[southwestPoint][]=${southwestPoint[1]}`;
  console.log(searchUrl);
    return fetch(searchUrl).then((response) => response.json());
  }
  else {
    return [];
  }
}