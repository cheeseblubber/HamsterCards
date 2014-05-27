Trello.Views.ModalItem = Backbone.CompositeView.extend({

	// className: 'modal fade hide',

	id: "cardDetails",

	template: JST["modals/show"],

	show: function () {
		this.$('.modal').modal('show');
		// $('#cardDetails').modal('show')
	},

	initialize: function () {
		this.listenTo( this.model.comments(), 'add', this.addComment)
		// this.listenTo(this.model, 'change', this.render)
		this.addCommentForm();
	},

	events: {
		"click .show-comment-form": 'showDescriptionForm',
		"submit form": "editDescription",
		"click .add-comment-button": "saveComment",
		'hidden': 'teardown',
		"click .delete-comment": "deleteComment",
		"click .edit-comment": "editComment",
	},

	teardown: function() {
    this.$el.data('modal', null);
    this.remove();
  },

	// showDescriptionForm: function () {
// 		//refactor this to create a method
// 		var target = event.target
// 		var parentIsForm = $(event.target).parents().is('form');
// 		var isModalOrParent = $(event.target).parents().is('modal-body') ||
// 		$(event.target).hasClass('modal-body') ;
// 		if( !parentIsForm && !isModalOrParent){
// 			this.toggleHideables('description')
// 			$('.description-body').on('blur', function () {
// 				$('.description').hide('slow')
// 			})
// 		}
// 	},
	showDescriptionForm: function () {
		this.revealAndHide('.description');
	},

	revealAndHide: function (selector) {
		var $target = $(event.target)
		$target.hide()
		$(selector).show(function () {
			$(selector).focus();
		})
		// $(selector).on('focusout', function () {
		// 	if($(event.))
		// 	$(selector).hide()
		// 	$target.show()
		// })
	},


	//comeback to add comment form it is deleting weverything when it renders
	addCommentForm: function () {
		var commentFormView = new Trello.Views.newComment({ model: this.model })
		// $('.comment-list').append(commentFormView.render().$el)
		this.addSubview(".comment-form", commentFormView);
	},

	renderComments: function () {
		var commentCollection = this.model.comments();
		commentCollection.each(this.addComment.bind(this));
	},

	addComment: function (comment) {
		var commentView = new Trello.Views.CommentItem({ model: comment});
		// $('.comment-list').append(commentView.render().$el)

		this.addSubview(".comment-list", commentView);
	},


	deleteComment: function () {
		var commentId = $(event.target).attr('id');
		var commentToDelete = this.model.comments().where({id: parseInt(commentId)}).pop()
		commentToDelete.destroy({
			url: ("api/cards/" + this.model.id + "/comments/" + commentId),
			success: function () {
				console.log("it works")
			},
		});
		var subview = _.find(
			this.subviews(".comment-list"),
			function (subview) {
				return subview.model === commentToDelete
			}
		)
		this.removeSubview('.commentItem', subview)
	},


	render: function () {
		var list = this.model.collection.list
		var renderedContent = this.template({
			card: this.model,
			list: list
		})
		// console.log(this.model.comments())
		this.$el.html(renderedContent)
		this.$el.find('.description').hide()
		this.renderComments(this.model)
		this.attachSubviews();
		this.$el.modal({show:false});
		return this
	},

	toggleHideables: function (selector) {
		$('.' + selector).toggleClass('active');
		$('.' + selector).toggleClass('hidden');
		$(event.target).toggleClass('hidden');
		$(event.target).toggleClass('revealable')
	},

	editDescription: function () {
		var that = this
		event.preventDefault();
		var body = this.$('.description-body').val();
		this.model.set("description", body)
		this.model.save({}, {
			url: ('api/cards/' + this.model.id),
		})
	},
})