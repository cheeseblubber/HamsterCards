Trello.Views.ListItem = Backbone.CompositeView.extend({
  tagName: 'li',

	className: 'panel',

  template: JST["lists/show"],

	events: {
		"click .delete-list": "deleteList"
	},

	initialize: function () {
		// instead of rendering every time refactor this
		// to use sync and subviews
		this.listenTo(this.model.cards(), 'all', this.render)
	},

	deleteList: function () {
		this.model.destroy();
	},

	//refactor to remove index views
  renderCards: function (list) {
    var that = this
    var cardCollection = new Trello.Collections.Cards([], { list: list })
    cardCollection.fetch()
    var cardShow = new Trello.Views.CardIndex({ collection: cardCollection})
    that.addSubview(".cards-list", cardShow)
  },

	renderCardForm: function(list){
		var that = this
		var cardFormView = new Trello.Views.CardForm({ list: list})
		that.addSubview(".card-form", cardFormView)
	},

  render: function () {
		var content = this.template({
      list: this.model
    });
    this.$el.html(content);
		this.renderCards(this.model);
		this.renderCardForm(this.model);
    return this
  },

  leave: function(){
    this.remove();
  }

});