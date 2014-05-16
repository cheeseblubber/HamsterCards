Trello.Collections.Boards = Backbone.Collection.extend({
  model: Trello.Models.Board,
  url: 'api/boards',
});