var graph = require('fbgraph');


// get authorization url 
var authUrl = graph.getOauthUrl({
    "client_id":     conf.client_id
  , "redirect_uri":  conf.redirect_uri
});

// shows dialog 
res.redirect(authUrl);

// after user click, auth `code` will be set 
// we'll send that and get the access token 
graph.authorize({
    "client_id":      conf.client_id
  , "redirect_uri":   conf.redirect_uri
  , "client_secret":  conf.client_secret
  , "code":           req.query.code
}, function (err, facebookRes) {
  res.redirect('/loggedIn');
});