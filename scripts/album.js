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

var createSongRow = function(songNumber, songName, songLength) {
    //var songLength = new buzz.toTimer(currentSoundFile.getDuration());
    var template =
    '<tr class="album-view-song-item">'
    + '<td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '<td class="song-item-title">' + songName + '</td>'
    + '<td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
    + '</tr>'
    ;
 
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
 };


 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     $albumTitle.text(album.name);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
 
     $albumSongList.empty();
 
     for (i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
     }
 };

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

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 50;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

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

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);
    setupSeekBars();
    setSong(1); //set default to song #1 on initial load
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);
    $playPause.click(togglePlayFromPlayerBar);

    
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
    
