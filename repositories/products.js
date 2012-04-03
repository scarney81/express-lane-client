module.exports = function(){
  var self = this;

  var fixtures = [
    { id: 1, name: 'product 1', price: 1.99 },
    { id: 2, name: 'product 2', price: 2.99 },
    { id: 3, name: 'product 3', price: 3.99 }
  ];

  self.find = function(page, pageSize, cb){
    cb(fixtures);
  };

  self.get = function(id, cb){
    cb(fixtures[0]);
  };

  return this;
};
