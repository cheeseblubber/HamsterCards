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
  // after refactoring events are located in list views
  // events: {
  //   'submit .add-list': 'submit',    //
  //   // 'submit .add-member': 'addMember',
  //   // 'click .delete-board': 'deleteBoard'
  // },

  addList: function (list) {
    var listShow = new Trello.Views.ListItem({ model: list })
    console.log("adding list")
    this.addSubview(".lists", listShow);
    // var listsShow = new Trello.
  },

  // submit: {
  //
  // },

  //refactored Render
  render: function () {
    var view = this;
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    this.attachSubviews();

    return this;
  },

  // render: function () {
  //   var that = this
  //   var content = that.template({
  //     board: that.model
  //   });
  //   that.$el.html(content);
  //   return this.subRender();
  // },

  //refactor addList and addMember to keep dry
  // addList: function (event) {
  //   event.preventDefault();
  //   var $form = $(event.target).serializeJSON()
  //   this.collection.create($form)
  // },

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

  //renders composite view of each list
  subRender: function () {
    // var that = this
    // this.collection.each(function (list) {
    //   var view = new Trello.Views.ListItem({ model: list });
    //   that.subViews.push(view);
    //   that.$el.append(view.render().$el);
    // })
    return this
  },

  deleteBoard: function () {
    this.model.destroy();
    Backbone.history.navigate('/#', true)
  },

})
