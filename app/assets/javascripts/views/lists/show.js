Trello.Views.ListItem = Backbone.CompositeView.extend({
  tagName: 'li',

  template: JST["lists/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(
    //   this.model.cards(), "add", this.addCard
    // );
    var cardNewView = new Trello.Views.CardItem({ model: this.model });
    this.addSubview("card-list", cardNewView);
    // this.model.cards().each(this.addCard.bind(this));
  },


	// move this to board class because of rerendering problems
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
		//move these to board class
		this.renderCards(this.model);
		this.renderCardForm(this.model);
    return this
  },

  leave: function(){
    this.remove();
  }

});