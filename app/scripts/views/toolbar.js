'use strict';

define([
  'backbone'
], function(Backbone) {

  var ToolbarView = Backbone.View.extend({

    el: '#toolbarView',

    events: {
      'click a': 'prevent',
      'change .mod-category-child input': '_setLayer',
    },

    _setLayer: function(e) {
      Backbone.Events.trigger('layer:' + $(e.currentTarget).data('layer'));
    },

    prevent: function(e) {
      e.preventDefault();
    }

  });

  return ToolbarView;

});
