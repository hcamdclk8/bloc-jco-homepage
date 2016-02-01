 // Example Album CH 25
 var albumPicasso = {
     name: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { name: 'Blue', length: '4:26' },
         { name: 'Green', length: '3:14' },
         { name: 'Red', length: '5:01' },
         { name: 'Pink', length: '3:21'},
         { name: 'Magenta', length: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     name: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { name: 'Hello, Operator?', length: '1:01' },
         { name: 'Ring, ring, ring', length: '5:01' },
         { name: 'Fits in your pocket', length: '3:21'},
         { name: 'Can you hear me now?', length: '3:14' },
         { name: 'Wrong phone number', length: '2:15'}
     ]
 };

 // CH 25 Assignment
 var albumMadonna = {
     name: 'Like A Virgin',
     artist: 'Madonna',
     label: 'Sire Records',
     year: '1985',
     albumArtUrl: 'assets/images/album_covers/15.png',
     songs: [
         { name: 'Material Girl', length: '1:01' },
         { name: 'Angel', length: '5:01' },
         { name: 'Dress You Up', length: '3:55'},
         { name: 'Like A Virgin', length: '3:14' },
         { name: 'Over and Over', length: '2:15'},
         { name: 'Stay', length: '4:08'},
         { name: 'Pretender', length: '5:15'}
     ]
 };


 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };



var setCurrentAlbum = function(album) {

    var albumTitle = document.getElementsByClassName('album-view-title')[0];
    var albumArtist = document.getElementsByClassName('album-view-artist')[0];
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
    var albumImage = document.getElementsByClassName('album-cover-art')[0];
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // Assign values to each part of album ie text, images
     albumTitle.firstChild.nodeValue = album.name;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // clear album song list container
     albumSongList.innerHTML = '';
 
     // build list of songs from album.js 
     for (i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
     }
 };

/* CH 25 assignment - album cover shuffle on click */
/* window.onload = function() {
     setCurrentAlbum(albumMadonna);
     
  /*   var albums = [albumPicasso, albumMarconi, albumMadonna]
     var index = 0;
     
     albumImage.addEventListener("click", function(event) {
         setCurrentAlbum(albums[index]);
         index++;
         if (index == albums.length) {
             index = 0;
         } 
         
     });*/
 //};  

/** CH 26 exercise - put listener on mouseover **/

 var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
 var songRows = document.getElementsByClassName('album-view-song-item');

 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

 window.onload = function() {
     setCurrentAlbum(albumMadonna);

     songListContainer.addEventListener('mouseover', function(event) {
         // #1
         console.log(event.target);
                 // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
         event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     });
     
     // CH 26 effect of when mouse leaves song list //
     
         for (i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
           
             // Selects first child element, which is the song-item-number element
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
         });
     }
     
 }