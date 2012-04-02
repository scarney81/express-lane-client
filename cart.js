module.exports = function(){
  var self = this;

  self.find = function(emailAddress, cb){
    cb([]);
  };

  self.add = function(emailAddress, product, cb){
    cb();
  };

  self.remove = function(emailAddress, product, cb){
    cb();
  };

  return self;
};
