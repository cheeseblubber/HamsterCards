Trello.Models.Card = Backbone.Model.extend({
  url: function () {
    return "api/lists/" + this.attributes.card.list_id + "/cards"
  },
});
