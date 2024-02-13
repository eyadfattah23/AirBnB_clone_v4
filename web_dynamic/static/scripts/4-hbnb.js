/**
 * Listen for changes on each input checkbox tag
 */
document.addEventListener('DOMContentLoaded', function () {
  $(function () {
    const amenitiesDict = [];
    $('input[type="checkbox"]').change(function () {
      const amenityID = $(this).data('id');
      const amenityName = $(this).data('name');

      if ($(this).is(':checked')) {
        amenitiesDict.push({ id: amenityID, name: amenityName });
      } else {
        let indexToRemove = -1;
        for (let i = 0; i < amenitiesDict.length; i++) {
          if (amenitiesDict[i].id === amenityID) {
            indexToRemove = i;
            break;
          }
        }

        // Remove the amenity from the array if found
        if (indexToRemove !== -1) {
          amenitiesDict.splice(indexToRemove, 1);
        }
      }
      const amenitiesList = amenitiesDict.map(function (amenity) {
        return amenity.name;
      }).join(', ');
      $('.amenities h4').text(amenitiesList);
    });

    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/status/',
      data: 'data',
      dataType: 'json',
      success: function (data) {
        if (data.status === 'OK') {
          $('div#api_status').addClass('available');
        } else {
          $('div#api_status').removeClass('available');
        }
      }
    });

    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({}),
      dataType: 'json',
      success: function (response) {
        $.each(response, function (i, place) {
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
                        '<div class="description">' +
                        place.description + '</div>' +
                        '</article>');
        });
      },
      error: function (xhr, status, error) {
        console.error(xhr.responseText);
      }
    });

    $("button, input[type='button']").on('click', function () {
      const amenitiesIDsList = amenitiesDict.map(function (amenity) {
        return amenity.id;
      });
      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        data: JSON.stringify({ amenities: amenitiesIDsList }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
          $('section.places').empty();
          console.log(response);
          $.each(response, function (i, place) {
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
                            '<div class="description">' +
                            place.description + '</div>' +
                            '</article>');
          });
        },
        error: function (xhr, status, error) {
          console.error(xhr.responseText);
          console.log(error);
        }
      });
    });
  });
});
