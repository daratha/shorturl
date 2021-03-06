var baseUrl = 'http://ec2-52-14-29-158.us-east-2.compute.amazonaws.com';

function makeItShort(){

  var urlValue = document.getElementById('url-field-short').value;
  axios.post(baseUrl+'/short', {
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
  axios.post(baseUrl+'/long', {
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
