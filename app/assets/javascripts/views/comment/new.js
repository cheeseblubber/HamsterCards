Trello.Views.newComment = Backbone.View.extend({

	template: JST['comments/form'],

	className: "form",

	events: {
		"click .add-comment-button": "submit",
		"click .show-new-comment-form": "showNewCommentForm",
	},

	render: function () {
		var renderContent = this.template()
		this.$el.html(renderContent);
		this.$('.new-comment-form').hide();
		return this;
	},

	showNewCommentForm: function () {
		this.revealAndHide('.new-comment-form')

	},

	revealAndHide: function (selector) {
		var $target = $(event.target)
		$target.hide()
		$(selector).show(function () {
			$(".new-comment-input").focus();
		})
		// $('.new-comment-input').on('focusout', function () {
		// 	if($(event.target).attr('class').indexOf('.new-comment-input') != 0){
		// 		$(selector).hide()
		// 		$target.show()
		// 	}
		// })
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
				comment.fetch()
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