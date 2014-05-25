Trello.Views.ListItem = Backbone.CompositeView.extend({
  tagName: 'li',

	className: 'list panel',

	idAttribute: function () {
		return this.model.id
	},

  template: JST["lists/show"],

	events: {
		"click .delete-list": "deleteList",
		"click .float-right-button": "deleteCard",
		"click .open-card-composer": "showAddCardForm"
	},

	initialize: function () {
		this.cards = this.model.cards()
		this.listenTo(
			this.cards, 'add', this.addCard
		);
		this.listenTo(this.model, 'all', this.render);
		this.addCardForm(this.model);
	},

	deleteList: function () {
		this.model.destroy();
		this.remove();
	},

	addCard: function (list) {
		var cardView = new Trello.Views.CardItem({ model: list})
		this.addSubview(".cards-list", cardView)
	},

	showAddCardForm: function () {
		// $('#'+ this.model.id).show()
		$("#" + this.model.id).toggleClass("active")
		$('#' + this.model.id).toggleClass('hidden')
		$(event.target).toggleClass("hidden")
		$(event.target).toggleClass("revealable")
	},

  renderCards: function (list) {
    var that = this
    var cardCollection = this.cards;
    cardCollection.fetch()
		cardCollection.each(this.addCard.bind(this))
  },

	deleteCard: function () {
		var cardID = $(event.target).attr("id");
		var cardToDelete = this.cards.get(cardID);
    //not using destroy because url is fucked up
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

  render: function () {
		var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
		this.renderCards(this.model)
		this.attachSubviews();
    return this
  },

  leave: function(){
    this.remove();
  }

});