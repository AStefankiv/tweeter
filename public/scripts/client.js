/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };


  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        renderTweets(data);
      },
      error: function(error) {
        console.log('Error: ', error);
      }
    });
  };
  



  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header class="tweets-container-header">
          <div>
            <img src="${tweet.user.avatars}" alt="Profile picture">
            <h2>${tweet.user.name}</h2>
          </div>
          <div class="transparent-tone">
            <h2>${tweet.user.handle}</h2>
          </div>
        </header>
        <div class="div-tweet">
          <p></p>
        </div>
        <div class="line"></div>
        <footer>
          <div>
            <p>${timeago.format(tweet.created_at)}</p>
          </div>
          <div class="three-buttons">
            <button class="'flag"><i class="fa-solid fa-flag"></i></button>
            <button><i class="fa-solid fa-retweet"></i></button>
            <button><i class="fa-solid fa-heart"></i></button>
          </div>
        </footer>
      </article>
    `);
    $tweet.find('.div-tweet p').text(tweet.content.text);
    return $tweet;
  };


  
  
  const $form = $('#tweet-form');
  $form.on('submit', function(event) {
    event.preventDefault();
    const $tweetText = $('#tweet-text');
    const tweetText = $tweetText.val();
    const tweetTextLength = tweetText.length;
    if (tweetTextLength === 0) {
      $('.error-message').text('⚠️Your tweet is empty!⚠️');
      $('.error-message').slideDown();
      setTimeout(function() {
        $('.error-message').slideUp();
      }, 2000);
    } else if (tweetTextLength > 140) {
      $('.error-message').text('⚠️Your tweet is too long!⚠️');
      $('.error-message').slideDown();
      setTimeout(function() {
        $('.error-message').slideUp();
      }, 2000);
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $form.serialize(),
        success: function(data) {
          loadTweets();
          $tweetText.val('');
          $('.counter').val(140);
        },
      });
    }
  });


  loadTweets();

  const $buttonNewTweet = $('.new.tweet');
  const $sectionHidden = $('.new-tweet');
  $buttonNewTweet.on('click', function() {
    $sectionHidden.slideToggle();
    $('#tweet-text').focus();
  });



  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#scrolltop').fadeIn();
    } else {
      $('#scrolltop').fadeOut();
    }
  });
  
  const $buttonUp = $('#scrolltop');
  $buttonUp.on('click', function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
  });

});