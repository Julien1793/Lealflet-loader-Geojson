(function (window) {
    'use strict';

    function initMap() {
        var control;
        var L = window.L;

        var google = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', 
            { zIndex: 50, opacity: 1, maxZoom: 24, subdomains: ["mt0", "mt1", "mt2", "mt3"],
            attribution: 'Google Satellite'
            });
        
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
    
        var baseMaps = {
            "Google satellite": google,
            "OSM":osm
        };

        var map = L.map('map', {
            center: [48.5538231,1.9302962],
            zoom: 12
        }).addLayer(osm);

        var layerControl = L.control.layers(baseMaps).addTo(map);

        var style = {
            color: 'red',
            opacity: 1.0,
            fillOpacity: 0.2,
            weight: 1,
            clickable: true
        };

        L.Control.FileLayerLoad.LABEL = '<img class="icon" src="folder.svg" alt="file icon"/>';
        

        control = L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                onEachFeature: function (feature,layer){
                    let featureProperties = feature.properties;
                    let popupHtml = '';
                    for(let property in featureProperties) {
                        popupHtml+=`<b>${property}:</b> ${featureProperties[property]}<br>`
                        }
                        layer.bindPopup(popupHtml)
                },

                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                        latlng,
                        { style: style },

                    );

                }
            }
        });
        
        control.addTo(map);


        control.loader.on('data:loaded',function (e) {
            var layer = e.layer;
            console.log(layer);
        });
    }

    window.addEventListener('load', function () {
        initMap();
    });
    




    
    

    
}(window));
