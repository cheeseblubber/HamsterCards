Trello.Views.CardItem = Backbone.CompositeView.extend({

	tagName: 'li',

  template: JST["cards/show"],

	className: 'card',

	// id: function () {
	// 	return this.model.id
	// },

	events: {
		"mouseover": "showFeatures",
		"mouseleave": "hideFeatures",
		"click .float-right-button": "deleteCard",
		"click": "showModal",
	},


	// dragCard: function () {
	// 	this.$el.draggable({
	// 		revert: "invalid",
	// 		start: function () {
	// 			$.notify('Dragging')
	// 			Trello.drag = this.model;
	// 		},
	// 		// zIndex: 1000,
	// 		stack: ".cards-list",
	// 	})
	// },
	initialize: function() {
		this.listenTo(this.model.comments(), 'sync', this.render)
		this.listenTo(this.model, 'change', this.render)
	},

	render: function () {

    var content = this.template({ card: this.model });
    this.$el.html(content);
		// this.dragCard();
		// this.addModal
    return this;
  },

	showFeatures: function () {
		$(".close").removeClass('hidden')
	},

	hideFeatures: function () {
		$(".close").addClass('hidden')
	},

	addModal: function () {
		var that = this
		var modalView = new Trello.Views.ModalItem({ model: that.model})
		// that.addSubview(".add-modal", modalView)
		$('body').append(modalView.render().$el)
		this.modal = modalView
	},



	showModal: function () {
		// var didNotClickOnDownArrow = $(event.target).length === 1
		var  didNotClickOnDownArrow = $(event.target).first().attr('class').indexOf('glyphicon') === -1
		if(didNotClickOnDownArrow){
			this.addModal()
			this.modal.show()
		}
		// this.modal.teardown();
		// $('#cardDetails').modal('show');
	},


	// deleteCard: function () {
	// 	debugger
	// 	var cardID = this.model.id
	// 	var cardToDelete = this.model;
	//     //not using destroy because url is fucked up
	// 	//need to manually specify url in this case
	// 	//comeback to refactor
	// 	$.ajax({
	//       url: "api/cards/" + cardID,
	//       method: 'DELETE',
	//     })
	// 	// removes subview without having to do a listenTo event
	//
	// },

	// Moved this out to list
	// deleteCard: function () {
	// 	//hacked because of routes are different for different Create and delete
	//     $.ajax({
	//       url: "api/cards/" + this.model.id,
	//       method: 'DELETE',
	//     })
	// 	// debugger
	// 	// this.model.destroy()
	// },



})