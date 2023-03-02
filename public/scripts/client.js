/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/*
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
*/

$(document).ready(function() {

  const createTweetElement = function(tweetData) {
    const { name, avatars, handle } = tweetData.user;
    const { text } = tweetData.content;
    const dateCreated = timeago.format(tweetData.created_at); // original ****
  
    //const dateCreated = new Date(tweetData.created_at); //second attempt
    //const tweetAge = jQuery.timeago(dateCreated);
    
    // const dateCreated = jQuery.timeago(new Date('tweetData.created_at')); // last attempt
    
    // const tweetAge = jQuery.timeago(tweetData.created_at);

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
        <span class="tweet-age">${(dateCreated)}</span>
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

  const loadTweets = function() {
  
    //Use JQuery to make GET request
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json'
    })
      .then(function(response) {
        //if successful, render the tweets
        renderTweets(response);
      })
      .catch(function(error) {
        console.log('Error', error);
      });
  };

  loadTweets();

  // Add an event listener that listens for the submit event
  $('#tweet-form').submit(function(event) {
    // Prevent the default behavior of the submit event
    event.preventDefault();

    // Get the tweet text from the form
    const tweetText = $('#tweet-text').val().trim();

    // Check if the tweet is empty or too long
    if (!tweetText) {
    // Show an error message for empty tweet
      alert('Error: Tweet content is empty.');
      return;
    } else if (tweetText.length > 140) {
    // Show an error message for too long tweet
      alert('Error: Tweet content is too long.');
      return;
    }
    
    // Serialize the form data
    const formData = $(this).serialize();
    
    // Use AJAX to submit a POST request that sends the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })

      .then(function(response) {

        // If the request is successful, render the new tweet
        renderTweets([response]);
      
        // Clear the tweet input
        $('#tweet-text').val('');
      
        
        // Reset the character counter
        $('.counter').text('140');
      })
      .catch(function(error) {
      });
  });

});
