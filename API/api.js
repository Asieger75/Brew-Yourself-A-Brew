//  --------------------------------URL
var queryURL = 'https://api.rescuegroups.org/http/v2.json'
// --------------------------------------------------------------

// ---------------------------------Functions

function runSearch() {
  // -------AJAX CALL
  $.ajax({
    url: queryURL,
    method: 'POST',
    data: JSON.stringify({
      apikey: 'KAyzleqX',
      objectType: 'animals',
      objectAction: 'publicSearch',
      search: {
        resultStart: '0',
        resultLimit: '10',
        resultSort: 'animalID',
        resultOrder: 'asc',
        filters: [
          {
            fieldName: 'animalStatus',
            operation: 'equals',
            criteria: 'Available',
          },
        ],
        filterProcessing: '1',
        fields: [
          'animalID',
          'animalName',
          'animalBreed',
          'animalPictures',
          'animalSex',
          'animalLocation',
          'animalSpecies',
        ],
      },
    }),
  })
    .then(function (response) {
      const data = response.data
      console.log('data', data)
      const animalsArray = []
      // convert the object data into a readable array
      for (const id in data) {
        animalsArray.push(data[id])
      }

      return animalsArray

      // loop thru and find the information to dynamically create results in #search-results
    })
    .then((animals) => {
      console.log('search results animals', animals)
      const searchResultsEl = $('#search-results')
      console.log('search results', searchResultsEl)
      // for(let i = 0; i < animals.length; i++) {

      // }
      animals.forEach((currentValue, index) => {
        const animalBreed = currentValue.animalBreed
        const animalId = currentValue.animalID
        const animalLocation = currentValue.animalLocation
        const animalName = currentValue.animalName
        const picturesArray = currentValue.animalPictures
        const animalSex = currentValue.animalSex
        const animalSpecies = currentValue.animalSpecies

        

        const cardHeader = $('<h2>')
        
        cardHeader.text(`Hi meet, ${animalName}.`)
        searchResultsEl[0].append(cardHeader[0]);

        var pOne = $("<p>").text( animalName + " is a " + animalSex + animalSpecies);
        cardHeader.append(pOne);

        var image = $('<img>').attr('src', picturesArray[1]);
        pOne.append(image);


        

        // cardHeader.text(`Hi meet, ${animalName}. is a ${animalSex} ${animalSpecies}.`)
        

       

      })

    
    })
}

// -------------------

// Main Process
// -------------------
$('#searchbtn').on('click', function (event) {
  console.log('search butx')
  // This line allows us to take advantage of the HTML "search" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault()
  runSearch()
})
