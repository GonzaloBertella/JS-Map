function redireccionarMapa(map, lat, lng) {
  map.setCenter({ lat, lng });
  map.setZoom(16);
}
var platform = new H.service.Platform({
  apikey: "ZR934WKsjQ4pRGokRM7eoeG7tpoew-mPd8GxV1gsxWg",
});

function moveMapToCordoba(map) {
  map.setCenter({ lat: -31.4223465, lng:  -64.180749});
  map.setZoom(15);
}


var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: { lat: 50, lng: 5 },
  zoom: 4,
  pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
  moveMapToCordoba(map);
}

$("#realizarconsulta").click(function () {
  $.ajax({
    url: "https://nhorenstein.com/Coordenada/GetConPunto",
    type: "GET",
    success: function (result) {
      if (result.ok) {
        let lat = result.return.latitud;
        lat = parseFloat(lat);
        let lng = result.return.longitud;
        lng = parseFloat(lng);
      
        redireccionarMapa(map, lat, lng);

        var StickerMapa = new H.map.Marker({
            lat: lat,
            lng: lng,
          });
          map.addObject(StickerMapa);        
      } else {
        
      }
    },
    error: function (error){
        
        let lat = -31.4414104;
        let lng = -64.1935716;
        redireccionarMapa(map, lat, lng);

        var StickerMapa = new H.map.Marker({
            lat: lat,
            lng: lng,
          });
          map.addObject(StickerMapa);
          swal({
            title: "Error",
            text: "Usted fue redireccionado a UTN Córdoba",
            icon: "error",
            button: "Ok",
          });        
    }
  });
});
