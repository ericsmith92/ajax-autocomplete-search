//alert('connected');

//grab form
const formHandle = document.forms[0];
//grab input for search
const searchInput = formHandle.search;
//grab search results div
const searchResults = document.querySelector('#search-results');

//functionality
function search(e){
    //prevent default form submission
    e.preventDefault();
    //clear searchResults
    searchResults.innerHTML = '';
    //if shiftkey triggers event, return
    if(e.key === "Shift"){
        return;
    }
    //store value of input as query
    const query = searchInput.value;
    //AJAX request using fetch() if query isn't empty string or space
    if(query !== '' && query !== ' '){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (response.ok) {
                return Promise.resolve(response);
            }
            else {
                return Promise.reject(new Error('Failed to load')); 
            }
        })
        .then(response => response.json()) // parse response as JSON
        .then(data => {
            //success, find name that matches query
            //array to hold matches
            const matches = [];
            data.forEach(function(d){
            //check if name includes() query
            if(d.name.includes(query)){
                 //push into array
                matches.push(d.name);
            }
        })
            //output to search results
            matches.forEach(function(match){
            searchResults.innerHTML += `<div class="result">${match}</div>`;
            })
        })
        .catch(function(error) {
            console.log(`Error: ${error.message}`);
        });
    }
}

//listeners
formHandle.addEventListener('submit', search);
searchInput.addEventListener('keyup', search);