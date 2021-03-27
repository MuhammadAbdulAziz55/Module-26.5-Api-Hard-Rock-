// // load data with async await
// const searchSongs = async() => {
//         const searchText = document.getElementById('search-field').value ;
//         const url = `https://api.lyrics.ovh/suggest/${searchText}`
//         const res = await fetch(url);
//         const data = await res.json();
//         displaySongs(data.data);
//     }


// load data with fetch
const searchSongs = () => {
    const searchText = document.getElementById('search-field').value ;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
    .then(res =>res.json())
    .then(data => displaySongs(data.data))
    .catch(error =>displayError('Something Went Wrong!! Please Try Again Later!'));
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv= document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';   
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>   
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                src="${song.preview}" type = "audio/mp3">

            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onClick ="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

const getLyric = async(artist, title) => {
    const url= `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } 
    catch (error) {
        displayError("Sorry I faield to load lyrics,Please try again leater" );
    }
}    

let displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
  
}

const displayError = error => {
    const errorTag = document.getElementById('error-massage');
    errorTag.innerText = error;
}