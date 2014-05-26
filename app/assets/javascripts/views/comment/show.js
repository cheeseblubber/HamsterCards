Trello.Views.CommentItem = Backbone.View.extend({

	template: JST['comments/show'],

	tagName: 'li',

	className: 'commentItem',

	render: function () {
		var renderedContent = this.template({ comment: this.model})
		this.$el.html(renderedContent);
 		return this;
	},

})