$(function() {
    $("#files").load("filelist");
    $("input[type='button']").click(function() {
        var formData = new FormData();
        if ($('#myFile').val() == '') {
            /*alert("Please Choose file!");*/
            return false;
        }
        $('div.progress').show();
        var file = document.getElementById('myFile').files[0];
        formData.append('uploadfile', file);
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/admin_home/fileUpload', true);
        xhr.upload.onprogress = function(e) {
            if (e.lenghtComputable) {
                var percentage = (e.loaded / e.total) * 100;
                $('div.progress div').css('with', percentage.toFixed(0) + '%');
                $('div.progress div').html(percentage.toFixed(0) + '%');
            }
        };
        xhr.onerror = function(e) {
            alert('An error occurred while submitting the form. Maybe your file is too big');
        };
        xhr.onload = function() {
            var file = xhr.responseText;
            $('div.progress div').css('width', '0%');
            $('div.progress').hide();
            showMsg("alert alert-success", "File uploaded Successfully!");
            $('#myFile').val('');
            $('#files').append("<div class='accomodation_image'><img style='height:40px;margin:10px;' src='" + file + "'/><span class='delete-image'><i class='fa fa-remove' aria-hidden='true'></i></span></div>");
            $('#images').append('<input type="hidden" name="images" value="' + file + '" >');
        };
        xhr.send(formData);
        return false;
    });

    function showMsg(className, msg) {
        $("#msg").fadeIn();
        $("#files").load("filelist");
        $("#msg").addClass(className);
        $("#msg").html(msg);
        $("#msg").fadeOut(3000, function() {
            $("#msg").removeClass(className);
        });
    }

    /*$(document).on('click', '#delete', function() {
        $(this).attr('href', 'javascript:void(0)');
        $(this).html("deleting..");
        var file = $(this).attr("file");
        $.ajax({
            url: 'deleteFile/' + file,
            type: 'GET',
            data: {},
            success: function(res) {
                showMsg("alert alert-danger", "File deleted successfully!")
            }
        });
    });*/
});