//homePage Package rendering
$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '/home/package-list-home',
        success: function(data) {
            $('.indian__package__container').html('');
            $('.international__package__container').html('');
            var blankDivIndia = "";
            var blankDivInternational = "";
            for (i = 0; i < data.length; i++) {
                if (data[i].categories == "Indian Package" && data[i].promote == true && data[i].published == true) {
                    blankDivIndia += "<div class='col-md-4'><div class='thumb promoted__packs'><header class='thumb-header'><a class='hover-img' href='/package/" + data[i]._id + "/placeid/" + data[i].countryId + "'><img src=" + data[i].images[0] + " alt='Image Alternative text' height='270'></a></header><div class='thumb-caption'><div class='price-wrap'> <div class='price'><span><a href='/package/" + data[i]._id + "/placeid/" + data[i].countryId + "'>View Details</a></span></div></div><div class='information'><div class='type'>Stays</div><div class='destination'><h4>" + data[i].packagename + "</h4></div><div class='city'></div><div class='options'>" + (data[i].itinerary.length - 1) + " Nights- All inclusive</div></div><div class='button-wrap'><a href='#' class='button--primary'>Enquire Now</a></div></div></div></div>"
                } else if (data[i].categories == "International Package" && data[i].promote == true && data[i].published == true) {
                    blankDivInternational += "<div class='col-md-4'><div class='thumb promoted__packs'><header class='thumb-header'><a class='hover-img' href='/package/" + data[i]._id + "/placeid/" + data[i].countryId + "'><img src=" + data[i].images[0] + " alt='Image Alternative text' height='270'></a></header><div class='thumb-caption'><div class='price-wrap'> <div class='price'><span><a href='/package/" + data[i]._id + "/placeid/" + data[i].countryId + "'>View Details</a></span></div></div><div class='information'><div class='type'>Stays</div><div class='destination'><h4>" + data[i].packagename + "</h4></div><div class='city'></div><div class='options'>" + (data[i].itinerary.length - 1) + " Nights- All inclusive</div></div><div class='button-wrap'><a href='#' class='button--primary'>Enquire Now</a></div></div></div></div>"

                }
            }

            $(blankDivIndia).appendTo('.indian__package__container');
            $(blankDivInternational).appendTo('.international__package__container');

        }
    });
});



$(document).ready(function() {
    $(function() {
        var plcaeId = $('.hidden__place__idfield').attr('value');

        $.ajax({
            url: '/placepackagedetails/' + plcaeId,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                console.log(data[0]);
                $('.packagelist__place__page').html("");
                var tempPackagePlace = "";
                for (var k = 0; k < data.length; k++) {
                    if (data[k].published == true) {
                        tempPackagePlace = "<div class='col-md-4'><div class='thumb promoted__packs'><header class='thumb-header'><a class='hover-img' href='/package/" + data[k]._id + "/placeid/" + data[k].countryId + "'><img src=" + data[k].images[0] + " alt='Image Alternative text' height='270'></a></header><div class='thumb-caption'><div class='price-wrap'> <div class='price'><span><a href='/package/" + data[k]._id + "/placeid/" + data[k].countryId + "'>View Details</a></span></div></div><div class='information'><div class='type'>Stays</div><div class='destination'><h4>" + data[k].packagename + "</h4></div><div class='city'></div><div class='options'>" + (data[k].itinerary.length - 1) + " Nights- All inclusive</div></div><div class='button-wrap'><a href='#' class='button--primary'>Enquire Now</a></div></div></div></div>"
                    }
                    $(tempPackagePlace).appendTo('.packagelist__place__page');
                }
            }
        })
    });
});

$(document).ready(function() {
    $(function() {
        var packageId = $('.hidden__packagedescription__idfield').attr('value');
        console.log(packageId);
        $.ajax({
            url: '/placepackagedetails/' + packageId,
            type: "GET",
            dataType: 'json',
            success: function(data) {
                console.log(data[0]);
                $('.packagelist__place__page').html("");
                var tempPackagePlace = "";
                for (var k = 0; k < data.length; k++) {
                    if (data[k].published == true) {
                        tempPackagePlace = "<div class='col-md-4'><div class='thumb promoted__packs'><header class='thumb-header'><a class='hover-img' href='/package/" + data[k]._id + "/placeid/" + data[k].countryId + "'><img src=" + data[k].images[0] + " alt='Image Alternative text' height='270'></a></header><div class='thumb-caption'><div class='price-wrap'> <div class='price'><span><a href='/package/" + data[k]._id + "/placeid/" + data[k].countryId + "'>View Details</a></span></div></div><div class='information'><div class='type'>Stays</div><div class='destination'><h4>" + data[k].packagename + "</h4></div><div class='city'></div><div class='options'>" + (data[k].itinerary.length - 1) + " Nights- All inclusive</div></div><div class='button-wrap'><a href='#' class='button--primary'>Enquire Now</a></div></div></div></div>"
                    }
                    $(tempPackagePlace).appendTo('.packagelist__place__page');
                }
            }
        })
    });
});




$(document).ready(function() {
    // Configure/customize these variables.
    var showChar = 100; // How many characters are shown by default
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";


    $('.more').each(function() {
        var content = $(this).html();

        if (content.length > showChar) {

            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);

            var html = c + '<span class="moreellipses">' + ellipsestext + '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

            $(this).html(html);
        }

    });

    $(".morelink").click(function() {
        if ($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
});