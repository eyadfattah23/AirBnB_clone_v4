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
});
