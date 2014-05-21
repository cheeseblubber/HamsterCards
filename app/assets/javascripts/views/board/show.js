Trello.Views.Board = Backbone.CompositeView.extend({
  tagName: 'ol',

  template: JST['boards/show'],

  initialize: function() {
    // this.listenTo(this.collection, 'sync', this.render)
    this.listenTo(
      this.model.lists(), "add", this.addList
    );
    // this.subViews = [];
    var listNewView = new Trello.Views.ListItem({ model: this.model });
    // adds the list initially
    var listFormView = new Trello.Views.newList({ model: this.model });

    this.addSubview(".add-list-form", listFormView);
    this.addSubview(".lists", listNewView);
    this.model.lists().each(this.addList.bind(this));
  },

  addList: function (list) {
    var listShow = new Trello.Views.ListItem({ model: list })
    this.addSubview(".lists", listShow);
    // this.renderCards(list)
  },

  // renderCards: function (list) {
  //   var that = this
  //   var cardCollection = new Trello.Collections.Cards([], { list: list })
  //   cardCollection.fetch()
  //   var cardShow = new Trello.Views.CardIndex({ collection: cardCollection})
  //   that.addSubview(".cards-list", cardShow)
  // },


  render: function () {
    var view = this;
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
    return this;
  },

  addMember: function (event) {
    event.preventDefault();
    var $form = $(event.target).serializeJSON()
    var that = this;
    $.ajax({
      url: "api/boards/" + this.model.id,
      method: 'PATCH',
      data: $form,
      success: function() {
        Backbone.history.navigate('#/board/' + that.model.id, true)
      },
      error: function(response) {
      }
    })
  },

  deleteBoard: function () {
    this.model.destroy();
    Backbone.history.navigate('/#', true)
  },

})
