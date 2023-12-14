$(document).ready(function() {
  $('#tweet-text').on('input', function() {// Add an input event listener to the textarea
    const textLength = $(this).val().length;// Get the length of the text in the textarea
    const remainingChars = 140 - textLength;// Subtract the length from 140 to get the remaining characters
    $('.counter').text(remainingChars);// Update the counter with the remaining characters

    if (remainingChars < 0) {
      $('.counter').css('color', 'red');// If the counter is less than 0, change the color to red
    } else {
      $('.counter').css('color', '#545149');// Else, change the color back to the original color
    }
  });
});