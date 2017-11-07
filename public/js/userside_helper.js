 //Post Subscribers
 $(document).ready(function() {
     //No Backbutton
     /* function noBack() {
          window.history.forward()
      }
      noBack();
      window.onload = noBack;
      window.onpageshow = function(evt) { if (evt.persisted) noBack() }
      window.onunload = function() { void(0) }*/

     var placeId = $(".placepage_id_hidden").text().trim();
     var countryIdInPlace = $(".placecountry_id_hidden").text().trim();
     $.ajax({
         url: '/placedetails/' + $(".placepage_id_hidden").text().trim(),
         type: "GET",
         dataType: 'json',
         success: function(resultPlace) {
             var packageDiv;
             for (var i = 0; i < resultPlace.length; i++) {
                 packageDiv = '<div class="col-md-4"><div class="grid-item pack-item"><div class="grid-item-inner"><div class="media-box"><a href="/package/' + resultPlace[i]._id + '/countryid/' + resultPlace[i].countryId + '"><img src="' + resultPlace[0].images[i] + '" alt=""></a></div><div class="grid-content home_package_detail"><h3><a href="/package/' + resultPlace[i]._id + '/countryid/' + resultPlace[i].countryId + '">' + resultPlace[i].packagename + '</a></h3><div class="price_list"><p class="marg-top"><sup class="ng-binding">$</sup> <span class="room-avg-price ng-binding">' + resultPlace[i].mixWithOccupancies.roomoccupancyprice[0].options[0].priceperadult + '<span class="avg-night">Per Person</span></span></p></div></div></div><div class="ico-back"><div class="col-md-8 col-xs-8 pack-icon"><img src="/images/pack-icons/icon1.svg" alt=""><img src="/images/pack-icons/icon2.svg" alt=""><img src="/images/pack-icons/icon3.svg" alt=""><img src="/images/pack-icons/icon4.svg" alt=""></div><div class="col-md-4 col-xs-4 night-info-country"><span>' + resultPlace[i].itinerary.length + '</span> Days</div></div></div></div>'

                 $(packageDiv).appendTo('.place_package_div');
             }

         }
     });


     $('.1st_child').hide();
     $('.2nd_child').hide();
     $(document).on('change', '.numberOfChildren', function() {
         console.log($(this).val());

         if ($(this).val() == '1') {
             $(this).parents('.roomsAccomodationSeleted').find('.1st_child').show();
             $(this).parents('.roomsAccomodationSeleted').find('.2nd_child').hide();
         } else if ($(this).val() == '2') {
             $(this).parents('.roomsAccomodationSeleted').find('.1st_child').show();
             $(this).parents('.roomsAccomodationSeleted').find('.2nd_child').show();
         } else {
             $(this).parents('.roomsAccomodationSeleted').find('.1st_child').hide();
             $(this).parents('.roomsAccomodationSeleted').find('.2nd_child').hide();
         }
     });
 });
 $('.subscribe-submit').on('click', createSubscriber);

 function createSubscriber() {
     if ($.trim($(this).parents('.subscription-body').find('.subscribe-input').val()) == '') {
         $.notify("Email field can not be left blank", "warn");
     } else {
         var data = {
             emailID: $(this).parents('.subscription-body').find('.subscribe-input').val()
         }

         $.ajax({
                 url: "/",
                 data: data,
                 type: "POST",
                 dataType: 'json',
                 success: function(data) {
                     console.log(data);
                     $.notify("Your Email Has Been Registered With Us", "success");
                     $('.subscribe_modal_popup').modal('hide');
                     $('form.subscribe-form').trigger("reset");
                 },
                 error: function(data) {
                         $.notify("Email Address is Already Registered", "warn");
                         $('form.subscribe-form').trigger("reset");
                     }
                     //  $(document).ready(function() {});
             }

         )
     };
 }

 var placenamePackage = [];
 var latitudePlace = [];
 var longitudePlace = [];


 var arrLength = $('span.map_package_placename').length;

 placenamePackage = $.map($("span.map_package_placename"), function(place, index) {
     return $(place).html().trim();
 });

 latitudePlace = $.map($("span.map_package_latitude"), function(lat, index) {
     return $(lat).attr('data-id').trim();
 });

 longitudePlace = $.map($("span.map_package_longitude"), function(long, index) {
     return $(long).attr('data-id').trim();
 });

 var locations = [];

 for (var arr = 0; arr < arrLength; arr++) {

     var maplocation = [
         placenamePackage[arr], parseFloat(latitudePlace[arr]), parseFloat(longitudePlace[arr])
     ];
     locations.push(maplocation);
 }


 if (locations) {
     initMap(locations);
 }


 function initMap(locations) {

     var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 5,
         center: new google.maps.LatLng(locations[0][1], locations[0][2]),
         mapTypeId: google.maps.MapTypeId.ROADMAP
     });

     var infowindow = new google.maps.InfoWindow();

     var marker, i;

     for (i = 0; i < locations.length; i++) {
         marker = new google.maps.Marker({
             position: new google.maps.LatLng(locations[i][1], locations[i][2]),
             map: map
         });

         google.maps.event.addListener(marker, 'click', (function(marker, i) {
             return function() {
                 infowindow.setContent(locations[i][0]);
                 infowindow.open(map, marker);
             }
         })(marker, i));
     }
 }

 //var packageID = $(this).parents('.package_price_details').find(".package_id_hidden").text();

 var packageId = $(".package_id_hidden").text().trim();

 var countryId = $(".country_id_hidden").text().trim();

 var dataPackage = {
     packageid: packageId,
     countryid: countryId
 }

 $.ajax({
     url: '/packageprice/' + $(".package_id_hidden").text().trim(),
     type: "GET",
     dataType: 'json',
     success: function(result) {
         result.forEach(function(e) {
             var len = e.roomoccupancyprice.length;
             var content;
             $(".package_price_details tbody").empty();
             for (var j = 0; j < len; j++) {
                 for (var k = 0; k < e.roomoccupancyprice[j].options.length; k++) {
                     content = '<tr><td>Price per person(from ' + e.roomoccupancyprice[j].options[k].fromdate + ' to ' + e.roomoccupancyprice[j].options[k].todate + ')</td><td>' + e.roomoccupancyprice[j].options[k].priceperadult * 2 + '</td><td>' + e.roomoccupancyprice[j].options[k].priceperadult + '</td></tr>'
                     $(content).appendTo('.package_price_details tbody');
                 }
             }
         });
     }

 });

 $.ajax({
     url: '/packagedetails/' + $(".package_id_hidden").text().trim(),
     type: "GET",
     dataType: 'json',
     success: function(result) {
         var resLenght = result[0].itinerary.length;
         var restwolnt = result[1].length;
         // console.log(result[1][0]);
         var day = [];

         var groups = {};
         for (var res = 0; res < restwolnt; res++) {
             var day = result[1][res]._id.day;
             if (!groups[day]) {
                 groups[day] = [];
             }
             groups[day].push([result[1][res]._id.hotelname, result[1][res]._id.hotelId]);
         }
         myArray = [];
         myArrayHotelIId = [];
         for (var dayName in groups) {
             myArray.push({ day: day, hotelname: groups[day] });

         }
         // console.log(myArray);
         var itinerarydiv;
         for (var d = 0; d < resLenght; d++) {
             itinerarydiv = '<div class="col-md-12 mt20 itinarary-day-details"><div class="col-md-5 mt40"><img src=' + result[0].images[d] + ' alt="" style="width:100%;height:230px;"></div><div class="col-md-7"><h4>Day' + (d + 1) + ': "' + result[0].itinerary[d].title + '" </h4><div class="list-stylez"><ul><li>' + result[0].itinerary[d].description + '</li></ul></div><p class="special-text">Accomodation Options</p>';
             for (var p = 0; p < myArray[d].hotelname.length; p++) {
                 itinerarydiv += '<p class="accomodation-modal"> Option ' + (p + 1) + ':<span class="accomodation-option-hotelname" data-toggle="modal" data-target="#myModal1" data-backdrop="static" data-keyboard="false" data-id="' + myArray[d].hotelname[p][1] + '"> ' + myArray[d].hotelname[p][0] + '</span></p>';
             }
             itinerarydiv += '</div></div>'
             $(itinerarydiv).appendTo('.itinerary_div');
         }
     }
 });