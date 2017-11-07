$(document).ready(function() {
    $(function() {
        var packageId = $('.hidden__package__idfield').attr('value');
        /* console.log(packageId); */
        var destinationId = $('.hidden__packagedestination__idfield').attr('value');
        /* console.log(destinationId); */
        $.ajax({
            url: '/packagedetailspage/' + "packageId/" + packageId + "/" + "destinationId/" + destinationId,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                $('.package__itinerary__details').html('');
                var blankitinerary = "";
                for (var i = 0; i < data[0].itinerary.length; i++) {
                    blankitinerary += "<li><div class='booking-item'><div class='row'><div class='col-md-4'><a href=" + data[0].images[i] + " class='pop'><img src=" + data[0].images[i] + "  alt='Image Alternative text' title='hotel PORTO BAY RIO INTERNACIONAL rooftop pool' /></a></div><div class='col-md-8'><h4 class='booking-item-title itinerary-title'>DAY " + (i + 1) + " : " + data[0].itinerary[i].title + "</h4><p class='itinerary-text'>" + data[0].itinerary[i].description + "</p></div></div></div></li>";
                }

                $(blankitinerary).appendTo('.package__itinerary__details');

                $('.inclusions__packages').html('');
                var inclusionStr = data[0].packageinclude;
                var arrStr = inclusionStr.split('.');

                for (var j = 0; j < (arrStr.length - 1); j++) {
                    $(".inclusions__packages").append("<li><i class='fa fa-check'></i> " + arrStr[j] + "</li>")
                }

                $('.exclusions__packages').html('');
                var exclusionStr = data[0].packageexclude;
                var exclStr = exclusionStr.split('.');
                for (var k = 0; k < (exclStr.length - 1); k++) {
                    $(".exclusions__packages").append("<li><i class='fa fa-check'></i> " + exclStr[k] + "</li>")
                }
            }
        });
        $.ajax({
            url: '/morepackages/' + "packageId/" + packageId + "/" + "destinationId/" + destinationId,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                $('.similar__packages__list').html('');
                var similarPacks = '';
                for (var z = 0; z < data.length; z++) {
                    similarPacks += "<div class='col-md-4'><div class='thumb promoted__packs'><header class='thumb-header'><a class='hover-img' href='/package/" + data[z]._id + "/placeid/" + data[z].countryId + "'><img src=" + data[z].images[0] + " alt='Image Alternative text' height='270'></a></header><div class='thumb-caption'><div class='price-wrap'> <div class='price'><span><a href='/package/" + data[z]._id + "/placeid/" + data[z].countryId + "'>View Details</a></span></div></div><div class='information'><div class='type'>Stays</div><div class='destination'><h4>" + data[z].packagename + "</h4></div><div class='city'></div><div class='options'>" + (data[z].itinerary.length - 1) + " Nights- All inclusive</div></div><div class='button-wrap'><a href='#' class='button--primary'>Enquire Now</a></div></div></div></div>";
                }

                $(similarPacks).appendTo('.similar__packages__list');
            }
        });
    });
});