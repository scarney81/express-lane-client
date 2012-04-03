module.exports = function(){
  var self = this;

  var fixtures = [
    { id: 1, name: 'Batman: Year One', description: 'A new deluxe trade paperback edition of one of the most important and critically acclaimed Batman adventures ever, written by Frank Miller, author of THE DARK KNIGHT RETURNS!', price: 8.10, image: 'http://ecx.images-amazon.com/images/I/41mMXoNTA%2BL._BO2,204,203,200.jpg' },
    { id: 2, name: 'All Star Superman', description: 'The amazing creative team of writer Grant Morrison (BATMAN: ARKHAM ASYLUM) and artist Frank Quitely (WE3) join forces to take Superman back to basics and create a new vision of the World\'s First Super-Hero. This hardcover collection features the first twelve issues of the acclaimed series. Witness the Man of Steel in exciting new adventures featuring Lex Luthor, Jimmy Olsen, Lois Lane, Bizarro, and more.', price: 18.87, image: 'http://ecx.images-amazon.com/images/I/51JiE857XvL._SL500_AA300_.jpg' },
    { id: 3, name: 'Green Lantern: Blackest Night', description: 'Comics hottest writer Geoff Johns (GREEN LANTERN: SINESTRO CORPS WAR, THE FLASH, ACTION COMICS, JSA) and superstar artist Doug Mahnke (JLA, BATMAN, SUPERMAN) raise the dead in this must-read tie-in to the most anticipated comics event of the year, BLACKEST NIGHT. This hardcover collection starring Hal Jordan expands on the War of the Light as the evil Black Lanterns descend on all of the Corps throughout the universe, explains villain Black Hand\'s connection to death and the Black Lantern corps and features key plot points that are essential to enjoying the storyline to it\'s fullest.', price: 13.59, image: 'http://ecx.images-amazon.com/images/I/51iMps-7KjL._SL500_AA300_.jpg' }
  ];

  self.find = function(page, pageSize, cb){
    cb(fixtures);
  };

  self.get = function(id, cb){
    var found = fixtures.filter(function(p){
      return p.id == id;
    });
    if(found && found.length > 0)
      cb(found[0]);
    else
      cb(null);
  };

  return this;
};
