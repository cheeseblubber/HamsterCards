Trello.Views.Board = Backbone.View.extend({
  tagName: 'ol',

  template: JST['boards/show'],

  initialize: function(){
    this.listenTo(this.collection, 'add sync', this.render)
    this.subViews = [];
  },

  events: {
    'submit .add-list': 'addList',
    'submit .add-member': 'addMember',
    'click .delete-board': 'deleteBoard'
  },

  render: function () {
    var that = this
    var content = that.template({
      board: that.model
    });
    that.$el.html(content);
    return this.subRender();
  },

  //refactor addList and addMember to keep dry
  addList: function (event) {
    event.preventDefault();
    var $form = $(event.target).serializeJSON()
    this.collection.create($form)
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
    // var board = new Trello.Models.Board($form)
    // board.save();

  },

  //renders composite view of each list
  subRender: function () {
    var that = this
    this.collection.each(function (list) {
      var view = new Trello.Views.ListItem({ model: list });
      that.subViews.push(view);
      that.$el.append(view.render().$el);
    })
    return this
  },

  deleteBoard: function () {
    this.model.destroy();
    Backbone.history.navigate('/#', true)
  },

})
