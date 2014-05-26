Trello.Views.newComment = Backbone.View.extend({

	template: JST['comments/form'],

	className: "form",

	events: {
		"click .add-comment-button": "submit",
	},

	render: function () {
		var renderContent = this.template()
		this.$el.html(renderContent);
		return this;
	},

	submit: function (event) {
		event.preventDefault();
		debugger
		var body = this.$('.comment-body').val();
		var comment = new Trello.Models.Comment()
		comment.save({
			card: this.model,
			body: body
		})
			debugger
	},

})