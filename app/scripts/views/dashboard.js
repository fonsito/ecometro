'use strict';

define([
  'backbone',
  'backboneModal',
  'handlebars',
  'text!../../templates/about-us-modal.handlebars'
], function(Backbone, backboneModal, handlebars, aboutUsModalTpl) {

  var DashboardView = Backbone.View.extend({

    el: '#dashboardView',

    events: {
      'click #aboutUs': '_onClickAboutUs',
      'change #selectProject': '_selectProject'
    },

    initialize: function() {
      // Modals
      this.AboutUsModal = Backbone.Modal.extend({
        template: Handlebars.compile(aboutUsModalTpl),
        cancelEl: '.bbm-button'
      });
    },

    _onClickAboutUs: function(event) {
      this.aboutUsView = new this.AboutUsModal();
      $('body').append(this.aboutUsView.render().el);
    },

    _selectProject: function(event) {
      var selected = $('#selectProject option:selected').text().toLowerCase();
      Backbone.Events.trigger('location:' + selected);
    }

  });

  return DashboardView;

});
