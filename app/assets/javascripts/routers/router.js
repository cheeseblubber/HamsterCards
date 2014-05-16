Trello.Routers.Router = Backbone.Router.extend({

  initialize: function (boards, $rootEl) {
    this.boards = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    '': 'boardsIndex',
    'boards': "boardsIndex",
    'board/:id': 'boardShow',
  },

  boardsIndex: function(){
    var indexView = new Trello.Views.BoardsIndex({collection: boards});
    this.$rootEl.html(indexView.render().$el);
  },

  boardShow: function(id){
    var show = new Trello.Views.Board({model: this.boards.get(id)})
    this._swapView(show)
  },


  _swapView: function(view){
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  },

});