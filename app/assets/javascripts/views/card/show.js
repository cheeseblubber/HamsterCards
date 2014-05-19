Trello.Views.CardItem = Backbone.CompositeView.extend({
  template: JST["card/show"],

  render: function () {
    var view = this;
    var renderContent = this.template({
      card: this
    });

    this.$el.html(renderedContent);
    this.attachSubviews();
  }
})