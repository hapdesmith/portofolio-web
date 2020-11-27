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

            $('.filter-box').on('click', 'a', function(e) {
                e.preventDefault();
                var filterValue = $( this ).attr('data-filter');
                $('.is-selected').removeClass('is-selected');
                $(this).addClass('is-selected');
                _grid.isotope({ filter: filterValue });
            })
        }
    }

    function initNavigationSpy() {
        const $nav = $('nav');

        if ($nav.length) {

            // flag untuk penanda apakah
            // scroll via click link di navigasi atau via scroll manual
            let isClick = false;

            // karena dalam scroll ada kemungkinan kelewat
            // maka kita kasih toleransi jarak meleset dari target
            const TOLERANCE = 50;

            // cari nav a, jadikan array
            // dari array tsb buat array of objct yang berisi navi ( contoh: a.home )
            // dan offset atau posisi dari section target dari navi
            // CONTOH ISI VARIABLE INI :
            // [
            //     {navi: 'a.home', offest: 99}
            //     {navi: 'a.about', offest: 123}
            // ]
            // console.log($nav.find('a').toArray());
            const destList = $nav.find('a').toArray().map((e) => {
                // console.log(e);
                const target = $(e).attr('href'); // #home, #about, #blog
                // kita set posisi dari target sesuai yang ada didalem href,
                // jika di dalam href navi tidak ditemukan targetnya, 
                // kita set nilainya -999999 atau nilai brapapun yang tidak akan terHIT dengan scroll
                const offest = $(target).offset() ? Math.floor($(target).offset().top) : -999999;
                const tempObj = {
                    navi: e,
                    offest,
                }
                return tempObj;
            });
            // console.log(destList);

            // fungsi yang digunakan untuk mengintip / spy gerakan scroll
            // jika posisi scroll menghit target / range toleransi target
            // maka toggling kelas aktif di bagian navi
            function scrollSpy(e) {

                // dapatkan posisi scroll kita skg
                const scrollPos = $(e.target).scrollTop();

                // untuk mencocokan posisi scroll kita skg (scrollPos)
                // dengan offest yang ada di dalam variable destList
                // jika terjadi kecocokan atau maka return true yang mana akan mengisi
                // isHit dengan Array dari Object
                // CONTOH ISI DARI VARIABLE isHit :
                //  jika tidak ada yg ke HIT = []
                //  jika ada yang ke HIT = [{navi: a.home.active, offest: 88}]
                const isHit = destList.filter((e) => {
                    let temp = false;
                    // console.log(`${e.navi} : ${e.offest - scrollPos}`);
                    // 88 -> 38 < area yg ke hit < 238
                    // ALTERNATIVE 1
                    // temp = e.offest - scrollPos >= -1*TOLERANCE && e.offest - scrollPos <= TOLERANCE + 100
                    // ALKTERNATIVE 2, lebih mudah di pahami. 
                    temp = e.offest - TOLERANCE <= scrollPos && scrollPos <= e.offest + TOLERANCE;
                    return temp;
                });
                // console.log(scrollPos, isHit);

                // klo ada yang terhit, kita reset class active di navi
                // set kelas active ke navi baru yg seesuai
                if (isHit.length & !isClick) {
                    // reset kelas active
                    $nav.find('.active').removeClass('active');

                    // ngeset kelas active navi yang ke hit
                    $(isHit[0].navi).addClass('active');
                }
            }
            
            // nilai default awal setelah refresh
            $('a.home').addClass('active');

            // pasang fungsi ke event scroll
            $(window).scroll((e) => scrollSpy(e));

            // pasang fungsi ke event click navi
            $nav.on('click', 'a', (e) => {
                const dest = $(e.target).attr('href');

                // jika yang klik adalah link mengaharah ke luar
                if (!$(dest).length) return;

                // hindari default behaviour click yg mungkin kita tidak inginkan
                e.preventDefault();
                
                // gunanya agak tidak terjadi animasi setengah active navigation,
                // gara2 fungsi toggling active di dalam scrollspy
                isClick = true;

                // ini untuk reset kondisi link navi yang aktif
                $nav.find('.active').removeClass('active');
                // ini untuk mengaktifkan link navi baru yang aktif
                $(e.target).addClass('active');
                // fungsi untuk menganimasikan gerakan scroll,
                // tanpa ini jika di klik link navinya, bakal lompat
                // setelah seleasi scroll via animate kita set isClick ke false lagi
                // agar klo kita scroll manual bisa toggling class active lagi
                $('html,body').animate({ scrollTop: $(dest).offset().top }, 'slow', () => {isClick = false});
            })            
        }
    }

    initIsotope();
    initNavigationSpy();

})