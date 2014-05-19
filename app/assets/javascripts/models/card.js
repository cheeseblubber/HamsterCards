Trello.Models.Card = Backbone.Model.extend({
  url: function () {
    return "api/cards/" + this.id
  },
});