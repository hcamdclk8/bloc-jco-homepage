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

// CH 27 Play part 2 //

var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    if (currentParent === undefined) {return "No parent found";}
    while (currentParent.className !== targetClass) {
        currentParent = currentParent.parentElement;
        if (currentParent === null) {break; return "No parent found with that class name";}
    }

    return currentParent;
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }  
};



     var clickHandler = function(targetElement) {
     
    var songItem = getSongItem(targetElement);  
     
    if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
        
        //revert the button back to a play button if the playing song is clicked again//
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     
         //If the clicked song is not the active song, set the content of the new song to the pause 
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
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
  
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

 // Store state of playing songs
 var currentlyPlayingSong = null;

 window.onload = function() {
     setCurrentAlbum(albumMadonna);

     songListContainer.addEventListener('mouseover', function(event) {
        
        // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
             // Change the content from the number to the play button's HTML
             event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
           
             var songItem = getSongItem(event.target);
             
                if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
                }
                 
         }
     });
     
     // CH 26 effect of when mouse leaves song list //
     
         for (i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {

             // #1
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }
             
          
         });
             
              
         songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
     }
     
 }
 // Example Album
 // Example Album
// var albumPicasso = {
//     name: 'The Colors',
//     artist: 'Pablo Picasso',
//     label: 'Cubism',
//     year: '1881',
//     albumArtUrl: 'assets/images/album_covers/01.png',
//     songs: [
//         { name: 'Blue', length: '4:26' },
//         { name: 'Green', length: '3:14' },
//         { name: 'Red', length: '5:01' },
//         { name: 'Pink', length: '3:21'},
//         { name: 'Magenta', length: '2:15'}
//     ]
// };
// 
// // Another Example Album
// var albumMarconi = {
//     name: 'The Telephone',
//     artist: 'Guglielmo Marconi',
//     label: 'EM',
//     year: '1909',
//     albumArtUrl: 'assets/images/album_covers/20.png',
//     songs: [
//         { name: 'Hello, Operator?', length: '1:01' },
//         { name: 'Ring, ring, ring', length: '5:01' },
//         { name: 'Fits in your pocket', length: '3:21'},
//         { name: 'Can you hear me now?', length: '3:14' },
//         { name: 'Wrong phone number', length: '2:15'}
//     ]
// };
//
// // 3rd Album
// var albumBeachHouse = {
//     name: 'Bloom',
//     artist: 'Beach House',
//     label: 'Sub Pop',
//     year: '2012',
//     albumArtUrl: 'assets/images/album_covers/bloom.jpg',
//     songs: [
//         { name: 'Myth', length: '4:19' },
//         { name: 'Wild', length: '4:58' },
//         { name: 'Lazuli', length: '5:02'},
//         { name: 'Other People', length: '4:25' },
//         { name: 'The Hours', length: '4:12'},
//         { name: 'Troublemaker', length: '4:56'},
//         { name: 'New Year', length: '5:26'},
//         { name: 'Wishes', length: '4:47'},
//         { name: 'On the Sea', length: '5:32'},
//         { name: 'Irene', length: '16:57'}
//     ]
// };
//
//var createSongRow = function(songNumber, songName, songLength) {
//     var template =
//        '<tr class="album-view-song-item">'
//    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
//      + '  <td class="song-item-title">' + songName + '</td>'
//      + '  <td class="song-item-duration">' + songLength + '</td>'
//      + '</tr>'
//      ;
// 
//     return template;
// };
//     
//      var setCurrentAlbum = function(album) {
//     // #1
//     var albumTitle = document.getElementsByClassName('album-view-title')[0];
//     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
//     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
//     var albumImage = document.getElementsByClassName('album-cover-art')[0];
//     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
// 
//     // #2
//     albumTitle.firstChild.nodeValue = album.name;
//     albumArtist.firstChild.nodeValue = album.artist;
//     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
//     albumImage.setAttribute('src', album.albumArtUrl);
// 
//     // #3
//     albumSongList.innerHTML = '';
// 
//     // #4
//     for (i = 0; i < album.songs.length; i++) {
//         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
//     }
// };
// 
//
////function that keeps traversing the DOM upward until a parent with a specified class name is found.
//var findParentByClassName = function(element, targetClass) {
//    var currentParent = element.parentElement;
//    if (currentParent === undefined) {return "No parent found";}
//    while (currentParent.className !== targetClass) {
//        currentParent = currentParent.parentElement;
//        if (currentParent === null) {break; return "No parent found with that class name";}
//    }
//
//    return currentParent;
//};
//
//var getSongItem = function(element) {
//    switch (element.className) {
//        case 'album-song-button':
//        case 'ion-play':
//        case 'ion-pause':
//            return findParentByClassName(element, 'song-item-number');
//        case 'album-view-song-item':
//            return element.querySelector('.song-item-number');
//        case 'song-item-title':
//        case 'song-item-duration':
//            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
//        case 'song-item-number':
//            return element;
//        default:
//            return;
//    }  
//};
//
// var clickHandler = function(targetElement) {
//    var songItem = getSongItem(targetElement);
// 
//     if (currentlyPlayingSong === null) {
//         songItem.innerHTML = pauseButtonTemplate;
//         currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//         songItem.innerHTML = playButtonTemplate;
//         currentlyPlayingSong = null;
//     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//         songItem.innerHTML = pauseButtonTemplate;
//         currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     }
// 
//     
// };
// 
//var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
//
//var songRows = document.getElementsByClassName('album-view-song-item');
//
// var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
//
// var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
//
// // Store state of playing songs
// var currentlyPlayingSong = null;
//
// window.onload = function() {
//     setCurrentAlbum(albumPicasso);
//     
//     songListContainer.addEventListener('mouseover', function(event) {
//         
//         if (event.target.parentElement.className === 'album-view-song-item') {
//              event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
//             
//        var songItem = getSongItem(event.target);
//             
//             if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
//                 songItem.innerHTML = playButtonTemplate;
//             }
//             
//         }
//         
//     });
//     
//          for (i = 0; i < songRows.length; i++) {
//         songRows[i].addEventListener('mouseleave', function(event) {
//             // #1
//             var songItem = getSongItem(event.target);
//             var songItemNumber = songItem.getAttribute('data-song-number');
// 
//             // #2
//             if (songItemNumber !== currentlyPlayingSong) {
//                 songItem.innerHTML = songItemNumber;
//             }
//         });
//              
//        songRows[i].addEventListener('click', function(event) {
//             clickHandler(event.target);
//         });
//     }
//     
// };
//     
//
//var albumImage = document.getElementsByClassName('album-cover-art')[0];
//     
//index = 1;
//var albums = [albumPicasso, albumMarconi, albumBeachHouse];
//
//albumImage.addEventListener('click', function(event) {
//    setCurrentAlbum(albums[index]);
//    index++;
//    if (index == albums.length ) {
//        index = 0;}
//}
//        )
//     
//     
// ;
//
