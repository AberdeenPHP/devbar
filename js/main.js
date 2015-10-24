function initMap() {
    var customMapType = new google.maps.StyledMapType([{
        stylers: [{
            hue: '#1A9CE3'
        }, {
            saturation: 50
        }, {
            visibility: 'simplified'
        }, {
            gamma: 2
        }, {
            weight: 4
        }]
    }, {
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [{
            visibility: 'off'
        }]
    },{
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{
            visibility: 'off'
        }]
    }, {
        featureType: 'water',
        stylers: [{
            color: '#1A9CE3',
        }, {
            saturation: -50
        }]
    }], {
        name: 'Custom Style'
    });
    var customMapTypeId = 'custom_style';

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {
            lat: 57.1499749,
            lng: -2.1960765
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControl:false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
        }
    });

    map.mapTypes.set(customMapTypeId, customMapType);
    map.setMapTypeId(customMapTypeId);

}
