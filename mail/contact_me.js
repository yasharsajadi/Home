$(function() {
  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name;
      // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages

      const templateParams = {
        name: name,
        email: email,
        phone: phone,
        message: message
      };
      const publicKey = "-Sdx5fKe3_tGSC4qU";
      const serviceID = "service_p61ebnw";
      const templateID = "template_zb2cazw";
      emailjs.init(publicKey);
      emailjs.send(serviceID, templateID, templateParams)
        .then(function(response) {
          // Success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-success')
            .append("<strong>Your message has been sent. </strong>");
          $('#success > .alert-success')
            .append('</div>');
          // clear all fields
          $('#contactForm').trigger("reset");
        }, function(error) {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
          $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that there was an error. Please try again later!"));
          $('#success > .alert-danger').append('</div>');
          // clear all fields
          $('#contactForm').trigger("reset");
        }).finally(function() {
          setTimeout(function() {
            $this.prop("disabled", false); // Re-enable submit button when email is sent or an error occurs
          }, 5000);
        });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});
