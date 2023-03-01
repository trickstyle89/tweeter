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

const $tweet = createTweetElement(tweetsObj);

const createTweetElement = function(tweetsObj) {

const { name, avatars, handle } = tweetsObj.user;
const { tweetContent } = tweetsObj.content;
const dateCreated = tweetsObj.created_at;

const tweetHtml = `
    <article class="tweet">
      <header>
        <img src="${avatars}" alt="User avatar">
        <h2>${name}</h2>
        <span class="handle">${handle}</span>
      </header>
      <div class="tweet-content">
        ${text}
      </div>
      <footer>
        <span class="tweet-age">${timeago.format(createdAt)}</span>
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
}

const tweetData = {
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

const $tweet = createTweetElement(tweetsObj);
console.log($tweet);


// Append the tweet to the tweets container
$('#tweets-container').append($tweet);





}
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