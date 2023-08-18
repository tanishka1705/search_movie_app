document.getElementById("searchMovie").addEventListener('keyup' , debounce(getMovie,1000))

document.getElementById("drop-down").addEventListener('change', sortMovie)

function getMovie()
{
   
    const title = document.getElementById("title").value
    
    resMovie(title)

}

function debounce(func, delay){
    let timer;
    return () =>{
        clearTimeout(timer)
        timer = setTimeout(()=>{
            func()
        },delay)
    }
}


let movies =[]
async function resMovie(title){
    const response = await fetch(`http://www.omdbapi.com/?apikey=e6ae3c6a&s=${title}`)
    const data = await response.json()
    // console.log(data)
   
    if (data.Search && data.Search.length > 0) {
        // Clear previous results
        document.getElementById("box").innerHTML = "";

        movies = data.Search
        
        //display new results
        data.Search.map(movie => displayData(movie));
       
        
        //clear previous error message
        document.getElementById("errorBox").textContent = "";
    } else {
       
        document.getElementById("box").innerHTML = ""; // Clear existing search results
        document.getElementById("errorBox").textContent = "Couldn't find the movie you searched for :(";
    }    

}



function displayData(data)
{
    const movie = `
    <div class="container">
    <div class="card">
      <div class="image">
      <img src="${data.Poster}" alt="">
      </div>
      <div class="text">
        <h2>${data.Title} (${data.Year})</h2><BR>
        
        <p><h4>Type : ${data.Type}</h4></p><br>
        <hr><br>
        <p><h4>imdbID : ${data.imdbID}</h4></p><br>
        <br>
       
      </div>
    </div>
  </div>`
    box.innerHTML += movie
}

let clear = document.getElementById("box");
function sortMovie() {
 
  const year = document.getElementById("drop-down").value;

  if (year === "") {
   document.getElementById("errorBox").textContent = "";
   clear.innerHTML = "";
   movies.forEach(movie => displayData(movie));
  } 
  else {
   
   clear.innerHTML = "";
   const filterMovies = movies.filter(movie => parseInt(movie.Year) >= parseInt(year))
   
   if (filterMovies.length === 0) {
    clear.innerHTML = "";
    document.getElementById("errorBox").textContent = "No movies found for the selected year :(";
    } 
   else {
      filterMovies.forEach((movie) => displayData(movie));
      document.getElementById("errorBox").textContent = "";
     }
  }
}

  