Trello.Views.CardItem = Backbone.View.extend({

	tagName: 'li',

  template: JST["cards/show"],

	className: 'card',

  render: function () {
    var content = this.template({ card: this.model });
    this.$el.html(content);
    return this;
  }

})