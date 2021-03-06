Trello.Views.ListItem = Backbone.CompositeView.extend({
  tagName: 'li',

	className: 'list panel single-list',

	idAttribute: function () {
		return this.model.id
	},

  template: JST["lists/show"],

	events: {
		"click .delete-list": "deleteList",
		"click .float-right-button": "deleteCard",
		"click .open-card-composer": "showAddCardForm",
		// "click .list-title": "showEditForm",
		// "submit form.edit-title-input": "editTitle",
	},

	initialize: function () {
		this.cards = this.model.cards()
		this.listenTo(
			this.cards, 'add', this.addCard
		);
		this.listenTo(this.model, 'change', this.changeTitle)
		// this.listenTo(this.model, 'all', this.render);
		this.addCardForm(this.model);

	},

	changeTitle: function () {
		$('.title-text').html(this.model.get('title'))
		$('.edit-title-input').hide()
		// debugger
		$('.list-title').show()
	},

	deleteList: function () {
		// debugger
		this.model.destroy();
		this.remove();
		// $(event.currentTarget).addClass('animated flipOutX');
		// this.cards().each(function(card) {
		//
		// })
		// setTimeout(function(){
			// that.remove();
		// }, 600)
		// this.$el.find("list:animated").promise().done(function(){
		// 	// debugger
		// 	that.remove();
		// })
		// $(":animated").promise().done(function() {
		// 	that.remove();
		// })
	},


	showAddCardForm: function () {
		// $('#'+ this.model.id).show()
		$("." + this.model.id).toggleClass("active")
		$('.' + this.model.id).toggleClass('hidden')
		// debugger
		$(event.target).toggleClass("hidden")
		$(event.target).toggleClass("revealable")
	},

  renderCards: function (list) {
    var that = this;
    var cardCollection = this.cards;
    cardCollection.fetch()
		cardCollection.each(this.addCard.bind(this))
  },

	addCard: function (card) {
		card.comments().fetch()
		var cardView = new Trello.Views.CardItem({ model: card})
		this.addSubview(".cards-list", cardView)
	},


	deleteCard: function () {
		var cardID = $(event.target).attr("id");
		var cardToDelete = this.cards.get(cardID);
	    //not using destroy because url is fucked up
		//need to manually specify url in this case
		//comeback to refactor
		$.ajax({
	      url: "api/cards/" + cardID,
	      method: 'DELETE',
	    })
		// removes subview without having to do a listenTo event
		var subview = _.find(
			this.subviews(".cards-list"),
			function (subview) {
				return subview.model === cardToDelete
			}
		)
		this.removeSubview('.card', subview)
	},


	addCardForm: function(list){
		var that = this
		var cardFormView = new Trello.Views.CardForm({ list: list})
		that.addSubview(".card-form", cardFormView)
	},

	showEditForm: function () {
		$('.list-title').hide()
		$('.edit-title-input').show()
	},

	editTitle: function () {
		event.preventDefault();
		// this.model.set("title", $('.change-title').val())
		this.model.save({"title": $('.change-title').val()}, {
			patch: true
		})
	},

  render: function () {
		var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
		this.renderCards(this.model)
		this.attachSubviews();
		this.$('.edit-title-input').hide()
    return this
  },

  leave: function(){
    this.remove();
  }

});
