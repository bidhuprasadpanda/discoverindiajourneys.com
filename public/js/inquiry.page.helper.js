$('select#numberOfRoomsInInquiry').on('change', function() {

    $('.roomAccomodationSelectedParent').html('');

    $.each(new Array(+this.value), function(i) {
        var newTextBoxDiv = $(document.createElement('div'))
            .attr({ "id": 'roomsAccomodationSeleted' + (i + 1), "class": 'roomsAccomodationSeleted' });



        newTextBoxDiv.after().html('<label class="col-md-12" for="roomAccomodation">Rooms:' + (i + 1) + ' </label><div class="col-md-12"><div class="col-md-2"><label for="adults">Adults:</label><select class="form-control" id="numberOfAdults" name="adults[]"><option value="1">1</option><option value="2">2</option></select></div><div class="col-md-2"><label for="child">Children:</label><select class="form-control numberOfChildren" id="numberOfChildren" name="child[]"><option value="0">0</option><option value="1">1</option><option value="2">2</option></select></div><div class="col-md-2 1st_child"><label for="childage">Child 1 Age:</label><select class="form-control" id="firstChildAge" name="firstChildAge[]"><option value="0">Select Age</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div><div class="col-md-2 2nd_child"><label for="childage">Child 2 Age:</label><select class="form-control" id="secondChildAge" name="secondChildAge[]"><option value="0">Select Age</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select></div><div class="col-md-3 form-check form-check-inline"><label class="form-check-label"><input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="" name="extrabed[]"> Extra Bed</label></div><input type="hidden" name="room[]" value="room' + (i + 1) + '" class="currentPackageName"></div>');

        i++;
        newTextBoxDiv.appendTo(".roomAccomodationSelectedParent");

        $('.1st_child').hide();
        $('.2nd_child').hide();

    });

});



$(function() {
    $("#inlineHotelModify").click(function() {
        if ($(this).is(":checked")) {
            $("#packageModifyHotel").show();
        } else {
            $("#packageModifyHotel").hide();
        }
    });

    $("#inlineDurationModify").click(function() {
        if ($(this).is(":checked")) {
            $("#packageModifyDuration").show();
        } else {
            $("#packageModifyDuration").hide();
        }
    });

    $("#inlineServicesModify").click(function() {
        if ($(this).is(":checked")) {
            $("#packageAddServices").show();
        } else {
            $("#packageAddServices").hide();
        }
    });

});

//Contact Page Details
$('select.contactpage_dest_List').on('change', function() {
    var userID = $('.contactpage_dest_List option:selected').val();
    $.ajax({
        url: '/userdetails/' + $('.contactpage_dest_List option:selected').val(),
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            $('.contactdetails_incontactpage').html('');
            var detailsDiv = '<h3>A LUX TRIP ' + data[0].country + '</h3><table class="table table-bordered"><tbody><tr><td><strong>Working hours:</strong></td><td>' + data[0].workinghours + '</td></tr><tr><td><strong>Address:</strong></td><td>' + data[0].address + '</td></tr><tr><td><strong><i class="fa fa-phone-square" aria-hidden="true"></i>&nbsp;Telephone Number:</strong></td><td>' + data[0].mobile + '</td></tr><tr><td><strong><i class="fa fa-envelope-o" aria-hidden="true"></i>&nbsp;Email:</strong></td><td>' + data[0].email + '</td></tr></tbody></table>';

            console.log(detailsDiv);
            $(detailsDiv).appendTo(".contactdetails_incontactpage");
        }
    })

});

//Delete Places
$(document).ready(function() {
    $('.home_special_package').on('click', getPackageId);
});
var packageDetails;

function getPackageId() {
    url: '/package/' + $(this).data('id');
    /*console.log(url, "url from  package detils");*/
    $.ajax({
        url: '/package/' + $(this).data('id'),
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            packageDetails = data;
            console.log(packageDetails);
        }
    }).done(function(response) {
        window.location.replace('/admin');
    });

}

//Place Holder Onclick placeholder Delete
$(function() {
    $('input,textarea').focus(function() {
        $(this).data('placeholder', $(this).attr('placeholder'))
            .attr('placeholder', '');
    }).blur(function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
});

$.ajax({
    url: '/menu',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        menuDetails = data;
        for (var nav = 0; nav < menuDetails.length; nav++) {
            var menuItem = "<li class='menu_countrys'><a title=" + menuDetails[nav].name + " href=\"/country/" + menuDetails[nav]._id +
                "\">" + menuDetails[nav].name + "</a></li>";
            $('.sf-menu li:last').before(menuItem);
        }
    }
}).done(function(response) {

});



$(document).on('click', '.accomodation-option-hotelname', function() {
    // code here
    var hotelId = $(this).parents('.accomodation-modal').find(".accomodation-option-hotelname").attr('data-id');
    $.ajax({
        url: '/accomodationdetails/' + $(this).parents('.accomodation-modal').find(".accomodation-option-hotelname").attr('data-id'),
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data[0].images[0]);

            $(".modal-title.package-hotel-name").text(data[0].hotelname);
            $(".modal-body .package-hotel-description").text(data[0].description);
            var imageCount = data[0].images.length;
            var imgDiv;
            $('.package-image-div').html('');
            for (var img = 0; img < imageCount; img++) {
                imgDiv = '<img src="' + data[0].images[img] + '" alt="" width="32.5%" height="auto">'
                $(imgDiv).appendTo(".package-image-div");
            }


        }
    });

});

$("#main").click(function() {
    $("#mini-fab").toggleClass('hidden');
});

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $(document).scroll(function() {
        var y = $(this).scrollTop();
        if (y > 100) {
            $('.super-button').fadeIn();
        } else {
            $('.super-button').fadeOut();
        }
    });
});
$.material.init();