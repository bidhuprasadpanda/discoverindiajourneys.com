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



   $('form.generalInquiryCountryForm').submit(function(e) {

       var fName = $("input[name=firstname]").val();
       var lName = $("input[name=lastname]").val();
       var email = $("input[name=email]").val();
       var countryId = $("input[name=inquiryCountryId]").attr('data-id');
       e.preventDefault();
       var data = $(this).serializeFormJSON();

       var dataPackage = JSON.stringify(data);

       var parsedData = jQuery.parseJSON(dataPackage);


       var firstName = parsedData.firstname;
       var lastName = parsedData.lastname;
       var emailIid = parsedData.email;
       var countryName = parsedData.country;
       var phoneNumber = parsedData.phonenumber;
       var inquiryText = parsedData.inquiry;
       var inquiryType = parsedData.type;
       var fromPageName = parsedData.pagename;
       var inquiryStatus = parsedData.inquiryStatus;

       //Json Object Create

       var dataString = {
           firstname: firstName,
           lastname: lastName,
           emailIid: emailIid,
           countryName: countryName,
           phoneNumber: phoneNumber,
           inquiryText: inquiryText,
           inquiryType: inquiryType,
           fromPageName: fromPageName,
           inquiryStatus: inquiryStatus
       };

       $.ajax({
           type: 'POST',
           data: dataString,
           url: '/country/countryId',
           success: function(msg) {
               $.notify("Your Form Has Been Submitted", "success");
               $('form.generalInquiryCountryForm').trigger("reset");
           }
       });
   });

   $(document).ready(function() {
       $('.homePacakgeName').on('click', createPackagePage);
   });

   function createPackagePage() {
       $.ajax({
           type: 'GET',
           url: '/package/' + $(this).data('id'),
           success: function(data) {
               console.log(data);
           }
       }).done(function(response) {
           window.location.replace('/');
       });

   }