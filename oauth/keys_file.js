/*globals process */
module.exports = { 
  twitter: {
    consumerkey: '',
    consumersecret: '',
    callback: (process.env.TWITTER_CALLBACK || 'http://localhost:3001/auth/twitter_callback')
  }
};