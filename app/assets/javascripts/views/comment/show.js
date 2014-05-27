Trello.Views.CommentItem = Backbone.View.extend({

	template: JST['comments/show'],

	tagName: 'li',

	className: 'commentItem',

	events: {
		"click .delete-comment": "deleteComment",
		// "click .edit-comment": "editComment"
	},

	render: function () {
		var renderedContent = this.template({ comment: this.model})
		this.$el.html(renderedContent);
 		return this;
	},

	// deleteComment: function () {
	// 	debugger
	// },
	//
	// editComment: function () {
	//
	// },

})