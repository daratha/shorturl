function makeItShort(){

  var urlValue = document.getElementById('url-field-short').value;
  axios.post('http://localhost:8000/short', {
    url: urlValue
  })
  .then(function (response) {
    console.log(response);
    console.log(response.data.shortUrl);
    document.getElementById('link-short').innerHTML = "<a href=\""+response.data.shortUrl+"\">"+response.data.shortUrl+"</a>";
    document.getElementById('link-long').innerHTML = "";
    document.getElementById('url-field-long').value = response.data.shortUrl;

    
  })
  .catch(function (error) {
    console.log(error);
  });
}



function makeItLong(){

  var urlValue = document.getElementById('url-field-long').value;
  axios.post('http://localhost:8000/long', {
    url: urlValue
  })
  .then(function (response) {
    console.log(response);
    console.log(response.data.shortUrl);
    document.getElementById('link-long').innerHTML = "<a href=\""+response.data.longUrl+"\">"+response.data.longUrl+"</a>";
  })
  .catch(function (error) {
    console.log(error);
  });
}
