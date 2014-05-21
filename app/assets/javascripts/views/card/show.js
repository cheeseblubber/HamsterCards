Trello.Views.CardItem = Backbone.View.extend({

  template: JST["cards/show"],

	className: 'card',

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }

})