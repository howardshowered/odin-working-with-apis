        const newImageButton = document.querySelector(".new-image");
        const img = document.querySelector('img');
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-btn');
        const resultsContainer = document.querySelector(".results");
        //commented out fetch to not use api every start up.
        // fetch('https://api.giphy.com/v1/gifs/translate?api_key=MCgKLjQHe1hVHpYb3VgRxJxIpKETpK8U&s=cats')
        // .then(function(response) {
        //     return response.json();
        // })
        // .then(function(response) {
        //     img.src = response.data.images.original.url;
        // });


        newImageButton.addEventListener('click', () => {
            fetch('https://api.giphy.com/v1/gifs/translate?api_key=MCgKLjQHe1hVHpYb3VgRxJxIpKETpK8U&s=cats')
            .then(function (response) {
                return response.json();
            })
            .then(function (response) {
                img.src = response.data.images.original.url;
            });
        });

        //@TODO add search feature
        function displayGifs(gifDataArray) {
            resultsContainer.innerHTML = '';
            if(gifDataArray.length === 0){
                resultsContainer.innerHTML = '<p>No GIFS found for that search term</p>';
                return;
            }
            let output = '<div class="container">';
            gifDataArray.forEach( (imgData) => {
                const imageUrl = imgData.images.original.url;
                output += `<img src=${imageUrl} alt=${imgData.title}/>`;
            });
            output += '</div>';
            resultsContainer.innerHTML = output;
        }

        searchButton.addEventListener('click', (e)=> {
            e.preventDefault();
            const newSearch = searchInput.value;
            console.log("newSearch: " + newSearch);
            const limit = 5; // Number of results to return
            const apikey = 'MCgKLjQHe1hVHpYb3VgRxJxIpKETpK8U'
            const giphyAPI = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&q=${newSearch}&limit=${limit}`;
            
            if(newSearch) {
                fetch(giphyAPI)
                .then(response => {
                    if(!response.ok) {
                        throw new Error('Network response was not okay');
                    }
                    return response.json();
                })
                .then(json => {
                    displayGifs(json.data);
                })
                .catch(err => console.error('Error fetching GIPHY data:', err));
            } else{
                alert("Empty search!");
            }
        });
