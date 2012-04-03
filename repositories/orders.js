module.exports = function(){
  var self = this;

  self.find = function(cb){
    cb([]);
  };

  self.add = function(order, cb){
    cb();
  };

  return self;
};
