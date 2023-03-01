$(document).ready(function() {
  // Select the textarea element inside the form in the .new-tweet section
  let textarea = $('.new-tweet form textarea');
  console.log('text area line 5', textarea);

  // Select the counter element
  let counter = textarea.siblings('.counter');
  console.log('counter line 8', counter);

  // Register an event handler for the input event on the textarea
  textarea.on('input', function() {
    // Get the length of the input value of the textarea
    let length = $(this).val().length;
    console.log('Input length line 14', length);

    // Calculate the remaining characters
    let remaining = 140 - length;
    console.log('remaining characters line, 18', remaining);

    // Update the counter on the page
    $('.new-tweet .counter').text(remaining);

    // Update the counter to red when negative.
    
    // counter.css('color', remaining < 0 ? 'red' : '#3a3131');
    
    if (remaining < 0) {
      $('.counter').css('color', 'red');
    } else {
      $('.counter').css('color', 'black');
    }

  });
});
  