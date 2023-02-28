$(document).ready(function() {

  // Selects the textarea element inside the form in the .new-tweet section
  let textarea = $('.net-tweet form textarea');

  //Select the counter element
  let counter = textarea.siblings('.counter');
  console.log('counter line 8', counter);


  //Register an event handler for the input event on the textarea
  textarea.on('input', function() {

    // Get the length of the input value of the textarea
    let length = $(this).val().length;
    console.log('Input length line 14', length);

    // Counts the remaing number of characters
    let remaining = 140 - length;

    //update the counter on the page.
    counter.text(remaining);

  });
});