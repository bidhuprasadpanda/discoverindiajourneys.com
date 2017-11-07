$(document).ready(function() {

    $('[data-toggle="tooltip"]').tooltip();

    /*  $('input').blur(function() {
          var pass = $('input[name=password]').val();
          var repass = $('input[name=repassword]').val();
          if (($('input[name=password]').val().length == 0) || ($('input[name=repassword]').val().length == 0)) {
              $('#password').addClass('has-error');
          } else if (pass != repass) {
              $('#password').addClass('has-error');
              $('#repassword').addClass('has-error');
          } else {
              $('#password').removeClass().addClass('has-success');
              $('#repassword').removeClass().addClass('has-success');
          }
      });*/
    //Admin Menu 
    var userType = $(".user-hidden-in-adminlayout").text();
    $.ajax({
        url: "/admin/admin_home/menu/" + $(".user-hidden-in-adminlayout").text(),
        type: "GET",
        dataType: 'json',
        success: function(result) {
            var menuadmin;
            $('.sf-menu.admin-layout').empty();
            if (result[0].roles == "SUPERADMIN") {
                menuadmin = '<li><a href="/admin"><i class="fa fa-home" aria-hidden="true"></i></a></li><li><a href="/admin/admin_home/providers">Providers</a></li><li><a href="/admin/admin_home/continents">Countries</a></li><li><a href="/admin/admin_home/destination">States</a> </li><li><a href="/admin/admin_home/categories">Categories</a></li><li><a href="/admin/admin_home/packages">Packages</a></li><li><a href="/admin/admin_home/offers">Offers</a></li><li><a href="/admin/admin_home/inquiries">Reservations</a> </li>'

                $(menuadmin).appendTo('.sf-menu.admin-layout');
            } else {

                menuadmin = '<li><a href="/admin/admin_home/continents">Countries</a> </li><li><a href="/admin/admin_home/destination">States</a></li><li><a href="/admin/admin_home/categories">Categories</a></li><li><a href="/admin/admin_home/accomodation">Accommodations</a></li><li><a href="/admin/admin_home/packages">Packages</a></li><li><a href="/admin/admin_home/inquiries">Reservations</a> </li>'

                $(menuadmin).appendTo('.sf-menu.admin-layout');

            }
        }
    });
});
// Delete User

$(document).ready(function() {
    $('.deleteUser').on('click', deleteUser);
});

function deleteUser() {
    var confirmation = confirm('Are You Sure?');
    console.log($(this).data('id'));

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/providers/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/providers');
        });
    } else {
        return false;
    }
}

// Delete Corporate tour

$(document).ready(function() {
    $('.delete__corporate__tour').on('click', deleteCorporatTour);
});

function deleteCorporatTour() {
    var confirmation = confirm('Are You Sure?');
    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/corporatetour/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin');
        });
    } else {
        return false;
    }
}

// Delete Destination
$(document).ready(function() {
    $('.deleteDestination').on('click', deleteDestination);
});

function deleteDestination() {
    var confirmation = confirm('Are You Sure?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/destination/delete/' + $(this).data('id'),
            success: function() {
                $.notify("Item Deleted Succesfully", "warn");
            }
        }).done(function(response) {
            window.location.replace('/admin/admin_home/destination');
        });
    } else {
        return false;
    }
}



//Delete Subscriber
$(document).ready(function() {
    $('.deleteSubscriber').on('click', deleteSubscriber);
});

function deleteSubscriber() {
    var confirmation = confirm('Are You Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/subscriber/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/subscribers');
        });
    } else {
        return false;
    }
}


// DELETE CATEGORY

$(document).ready(function() {
    $('.deleteCategory').on('click', deleteCategory);
});

function deleteCategory() {
    var confirmation = confirm('Are You Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/categories/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/categories');
        });
    } else {
        return false;
    }
}

//Delete Inquiry
$(document).ready(function() {
    $('.deleteInquiry').on('click', deleteInquiry);
});

function deleteInquiry() {
    var confirmation = confirm('Are You Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/inquiries/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/inquiries');
        });
    } else {
        return false;
    }
}


// Delete Accomodation

$(document).ready(function() {
    $('.deleteAccomodation').on('click', deleteAccomodation);
});

function deleteAccomodation() {
    var confirmation = confirm('Are you Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/accomodation/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/accomodation');
        });
    } else {
        return false;
    }
}

//Delete Places
$(document).ready(function() {
    $('.deletePlaces').on('click', deletePlaces);
});

function deletePlaces() {
    var confirmation = confirm('Are you Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/places/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/places');
        });
    } else {
        return false;
    }
}

//Delete Offer

$(document).ready(function() {
    $('.deleteOffers').on('click', deleteOffers);
});

function deleteOffers() {
    var confirmation = confirm('Are you Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/offer/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/offers');
        });
    } else {
        return false;
    }
}

//Update Inquery
$(document).ready(function() {
    $('.updateInquiry').on('click', updateInquiry);
});

function updateInquiry() {

    var data = {
        inquirystatus: $(this).parents('.modal-body').find('.inquiry_inquiryStatus').val()
    };
    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/inquiries/update/' + $(this).parents('.modal-body').find(".updateInquiry").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".inquiry_close_btn").click(function() {
                location.reload();
            });
        }
    });
}


//Update Accomodation
$(document).ready(function() {
    $('.updateAccomodation').on('click', updateAccomodation);
    //Delete image
    $('#files').on('click', '.delete-image', function() {
        /*console.log(this);*/
        $(this).parent(".accomodation_image").remove();
    });
});

function updateAccomodation() {
    var my_array = [];
    $('div.accomodation_Images div.accomodation_image img').each(function() {
        var count = $(this).attr('src');
        my_array.push(count);
    });

    var my_roomArray = [];
    $('div#TextBoxesGroupAccomodation input.form-control').each(function() {
        var countRoom = $(this).val();
        my_roomArray.push(countRoom);
    });


    var data = {
        countryId: $(this).parents('.modal-body').find('.accomodation_country_list').val(),
        stateId: $(this).parents('.modal-body').find('.accomodation_state_list').val(),
        hotelname: $(this).parents('.modal-body').find('.accomodation_name').val(),
        description: $(this).parents('.modal-body').find('.accomodation_description').val(),
        starcategory: $(this).parents('.modal-body').find('.accomodation_starcategory').val(),
        roomtypes: my_roomArray,
        images: my_array,

    };

    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/accomodation-new/update/' + $(this).parents('.form-group').find(".updateAccomodation").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".accomodation-close-btn").click(function() {
                location.reload();
            });
        }
    });

}


// UPDATE CATEGORY

$(document).ready(function() {
    $('.updateCategory').on('click', updateCategory);
});

function updateCategory() {

    var data = {
        name: $(this).parents('.modal-body').find('.category_name').val()
    };
    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/categories/update/' + $(this).parents('.modal-body').find(".updateCategory").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".categories-close-btn").click(function() {
                location.reload();
            });
        }
    });

}

var hotelList;

$.ajax({
    url: "/admin/admin_home/accomodation-list",
    type: "GET",
    dataType: 'json',
    success: function(data) {
        hotelList = data;
        //console.log(data);
    }

});

//Update Provider
$(document).ready(function() {

    //Room  List Populate According to the Hotel Selected
    $(document).on('change', '.selecthotel', function() {
        var accomodationOption = $(this).parents('.OptionAccomodation-item');
        for (var i = 0; i < hotelList.length; i++) {
            if (accomodationOption.find(".selecthotel option:selected").text() == hotelList[i].hotelname) {
                //console.log(hotelList[i].roomtypes);
                var newOptions = hotelList[i].roomtypes.length;
                accomodationOption.find('.selectroom').empty();
                for (var roomlist = 0; roomlist < newOptions; roomlist++) {
                    accomodationOption.find('.selectroom').append("<option value='" + hotelList[i].roomtypes[roomlist] + "' '>" + hotelList[i].roomtypes[roomlist] + "</option>");
                }

            }

        }

    });
    $('.updateProvider').on('click', updateProvider);
});

function updateProvider() {

    name = $(this).parents('.modal-body').find('.provider_name').val(),
        email = $(this).parents('.modal-body').find('.provider_email').val(),
        mobile = $(this).parents('.modal-body').find('.provider_mobile_modal').val(),
        roles = $(this).parents('.modal-body').find('.provider_roles_modal').val(),
        status = $(this).parents('.modal-body').find('.provider_status_modal').val(),
        workinghours = $(this).parents('.modal-body').find('.provider_workinghours').val(),
        address = $(this).parents('.modal-body').find('.provider_address').val(),
        zipcode = $(this).parents('.modal-body').find('.provider_zipcode').val(),
        city = $(this).parents('.modal-body').find('.provider_city').val(),
        state = $(this).parents('.modal-body').find('.provider_state').val(),
        country = $(this).parents('.modal-body').find('.provider_country').val();
    if (name == "" || email == "" || mobile == "" || roles == "" || status == "" || workinghours == "" || address == "" || zipcode == "" || city == "" || state == "" || country == "") {
        $.notify("Please Fill All The Fields", "warn");
    } else {
        var data = {
            name: $(this).parents('.modal-body').find('.provider_name').val(),
            email: $(this).parents('.modal-body').find('.provider_email').val(),
            mobile: $(this).parents('.modal-body').find('.provider_mobile_modal').val(),
            roles: $(this).parents('.modal-body').find('.provider_roles_modal').val(),
            status: $(this).parents('.modal-body').find('.provider_status_modal').val(),
            workinghours: $(this).parents('.modal-body').find('.provider_workinghours').val(),
            address: $(this).parents('.modal-body').find('.provider_address').val(),
            zipcode: $(this).parents('.modal-body').find('.provider_zipcode').val(),
            city: $(this).parents('.modal-body').find('.provider_city').val(),
            state: $(this).parents('.modal-body').find('.provider_state').val(),
            country: $(this).parents('.modal-body').find('.provider_country').val()
        };
        $.ajax({
            type: 'PUT',
            data: data,
            url: '/admin/admin_home/provider/update/' + $(this).parents('.modal-body').find(".updateProvider").attr('value'),
            success: function(data) {
                console.log(data);
                $.notify("Your Changes Has Been Saved", "success");
                window.setTimeout(function() { location.reload() }, 2000);
                $(".btn-dest-close").click(function() {
                    location.reload();
                });
            }
        })
    }
}
//Creating Package Inquiry Json Object

$(".inquiry_details_show").click(function() {

    var roomdetails = [];

    var firstname = $(this).parents('.inquery_details_row').find(".inquery_details_firstname").text();
    var lastname = $(this).parents('.inquery_details_row').find(".inquery_details_lastname").text();
    var bookingdate = $(this).parents('.inquery_details_row').find(".inquery_detilas_createddate").text();
    var bookingid = $(this).parents('.inquery_details_row').find(".inquery_detilas_bookingid").text();
    var packagename = $(this).parents('.inquery_details_row').find(".inquery_details_user_packageName").text();
    var totalrooms = $(this).parents('.inquery_details_row').find(".inquery_details_totalroombooked").text();
    roomdetails = $(this).parents('.inquery_details_row').find(".inquery_details_user_accomodationDetails");
    var emailId = $(this).parents('.inquery_details_row').find(".inquery_details_user_emailId").text();
    var fromDate = $(this).parents('.inquery_details_row').find(".inquery_details_user_fromDate").text();
    var toDate = $(this).parents('.inquery_details_row').find(".inquery_details_user_toDate").text();
    var phonenumber = $(this).parents('.inquery_details_row').find(".inquery_details_user_phoneNumber").text();
    var countryname = $(this).parents('.inquery_details_row').find(".inquery_details_countryname").text();
    var inquirytype = $(this).parents('.inquery_details_row').find(".inquery_detilas_inquerytype").text();
    var promocode = $(this).parents('.inquery_details_row').find(".inquery_details_user_promoCode").text();
    var inquirystatus = $(this).parents('.inquery_details_row').find(".inquery_details_user_inquiryStatus").text();
    var hotelmodificationrequest = $(this).parents('.inquery_details_row').find(".inquery_details_hotelModificationRequest").text();
    var packageDurationmodificationrequest = $(this).parents('.inquery_details_row').find(".inquery_details_packageDurationModificationRequest").text();
    var extraServicesrequest = $(this).parents('.inquery_details_row').find(".inquery_details_extraServiceRequest").text();
    var inquiryId = $(this).parents('.table_inquiry_btn_group').find(".inquiry_details_show").attr('data-id');

    var arr = $(roomdetails).html();

    var obj = $.parseJSON(arr);
    $(".inquiry_roomDetails").empty();
    for (var i = 0; i < obj.length; i++) {
        var roomDetails = '';
        roomDetails = ("Room #" + (i + 1) + '\n' + "Number Of Adults: " + obj[i].numberOfAdults + '\n' + "Number oF Childs: " + obj[i].numberofChilds + '\n' + "Number Of Children(6-11): " + obj[i].numberOfchildSixToEleven + '\n' + "Number Of Children(0-5): " + obj[i].numberOfchildUptofive + '\n' + "ExtraBed: " + obj[i].extraBed) + '\n';

        $(".inquiry_roomDetails").append(roomDetails);
    }

    $("select option").filter(function() {
        //may want to use $.trim in here
        return $(this).text() == inquirystatus;
    }).prop('selected', true);

    $(".inquiry_firstname").val(firstname);
    $(".inquiry_lastname").val(lastname);
    $(".inquiry_booking_date").val(bookingdate);
    $(".inquiry_bookingId").val(bookingid);
    $(".inquiry_packageName").val(packagename);
    $(".inquiry_total_rooms").val(totalrooms);
    $(".inquiry_packageFromDate").val(fromDate);
    $(".inquiry_packageToDate").val(toDate);
    $(".inquiry_email").val(emailId);
    $(".inquiry_phonenumber").val(phonenumber);
    $(".inquiry_countryname").val(countryname);
    $(".inquiry_Type").val(inquirytype);
    $(".inquiry_promoCode").val(promocode);
    $(".inquiry_inquiryStatus").val(inquirystatus);
    $(".inquiry_packageDuration").val(hotelmodificationrequest);
    $(".inquiry_packageDuration").val(packageDurationmodificationrequest);
    $(".inquiry_extraServiceRequest").val(extraServicesrequest);
    $(".updateInquiry").val(inquiryId);

});

//Update corporate tour 
$(document).ready(function() {
    $('.updateCorporateTourBtn').on('click', updateCorporateTourFinal);
});

function updateCorporateTourFinal() {
    var tourName = $(this).parents('.modal-body').find('.corporateTour_name_edit').val();
    var myimg_array = [];
    $('div.corporatetour_Present_Images div.accomodation_image img').each(function() {
        var count = $(this).attr('src');
        myimg_array.push(count);
    });

    var data = {
        name: $(this).parents('.modal-body').find('.corporateTour_name_edit').val(),
        images: myimg_array
    };
    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/corporatetour/update/' + $(this).parents('.modal-body').find(".updateCorporateTourBtn").attr('value'),
        success: function(data) {
            console.log(data);
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".btn-dest-close").click(function() {
                location.reload();
            });
        }
    });
}

//Update Provider Password
$(document).ready(function() {
    $('.updateProviderPassword').on('click', updateProviderPassword);
});

function updateProviderPassword() {
    var passwordOne = $(this).parents('.modal-body').find('.providerPasswordUpdate').val();
    var confirmPassword = $(this).parents('.modal-body').find('.providerPasswordUpdateConfirm').val();
    if (passwordOne == "" || confirmPassword == "") {
        $.notify("Password Field cannot be Blank !!!!", "warn");
        return false;
    } else if (passwordOne != confirmPassword) {
        $.notify("New Password do not match with Confirm Password!!", "warn");
        return false;
    } else {
        var data = {
            password: $(this).parents('.modal-body').find('.providerPasswordUpdate').val()
        };
        $.ajax({
            type: 'PUT',
            data: data,
            url: '/admin/admin_home/provider/updatepassword/' + $(this).parents('.modal-body').find(".updateProviderPassword").attr('value'),
            success: function(data) {
                $.notify("Your New Password Has Been Saved", "success");
                window.setTimeout(function() { location.reload() }, 2000);
                $(".btn-dest-close").click(function() {
                    location.reload();
                });
            }
        });
    }
}

//Update destination
$(document).ready(function() {
    $('.updateDestination').on('click', updateDestination);
});

function updateDestination() {
    var my_array = [];
    $('div.country_Present_Images div.accomodation_image img').each(function() {
        var count = $(this).attr('src');
        my_array.push(count);
    });

    var continentId = $(".select_continentlist_destination option:selected").val();

    var data = {
        name: $(this).parents('.modal-body').find('.dest_name').val(),
        continentid: continentId,
        quote: $(this).parents('.modal-body').find('.quote_for_country').val(),
        about: $(this).parents('.modal-body').find('.about_country').val(),
        images: my_array

    };

    /*console.log(data);
    console.log(data.images);*/
    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/destination/update/' + $(this).parents('.modal-body').find(".updateDestination").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".btn-dest-close").click(function() {
                location.reload();
            });
        }
    });
}


//Update Offer

$(document).ready(function() {
    $('.update__offer__button').on('click', updateOffer);
});

function updateOffer() {
    var myimg_array = [];
    $('div.offer__Present__Images div.accomodation_image img').each(function() {
        var count = $(this).attr('src');
        myimg_array.push(count);
    });

    var offerType = $(".select__offer__type option:selected").val();

    var data = {
        offername: $(this).parents('.modal-body').find('.offer__name__edit').val(),
        offertype: offerType,
        offerdescription: $(this).parents('.modal-body').find('.offer__description__edit').val(),
        offercode: $(this).parents('.modal-body').find('.edit__offer__code').val(),
        images: myimg_array
    }

    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/offer/update/' + $(this).parents('.modal-body').find(".update__offer__button").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".btn-place-close").click(function() {
                location.reload();
            });
        }
    });
}

//Update Places
$(document).ready(function() {
    $('.updatePlace').on('click', updatePlace);
});

function updatePlace() {
    var my_array = [];
    $('div.country_Present_Images div.accomodation_image img').each(function() {
        var count = $(this).attr('src');
        my_array.push(count);
    });

    var countryValue = $(".select_countrylist_place option:selected").val();

    var data = {
        name: $(this).parents('.modal-body').find('.place_name_edit').val(),
        countryId: countryValue,
        descriptionPlace: $(this).parents('.modal-body').find('.place_description_edit').val(),
        howToGetPlace: $(this).parents('.modal-body').find(".howto_get_there_edit").val(),
        whentogoPlace: $(this).parents('.modal-body').find(".when_to_go_edit").val(),
        highlightsPlace: $(this).parents('.modal-body').find(".place_highlights_edit").val(),
        latitudePlace: $(this).parents('.modal-body').find(".place_map_latitude_edit").val(),
        longitudePlace: $(this).parents('.modal-body').find(".place_map_longitude_edit").val(),
        images: my_array

    };
    /* console.log(data.images);*/
    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/places/update/' + $(this).parents('.modal-body').find(".updatePlace").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".btn-place-close").click(function() {
                location.reload();
            });
        }
    });
}

//Create Offer Json Object

$('.get_offer_details').click(function() {
    var imageOffers = [];
    var offerName = $(this).parents('.offer_row_form').find('.offer__name').text();
    var offerType = $(this).parents('.offer_row_form').find('.offer__type__name').text();
    var offerDescription = $(this).parents('.offer_row_form').find('.offer__offerDescription').text();
    var offerCode = $(this).parents('.offer_row_form').find('.offer__code').text();
    imagesOffers = $(this).parents('.offer_row_form').find('.offers_images_edit');
    var offerId = $(this).parents('.offer_row_form').find(".offer__name").attr('data-id');

    var toAppend = '';

    if (offerType === "special") {
        toAppend += "<option value='special' selected> Last Minut Deal </option>" + "<option value=' normal'> Normal </option>";
        $('.select__offer__type').empty().append(toAppend);
    } else {
        toAppend += "<option value='special'> Last Minut Deal </option>" + "<option value='normal' selected> Normal </option>";
        $('.select__offer__type').empty().append(toAppend);
    }

    $('.offer__name__edit').val(offerName);
    $('.offer__description__edit').val(offerDescription);
    $('.edit__offer__code').val(offerCode);
    $(".update__offer__button").val(offerId);
    $('#files').empty();
    for (var j = 0; j < imagesOffers.length; j++) {
        //alert($(imagesPlaces[j]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(imagesOffers[j]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(imageOffers[j]).html() + '" >');
    }



});

//Get Place details
$(".get_places_details").click(function() {
    var imagesPlaces = [];
    var placeName = $(this).parents('.place_form').find(".place_name").text();
    var placesCountryName = $(this).parents('.place_form').find(".place_country_name").text();
    var placeDescription = $(this).parents('.place_form').find(".place_description").text();
    var placeGetThere = $(this).parents('.place_form').find(".place_howtoget_there").text();
    var placeWhenToGo = $(this).parents('.place_form').find(".place_whento_go").text();
    var placeHighlights = $(this).parents('.place_form').find(".place_highlights").text();
    var placeLatitude = $(this).parents('.place_form').find(".place_latitude").text();
    var placeLongitude = $(this).parents('.place_form').find(".place_longitude").text();
    imagesPlaces = $(this).parents('.place_form').find(".places_images_edit");
    var placesId = $(this).parents('.place_form').find(".place_name").attr('data-id');


    $.ajax({
        url: "/admin/admin_home/destination-list",
        type: "GET",
        dataType: 'json',
        success: function(allCountry) {
            /* alert(allCountry.length);*/
            var toAppend = '';
            for (var i = 0; i < allCountry.length; i++) {
                if (allCountry[i].name == placesCountryName) {
                    toAppend += "<option value='" + allCountry[i]._id + "' selected>" + allCountry[i].name + "</option>"
                } else {
                    toAppend += "<option value='" + allCountry[i]._id + "'>" + allCountry[i].name + "</option>"
                }

            }
            $('.select_countrylist_place').empty().append(toAppend);

        }

    });


    $(".place_name_edit").val(placeName);
    $(".place_description_edit").val(placeDescription);
    $(".howto_get_there_edit").val(placeGetThere);
    $(".when_to_go_edit").val(placeWhenToGo);
    $(".place_highlights_edit").val(placeHighlights);
    $(".place_map_latitude_edit").val(placeLatitude);
    $(".place_map_longitude_edit").val(placeLongitude);
    $(".updatePlace").val(placesId);
    //alert(imagesPlaces.length)

    $('#files').empty();
    for (var j = 0; j < imagesPlaces.length; j++) {
        //alert($(imagesPlaces[j]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(imagesPlaces[j]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(imagesPlaces[j]).html() + '" >');
    }
});

//Get Destination Details
$(".get_dest").click(function() {

    var images = [];
    var destname = $(this).parents('.destination_form').find(".destination_name").text();
    var continentName = $(this).parents('.destination_form').find(".continent_name").text();
    var aboutcountry = $(this).parents('.destination_form').find(".about_country").text();
    var destinquote = $(this).parents('.destination_form').find(".destination_quote").text();
    images = $(this).parents('.destination_form').find(".destination_images");
    var destinationId = $(this).parents('.destination_form').find(".destination_name").attr('data-id');

    //alert(images);
    $(".dest_name").val(destname);
    $(".about_country").val(aboutcountry);
    $(".quote_for_country").val(destinquote);
    $('#files').empty();
    for (var i = 0; i < images.length; i++) {
        //console.log($(images[i]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(images[i]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(images[i]).html() + '" >');
    }

    $(".updateDestination").val(destinationId);

    //Admin Continent List


    $.ajax({
        url: "/admin/admin_home/continent-list",
        type: "GET",
        dataType: 'json',
        success: function(allcontinents) {
            console.warn(allcontinents);
            var toAppendContinent = '';
            for (var i = 0; i < allcontinents.length; i++) {
                if (allcontinents[i].name == continentName) {
                    toAppendContinent += "<option value='" + allcontinents[i]._id + "' selected>" + allcontinents[i].name + "</option>"
                } else {
                    toAppendContinent += "<option value='" + allcontinents[i]._id + "'>" + allcontinents[i].name + "</option>"
                }
            }
            $('.select_continentlist_destination').empty().append(toAppendContinent);
        }

    });
});

//Get Honeymoon Tours Details

$(".edit__honeymoon__tour").click(function() {
    var images = [];
    var tourname = $(this).parents('.honeymoon__tour__results').find(".honeymoontour__name").text();
    images = $(this).parents('.honeymoon__tour__results').find(".honeymoon_images_edit");
    var honeymoonTourId = $(this).parents('.honeymoon__tour__results').find(".delete__honeymoon__tour").attr('data-id');

    $("")
});

//Get Corporate Tours Details

$(".edit__corporate__tour").click(function() {
    var images = [];
    var tourname = $(this).parents('.corporate__tour__results').find(".corporatetour__name").text();
    images = $(this).parents('.corporate__tour__results').find(".corporate_images_edit");
    var corporateTourId = $(this).parents('.corporate__tour__results').find(".delete__corporate__tour").attr('data-id');

    $('.corporateTour_name_edit').val(tourname);
    $('#files').empty();
    for (var i = 0; i < images.length; i++) {
        //console.log($(images[i]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(images[i]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(images[i]).html() + '" >');
    }

    $(".updateCorporateTourBtn").val(corporateTourId);

});

//Get Continents Details


$(".get_category").click(function() {
    var categoryname = $(this).parents('.category_form').find(".category_name").text();
    var categoryId = $(this).parents('.category_form').find(".category_name").attr('data-id');
    /*console.log(categoryId);*/
    $(".category_name").val(categoryname);
    $(".updateCategory").val(categoryId);
});

$(".get_provider").click(function() {

    var providername = $(this).parents('.provider_form').find(".provider_name").text();
    var provideremail = $(this).parents('.provider_form').find(".provider_email").text();
    var providermobile = $(this).parents('.provider_form').find(".provider_mobile").text();
    var providerroles = $(this).parents('.provider_form').find(".provider_roles").text();
    var providerstatus = $(this).parents('.provider_form').find(".provider_status").text();
    var providerworkinghrs = $(this).parents('.provider_form').find(".provider_workinghours").text();
    var provideraddress = $(this).parents('.provider_form').find(".provider_address").text();
    var providerzipcode = $(this).parents('.provider_form').find(".provider_zipcode").text();
    var providercity = $(this).parents('.provider_form').find(".provider_city").text();
    var providerstate = $(this).parents('.provider_form').find(".provider_state").text();
    var providercountry = $(this).parents('.provider_form').find(".provider_country").text();
    var providerId = $(this).parents('.provider_form').find(".provider_name").attr('data-id');
    /*console.log(providerId);
    console.log(providermobile);
    console.log(providerzipcode);*/
    $(".provider_name").val(providername);
    $(".provider_email").val(provideremail);
    $('.provider_roles_modal').empty();
    if (providerroles == "USER") {
        var options = '<option value="USER" selected>USER</option><option value="ADMIN">ADMIN</option><option value="SUPERADMIN">SUPERADMIN</option>';
        $(options).appendTo('.provider_roles_modal');
    } else if (providerroles == "ADMIN") {
        var options = '<option value="USER">USER</option><option value="ADMIN" selected>ADMIN</option><option value="SUPERADMIN">SUPERADMIN</option>';
        $(options).appendTo('.provider_roles_modal');
    } else {
        var options = '<option value="USER">USER</option><option value="ADMIN">ADMIN</option><option value="SUPERADMIN" selected>SUPERADMIN</option>';
        $(options).appendTo('.provider_roles_modal');
    }
    $('.provider_status_modal').empty();
    if (providerstatus == "true") {
        var statusoptions = '<option value="true" selected>TRUE</option><option value="false">FALSE</option>';
        $(statusoptions).appendTo('.provider_status_modal');
    } else {
        var statusoptions = '<option value="true">TRUE</option><option value="false" selected>FALSE</option>';
        $(statusoptions).appendTo('.provider_status_modal');
    }

    $(".provider_mobile_modal").val(providermobile);
    $(".provider_address").val(provideraddress);
    $(".provider_zipcode").val(providerzipcode);
    $(".provider_city").val(providercity);
    $(".provider_state").val(providerstate);
    $(".provider_country").val(providercountry);
    $(".updateProvider").val(providerId);
    $(".provider_workinghours").val(providerworkinghrs);
});

$(".get_accomodation").click(function() {
    var imagesAccomodation = [];
    var accomodationRoomtype = [];
    var accomodationname = $(this).parents('.accomodation_form').find(".accomodation_name").text();
    var accomodationcountry = $(this).parents('.accomodation_form').find(".accomodation_country").text();
    var accCountryId = $(this).parents('.accomodation_form').find(".accomodation_country_id").attr('data-id');
    var accomodationstate = $(this).parents('.accomodation_form').find(".accomodation_state").attr('data-id');
    var accomodationCategory = $(this).parents('.accomodation_form').find(".accomodation_category").text();
    var accomodationdescription = $(this).parents('.accomodation_form').find(".accomodation_description").text();
    var accomodationId = $(this).parents('.accomodation_form').find(".accomodation_name").attr('data-id');
    imagesAccomodation = $(this).parents('.accomodation_form').find(".destination_images");

    accomodationRoomtype = $(this).parents('.accomodation_form').find(".accomodation_roomtype");

    /*console.log(accomodationname);
    console.log(accomodationId);*/

    //console.log(accomodationRoomtype.length);

    $('.TextBoxesGroupAccomodation').empty();

    //Accomodation  
    for (var roomtype = 0; roomtype < accomodationRoomtype.length; roomtype++) {
        //console.log(accomodationRoomtype.innerText[roomtype]);$(accomodationRoomtype[i])

        //console.log($(accomodationRoomtype[roomtype]).html());
        var roomtypediv = '';

        roomtypediv = "<div id='TextBoxDiv" + (roomtype + 1) + "'>" + "<label>Room #" + (roomtype + 1) + "</label>" + "<input class='form-control' type='text' name='textbox' id='textbox" + (roomtype + 1) + "' value='" + $(accomodationRoomtype[roomtype]).html() + "'>" + "</div>"
        $('.TextBoxesGroupAccomodation').append(roomtypediv);
    }


    $(".accomodation_name").val(accomodationname);

    $.ajax({
        url: "/admin/admin_home/destination-list",
        type: "GET",
        dataType: 'json',
        success: function(allCountry) {
            /* alert(allCountry.length);*/
            /*console.log(allCountry[1].name);*/
            var toAppendCountry = '';
            for (var k = 0; k < allCountry.length; k++) {

                if (allCountry[k]._id == accCountryId) {
                    toAppendCountry += "<option value='" + allCountry[k]._id + "' selected>" + allCountry[k].name + "</option>"
                } else {
                    toAppendCountry += "<option value='" + allCountry[k]._id + "'>" + allCountry[k].name + "</option>"
                }

            }
            $('.accomodation_country_list').empty().append(toAppendCountry);

        }

    });

    //Admin PlaceList
    $.ajax({
        url: "/admin/admin_home/places-list",
        type: "GET",
        dataType: 'json',
        success: function(allplaces) {
            var toAppendCity = '';
            for (var z = 0; z < allplaces.length; z++) {
                if (allplaces[z].countryId == accCountryId) {
                    if (allplaces[z]._id == accomodationstate) {
                        toAppendCity += "<option value='" + allplaces[z]._id + "' ' selected>" + allplaces[z].placename + "</option>"
                    } else {
                        toAppendCity += "<option value='" + allplaces[z]._id + "' '>" + allplaces[z].placename + "</option>"
                    }
                }

            }
            $('.accomodation_state_list').empty().append(toAppendCity);
        }

    });

    $(".accomodation_country_list").change(function() {
        var countryId = $(this).val();

        $.ajax({
            url: "/admin/admin_home/places-list",
            type: "GET",
            dataType: 'json',
            success: function(allplaces) {
                var toAppendCity = '';
                for (var z = 0; z < allplaces.length; z++) {
                    if (allplaces[z].countryId == countryId) {
                        toAppendCity += "<option value='" + allplaces[z]._id + "' '>" + allplaces[z].placename + "</option>"
                    }
                }
                $('.accomodation_state_list').empty().append(toAppendCity);
            }
        });
    });

    //star Category
    $(".accomodation_starcategory option").filter(function() {
        //may want to use $.trim in here
        return $(this).text() == accomodationCategory;
    }).prop('selected', true);


    $(".accomodation_description").val(accomodationdescription);
    $(".updateAccomodation").val(accomodationId);
    $('#files').empty();
    for (var i = 0; i < imagesAccomodation.length; i++) {
        //console.log($(images[i]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(imagesAccomodation[i]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(imagesAccomodation[i]).html() + '" >');
    }
});
//Edit Provider Password

$(".get_provider_password").click(function() {
    var passwordEditButtonId = $(this).parents('.provider_form').find(".get_provider_password").attr('data-id');

    $(".updateProviderPassword").val(passwordEditButtonId);
});

// Country list (Show Country List According to the continent selected.)
$(function() {
    $("#continent_new_package").change(function() {
        var continentid = $(this).val();
        console.log(continentid, "This is continent Id");
        $.ajax({
            url: "/admin/admin_home/destination-list",
            type: "GET",
            dataType: 'json',
            success: function(allcountries) {
                var toAppend = '';
                for (var i = 0; i < allcountries.length; i++) {
                    if (allcountries[i].continentId == continentid) {
                        // toAppend += "<option value='" + allplaces[i]._id + "' '>" + allplaces[i].placename + "</option>"
                        toAppend += "<input  name='packageCountryName' type='checkbox' value='" + allcountries[i]._id + "' />&nbsp;" + allcountries[i].name + " "
                    }
                }
                $('.selectPackageContinents').empty().append(toAppend);
            }

        });
    });
});

$(function() {
    $("#newAccomodation_Dest_List").change(function() {
        var countryid = $(this).val();
        $.ajax({
            url: "/admin/admin_home/places-list",
            type: "GET",
            dataType: 'json',
            success: function(allplaces) {
                var toAppend = '';
                for (var i = 0; i < allplaces.length; i++) {
                    if (allplaces[i].countryId == countryid) {
                        toAppend += "<option value='" + allplaces[i]._id + "' '>" + allplaces[i].placename + "</option>"
                    }
                }
                $('.accomodation_state').empty().append(toAppend);
            }

        });
    });
});