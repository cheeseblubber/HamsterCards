Trello.Collections.Comments = Backbone.Collection.extend({
	url: function () {
		return "api/cards/" + this.model.id + '/comments'
	},
})