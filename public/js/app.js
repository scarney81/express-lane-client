var authcallback = function(data) {
  window.location = window.location;
};

$('#login').click(function(event){
  event.preventDefault();
  openEasyOAuthBox('twitter', authcallback);
});