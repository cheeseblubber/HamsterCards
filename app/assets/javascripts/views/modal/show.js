Trello.Views.ModalItem = Backbone.CompositeView.extend({

	// className: 'modal fade hide',

	id: "cardDetails",

	template: JST["modals/show"],

	show: function () {
		this.$('.modal').modal('show');
		// $('#cardDetails').modal('show')
	},

	events: {
		"click .show-comment-form": 'showForm',
	},

	teardown: function() {
    this.$el.data('modal', null);
    this.remove();
  },

	showForm: function () {
		//refactor this to create a method
		var parentIsForm = $(event.target).parents().is('form');
		if( !parentIsForm){
			this.toggleHideables('description')
		}
		// if($('.description').attr('class').indexOf('hidden') != 0 ){
		// 	this.toggleHideables('description')
		// 	debugger
		// }

	},

	render: function () {
		var list = this.model.collection.list
		var renderedContent = this.template({
			card: this.model,
			list: list
		})
		this.$el.html(renderedContent)
		this.$el.modal({show:false});
		return this
	},

	toggleHideables: function (selector) {
		$('.' + selector).toggleClass('active');
		$('.' + selector).toggleClass('hidden');
		$(event.target).toggleClass('hidden');
		$(event.target).toggleClass('revealable')
	},

  // _swapView: function(view){
  //   this._currentView && this._currentView.remove();
  //   this._currentView = view;
  //   this.$rootEl.html(view.render().$el);
  // },
})