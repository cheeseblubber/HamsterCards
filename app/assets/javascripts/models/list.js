Trello.Models.List = Backbone.Model.extend({

  url: function () {
    return "api/boards/" + this.attributes.list.board_id + "/lists"
  },

  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards);
      delete(response.cards);
    }
    return response
  },

  cards: function () {
    if(!this.get('cards')) {
      var collection = new Trello.Collections.Cards([], { list: this });
      this.set("cards", collection)
    }
    return this.get("cards")
  },

});

