//Creating Package Json Object

$(".get__package__details").click(function() {
    var packageImages = [];
    var packagename = $(this).parents('.package_form_details').find('.package_name').text();
    var packagecontinent = $(this).parents('.package_form_details').find('.package_continent_name').text();
    var packageContinentId = $(this).parents('.package_form_details').find('.package_continent_id').text();
    var packagecountry = $(this).parents('.package_form_details').find('.package_country_name').text();
    var packagecategory = $(this).parents('.package_form_details').find('.package_category_name').text();
    var packagedescription = $(this).parents('.package_form_details').find('.package_description_details').text();
    packageImages = $(this).parents('.package_form_details').find(".packages_images");

    var itinaryTitle = [];
    $('.package_itinerary_title').each(function(index, obj) {
        itinaryTitle.push($(this).html());
    });

    var packageIncludes = $(this).parents('.package_form_details').find('.package_include').text();
    var packageExcludes = $(this).parents('.package_form_details').find('.package_exclude').text();
    var packageChildrenpolicy = $(this).parents('.package_form_details').find('.package_childrenpolicy').text();
    var packageCancelpolicy = $(this).parents('.package_form_details').find('.package_cancelpolicy').text();
    var packageTerms = $(this).parents('.package_form_details').find('.package_terms').text();
    var packageId = $(this).parents('.package_form_details').find(".get__package__details").attr('data-id');

    $('.package_name_edit').val(packagename);
    $('.package_description_edit').val(packagedescription);
    $('.package_includes_edit').val(packageIncludes);
    $('.package_excluded_edit').val(packageExcludes);
    $('.package_childrenpolicy_edit').val(packageChildrenpolicy);
    $('.package_cancellationpolicy_edit').val(packageCancelpolicy);
    $('.package_termsconditions_edit').val(packageTerms);
    $('.updatePackagebtn').val(packageId);

    //Admin Continent List

    $.ajax({
        url: "/admin/admin_home/continent-list",
        type: "GET",
        dataType: 'json',
        success: function(allcontinents) {
            var toAppendContinent = '';
            for (var i = 0; i < allcontinents.length; i++) {
                if (allcontinents[i].name == packagecontinent) {
                    toAppendContinent += "<option value='" + allcontinents[i]._id + "' selected>" + allcontinents[i].name + "</option>"
                } else {
                    toAppendContinent += "<option value='" + allcontinents[i]._id + "'>" + allcontinents[i].name + "</option>"
                }
            }
            $('.packages_continent_list_edit').empty().append(toAppendContinent);
        }
    });

    //Category List
    $.ajax({
        url: "/admin/admin_home/categories-list",
        type: "GET",
        dataType: 'json',
        success: function(allcategories) {
            var listToAppend = '';
            for (var z = 0; z < allcategories.length; z++) {
                if (allcategories[z].name == packagecategory) {
                    listToAppend += "<input type='checkbox' name='categories' value='" + allcategories[z].name + "' checked />&nbsp;" + allcategories[z].name + " "
                } else {
                    listToAppend += "<input type='checkbox' name='categories' value='" + allcategories[z].name + "' />&nbsp;" + allcategories[z].name + " "
                }
            }
            $('.categories__list__edit').append(listToAppend);
        }
    })

    $.ajax({
        url: "/admin/admin_home/destination-list",
        type: "GET",
        dataType: 'json',
        success: function(allcountries) {
            var toAppend = '';
            for (var i = 0; i < allcountries.length; i++) {
                if (allcountries[i].continentId == packageContinentId) {
                    if (allcountries[i].name == packagecountry) {
                        toAppend += "<input  name='packageCountryName' type='checkbox' value='" + allcountries[i]._id + "' checked />&nbsp;" + allcountries[i].name + " "
                    } else {
                        toAppend += "<input  name='packageCountryName' type='checkbox' value='" + allcountries[i]._id + "' />&nbsp;" + allcountries[i].name + " "
                    }

                }
            }
            $('.selectPackageContinents').empty().append(toAppend);
        }

    });

    $(function() {
        $(".packages_continent_list_edit").change(function() {
            var continentid = $(this).val();
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

    var itinaryDescription = [];

    $('.package_itinerary_description').each(function(index, obj) {
        itinaryDescription.push($(this).html());
    });

    $('#files').empty();
    for (var i = 0; i < packageImages.length; i++) {
        //console.log($(packageImages[i]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(packageImages[i]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(packageImages[i]).html() + '" >');
    }

    $('.textboxesItineraryPackage').empty();

    //Accomodation  
    for (var itinaryList = 0; itinaryList < itinaryTitle.length; itinaryList++) {

        var itinarytypediv = '';
        itinarytypediv = "<div id='TextBoxDiv" + (itinaryList + 1) + "' class='items itinerary-item'><label>Day " + (itinaryList + 1) + "</label></br><label for='itinerarytitle'>Title</label><input type='textbox' id='textbox__itinerary" + (itinaryList + 1) + "' name='itinerarytitle[]' class='form-control textbox__itinerary" + (itinaryList + 1) + "' value='" + itinaryTitle[itinaryList] + "' required><div class='help-block with-errors'></div><label for='description'>Package description:</label><textarea class='form-control itinerary__description" + (itinaryList + 1) + "' name='packagedescription[]' id='itinerary__description" + (itinaryList + 1) + "' rows='5' placeholder='Write your package details...' value='" + itinaryDescription[itinaryList] + "' required>" + itinaryDescription[itinaryList] + "</textarea><div class='help-block with-errors'></div></div>";

        $('.textboxesItineraryPackage').append(itinarytypediv);
    }

});


// Delete Package
$(document).ready(function() {
    $('.deletePackage').on('click', deletePackage);
});

function deletePackage() {
    var confirmation = confirm('Are you Sure ?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/packages/delete/' + $(this).data('id')
        }).done(function(response) {
            window.location.replace('/admin/admin_home/packages');
        });
    } else {
        return false;
    }
}


//Update Package Status
$(document).ready(function() {
    $('select.package_publish_status').on('change', packageStatus);
});

function packageStatus() {
    var packageChangeStatus = $(".package_publish_status option:selected", $(this).parent()).val();
    var packageId = $(".package_publish_status option:selected", $(this).parent()).attr('data-id');

    var data = {
        status: packageChangeStatus,
        pkgId: packageId
    };

    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/packagestatus/update/' + $(".package_publish_status option:selected", $(this).parent()).attr('data-id'),
        success: function(result) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);

        }
    });
}
//Update Package Status
$(document).ready(function() {
    $('select.package_promote_status').on('change', packagePromoteStatus);
});

function packagePromoteStatus() {
    var packagePromoteChangeStatus = $(".package_promote_status option:selected", $(this).parent()).val();
    var packageId = $(".package_promote_status option:selected", $(this).parent()).attr('data-id');

    var data = {
        status: packagePromoteChangeStatus,
        pkgId: packageId
    };

    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/packagepromotestatus/update/' + $(".package_publish_status option:selected", $(this).parent()).attr('data-id'),
        success: function(result) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);

        }
    });
}
$(document).ready(function() {

    $('.add__itinerary__edit').click(function() {
        var itiCounter = $('.textboxesItineraryPackage .itinerary-item').length;

        var newItineraryDiv = $(document.createElement('div'))
            .attr("id", 'TextBoxDiv' + (itiCounter + 1));

        newItineraryDiv.attr("class", 'items itinerary-item');

        newItineraryDiv.after().html('<label>Day ' + (itiCounter + 1) + ' : </label>' + '<br>' + '<label for="itinerarytitle">Title</label>' + '<input type="textbox" id="textbox__itinerary' + (itiCounter + 1) + '" name="itinerarytitle[]" class="form-control textbox__itinerary' + (itiCounter + 1) + '"  required="" autocomplete="off">' + '<textarea class="form-control" name="packagedescription[]" id="description' + (itiCounter + 1) + '" rows="5" placeholder="Write your package details..." required></textarea>');

        newItineraryDiv.appendTo(".textboxesItineraryPackage");
        itiCounter++;

    });

    $('.remove__itinerary__edit').click(function() {
        var itiCounter = $('.textboxesItineraryPackage .itinerary-item').length;


        if (itiCounter == 0) {
            alert("No more Rooms to remove");
            return false;
        }
        itiCounter--;
        $("#TextBoxDiv" + (itiCounter + 1)).remove();

    });


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

    $('#updatePackageForm').submit(function(e) {
        e.preventDefault();
        var data = $(this).serializeFormJSON();
        var dataPackage = JSON.stringify(data);
        var parsedData = jQuery.parseJSON(dataPackage);


        var itineraryTitles = $('input[name="itinerarytitle[]"]').map(function() {
            return this.value;
        }).get();


        var itineraryDescription = $('textarea[name="packagedescription[]"]').map(function() {
            return this.value;
        }).get();

        var continent = parsedData.Continent;
        var country = parsedData.packageCountryName;
        var packageTitle = parsedData.packagename;
        var packageCategories = parsedData.categories;
        var packageDescription = parsedData.description;
        var packageImagesUrl = parsedData.images;
        var packageIncludes = parsedData.packageincludes;
        var packageExcludes = parsedData.packageexcludes;
        var packageTermsConditions = parsedData.packagetermsconditions;
        var packageChildrenPolicy = parsedData.packagechildrenpolicy;
        var packageCancellationPolicy = parsedData.packagecancellationpolicy;

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

        /*JSON Data Preparation*/
        var packageJsonData = {
            continent: continent,
            country: country,
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
            type: 'PUT',
            data: packageJsonData,
            url: '/admin/admin_home/packagesupdate/' + $(this).parents('.modal-body').find(".updatePackagebtn").attr('value'),
            success: function(msg) {
                $.notify("Your Changes Has Been Saved", "success");
                window.setTimeout(function() { location.reload() }, 2000);
                $(".btn-dest-close").click(function() {
                    location.reload();
                });
            }
        }).done(function(response) {
            window.location.replace('/admin/admin_home/packages');
        });

    });

});

//Creating Package Json Object