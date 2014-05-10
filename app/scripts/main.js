'use strict';

require.config({

  paths: {
    jquery: '../vendor/jquery/jquery',
    underscore: '../vendor/underscore/underscore',
    backbone: '../vendor/backbone/backbone',
    handlebars: '../vendor/handlebars/handlebars',
    text: '../vendor/requirejs-text/text',
    sprintf: '../vendor/sprintf/src/sprintf',
    moment: '../vendor/momentjs/moment',
    spin: '../vendor/spinjs/spin',
    cartodb: '../vendor/cartodb/dist/cartodb.nojquery',
    backboneModal: '../vendor/Backbone.Modal/backbone.modal'
  },

  shim: {
    jquery: {
      exports: '$'
    },
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    sprintf: {
      exports: 'sprintf'
    },
    cartodb: {
      deps: ['jquery']
    },
    backboneModal: {
      deps: ['backbone']
    }
  }

});

require([
  'underscore',
  'cartodb',
  'views/map',
  'views/toolbar',
  'views/dashboard'
], function(_, cartodbLib, MapView, ToolbarView, DashboardView) {

  // CARTODB Hack
  cdb.core.Template.compilers = _.extend(cdb.core.Template.compilers, {
    handlebars: typeof(Handlebars) === 'undefined' ? null : Handlebars.compile
  });

  $('#header').addClass('transition-enter');
  $('#dashboardView').addClass('transition-enter');

  new MapView();
  new ToolbarView();
  new DashboardView();

});
