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
		var body = this.$('.comment-body').val();
		var comment = new Trello.Models.Comment({
			card: this.model,
			body: body,
			card_id: this.model.id
		});

		this.model.comments().create(comment, {
			success: function (){
				$('textarea').val('')
			}
		})
	},

})

// submit: function(event) {
// 	var that = this;
// 	event.preventDefault();
//
// 	var data = { card: {
// 		title: this.$('.title').val(),
// 		// description: this.$('.description').val(),
// 		description: "",
// 		rank: (this.list.cards().length + 1),
// 		list_id: this.list.id,
// 	}}
//
// 	this.list.cards().create(data, {
// 		// without wait true card will not initially render
// 		wait: true,
// 		success: function (that) {
// 			$('textarea').val('')
// 			//clears the textarea out
// 		}
// 	})
// }