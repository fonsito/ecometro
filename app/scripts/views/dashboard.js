'use strict';

define([
  'backbone',
  'backboneModal',
  'handlebars',
  'highcharts',
  'highchartsMore',
  'collections/projects',
  'text!../../templates/about-us-modal.handlebars'
], function(Backbone, backboneModal, Handlebars, Highcharts, highchartsMore, ProjectsCollection, aboutUsModalTpl) {

  var DashboardView = Backbone.View.extend({

    el: '#dashboardView',

    events: {
      'click #aboutUs': '_onClickAboutUs',
      'change #selectProject': '_selectProject'
    },

    initialize: function() {
      var self = this;

      // Modals
      this.AboutUsModal = Backbone.Modal.extend({
        template: Handlebars.compile(aboutUsModalTpl),
        cancelEl: '.bbm-button'
      });

      // Cache
      this.$selectProject = $('#selectProject');

      this.projects = new ProjectsCollection();

      this.projects.getData(function(error, results) {
        self._setProjectSelect();
        self._selectProject();
      })
    },

    _onClickAboutUs: function(event) {
      this.aboutUsView = new this.AboutUsModal();
      $('body').append(this.aboutUsView.render().el);
    },

    _setProjectSelect: function(argument) {
      var self = this;
      _.each(this.projects.toJSON(), function(project) {
        $('<option></option>').attr('value', project.cartodb_id).text(project.name_project).appendTo(self.$selectProject)
      });
    },

    _selectProject: function(event) {
      var selectedId = this.$selectProject.val(),
          project = this.projects.where({cartodb_id: Number(selectedId)})[0];
      
      Backbone.Events.trigger('location', project);
      
      //this._setHighchart(project);
      //this._setDetails(project);
    },

    _setHighchart: function(project) {
      this.chart = new Highcharts.Chart(this.highcharts_opts);
    },

    _setDetails: function(project) {
      var container = this.$el.find('#projectDetails');
    },

    highcharts_opts: {
      chart: {
        renderTo:'pentagon',
        polar: true,
        type: 'line'
      },
      title: false,
      pane: {
        size: '80%'
      },
      xAxis: {
        categories: ['RE', 'BC', 'GE', 'GA', 'BI'],
        tickmarkPlacement: 'on',
        lineWidth: 0,
        labels: {
          style: {
            color: '#e91d40',
            fontWeight: 'bold'
          }
        }
      },
      yAxis: {
        gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0,
        labels: false
      },
      colors: ['#84b819'],
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineWidth: 2,
          lineColor: '#e91d40',
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false
              }
            }
          }
        }
      },
      series: [{
        type: 'area',
        name: 'Allocated Budget',
        data: [43000, 19000, 60000, 35000, 17000],
        pointPlacement: 'on'
      }]
    }
  });

  return DashboardView;

});
