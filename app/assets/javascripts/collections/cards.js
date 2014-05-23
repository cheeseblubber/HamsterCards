Trello.Collections.Cards = Backbone.Collection.extend({

  model: Trello.Models.Card,

  initialize: function (models, options) {
	  this.list = options.list
  },

	comparator: function (cards) {
		return cards.get("rank")
	},

  url: function () {
    return "api/lists/" + this.list.id + "/cards"
  },

});