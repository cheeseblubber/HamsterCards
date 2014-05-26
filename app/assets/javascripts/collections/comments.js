Trello.Collections.Comments = Backbone.Collection.extend({
	model: Trello.Models.Comment,

	initialize: function (models, options) {
	  this.card = options.card
	},

	url: function () {
		return "api/cards/" + this.card.id + '/comments'
	},

	comparator: function (comments) {
		return comments.get("created_at")
	},
})