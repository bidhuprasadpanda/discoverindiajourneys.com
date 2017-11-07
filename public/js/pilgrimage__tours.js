$(document).ready(function() {
    $(function() {
        packageCategory = $('.package__name__pilgrim').attr('value');
        $.ajax({
            url: '/pilgrim/' + "category/" + packageCategory,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                $('.pilgrimage__packages__list').html('');
                var similarPacks = '';
                for (var z = 0; z < data.length; z++) {
                    similarPacks += "<div class='col-md-4'><div class='thumb promoted__packs'><header class='thumb-header'><a class='hover-img' href='/package/" + data[z]._id + "/placeid/" + data[z].countryId + "'><img src=" + data[z].images[0] + " alt='Image Alternative text' height='270'></a></header><div class='thumb-caption'><div class='price-wrap'> <div class='price'><span><a href='/package/" + data[z]._id + "/placeid/" + data[z].countryId + "'>View Details</a></span></div></div><div class='information'><div class='type'>Stays</div><div class='destination'><h4>" + data[z].packagename + "</h4></div><div class='city'></div><div class='options'>" + (data[z].itinerary.length - 1) + " Nights- All inclusive</div></div><div class='button-wrap'><a href='#' class='button--primary'>Enquire Now</a></div></div></div></div>";
                }

                $(similarPacks).appendTo('.pilgrimage__packages__list');
            }
        });
    });
});