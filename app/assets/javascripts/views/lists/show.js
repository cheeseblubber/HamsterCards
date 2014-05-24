Trello.Views.ListItem = Backbone.CompositeView.extend({
  tagName: 'li',

	className: 'list panel',

	idAttribute: function () {
		return this.model.id
	},

  template: JST["lists/show"],

	events: {
		"click .delete-list": "deleteList"
	},

	initialize: function () {
		// this.cards = this.model.cards()
		// instead of rendering every time refactor this
		// to use sync and subviews
		this.listenTo(this.model.cards(), 'add', this.addCard)
		// this.cards.fetch();
		this.addCardForm(this.model);
		// this.cards.each(this.addCard.bind(this));
	},

	deleteList: function () {
		this.model.destroy();
		this.remove();
	},

	addCard: function(list){
		var cardView = new Trello.Views.CardItem({ model: list})
		this.addSubview(".cards-list", cardView)
	},


	//refactor to remove index views
  // renderCards: function (list) {
  //   var that = this
  //   var cardCollection = new Trello.Collections.Cards([], { list: list })
  //   cardCollection.fetch()
  // 		//problem is this fetch here the list doesn't have an id yet
  //   var cardShow = new Trello.Views.CardIndex({ collection: cardCollection})
  //   that.addSubview(".cards-list", cardShow)
  // },

  renderCards: function (list) {
    var that = this
    var cardCollection = this.model.cards();
    cardCollection.fetch()
		cardCollection.each(this.addCard.bind(this))
    // var cardShow = new Trello.Views.CardIndex({ collection: cardCollection})
    // that.addSubview(".cards-list", cardShow)
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
		// debugger
		this.renderCards(this.model)
		this.attachSubviews();
    return this
  },

  leave: function(){
    this.remove();
  }

});