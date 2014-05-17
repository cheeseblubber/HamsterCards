Trello.Routers.Router = Backbone.Router.extend({

  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    '': 'boardsIndex',
    'boards': "boardsIndex",
    'board/new': 'boardNew',
    'board/:id': 'boardShow',
    // 'board/:id/lists/new': 'listNew',
  },

  boardsIndex: function(){
    var indexView = new Trello.Views.BoardsIndex({collection: this.boards});
    this.$rootEl.html(indexView.render().$el);
  },

  boardShow: function(id){
    var board = this.boards.get(id);
    var view = new Trello.Views.Board({
      model: board,
      collection: board.get('lists')
    })
    this._swapView(view)
  },

  boardNew: function () {
    var view = new Trello.Views.NewBoard({
      collection: boards
    });
    this._swapView(view)
  },

  // listNew: function (id) {
  //   var view = new Trello.Views.NewList();
  //   this._swapView(view)
  // },

  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },


});