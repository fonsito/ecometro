'use strict';

define([
  'backbone',
  'cartodb',
  'views/layer',

  'text!../../queries/transports/metro.pgsql',
  'text!../../queries/transports/buses.pgsql',
  'text!../../queries/transports/trains.pgsql',
  'text!../../queries/transports/airports.pgsql',

  'text!../../queries/climatology/flood-zones.pgsql',
  'text!../../queries/climatology/pluviometry.pgsql',

  'text!../../queries/waste-management/green-points.pgsql',
  'text!../../queries/waste-management/landfills.pgsql',
  'text!../../queries/waste-management/sewage-plants.pgsql',

  'text!../../queries/contamination/nitrogen.pgsql',
  'text!../../queries/contamination/phosphorous.pgsql',
  'text!../../queries/contamination/potasium.pgsql'
], function(Backbone, cartodbLib, LayerView) {

  var queries = {
    metro: arguments[3],
    buses: arguments[4],
    trains: arguments[5],
    airports: arguments[6],
    floodZones: arguments[7],
    pluviometry: arguments[8],
    greenPoints: arguments[9],
    landFills: arguments[10],
    sewagePlants: arguments[11],
    nitrogen: arguments[12],
    phosphorous: arguments[13],
    potasium: arguments[14]
  };

  var MapView = Backbone.View.extend({

    el: '#mapView',

    options: {
      tiles: 'https://cartocdn_c.global.ssl.fastly.net/base-dark/{z}/{x}/{y}.png',
      center: [40.384212768155045, -3.6529541015625],
      zoom: 11
    },

    initialize: function() {
      var self = this;

      this.createMap();
      this.setTiles();

      this.metroLayer = new LayerView({el: this.el});
      this.busesLayer = new LayerView();
      this.trainsLayer = new LayerView();
      this.airportsLayer = new LayerView();

      this.greenPointsLayer = new LayerView();
      this.landFillsLayer = new LayerView();
      this.sewagePlantsLayer = new LayerView();

      this.floodZonesLayer = new LayerView();
      this.pluviometryLayer = new LayerView();

      this.nitrogenLayer = new LayerView();
      this.phosphorousLayer = new LayerView();
      this.potasiumLayer = new LayerView();

      Backbone.Events.on('layer:metro', this.setMetroLayer, this);
      Backbone.Events.on('layer:buses', this.setBusesLayer, this);
      Backbone.Events.on('layer:trains', this.setTrainsLayer, this);
      Backbone.Events.on('layer:airports', this.setAirportsLayer, this);

      Backbone.Events.on('layer:greenpoints', this.setGreenPointsLayer, this);
      Backbone.Events.on('layer:landfills', this.setLandfillsLayer, this);
      Backbone.Events.on('layer:sewageplants', this.setSewagePlantsLayer, this);

      Backbone.Events.on('layer:floodzones', this.setFloodZonesLayer, this);
      Backbone.Events.on('layer:pluviometry', this.setPluviometryLayer, this);

      Backbone.Events.on('layer:nitrogen', this.setNitrogenLayer, this);
      Backbone.Events.on('layer:phosphorous', this.setPhosphorousLayer, this);
      Backbone.Events.on('layer:potasium', this.setPotasiumLayer, this);

      Backbone.Events.on('location', this.setMarker, this);
    },

    createMap: function() {
      this.map = L.map(this.el).setView(this.options.center, this.options.zoom);
    },

    setTiles: function() {
      this.tiles = L.tileLayer(this.options.tiles).addTo(this.map);
    },

    setMetroLayer: function() {
      if (this.metroLayer.layer) {
        this.metroLayer.removeLayer();
      } else {
        this.metroLayer.setLayer(this.map, {
          sql: queries.metro,
          cartocss: '#metro {marker-fill: #e54592;}',
          interactivity: 'name'
        });
      }
    },

    setBusesLayer: function() {
      if (this.busesLayer.layer) {
        this.busesLayer.removeLayer();
      } else {
        this.busesLayer.setLayer(this.map, {
          sql: queries.buses,
          cartocss: '#autobuses_urbanos {marker-fill: #e163f3;}',
          interactivity: 'name'
        });
      }
    },

    setTrainsLayer: function() {
      if (this.trainsLayer.layer) {
        this.trainsLayer.removeLayer();
      } else {
        this.trainsLayer.setLayer(this.map, {
          sql: queries.trains,
          cartocss: '#tren_cercanias {marker-fill: #ff8fdf;}',
          interactivity: 'name'
        });
      }
    },

    setAirportsLayer: function() {
      if (this.airportsLayer.layer) {
        this.airportsLayer.removeLayer();
      } else {
        this.airportsLayer.setLayer(this.map, {
          sql: queries.airports,
          cartocss: '#airports {marker-fill: #ff00b0;}',
          interactivity: 'name'
        });
      }
    },

    setGreenPointsLayer: function() {
      if (this.greenPointsLayer.layer) {
        this.greenPointsLayer.removeLayer();
      } else {
        this.greenPointsLayer.setLayer(this.map, {
          sql: queries.greenPoints,
          cartocss: '#green_points {marker-fill: #85e545;}',
          interactivity: 'name'
        });
      }
    },

    setLandfillsLayer: function() {
      if (this.landFillsLayer.layer) {
        this.landFillsLayer.removeLayer();
      } else {
        this.landFillsLayer.setLayer(this.map, {
          sql: queries.landFills,
          cartocss: '#landfills {marker-fill: #00aa04;}',
          interactivity: 'name'
        });
      }
    },

    setSewagePlantsLayer: function() {
      if (this.sewagePlantsLayer.layer) {
        this.sewagePlantsLayer.removeLayer();
      } else {
        this.sewagePlantsLayer.setLayer(this.map, {
          sql: queries.sewagePlants,
          cartocss: '#sewage_plants {marker-fill: #b7ff8f;}',
          interactivity: 'name'
        });
      }
    },

    setFloodZonesLayer: function() {
      if (this.floodZonesLayer.layer) {
        this.floodZonesLayer.removeLayer();
      } else {
        this.floodZonesLayer.setLayer(this.map, {
          sql: queries.floodZones,
          cartocss: '#zonas_inundables {marker-fill: #62e4ea;}',
          interactivity: 'name'
        });
      }
    },

    setPluviometryLayer: function() {
      if (this.pluviometryLayer.layer) {
        this.pluviometryLayer.removeLayer();
      } else {
        this.pluviometryLayer.setLayer(this.map, {
          sql: queries.pluviometry,
          cartocss: '#pluviometry {marker-fill: #41c743;}',
          interactivity: 'name'
        });
      }
    },

    setNitrogenLayer: function() {
      if (this.nitrogenLayer.layer) {
        this.nitrogenLayer.removeLayer();
      } else {
        this.nitrogenLayer.setLayer(this.map, {
          sql: queries.nitrogen,
          cartocss: '#metro {polygon-opacity: 0.7;line-color: #FFF;line-width: 1;line-opacity: 1;}#metro{polygon-fill: #A6CEE3;}#metro[value="81900"] {polygon-fill: #1F78B4;}#metro[value="28300"] {polygon-fill: #B2DF8A;}#metro[value="400"] {polygon-fill: #33A02C;}#metro[value="70500"] {polygon-fill: #FB9A99;}#metro[value="6100"] {polygon-fill: #E31A1C;}#metro[value="3600"] {polygon-fill: #FDBF6F;}#metro[value="2800"] {polygon-fill: #FF7F00;}#metro[value="23000"] {polygon-fill: #CAB2D6;}#metro[value="4700"] {polygon-fill: #6A3D9A;}#metro {polygon-fill: #DDDDDD;}',
          interactivity: 'name, value'
        });
      }
    },

    setPhosphorousLayer: function() {
      if (this.phosphorousLayer.layer) {
        this.phosphorousLayer.removeLayer();
      } else {
        this.pluviometryLayer.setLayer(this.map, {
          sql: queries.phosphorous,
          cartocss: '#phosphorus_contamination {marker-fill: #feff2a; polygon-fill: #feff2a;}',
          interactivity: 'name, value'
        });
      }
    },

    setPotasiumLayer: function() {
      if (this.potasiumLayer.layer) {
        this.potasiumLayer.removeLayer();
      } else {
        this.potasiumLayer.setLayer(this.map, {
          sql: queries.potasium,
          cartocss: '#potasium_contamination {marker-fill: #fffa72; polygon-fill: #fffa72;}',
          interactivity: 'name, value'
        });
      }
    },

    setMarker: function(project) {
      var icon = L.icon({
        iconUrl: 'images/marker.png',
        iconSize: [40, 53]
      });

      var geolatlng = JSON.parse(project.get('latlng')).coordinates;

      var latlng = [geolatlng[1], geolatlng[0]];

      if (this.location) {
        this.map.removeLayer(this.location);
      }

      this.location = L.marker(latlng, {
        icon: icon
      });
      this.location.bindPopup(project.get('name_project'));
      this.location.addTo(this.map);
      this.map.setView(latlng, this.options.zoom);
    }

  });

  return MapView;

});
