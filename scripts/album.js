


 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
     
     
     
     var clickHandler = function() {
     // clickHandler logic
        var songNumber = parseInt($(this).attr('data-song-number'));

	    if (currentlyPlayingSongNumber !== null) {
            
		// Revert to song number for currently playing song because user started playing new song.
		var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
		currentlyPlayingCell.html(currentlyPlayingSongNumber);
	    }
	    if (currentlyPlayingSongNumber !== parseInt(songNumber)) {
            
		// Switch from Play -> Pause button to indicate new song is playing.
		$(this).html(pauseButtonTemplate);
		currentlyPlayingSongNumber = parseInt(songNumber);
        currentSongFromAlbum = currentAlbum.songs[songNumber - 1]; 
        updatePlayerBarSong();
            
	    } else if (currentlyPlayingSongNumber === songNumber) {
            
		// Switch from Pause -> Play button to pause currently playing song.
		$(this).html(playButtonTemplate);
            
        $('.main-controls .play-pause').html(playerBarPlayButton);
            
		currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
            
	    }

     };
     
     
     var onHover = function(event) {
     // Placeholder for function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
         
          //$('.song-item-title').hover(function() {fadeTo( "slow", 0.33 );});

        if (parseInt(songNumber) !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
            
        }
      
     };
     var offHover = function(event) {
         // Placeholder for function logic
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
       
         
        if (parseInt(songNumber) !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
           
        }
         
         console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     };
     
     // #1
     $row.find('.song-item-number').click(clickHandler);
     $row.click(updatePlayerBarSong);
     // #2
     $row.hover(onHover, offHover);
    
     // #3
     return $row;
 };


var setCurrentAlbum = function(album) {
     
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // Assign values to each part of album ie text, images
     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
    
    $albumImage.hover(function() {$(this).fadeIn(500);});
    

 
     // clear album song list container
     $albumSongList.empty();
 
     // build list of songs from album.js 
     for (i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
     }
 };

// CH 32 track index of songs

 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

/// Next Song function

var nextSong = function() {

    var getLastSongNumber = function(index) {
        return index == 0 ? currentAlbum.songs.length : index;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;
    
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

//// Previous Song function

var previousSong = function() {

    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
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


 // Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';

 // Store state of playing songs
 
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;

 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 $(document).ready(function() {
     
     setCurrentAlbum(albumMadonna);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);

 });

// Update player bar with song info CH 32 //

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
    
    $('.main-controls .play-pause').html(playerBarPauseButton);
};



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
