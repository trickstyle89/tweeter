/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// I strongly believe that I am getting this error because I am only sending the text as empty and it is 
// *** How is this still working even with this error?
// Unchecked runtime.lastError: The message port closed before a response was received.
// Does the fact that I have nested my entire code in the .ready(function) a reason for my issues?
// If so what can I take out and keep in?
//



$(document).ready(function() {  // my whole function is wrapped in this.  A good or bad thing?

  const createTweetElement = function(tweetData) {
    // const { name, avatars, handle } = tweetData.user; // object destructuring is not working because new tweets don't have this.

    const name = tweetData.user;   // ? tweetData.user.name : 'Ivan Chew';
    const avatars = tweetData.user;  //  ? tweetData.user.avatars : '/images/profile-hex.png';  ** attempt at conditionals to help offset the error.
    const handle = tweetData.user;  // ? tweetData.user.handle : '@ChewStory'; 
    
    const { text } = tweetData.content; // ? tweetData.content: dataForm; // even with the use of ternary operators. I still get errors once it reachs down here.
    const dateCreated = timeago.format(tweetData.created_at);

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

  const renderTweets = function(tweets) { // prepend = false
    // Get the tweets container element
    const $tweetsContainer = $('#tweets-container');
    
    tweets.reverse(); // reverses the order?

    // Loop through the tweets array
    for (const tweet of tweets) {
      // Create a tweet element with the tweet data
      const $tweet = createTweetElement(tweet);
      
      // Append the tweet element to the tweets container
     
      $tweetsContainer.append($tweet);

      /*  if (prepend) {
        $tweetsContainer.prepend($tweet);  // *** trying to prepend
      } else {
        $tweetsContainer.append($tweet);
      }
      */
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
    
    // Serialize the form data into a text string.
    const formData = $(this).serialize();
    console.log('line 100 is coming out as serialized data', formData);
    
    // Use AJAX to submit a POST request that sends the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })

      .then(function(response) {

        // If the request is successful, render the new tweet
        // renderTweets([response], true);  // trying to use for append.
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
