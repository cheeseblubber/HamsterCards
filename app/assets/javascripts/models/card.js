Trello.Models.Card = Backbone.Model.extend({

	initialize: function () {
		this.deleteUrl = "api/cards/" + this.id
	},

  url: function () {
    return "api/lists/" + this.attributes.list_id + "/cards"
  },

});
