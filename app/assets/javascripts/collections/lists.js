Trello.Collections.Lists = Backbone.Collection.extend({
  model: Trello.Models.List,
  initialize: function (models, options) {
    this.board = options.board
  },

  comparator: function (list) {
    return list.get('rank');
  },

});