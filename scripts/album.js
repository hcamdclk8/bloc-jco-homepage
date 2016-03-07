// In lieu of $document ready
$(startUp);

function startUp () {
    
    setCurrentAlbum(albumPicasso);
    displayDailyQuote();   
}

// set up the quotes in an array as part of an object 
var data = {
    dailyQuotes: [
         'I Can. I Will. I Must.',
         'Every opportunity has a shelf life.',
         'Believe in yourself, you are the only one who knows self the longest.',
         'We control our own destiny.',
         'You only live once. If you live it right, once is enough.',
         'Peace is not found in what surrounds us, but in what we hold within.',
         'There\'s an end to everything.',
         'A journey of a thousand miles begins with a single step.',
         'Try and try until you succeed.',
         'Enjoy the \'present\', it is a gift after all.',
         'If a man knows not what habor he seeks, no amount of light will be enough to guide him.'
         ],
    magicNumber: 7
}

// set counter to 0, create a function to loop thru array and fade it in
function displayDailyQuote (){
     var elem = $('.currently-playing .artist-name');
     var counter = 0;
     function next() {
         var quote = data.dailyQuotes[counter++ % data.dailyQuotes.length]; 
         console.log(Date.now(), counter, data.dailyQuotes.length, "m2:", counter%2, "m3:", counter%3);
         elem.hide().text(quote).fadeIn(2000); //.text() takes string and can't pass array
     }
     next();
     window.setInterval(next, 5000); //takes 1st argument as a function
     
}


// used in StartUp function to render actual text quote under album artist
 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');

     $albumArtist.text(album.artist);
     $albumTitle.text(album.name);
     


 };


/*
var updatePlayerBarSong = function() {

  //  $('.currently-playing .song-name').text(currentSongFromAlbum.name);
   // $('.currently-playing .artist-name').text(currentAlbum.artist);
 //   $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
   // $('.main-controls .play-pause').html(playerBarPauseButton);

};*/
/*
var createSongRow = function(songNumber, songName, songLength) {
    //var songLength = new buzz.toTimer(currentSoundFile.getDuration());
    var template =
    '<tr class="album-view-song-item">'
    + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '<td class="song-item-title">' + songName + '</td>'
 //   + '<td class="song-item-duration">' + filterTimeCode(songLength) + '</td>' 
    + '</tr>'
    ;
};
*/
/*

var setSong = function(songNumber) {
    
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
         // #1
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         // #2
         formats: [ 'mp3' ],
         preload: true
    });
    
    setVolume(currentVolume);
 };
 

/// allows to fast forward to parts of a song

 var seek = function(time) {
     if (currentSoundFile) {
         currentSoundFile.setTime(time);
     }
 };

var setVolume = function(volume) {
    if (currentSoundFile) {
     currentSoundFile.setVolume(volume);
    }
};
    


var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]')
};

*/


 /*
    var $row = $(template);
    
    var clickHandler = function() {
        var songNumber = parseInt($(this).attr('data-song-number'));
        currentSongFromAlbum = currentAlbum.songs[songNumber-1];
                    
//// set volume on initial song play JCO placement here instead of inside if statement otherwise 1st track play doesn't update
            var $volumeFill = $('.volume .fill');
            var $volumeThumb = $('.volume .thumb');
            $volumeFill.width(currentVolume + '%');
            $volumeThumb.css({left: currentVolume + '%'});
/// JCO so player bar updates song title and artist upon initial load and user plays 1st track
            updatePlayerBarSong();

        if (currentlyPlayingSongNumber !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            currentSoundFile.play();
            updateSeekBarWhileSongPlays();
            updatePlayerBarSong();
            
          


        } else if (currentlyPlayingSongNumber === songNumber) {
             if (currentSoundFile.isPaused()) {
                 $(this).html(pauseButtonTemplate);
                 $('.main-controls .play-pause').html(playerBarPauseButton);
                 currentSoundFile.play();
                 updateSeekBarWhileSongPlays();
             } else {
                 $(this).html(playButtonTemplate);
                 $('.main-controls .play-pause').html(playerBarPlayButton);
                 currentSoundFile.pause(); 
                 updateSeekBarWhileSongPlays();
             }
        }
        
    };
    
     var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));

        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        } else if (currentlyPlayingSongNumber === songNumber) {
             if (currentSoundFile.isPaused()) {
                songNumberCell.html(playButtonTemplate);
             }
             else {
                songNumberCell.html(pauseButtonTemplate);  
             }
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(songNumber);
                } else if (currentlyPlayingSongNumber === songNumber) {
             if (currentSoundFile.isPaused()) {
                songNumberCell.html(songNumber);
             }
             else {
                songNumberCell.html(pauseButtonTemplate);  
             }
        }
    };
    
     $row.find('.song-item-number').click(clickHandler);
     $row.hover(onHover, offHover);
     return $row;
     
*/



/*


/// CH 34 update seek bars with time lapse

 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         // #10
         currentSoundFile.bind('timeupdate', function(event) {
             // #11
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar();
             
         });
     }
 };


/// invoked by setupSeekBars

 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);
 
    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };

/// Support song and volume lever movement

var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');
 
     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;
         
       ///determines of seekbar is updating seekbar or volume  
         if ($(this).parent().attr('class') == 'seek-control') {
            seek(seekBarFillRatio * currentSoundFile.getDuration());
        } else {
            setVolume(seekBarFillRatio * 100);   
        }
 
         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });
            //# 7
         $seekBars.find('.thumb').mousedown(function(event) {
         // #8
         var $seekBar = $(this).parent();
 
         // #9
         $(document).bind('mousemove.thumb', function(event){
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width();
             var seekBarFillRatio = offsetX / barWidth;
             
        ///determines of seekbar is updating seekbar or volume    
             if ($seekBar.parent().attr('class') == 'seek-control') {
                seek(seekBarFillRatio * currentSoundFile.getDuration());
             } else {
                setVolume(seekBarFillRatio);   
             }
 
             updateSeekPercentage($seekBar, seekBarFillRatio);
         });
 
         // #10
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 };



 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

*/

/*

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
*/

/*
// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 50;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
*/

/*
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
    //currentlyPlayingSongNumber = currentSongIndex + 1;
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updatePlayerBarSong();
    updateSeekBarWhileSongPlays();
    //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

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
    //currentlyPlayingSongNumber = currentSongIndex + 1;
    setSong(currentSongIndex +1);
    currentSoundFile.play();
    updatePlayerBarSong();
    updateSeekBarWhileSongPlays();
    //currentSongFromAlbum = currentAlbum.songs[currentSongIndex];
    

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

*/

/*
$(document).ready(function() {

    
    //randomQuotes2();

    
});


///CH 33 Assignment Make play and pause in player bar responsive

var $playPause = $('.main-controls .play-pause');


var togglePlayFromPlayerBar = function() {
 
    var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
    
    
    if (currentSoundFile.isPaused())  {
    
       //play song ?
       currentSoundFile.play();
       $('.main-controls .play-pause').html(playerBarPauseButton);
       currentlyPlayingCell.html(pauseButtonTemplate);
       updatePlayerBarSong();  /// JCO addition so player bar updates on initial load and initial click from player bar    
        updateSeekBarWhileSongPlays(); /// JCO addition so player bar updates on initial load and initial click from player bar    
            var $volumeFill = $('.volume .fill'); /// JCO addition so player bar updates on initial load and initial click from player bar    
            var $volumeThumb = $('.volume .thumb');/// JCO addition so player bar updates on initial load and initial click from player bar    
            $volumeFill.width(currentVolume + '%');/// JCO addition so player bar updates on initial load and initial click from player bar    
            $volumeThumb.css({left: currentVolume + '%'});/// JCO addition so player bar updates on initial load and initial click from player bar    
  } else {
      currentSoundFile.pause();
      $('.main-controls .play-pause').html(playerBarPlayButton);
      currentlyPlayingCell.html(currentlyPlayingSongNumber);
       updatePlayerBarSong(); /// JCO addition so player bar updates on initial load and initial click from player bar  
        updateSeekBarWhileSongPlays();/// JCO addition so player bar updates on initial load and initial click from player bar    
            var $volumeFill = $('.volume .fill');/// JCO addition so player bar updates on initial load and initial click from player bar    
            var $volumeThumb = $('.volume .thumb');/// JCO addition so player bar updates on initial load and initial click from player bar    
            $volumeFill.width(currentVolume + '%');/// JCO addition so player bar updates on initial load and initial click from player bar    
            $volumeThumb.css({left: currentVolume + '%'});/// JCO addition so player bar updates on initial load and initial click from player bar    
    }
    
};

/// CH 34 assignment play time on seek bar updates both total time and current time

var setCurrentTimeInPlayerBar = function (currentTime) {
    
    $('.seek-control .current-time').html(buzz.toTimer(currentSoundFile.getTime()));
    $('.seek-control .total-time').html(buzz.toTimer(currentSoundFile.getDuration()));
    
};

var filterTimeCode = function (timeInSeconds) {
    var seconds = Math.floor(parseFloat(timeInSeconds % 60));
    var minutes = Math.floor(timeInSeconds / 60);
    var format_minutes = minutes + ':';

        if (seconds < 10) {
            return format_minutes + "0" + seconds;
        } else 
            return format_minutes + seconds;
};


var randomQuotes = function() {
    
     var albumQuotes = [
         'I Can. I Will. I Must. - Anonymous',
         'Every Opportunity Has A Shelf Life. - Plato',
         'Believe In Yourself, You Are The Only One Who Knows Self The Longest. - James Co'
     ];
    
     var rand = albumQuotes[Math.floor(Math.random() * albumQuotes.length)];
     return rand;
}

var randomQuotes2 = function() {
    
     var albumQuotes = [
         'I Can. I Will. I Must. - Annoymous',
         'Every Opportunity Has A Shelf Life. - Plato',
         'Believe In Yourself, You Are The Only One Who Knows Self The Longest. - James Co'
     ];
    
    
    $('.currently-playing .artist-name').loadText( albumQuotes, 5000 ); // ( array, interval )
    document.title = $('.currently-playing .artist-name').text();
         
}

*/

/*
var loopQuotes = function( textArray, interval ) {
    return this.each( function() {
        var obj = $(this);
        obj.fadeOut( 'slow', function() {
            var elem = textArray[0];
            obj.empty().html( elem );
            textArray.shift();
            textArray.push(elem);
            obj.fadeIn( 'fast' );
        });
        timeOut = setTimeout( function(){ obj.loadText( textArray, interval )}, interval );
        $("#text-reload").click( function(){ 
            if( !obj.is(':animated') ) { clearTimeout( timeOut ); obj.loadText( textArray, interval );} // animation check prevents "too much recursion" error in jQuery 
        });
    });
};


$(document).ready(function() {
    var albumQuotes = ["hello", "bonjour", "hola", "konnichiwa", "hujambo", "cześć", "hei", "ciao"];
    $('#page_title').loadText( albumQuotes, 5000 ); // ( array, interval )
    document.title = $('#page_title').text();
});

*/