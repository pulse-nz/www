$("#contactForm").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
      } else {
          // everything looks good!
          event.preventDefault();
          submitForm();
      }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var phone = $("#phone").val();
    var msg_subject = $("#msg_subject").val();
    var message = $("#message").val();


    $.ajax({
        type: "POST",
        dataType: "xml",
        xhrFields: {
          withCredentials: true
        },
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdNaaFpUiE7CzLKyDJuWmxo0gY93wsY7QOOaeziMIdqoafoGQ/formResponse",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        },
        data: {
          "emailAddress": email,
          "entry.2005620554": name,
          "entry.1166974658": phone,
          "entry.839337160" : message
        },
        statusCode: {
        0: function() {
            formSuccess();
        },
        200: function() {
            formSuccess();
        }
      }
    });
}

function formSuccess(){
    $("#contactForm")[0].reset();
    submitMSG(true, "Message Submitted!")
}

function formError(){
    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "text-center fadeOut animated text-success";
    } else {
        var msgClasses = "text-center text-danger";
    }
    $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
}
