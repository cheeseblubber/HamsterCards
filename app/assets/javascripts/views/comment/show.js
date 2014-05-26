Trello.Views.CommentItem = Backbone.View.extend({

	className: 'li',

	template: JST['comments/show'],

	render: function () {
		var renderedContent = this.template({ comment: this.model })
		this.$el.html(renderedContent.$el);
		return this;
	},

})