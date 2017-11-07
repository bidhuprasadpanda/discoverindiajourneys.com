$(".continent_details_edit").click(function() {
    var images = [];
    var continentName = $(this).parents('.continent_details_table').find('.continent_name').text();
    var continentQuote = $(this).parents('.continent_details_table').find('.continent_quote').text();
    var continentAbout = $(this).parents('.continent_details_table').find('.continent_about').text();
    var continentUserId = $(this).parents('.continent_details_table').find('.continent_userid').text();
    images = $(this).parents('.continent_details_table').find('.continent_images_edit');
    var continentId = $(this).parents('.continent_details_table').find('.continent_details_edit').attr('data-id');

    $(".continent_name_edit").val(continentName);
    $(".continent_description_edit").val(continentAbout);
    $(".continent_quote_edit").val(continentQuote);
    $(".updateContinent").val(continentId);

    $('#files').empty();
    for (var i = 0; i < images.length; i++) {
        //console.log($(images[i]).html());
        $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + $(images[i]).html() + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
        $('#images').append('<input type="hidden" name="images" value="' + $(images[i]).html() + '" >');
    }
});

//Delete Continents
$(document).ready(function() {
    $('.deleteContinent').on('click', deleteContinent);
});

function deleteContinent() {
    var confirmation = confirm('Are You Sure?');

    if (confirmation) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/admin_home/continent/delete/' + $(this).data('id'),
            success: function() {
                $.notify("Item Deleted Succesfully", "warn");
            }
        }).done(function(response) {
            window.location.replace('/admin/admin_home/continents');
        });
    } else {
        return false;
    }
}

//Update Continent
$(document).ready(function() {
    $('.updateContinent').on('click', updateContinent);
});

function updateContinent() {
    var my_array = [];
    $('div.continent_Present_Images div.accomodation_image img').each(function() {
        var count = $(this).attr('src');
        my_array.push(count);
    });

    console.log(my_array);

    var data = {
        name: $(this).parents('.modal-body').find('.continent_name_edit').val(),
        quote: $(this).parents('.modal-body').find('.continent_quote_edit').val(),
        description: $(this).parents('.modal-body').find(".continent_description_edit").val(),
        images: my_array

    };

    $.ajax({
        type: 'PUT',
        data: data,
        url: '/admin/admin_home/continent/update/' + $(this).parents('.modal-body').find(".updateContinent").attr('value'),
        success: function(data) {
            $.notify("Your Changes Has Been Saved", "success");
            window.setTimeout(function() { location.reload() }, 2000);
            $(".btn-place-close").click(function() {
                location.reload();
            });
        }
    });
}