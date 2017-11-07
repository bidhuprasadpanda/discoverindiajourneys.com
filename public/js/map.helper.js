  var placeLatitude = parseFloat($(".placepage_maplat_hidden").text().trim());
  var placeLongitude = parseFloat($(".placepage_maplong_hidden").text().trim());
  var placeName = $(".placepage_placename_hidden").text().trim();
  var placeDescription = $(".placepage_placedescription_hidden").text().trim();

  singleMap();


  // This example displays a marker at the center of Australia.
  // When the user clicks the marker, an info window opens.

  function singleMap() {
      var uluru = { lat: placeLatitude, lng: placeLongitude };
      var map = new google.maps.Map(document.getElementById('mapPlace'), {
          zoom: 4,
          center: uluru
      });

      var contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h3 id="firstHeading" class="mapFirstHeading">' + placeName + '</h3>' +
          '<div id="bodyContent">' +
          '<p>' + placeDescription + '</p>'
      '</div>' +
      '</div>';

      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      var marker = new google.maps.Marker({
          position: uluru,
          map: map,
          title: placeName
      });
      marker.addListener('click', function() {
          infowindow.open(map, marker);
      });
  }