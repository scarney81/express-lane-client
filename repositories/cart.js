module.exports = function(){
  var self = this;

  self.find = function(session, cb){
    cb([]);
  };

  self.add = function(session, product, cb){
    cb();
  };

  self.remove = function(session, product, cb){
    cb();
  };

  return self;
};
