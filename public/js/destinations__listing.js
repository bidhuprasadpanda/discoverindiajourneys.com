//Indian Destination Listing 

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: '/home/indian-destinations-list',
        success: function(data) {
            console.log(data);
            $('.indian__destinations__list').html('');
            $('.international__destinations__list').html('');
            $('.pilgrimage__packages__list').html('');
            var blankIndianDestination = "";
            var blankInternationalDestination = "";
            var pilgrimageTour = "";
            for (var j = 0; j < data.length; j++) {

                if (data[j].continentId == data[j].mixWithIndianDestination[0]._id && data[j].mixWithIndianDestination[0].name == "India") {
                    blankIndianDestination += "<div class='col-md-4 style_box col-sm-6 col-xs-12 st_fix_3_col'><header class='thumb-header st_avatar_fix'><a href='/indian-destinations/" + data[j]._id + "' class='hover-img'><img width='260' height='260' src=" + data[j].images[0] + "></a></header><div class='image-top-text'><div class='text'><h5>" + data[j].name + "</h5></div><div class='text-link' style='float:right;'><a href='/indian-destinations/" + data[j]._id + "' class='link__package__list' value=" + data[j]._id + "><h5>View Details</h5></a></div></div></div>"
                } else {
                    blankInternationalDestination += "<div class='col-md-4 style_box col-sm-6 col-xs-12 st_fix_3_col'><header class='thumb-header st_avatar_fix'><a href='/international-destination/" + data[j]._id + "' class='hover-img'><img width='260' height='260' src=" + data[j].images[0] + "></a></header><div class='image-top-text'><div class='text'><h5>" + data[j].name + "</h5></div><div class='text-link' style='float:right;'><a href='/international-destination/" + data[j]._id + "' value=" + data[j]._id + "><h5>View Details</h5></a></div></div></div>"
                }
            }

            $(blankIndianDestination).appendTo('.indian__destinations__list');
            $(blankInternationalDestination).appendTo('.international__destinations__list');
        }
    });
});