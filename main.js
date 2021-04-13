const song_thumb = document.querySelector(".song-thumb");
const song_player = document.querySelector(".song");
const song_title = document.querySelector (".song-title");
const song_artist = document.querySelector (".artist");
const play_btn = document.querySelector (".play");
const backward_btn = document.querySelector (".backword");
const forward_btn = document.querySelector (".forward");
const play_icon = document.querySelector("#play-icon");
const range = document.querySelector(".slider");

let current_song_index;
let next_song_index;


let songs = [
    {
        title: "Everything at once",
        artist: "Lenka",
        song_image: "images/lenka.jpg",
        song_path: "/music/Lenka-EverythingAtOnce.mp3",
    },
    {
        title: "Bleed it out",
        artist: "Linkin Park",
        song_image: "images/linkin_park.jpg",
        song_path: "music/Linkin Park - Bleed It Out.mp3",
    },
]
play_btn.addEventListener("click",TogglePlaySong);
forward_btn.addEventListener("click", () => ChangeSong());
backward_btn.addEventListener("click",() => ChangeSong(false));
InitPlayer();
function InitPlayer(){
    current_song_index = 0;
    next_song_index= current_song_index + 1;
    UpdatePlayer();
}
function UpdatePlayer(){
    let song = songs[current_song_index];
    song_thumb.src = song.song_image;
    song_title.innerText = song.title;
    song_artist.innerText = song.artist;
    song_player.src = song.song_path;
}
function TogglePlaySong(){
    if(song_player.paused){
        song_player.play();
        play_icon.classList.remove("fa-play-circle");
        play_icon.classList.add("fa-pause-circle");
    }else{
        song_player.pause();
        play_icon.classList.add("fa-play-circle");
        play_icon.classList.remove("fa-pause-circle");
    }
}
function ChangeSong(next=true){
    if(next){
        current_song_index++;
        next_song_index = current_song_index + 1;
        if(current_song_index > songs.length - 1){
            current_song_index = 0;
            next_song_index = current_song_index + 1;
        }if(next_song_index > songs.length - 1){
            next_song_index = 0;
        }
    }else {
        current_song_index--;
        next_song_index = current_song_index + 1;
        if(current_song_index < 0){
            current_song_index = songs.length - 1;
            next_song_index = 0;
        }
    }
    UpdatePlayer();
    TogglePlaySong();
}

function updateProgress(e){
    range.value = e.srcElement.currentTime / e.srcElement.duration *100;
}

song_player.addEventListener("timeupdate",updateProgress)