'use strict';

require.config({

  paths: {
    jquery: '../vendor/jquery/dist/jquery',
    underscore: '../vendor/underscore/underscore',
    backbone: '../vendor/backbone/backbone',
    handlebars: '../vendor/handlebars/handlebars',
    text: '../vendor/requirejs-text/text',
    sprintf: '../vendor/sprintf/src/sprintf',
    moment: '../vendor/momentjs/moment',
    spin: '../vendor/spinjs/spin',
    cartodb: '../vendor/cartodb/dist/cartodb.nojquery',
    backboneModal: '../vendor/Backbone.Modal/backbone.modal',
    highcharts: '../vendor/highcharts/highcharts',
    highchartsMore: '../vendor/highcharts/highcharts-more'
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
    },
    highchartsMore: {
      deps: ['highcharts']
    },
    highcharts: {
      deps: ['jquery'],
      exports: 'Highcharts'
    }
  }

});

require([
  'views/map',
  'views/toolbar',
  'views/dashboard'
], function(MapView, ToolbarView, DashboardView) {

  $('#header').addClass('transition-enter');
  $('#dashboardView').addClass('transition-enter');

  new MapView();
  new ToolbarView();
  new DashboardView();

});
