/**
 * Listen for changes on each input checkbox tag:

    if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
    if the checkbox is unchecked, you must remove the Amenity ID from the variable
    update the h4 tag inside the div Amenities with the list of Amenities checked

 */

document.addEventListener('DOMContentLoaded', function () {
  $('input[type=checkbox]').prop('checked', false);

  let amenitiesCheckedNames = [];
  let amenitiesCheckedIDs = [];

  $('.amenities .popover ul li input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenitiesCheckedNames.push($(this).attr('data-name'));
      amenitiesCheckedIDs.push($(this).attr('data-id'));
    } else {
      amenitiesCheckedNames = amenitiesCheckedNames.filter(amenity => amenity !== ($(this).attr('data-name')));
      amenitiesCheckedIDs = amenitiesCheckedIDs.filter(amenity => amenity !== ($(this).attr('data-id')));
    }

    $('div .amenities h4').text(amenitiesCheckedNames.join(', '));
  });

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    data: 'data',
    dataType: 'JSON',
    success: function (response) {
      if (response.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    },
    error: function (xhr, status, error) {
      // Handle errors here
      $('#api_status').removeClass('available');
      console.error('Error:', error);
    }
  });

  function getUserByID (userID) {
    const url1 = 'http://0.0.0.0:5001/api/v1/users/' + userID;
    $.ajax({
      type: 'GET',
      url: url1,
      dataType: 'JSON',
      success: function (response) {
        return response;
      }
    });
    return '';
  }

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    dataType: 'JSON',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (response) {
      for (let index = 0; index < response.length; index++) {
        const place = response[index];

        // Loop into the result of the request and create an article tag representing a Place in the section.places
        // const place_owner = getUserByID(place.user_id)
        // console.log(place_owner);

        $('section.places').append('<article>' +
                    '<div  class="title_box">' +
                    '<h2>' + place.name + '</h2>' +
                    '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                    '</div>' +
                    '<div class="information">' +
                    '<div class="max_guest">' + place.max_guest + (place.max_guest !== 1 ? ' Guests' : ' Guest') + '</div>' +
                    '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + '</div>' +
                    '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + '</div>' +
                    '</div>' +
                    // '<div class="user">' +
                    // '<b>Owner:</b>' + place_owner.first_name + place_owner.last_name +
                    // '</div>' +
                    '<div class="description">' +
                    place.description + '</div>' +
                    '</article>');
      }
    }
  });

  $('button').on('click', function () {
    const data = { amenities: amenitiesCheckedIDs };
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(data),
      dataType: 'json',
      success: function (response) {
        $('section.places').empty();
        for (let index = 0; index < response.length; index++) {
          const place = response[index];
          // const place_owner = getUserByID(place.user_id)
          // Loop into the result of the request and create an article tag representing a Place in the section.places

          $('section.places').append(
            '<article>' +
                        '<div class="title_box">' +
                        '<h2>' + place.name + '</h2>' +
                        '<div class="price_by_night">$' + place.price_by_night + '</div>' +
                        '</div>' +
                        '<div class="information">' +
                        '<div class="max_guest">' + place.max_guest + ' Guest' + ((place.max_guest > 1) ? 's' : '') + '</div>' +
                        '<div class="number_rooms">' + place.number_rooms + ' Bedroom' + ((place.number_rooms > 1) ? 's' : '') + '</div>' +
                        '<div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + ((place.number_bathrooms > 1) ? 's' : '') + '</div>' +
                        '</div>' +
                        // '<div class="user">' +
                        // '<b>Owner:</b>' + place_owner.first_name + place_owner.last_name +
                        // '</div>' +
                        '<div class="description">' +
                        place.description +
                        '</div>' +
                        '</article>'
          );
        }
      }
    });
  });
});
