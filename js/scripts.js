// business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(type, street, city, state) {
  this.type = type;
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.type + " " + this.street + ", " + this.city + ", " + this.state;
}

function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("#addressType").val("");
    $("input.new-street").val("");
    $("input.new-city").val("");
    $("input.new-state").val("");
    $(".next-address").remove();
}

// user interface logic
$(function() {
  $("#add-address").click(function() {
   $("#new-addresses").append('<div class="next-address">' +
                                '<label for="addressType">Address Type</label>' +
                                '<select class="form-control" id="addressType">' +
                                  '<option>Home Address:</option>' +
                                  '<option>Work Address:</option>' +
                                  '<option>Mailing Address:</option>' +
                                '</select>' +
                                '<br>' +
                                '<div class="form-group">' +
                                  '<label for="new-street">Street</label>' +
                                  '<input type="text" class="form-control new-street">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-city">City</label>' +
                                  '<input type="text" class="form-control new-city">' +
                                '</div>' +
                                '<div class="form-group">' +
                                  '<label for="new-state">State</label>' +
                                  '<input type="text" class="form-control new-state">' +
                                '</div>' +
                              '</div>');
 });

  $("#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("#new-first-name").val();
    var inputtedlastName = $("#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedlastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find(".new-street").val();
      var inputtedType = $("#addressType").val();
      var inputtedCity = $(this).find(".new-city").val();
      var inputtedState = $(this).find(".new-state").val();
      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState);
      newContact.addresses.push(newAddress);
    });

    $("#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    resetFields();

  });
});
