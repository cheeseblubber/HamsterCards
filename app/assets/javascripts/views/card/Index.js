Trello.Views.CardIndex = Backbone.View.extend({

	tagName: 'ol',

	className: 'cards-list',

  template: JST['cards/index'],

	// event: {
	// 	"mouseover"
	// }
  initialize: function () {
    this.listenTo(this.collection, 'all', this.render)
    this.subViews = [];
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    var that = this;
    this.collection.each(function (card) {
      var view = new Trello.Views.CardItem({ model: card });
      that.subViews.push(view);
      that.$el.append(view.render().$el);
    });
    return this;
  },
})