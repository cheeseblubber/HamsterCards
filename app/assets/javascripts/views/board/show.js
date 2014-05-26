Trello.Views.Board = Backbone.CompositeView.extend({

	className: 'board',

  template: JST['boards/show'],

	events: {
		"click": "insideTheForm",
		"mouseover": "showDeleteList",
		"click .show-form": "showForm",
		"click .hide-form": "hideForm",
		"click .open-list-composer": "showAddListForm"
	},

  initialize: function() {
    this.listenTo(
      this.model.lists(), "add", this.addList
    );
		this.listenTo(this.model, "change", this.render);
		this.model.lists().each(this.addList.bind(this));
  },

	showForm: function () {
		$(".add-list-form").show()
	},

	hideForm: function () {
		$(".add-list-form").hide()
	},

	// hideAndReveal: function () {
	// 	this.hideHideables();
	// 	// this.revealRevealables();
	// },

	insideTheForm: function () {
		var parentIsForm = $(event.target).parents().is('form');
		if( !parentIsForm){
			this.hideAndReveal();
		}
	},

	//refactor
	hideAndReveal: function () {
		var noneActive = $('.active').length === 0
		if(noneActive){
			$('.revealable').toggleClass('hidden')
			$('.revealable').removeClass('revealable')
		}

		var $hideables = $('.hideable')
		_.each($hideables, function (element) {
			var classes = element.className
			var revealed = classes.indexOf('hidden') === -1
			var active = classes.indexOf('active') != -1
			if(revealed && !active) {
				element.classList.toggle('hidden')
			}
			if(active){
				element.classList.toggle('active')
			}
		})
	},

	showAddListForm: function() {
		$(event.target).toggleClass('hidden');
		$(event.target).toggleClass('revealable');
		$('.add-list').toggleClass('hidden');
		$('.add-list').toggleClass('active');
	},

	// called at initialization
	addListForm: function () {
		var listFormView = new Trello.Views.newList({ model: this.model });
    this.addSubview(".add-list-form", listFormView);
	},

  addList: function (list) {
		//the list might be a board actually it probably is
    var listView = new Trello.Views.ListItem({ model: list })
    this.addSubview(".lists", listView);
  },


  cardsSortable: function(){
    var that = this;
    this.$el.find('.cards-list').sortable({
      axis: 'x,y',
      // placeholder: 'ui-sortable-placeholder',
      // forcePlaceholderSize: true,
      // start: function(event, ui){
      //   $(ui.item).toggleClass('dragged');
      // },
      // stop: function(event, ui){
      //   $(ui.item).toggleClass('dragged');
      // },
      // update: function (event) {
      //   var ids = $(event.target).sortable('toArray', { attribute: "data-id" });
      //   that.updateListRanks(ids);
      // },
    })
  },

  render: function () {
    var view = this;
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    this.attachSubviews();
		this.addListForm();
		this.cardsSortable()
    return this;
  },

  addMember: function (event) {
    event.preventDefault();
    var $form = $(event.target).serializeJSON()
    var that = this;
		//refactor ajax request use BackBone
    $.ajax({
      url: "api/boards/" + this.model.id,
      method: 'PATCH',
      data: $form,
      success: function() {
        Backbone.history.navigate('#/board/' + that.model.id, true)
      }
    })
  },

  deleteBoard: function () {
    this.model.destroy();
    Backbone.history.navigate('/#', true)
  },

})
