/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetsData = [
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

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    const { name, avatars, handle } = tweetData.user;
    const { text } = tweetData.content;
    const dateCreated = tweetData.created_at;

    const tweetHtml = `
    <article class="tweet">
      <header>
        <img src="${avatars}" alt="User avatar">
        <p>${name}</p>
        <p>${handle}</p>
      </header>
      <div class="tweet-content">
        ${text}
      </div>
      <footer>
        <span class="tweet-age">${dateCreated}</span>
        <div class="actions">
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
      </footer>
    </article>
  `;

    // Return the tweet jQuery object
    return $(tweetHtml);
  };


  const renderTweets = function(tweets) {
    // Get the tweets container element
    const $tweetsContainer = $('#tweets-container');
      
    // Loop through the tweets array
    for (const tweet of tweets) {
      // Create a tweet element with the tweet data
      const $tweet = createTweetElement(tweet);
      
      // Append the tweet element to the tweets container
      $tweetsContainer.append($tweet);
    }
  };

  renderTweets(tweetsData);




  /*

//example from class
const createPostElement = function() {
    const newArticle = $("<article>");
    const newH1 = $("<h1>");
    const newP = $("<p>");
}

const arrayOfTitles = ["Item", "name", "Date"]

/*

$(document).ready(() => {
    for (const title of arrayOfTitles) {
    const newPost = createPostElement(title);
    $("section").append(newPost);
    }

});

*/

});