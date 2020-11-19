"use strict";

$(function () {
  function initIsotope() {
    var $grid = $('.grid');

    if ($grid.length) {
      var _grid = $grid.isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });

      $('.filter-box').on('click', 'a', function (e) {
        e.preventDefault();
        var filterValue = $(this).attr('data-filter');
        $('.is-selected').removeClass('is-selected');
        $(this).addClass('is-selected');

        _grid.isotope({
          filter: filterValue
        });
      });
    }
  }

  function initNavigationSpy() {}

  initIsotope();
});