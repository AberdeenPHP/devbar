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

    // TODO: get js object from CSV

    // add markers
    $.get('https://rawgit.com/AberdeenPHP/devbar/master/data.csv', function(data, status){
          console.log(data);
          var result = $.csv.toObjects(data);
          //console.log(result);
          var arrayLength = result.length;
          for (var i = 0; i < arrayLength; i++) {          
            console.log(result[i].title);
            //console.log(result[i].category);
            //console.log(result[i].description);
            console.log(result[i].lat);
            console.log(result[i].long);
            //console.log(result[i].media);             
            //console.log(result[i].url);             
            $( "#data_display" ).append( "<p>" + result[i].title + "</p>" );
            if (result[i].lat != "" && result[i].lat != "") {
                addMarker(result[i], map);
            }
            console.log("\n"); 
          }
    });   
}

function addMarker(marker, map) {
    var infowindow = new google.maps.InfoWindow({
        content: infoContent(marker)
    });

    var marker = new google.maps.Marker({
        position: {lat: parseInt(marker.lat), lng: parseInt(marker.long)},
        map: map,
        title: marker.title
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

function infoContent(marker){
    return '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h1 id="firstHeading" class="firstHeading">'+marker.title+'</h1>'+
        '<div id="bodyContent">'+
        '<p><b>'+marker.title+'</b>'+marker.description+'</p>'+
        '</div>'+
        '</div>';
}
