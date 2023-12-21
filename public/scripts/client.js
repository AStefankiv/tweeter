/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  
  
  const renderTweets = function(tweets) {//This function is responsible for adding tweets to the page
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
    }
  };


  const loadTweets = () => {//This function is responsible for fetching tweets from the http://localhost:8080/tweets page
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(data) {//This function is responsible for calling the renderTweets function
        renderTweets(data);
      },
      error: function(error) {//This function is responsible for showing an error message if the request fails
        console.log('Error: ', error);
      }
    });
  };
  



  const createTweetElement = function(tweet) {//This function is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
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


  
  
  const $form = $('#tweet-form');//This function is responsible for sending the tweet to the server
  $form.on('submit', function(event) {
    event.preventDefault();
    const $tweetText = $('#tweet-text');
    const tweetText = $tweetText.val();
    const trimmedTweetText = tweetText.trim();
    const tweetTextLength = trimmedTweetText.length;
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

  const $buttonNewTweet = $('.new.tweet');//This function is responsible for showing and hiding the new tweet form
  const $sectionHidden = $('.new-tweet');
  $buttonNewTweet.on('click', function() {
    $sectionHidden.slideToggle();
    $('#tweet-text').focus();
  });



  $(window).scroll(function() {//This function is responsible for showing and hiding the scroll to top button
    if ($(this).scrollTop() > 100) {
      $('#scrolltop').fadeIn();
    } else {
      $('#scrolltop').fadeOut();
    }
  });
  
  const $buttonUp = $('#scrolltop');//This function is responsible for scrolling to top when the scroll to top button is clicked
  $buttonUp.on('click', function() {
    $('html, body').animate({scrollTop: 0}, 'slow');
  });

});