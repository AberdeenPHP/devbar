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
        zoom: 14,
        center: {
            lat: 57.1498817,
            lng: -2.1960762
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

    var infowindow = new google.maps.InfoWindow();

    // add markers
    $.get('https://rawgit.com/AberdeenPHP/devbar/master/data.csv', function(data, status){
          var result = $.csv.toObjects(data);
          //console.log(result);
          var arrayLength = result.length;
          for (var i = 0; i < arrayLength; i++) {
            if (result[i].lat != "" && result[i].long != "") {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(result[i].lat, result[i].long),
                    map: map
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(infoContent(result[i]));
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
          }
    });   
}

function infoContent(marker){
    var output = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">'+marker.title+'</h3>'+
        '<div id="bodyContent">'+
        '<p><b>'+marker.title+'</b> '+marker.description+'</p>';
        
    if (marker.media != "") {
        output += '<img src=\'https://rawgit.com/AberdeenPHP/devbar/master/media/'+ marker.media + '\'>';
    }
    if (marker.url != "") {
        output += '<a href=\''+ marker.url + '\'>read more...</a>';
    }        
    output += '</div>'+
        '</div>';    

}
