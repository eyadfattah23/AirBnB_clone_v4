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
  });
});
