/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const createTweetElement = function(tweetData) {

    const { name, avatars, handle } = tweetData.user;
    const { text } = tweetData.content;
    const dateCreated = timeago.format(tweetData.created_at);


    // help escape the harmful text.

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const tweetHtml = `
    <article class="tweet">
      <header>
        <img src="${avatars}" alt="User avatar">
        <p>${name}</p>
        <p>${handle}</p>
      </header>
      <div class="tweet-content">
        ${escape(text)}
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
    const $tweetsContainer = $('#tweets-container').empty(); //empty this
    
    // Loop through the tweets array
    for (const tweet of tweets) {
      // Create a tweet element with the tweet data
      const $tweet = createTweetElement(tweet);

      $tweetsContainer.prepend($tweet);

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

  // ALWAYS need to hide FIRST.
  $('#errorMsgOne').hide();
  $('#errorMsgTwo').hide();

  // Add an event listener that listens for the submit event
  $('#tweet-form').submit(function(event) {
    // Prevent the default behavior of the submit event
    event.preventDefault();

    // Get the tweet text from the form
    const tweetText = $('#tweet-text').val();
       
    // Check if the tweet is empty or too long
    
    if (!tweetText) {
      $('#errorMsgOne').slideDown();
      return;
    } else if (tweetText.length > 140) {
      $('#errorMsgTwo').slideDown();
      return;
    } else
      $('#errorMsgOne').hide(); // hide the error message if there are no errors
    $('#errorMsgOne').hide();

    // Serialize the form data into a text string.
    const formData = $(this).serialize();
    
    // Use AJAX to submit a POST request that sends the serialized data to the server
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: formData
    })

      .then(loadTweets);

    // Clear the tweet input
    $('#tweet-text').val('');
      
    // Reset the character counter
    $('.counter').text('140');
      

  });

});
