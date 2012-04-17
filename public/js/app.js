var authcallback = function(data) {
  window.location = window.location;
};

$('.login-button').click(function(event){
  event.preventDefault();
  openEasyOAuthBox('twitter', authcallback);
});
