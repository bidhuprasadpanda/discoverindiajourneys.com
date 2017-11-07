//ITINERARY div Add

$(document).ready(function() {

    var counter = 2;


    $("#addDay").click(function() {

        if (counter > 20) {
            alert("Only 20 Rooms allowed");
            return false;
        }

        var newTextBoxDiv = $(document.createElement('div'))
            .attr({ "id": 'TextBoxDiv' + counter, "class": 'itinerary-item' });


        newTextBoxDiv.after().html('<label>Day #' + counter + ' : </label>' + '</br>' +
            '<label>Title : </label>' +
            '<input class="form-control items" type="text" name="itinerarytitle[]" ' + counter +
            '" id="textbox' + counter + '" value="" required>' + '<label>Package Description : </label>' + '<div class="help-block with-errors"></div>' +
            '<textarea class="form-control" name="packagedescription[]"  " id="description' + counter + '"   rows="5" placeholder="Write your package details..." required></textarea>' + '<div class="help-block with-errors"></div>');

        newTextBoxDiv.appendTo(".TextBoxesGroupPackage");

        counter++;

        /*msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();*/

    });

    $("#removeDay").click(function() {
        if (counter == 1) {
            alert("No more Rooms to remove");
            return false;
        }
        counter--;
        $("#TextBoxDiv" + counter).remove();
    });

    //Getting Button value
    $("#getButtonValue").click(function() {

        var msg = '';
        for (i = 0; i < counter; i++) {
            /*msg += "\n Textbox #" + i + " : " + $('#textbox' + i).val();*/
            /* var newAccomodationDiv = $(document.createElement('div'))
                 .attr("id", 'OptionBoxDiv' + counter);
             newAccomodationDiv.after().html('<label>Day ' + counter + ' :</label>' + '<select  id="selecthotel" name ="selecthotel" class="form-control packages_daycount" required></select>' + '<div class="help-block with-errors"></div>');
             newAccomodationDiv.appendTo("#OptionAccomodationGroup")*/
        }
        alert(msg);
    });


    var numItems = $('#TextBoxDiv').length;

    console.log(numItems, "Number Of Days");
});


//Add New Periods

$(document).ready(function() {

    var ratedivCount = 2;

    $("#add_new_period").click(function() {

        if (ratedivCount > 20) {
            alert("Only 20 Periods allowed");
            return false;
        }
        var newRateBoxDiv = $(document.createElement('div'))
            .attr({ "id": 'OptionRateDiv' + ratedivCount, "class": 'OptionRateDiv-item' });

        newRateBoxDiv.after().html('<div class="row"><div class="col-md-3"><label>From</label><div class="input-group date"><input type="date" class="form-control" name="fromdate[]" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"><i class="fa fa-calendar" aria-hidden="true"></i></span></span></div></div><div class="col-md-3"><label>To</label><div class="input-group date"  name="todate[]"><input type="date" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"><i class="fa fa-calendar" aria-hidden="true"></i></span></span></div></div><div class="col-md-3"><label>Adult per pax (twin sharing)</label><div class="input-group price" ><input type="text" class="form-control name="peradultprice[]" /></div></div><div class="col-md-3"><label>Single supplement</label><div class="input-group price" ><input type="text" class="form-control" name="singleprice[]" /></div><input type="hidden" class="option_occupancy" name="option"  value="option' + 1 + '" ></div></div>');

        newRateBoxDiv.appendTo("#OptionRatesGroup");

        ratedivCount++;


    });

    $("#remove_new_period").click(function() {
        if (ratedivCount == 1) {
            alert("No more Rooms to remove");
            return false;
        }
        ratedivCount--;
        $("#OptionRateDiv" + ratedivCount).remove();

    });

});

//Add Accomodation Option Sets

$(document).ready(function() {

    var cloneCount = 2;

    $("#add_accomodation_option").click(function() {

        if (cloneCount > 3) {
            alert("Only 3 Options Allowed");
            return false;
        }

        var cloned = $('.accomodation_option_set').first().clone();

        cloned.attr('id', 'accomodation_option_set' + cloneCount++);
        cloned.find('.option').attr('value', 'option' + (cloneCount - 1));
        cloned.children("h2").text('Option: ' + (cloneCount - 1));
        cloned.insertBefore($('.new_accomodations_option_add'));

    });

    $("#remove_accomodation_option").click(function() {
        if (cloneCount == 2) {
            alert("No more Options to remove");
            return false;
        }

        cloneCount--;
        $("#accomodation_option_set" + cloneCount).remove();


    });
});

//Date Picker
$(document).ready(function() {
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    var checkin, checkout = null;

    $('body').on('focus', ".dpd1", function() {
        $(this).datepicker();
    });

    $('body').on('focus', ".dpd2", function() {
        $(this).datepicker();
    });

});

//Creating Package Json Object
(function($) {
    $.fn.serializeFormJSON = function() {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);


$('form#myForm').submit(function(e) {

    e.preventDefault();
    var data = $(this).serializeFormJSON();
    /*console.log(data);*/
    /*alert(JSON.stringify(data));*/

    var dataPackage = JSON.stringify(data);

    var parsedData = jQuery.parseJSON(dataPackage);


    var itineraryTitles = $('input[name="itinerarytitle[]"]').map(function() {
        return this.value;
    }).get();

    var itineraryDescription = $('textarea[name="packagedescription[]"]').map(function() {
        return this.value;
    }).get();


    var continentId = parsedData.Continent;
    var countryId = parsedData.packageCountryName;
    var packageTitle = parsedData.packagetitle;
    var packageCategories = parsedData.categories;
    var packageDescription = parsedData.details;
    var packageImagesUrl = parsedData.images;
    var packageIncludes = parsedData.packageincludes;
    var packageExcludes = parsedData.packageexcludes;
    var packageTermsConditions = parsedData.packagetermsconditions;
    var packageChildrenPolicy = parsedData.packagechildrenpolicy;
    var packageCancellationPolicy = parsedData.packagecancellationpolicy;
    var packageTermsConditions = parsedData.packagetermsconditions;
    var packageMapLatitude = parsedData.latitude;
    var packageMapLongitude = parsedData.longitude;

    /* console.log(continentId);
    console.log(countryId); */
    //  console.log(roomOccupancyPriceHiddenPerOptions, "Hidden roomOccupancyPriceHiddenPerOptions");

    //Itinarary Object creation 
    var itinararyResult = [];

    for (var i = 0; i < $('.itinerary-item').length; i++) {
        //arr3[arr1[i]] = arr2[i];
        var itinerary = {
            title: itineraryTitles[i],
            description: itineraryDescription[i]
        };
        itinararyResult.push(itinerary);
    }


    /* console.log(occupancyAndRateOptionObjects, "occupancyAndRateOptionObjects");*/
    /*Room Occupancy And Rate Object Creation Ends*/

    /*JSON Data Preparation*/
    var packageJsonData = {
        continentId: continentId,
        countryId: countryId,
        packagename: packageTitle,
        packagecategories: packageCategories,
        packagedescription: packageDescription,
        itinerary: itinararyResult,
        images: packageImagesUrl,
        includes: packageIncludes,
        excludes: packageExcludes,
        childrenpolicy: packageChildrenPolicy,
        cancellationpolicy: packageCancellationPolicy,
        termsconditions: packageTermsConditions
    };

    $.ajax({
        type: 'POST',
        data: packageJsonData,
        url: '/admin/admin_home/packages-new',
        success: function(msg) {
            /* alert("Data Posted Successfully");*/
        }
    }).done(function(response) {
        window.location.replace('/admin/admin_home/packages');
    });

});


//Place Holder Onclick placeholder Delete
$(function() {
    $('input,textarea').focus(function() {
        $(this).data('placeholder', $(this).attr('placeholder'))
            .attr('placeholder', '');
    }).blur(function() {
        $(this).attr('placeholder', $(this).data('placeholder'));
    });
});