Trello.Models.List = Backbone.Model.extend({

  url: function () {
		if(this.attributes.id) {
	    return "api/boards/" +
			this.attributes.board_id +
			"/lists/"  +
			this.attributes.id
		} else {
	    return "api/boards/" +
			this.attributes.board_id +
			"/lists"
		}
  },

  parse: function (response) {
    if (response.cards) {
      this.cards().set(response.cards);
      delete(response.cards);
    }
    return response
  },

  cards: function () {
    if(!this._cards) {
      this._cards = new Trello.Collections.Cards([], { list: this });
    }
    return this._cards
  },
});

