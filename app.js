var URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: URL,
    data: {
      part: 'snippet',
      key: 'AIzaSyArwWhgX782TEfxwBMUMTp9MmnHjHaeug4',
      q: searchTerm
    },
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: badData
  };
  $.ajax(settings);
}

function badData(err) {
  console.log(err);
}

function displayData(data) {
  var resultElement = '';
  console.log(data)
  var arr = data.items;
  //console.log(arr.id)
  for (i=0; i<arr.length; i++) {
   console.log(arr[i].id);
   var videoId = arr[i].id.videoId;
   var idObj = arr[i].id;
   var kind = arr[i].id.kind;
   var videoId = arr[i].id.videoId;
   //console.log(arr[i].snippet.title);
   if (kind === 'youtube#video') {
     resultElement += `<iframe width="350" height="210"
       src="https://www.youtube.com/embed/${videoId}"
       frameborder="0" allowfullscreen></iframe>`;
     resultElement += `<p>${arr[i].snippet.title}</p>`;
   }
  }

  $('.js-search-results').html(resultElement);
}

$(document).on('submit','form', (e)=>{
    e.preventDefault();
    const userInput = $('.js-query').val()
    getDataFromApi(userInput, displayData)
  })
