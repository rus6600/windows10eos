$(document).ready(function() {
    var $window = $(window);
    var $subnav = $('.subnav');
    var $subnavList = $('.subnav-list');
    var $subnavLinks = $('.subnav-link');
    var isMobile = false;

    // Function to check if mobile
    function checkMobile() {
        isMobile = $window.width() < 768; // Adjust breakpoint as needed
        if (isMobile) {
            $subnav.addClass('mobile');
            $subnavList.css('max-height', '0');
        } else {
            $subnav.removeClass('mobile');
            $subnavList.css('max-height', '');
        }
    }

    // Initial check
    checkMobile();

    // Check on resize
    $window.resize(function() {
        checkMobile();
    });

    // Toggle menu on mobile
    $subnav.on('click', '.subnav-toggle', function() {
        if (isMobile) {
            $(this).toggleClass('active');
            var isOpen = $(this).hasClass('active');
            $subnavList.css('max-height', isOpen ? $subnavList[0].scrollHeight + 'px' : '0');
        }
    });

    // Smooth scroll and active link
    $subnavLinks.on('click', function(e) {
        e.preventDefault();
        var targetId = $(this).attr('href');
        var $targetElement = $(targetId);
        
        if ($targetElement.length) {
            var targetPosition = $targetElement.offset().top - 77; // Account for fixed nav
            $('html, body').animate({
                scrollTop: targetPosition
            }, 'smooth');

            // Close mobile menu if open
            if (isMobile) {
                $('.subnav-toggle').removeClass('active');
                $subnavList.css('max-height', '0');
            }
        }
    });

    // Update active link on scroll
    $window.on('scroll', function() {
        var scrollPosition = $window.scrollTop() + 100; // Account for fixed nav

        $subnavLinks.each(function() {
            var targetId = $(this).attr('href');
            var $targetElement = $(targetId);
            
            if ($targetElement.length) {
                var sectionTop = $targetElement.offset().top;
                var sectionBottom = sectionTop + $targetElement.outerHeight();

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    $subnavLinks.removeClass('active');
                    $(this).addClass('active');
                    return false; // Break the loop
                }
            }
        });
    });

    // Main navbar functionality (updated code)
    var $navbar = $('.navbar');
    var $navbarToggler = $('.navbar-toggler');
    var $navbarCollapse = $('.navbar-collapse');

    function toggleMainMenu() {
        $navbarCollapse.toggleClass('show');
        var isOpen = $navbarCollapse.hasClass('show');
        
        if (isOpen) {
            var scrollHeight = $navbarCollapse[0].scrollHeight;
            $navbarCollapse.css('max-height', scrollHeight + 'px');
        } else {
            $navbarCollapse.css('max-height', '0');
        }

        $navbarToggler.attr('aria-expanded', isOpen);
    }

    $navbarToggler.on('click', function() {
        toggleMainMenu();
    });

    // Close main menu on window resize if it's open
    $window.resize(function() {
        if ($window.width() >= 992) { // Bootstrap's large breakpoint
            $navbarCollapse.css('max-height', '');
            $navbarCollapse.removeClass('show');
            $navbarToggler.attr('aria-expanded', false);
        } else if ($navbarCollapse.hasClass('show')) {
            $navbarCollapse.css('max-height', $navbarCollapse[0].scrollHeight + 'px');
        }
    });

    // Why Upgrade Section functionality
    var $tabButtons = $('.tab-button');
    var $tabContents = $('.tab-content');

    $tabButtons.on('click', function() {
        var $this = $(this);
        
        // Update active tab button
        $tabButtons.removeClass('active btn-primary').addClass('btn-light');
        $this.removeClass('btn-light').addClass('active btn-primary');
        
        // Show active tab content
        $tabContents.removeClass('active');
        $tabContents.eq($tabButtons.index($this)).addClass('active');
    });

    // Set initial active tab
    $tabButtons.first().click();
});
