module.exports = function(){
  var self = this;

  self.find = function(page, pageSize, cb){
    cb([]);
  };

  self.get = function(id, cb){
    cb({});
  };

  return this;
};
