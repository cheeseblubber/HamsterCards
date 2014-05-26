Trello.Views.ModalItem = Backbone.CompositeView.extend({

	// className: 'modal fade hide',

	id: "cardDetails",

	template: JST["modals/show"],

	show: function () {
		this.$('.modal').modal('show');
		// $('#cardDetails').modal('show')
	},

	initialize: function () {
		// this.listenTo( this.model.comments(), 'sync', this.render)
		this.listenTo( this.model.comments(), 'add', this.addComment)
	},

	events: {
		"click .show-comment-form": 'showDescriptionForm',
		"submit form": "editDescription",
		"click .add-comment-button": "saveComment",
		'hidden': 'teardown'
	},

	teardown: function() {
    this.$el.data('modal', null);
    this.remove();
  },

	showDescriptionForm: function () {
		//refactor this to create a method
		var target = event.target
		var parentIsForm = $(event.target).parents().is('form');
		var isModalOrParent = $(event.target).parents().is('modal-body') ||
		$(event.target).hasClass('modal-body') ;
		if( !parentIsForm && !isModalOrParent){
			this.toggleHideables('description')
			$('.description-body').on('blur', function () {
				$('.description').hide('slow')
			})
		}
	},




	//comeback to add comment form it is deleting weverything when it renders
	addCommentForm: function () {
		var commentFormView = new Trello.Views.newComment({ model: this.model })
		// $('.comment-list').append(commentFormView.render().$el)
		this.addSubview(".comment-form", commentFormView);
	},

	renderComments: function () {
		var commentCollection = this.model.comments();
		commentCollection.fetch();
		// debugger
		commentCollection.each(this.addComment.bind(this));
	},

	addComment: function (comment) {
		var commentView = new Trello.Views.CommentItem({ model: comment});
		// $('.comment-list').append(commentView.render().$el)
		this.addSubview(".comment-list", commentView);
	},

	render: function () {
		var list = this.model.collection.list
		var renderedContent = this.template({
			card: this.model,
			list: list
		})
		// console.log(this.model.comments())
		this.$el.html(renderedContent)
		this.addCommentForm();
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