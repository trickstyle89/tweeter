$(document).ready(function() {
  // Select the textarea element inside the form in the .new-tweet section
  let textarea = $('.new-tweet form textarea');
    
  // Register an event handler for the input event on the textarea
  textarea.on('input', function() {
    // Code to be executed when the input event is triggered
    console.log('Textarea input event triggered!');
  });
});