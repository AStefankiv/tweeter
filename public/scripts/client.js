/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
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
          <p>${tweet.content.text}</p>
        </div>
        <div class="line"></div>
        <footer>
          <div>
            <p>10 days ago</p>
          </div>
          <div class="three-buttons">
            <button class="'flag"><i class="fa-solid fa-flag"></i></button>
            <button><i class="fa-solid fa-retweet"></i></button>
            <button><i class="fa-solid fa-heart"></i></button>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };


  renderTweets(data);
  console.log('This is a client side JS file');
});