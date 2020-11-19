$(function() {

    function initIsotope() {

        const $grid = $('.grid');

        if ($grid.length) {

            const _grid = $grid.isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-sizer',
                }
            });
    
            $('.filter-group').on('click', 'a', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var filterValue = $( this ).attr('data-filter');
                _grid.isotope({ filter: filterValue });
            });
        }
    }

    initIsotope();

})