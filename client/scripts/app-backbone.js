
// This model will represent the user
var User = Backbone.Model.extend({
  initialize: function() {
    this.set('username', globalUser);
  },
  defaults: {
    friends: {}
  },
  showName: function() {
    alert('Your username is: ' + this.get('username'));
  }
});

var primaryUser = new User();

var Room = Backbone.Model.extend({
  initialize: function() {

  },
  defaults: {
    rooms: {}
  },
  addRoom: function(room) {
    // should be able to add rooms to the rooms attribute
    // get rooms attribute obj, and add to it
  },
  deleteRoom: function(room) {
    // should be able to delete rooms from the rooms attribute
    // locate room to be deleted
  }
});

var Message = Backbone.Model.extend({
  initialize: function() {

  },
  addMessage: function() {
    // should be able to add a message, emit change
    // use setter
  },
  deleteMessage: function() {
    // should be able to delete a message, emit change
    // use getter, setter
  }
});


