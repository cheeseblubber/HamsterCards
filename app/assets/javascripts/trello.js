window.Trello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {


    var $rootEl = $('#content')
    boards = new Trello.Collections.Boards();
    boards.fetch({
      success: function () {
        new Trello.Routers.Router(boards, $rootEl);
        Backbone.history.start();
      },
      error: function () {
        alert("Failed to fetch(I am in Line 17 of trello.js)")
        console.log('Failed to fetch.');
      }
    });
  }
};

Backbone.CompositeView = Backbone.View.extend({
  // composite views create private helper methods to keep the code dry when
  //creating subviews

  addSubview: function () {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

      selectorSubViews.push(subview);

      var $selectorEl = this.$(selector);
      $selectorEl.append(subview.$el);
  },

  // attachSubviews

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    //remove all dem subviews
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);
      //this removes a specific subviews
    var subviewIndex = selectorSubviews.indexOf(subview)
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function () {
    var view = this;

    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      })
    })
  },


  subViews: function () {
    if (!this._subviews) {
      this._subviews = {};
      //subviews are a hash of subvies that gets appended
    }

    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subview[selector] || [];
      return this._subviews[selector];
    };
  },
}),

$(function() {
  Trello.initialize();
});