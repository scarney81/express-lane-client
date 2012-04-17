/*globals process */
module.exports = { 
  twitter: {
    consumerkey: 'ZoSXsRli8ESyQZ1K5og',
    consumersecret: 'jqAg0PJyLAXUazPQHGvtJqWGRljMOkoDRkxD8h5qk',
    callback: (process.env.TWITTER_CALLBACK || 'http://localhost:3001/auth/twitter_callback')
  }
};