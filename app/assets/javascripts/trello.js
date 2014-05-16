window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {


    var $rootEl = $('#content')
    boards = new Trello.Collections.Boards();
    boards.fetch({
      success: function () {
        new Trello.Routers.Router(boards, $rootEl);
        Backbone.history.start();
      },
      error: function () {
        alert("Failed to fetch(I am in Line 17 of trello.js)")
        console.log('Failed to fetch.');
      }
    });
  }
};

$(function() {
  Trello.initialize();
});