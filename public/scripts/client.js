/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// eslint-disable-next-line no-unused-vars
const tweetsObj =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
};

$(document).ready(function() {

const createTweetElement = function(tweetsObj) {
const { name, avatars, handle } = tweetsObj.user;
const { text } = tweetsObj.content;
const dateCreated = tweetsObj.created_at;

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
  return tweetHtml;
};

const renderTweets = function() {
const $tweet = createTweetElement(tweetsObj);
console.log('tweets', $tweet);
$("#tweets-container").append($tweet);
console.log($("#tweets-container"));
};

renderTweets();




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