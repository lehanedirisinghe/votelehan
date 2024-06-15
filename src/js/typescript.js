// path: /src/sound-handler.ts
(function () {
    'use strict';
    // 1. Initialize sound playback only after user interaction
    var userInteracted = false;
    function enableSoundPlayback() {
        userInteracted = true;
    }
    // 2. Add event listeners for user interactions
    document.addEventListener('click', enableSoundPlayback);
    document.addEventListener('keydown', enableSoundPlayback);
    // 3. Declare soundGroups only once
    var soundDir = '/src/sound/';
    var soundGroups = {
        submit: [
            'submit/classic-camera-click.mp3',
            'submit/camera-shutter-hard-click.mp3',
            'submit/camera-shutter-click.mp3',
            'submit/camera-long-shutter.mp3'
        ],
        open: [
            'open/single-book-paging.mp3',
            'open/quick-paper-crumple-sound.mp3',
            'open/paper-slide.mp3',
            'open/paper-scroll-in-an-office.mp3',
            'open/paper-quick-slice.mp3',
            'open/paper-quick-movement.mp3',
            'open/paper-crumble.mp3',
            'open/pages-of-paper-moving.mp3',
            'open/page-turn-single.mp3',
            'open/crumpled-paper.mp3',
            'open/big-paper-page-turn.mp3',
        ],
        navigate: [
            'navigate/vintage-typewriter-hit.mp3',
            'navigate/typewriter-single-mechanical-hit.mp3',
            'navigate/single-hit-on-typewriter.mp3',
            'navigate/mechanical-typewriter-hit.mp3'
        ],
        toggle: [
            'toggle/cool-interface-click-tone.mp3',
            'toggle/stapling-paper.mp3'
        ],
        achieve: [
            'achieve/melodic-bonus-collect.mp3',
            'achieve/bonus-collect-award.mp3'
        ]
    };
    // 4. Function to get a random sound file from a specific group
    function getRandomSound(group) {
        var soundFiles = soundGroups[group];
        var randomIndex = Math.floor(Math.random() * soundFiles.length);
        var audio = new Audio(soundDir + soundFiles[randomIndex]);
        audio.volume = 0.5; // Set volume to 50%
        return audio;
    }
    // 5. Play a sound when the page loads
    function playPageLoadSound() {
        var sound = getRandomSound('open');
        sound.volume = 0.5; // Set volume to 50%
        sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
    }
    // 6. Add event listener for the Back to Top button
    var backToTopButton = document.querySelector('a[href="#top"]');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function () {
            if (userInteracted) {
                var sound = getRandomSound('navigate');
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
            }
        });
    }
    // 7. Add event listener for image clicks
    var imageElement = document.querySelector('img'); // Adjust the selector as needed
    if (imageElement) {
        imageElement.addEventListener('click', function () {
            if (userInteracted) {
                var sound = getRandomSound('submit');
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
            }
        });
    }
    // 8. Add sound effect for language selector
    var languageSelectElement = document.querySelector('.language-selector');
    if (languageSelectElement) {
        languageSelectElement.addEventListener('change', function () {
            if (userInteracted) {
                var sound = getRandomSound('toggle');
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
            }
        });
    }
    // Warning: the toggle language selector is working, but the sound is not playing
    // We will study it later
    // 9. Event functions to play a random sound from a specified group
    function addSoundEventListener(selector, event, group) {
        document.querySelectorAll(selector).forEach(function (element) {
            element.addEventListener(event, function () {
                var sound = getRandomSound(group);
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
            });
        });
    }
    // 10. Your existing code:
    document.addEventListener('DOMContentLoaded', function () {
        console.log('DOM fully loaded and parsed');
        initializeCriticalComponents();
        initializeNonCriticalComponents();
        playPageLoadSound(); // Ensure sound plays on page load
    });
    // 11. Initialize the Intersection Observer
    var observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    var observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            var target = entry.target;
            if (entry.isIntersecting) {
                target.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Reveal
            }
            else {
                target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Cover
            }
        });
    }, observerOptions);
    // 12. Initialize critical components such as cookies consent and Google Analytics
    function initializeCriticalComponents() {
        initializeCookiesConsent();
        initializeGoogleAnalytics();
    }
    // 13. Initialize the cookies consent functionality
    function initializeCookiesConsent() {
        var _a;
        var cookieConsentElement = document.getElementById('cookie-consent');
        var cookieAcceptButton = document.getElementById('cookie-accept');
        // 14. Check if cookie consent elements exist
        if (!cookieConsentElement || !cookieAcceptButton) {
            console.error('Cookie consent elements not found');
            return;
        }
        try {
            // 15. Show cookie consent if not already accepted
            if (((_a = getStorage()) === null || _a === void 0 ? void 0 : _a.getItem('cookiesAccepted')) === 'true') {
                console.log('Cookies already accepted, hiding banner');
                cookieConsentElement.style.display = 'none';
            }
            else {
                console.log('Showing cookie consent');
                cookieConsentElement.style.display = 'block';
            }
            // 16. Add click event listener to the accept button
            cookieAcceptButton.addEventListener('click', function (event) {
                event.preventDefault();
                acceptCookies();
                var sound = getRandomSound('submit'); // Play sound on click
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
            });
        }
        catch (e) {
            console.error('Storage not available', e);
        }
    }
    // 17. Handle the acceptance of cookies
    function acceptCookies() {
        var _a;
        try {
            // 18. Store acceptance in storage
            (_a = getStorage()) === null || _a === void 0 ? void 0 : _a.setItem('cookiesAccepted', 'true');
            console.log('Cookies accepted and stored in storage.');
        }
        catch (e) {
            console.error('Storage not available', e);
        }
        var cookieConsentElement = document.getElementById('cookie-consent');
        // 19. Check if cookie consent element exists
        if (!cookieConsentElement) {
            console.error('Cookie consent element not found');
            return;
        }
        // 20. Hide the cookie consent element
        cookieConsentElement.style.display = 'none';
        console.log('Cookie consent element hidden.');
    }
    // 21. Function to determine available storage (localStorage, sessionStorage, or none)
    function getStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return localStorage;
        }
        catch (e) {
            console.warn('LocalStorage not available, using SessionStorage.');
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return sessionStorage;
            }
            catch (e) {
                console.error('Both LocalStorage and SessionStorage are not available.');
                return null;
            }
        }
    }
    // 22. Initialize Google Analytics
    function initializeGoogleAnalytics() {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }
        // 23. Define gtag function to send data to Google Analytics
        function gtag() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            window.dataLayer.push(args);
        }
        // 24. Initialize Google Analytics with the provided ID
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        console.log('Google Analytics Initialized');
    }
    // 25. Initialize non-critical components such as user engagement tracking and event listeners
    function initializeNonCriticalComponents() {
        initializeUserEngagementTracking();
        addEventListenersForNavigation();
        addEventListenersForButtons();
        playPageLoadSound(); // Play sound when the page loads
    }
    // 26. Initialize user engagement tracking
    function initializeUserEngagementTracking() {
        console.log('User Engagement Tracking Initialized');
    }
    // 27. Add event listeners to navigation links to highlight the active link
    function addEventListenersForNavigation() {
        var links = document.querySelectorAll('nav a');
        var currentPath = window.location.pathname;
        console.log('Current Path:', currentPath); // Log current path
        // 28. Ensure the current path ends with a trailing slash
        if (!currentPath.endsWith('/')) {
            currentPath += '/';
        }
        // 29. Handle default paths and adjust accordingly
        if (currentPath === '/' || currentPath === '/votelehan.com/' || currentPath === '/terms.html/' || currentPath.startsWith('/problems/') || currentPath === '/127.0.0.1/') {
            currentPath = '/index.html/';
        }
        // 30. Define the six parent menu options
        var parentMenuOptions = [
            '/home/',
            '/about/',
            '/services/',
            '/projects/',
            '/contact/',
            '/blog/'
        ];
        // 31. Loop through each navigation link
        links.forEach(function (link) {
            var linkPath = new URL(link.href).pathname;
            console.log('Link Path:', linkPath); // Log each link path
            // 32. Ensure linkPath also ends with a trailing slash for consistency
            if (!linkPath.endsWith('/')) {
                linkPath += '/';
            }
            console.log('Link Path:', linkPath);
            // 33. Add 'active' class to the current link and remove from others
            if (linkPath === currentPath) {
                link.classList.add('active');
                console.log("Adding active class to: ".concat(linkPath));
                var soundGroup = parentMenuOptions.includes(linkPath) ? 'navigate' : 'open'; // Determine sound group
                var sound = getRandomSound(soundGroup); // Play sound on navigation
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
            }
            else {
                link.classList.remove('active'); // Ensure only the relevant item is active
                console.log("Removing active class from: ".concat(linkPath));
            }
        });
        console.log('Navigation Event Listeners Added');
    }
    // 34. Add event listeners to buttons to toggle visibility of sections
    function addEventListenersForButtons() {
        var toggleButtons = document.querySelectorAll('button[data-toggle]');
        // 35. Loop through each button with data-toggle attribute
        toggleButtons.forEach(function (button) {
            var targetId = button.getAttribute('data-toggle');
            button.addEventListener('click', function () {
                if (targetId) {
                    toggleSection(targetId, button);
                    var sound = getRandomSound('toggle'); // Play sound on click
                    sound.volume = 0.5; // Set volume to 50%
                    sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
                }
            });
            console.log("Event listener added for button with data-toggle=\"".concat(targetId, "\""));
        });
        // 36. Additional event listeners for other buttons (e.g., accept buttons)
        document.querySelectorAll('button.accept, form').forEach(function (element) {
            element.addEventListener('click', function (event) {
                var sound = getRandomSound('submit');
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(function (error) { return console.log('Audio playback failed:', error); });
                if (element.tagName.toLowerCase() === 'form') {
                    event.preventDefault();
                    element.submit(); // Ensure the form is still submitted
                }
            });
        });
        console.log('Button Event Listeners Added');
    }
    // 37. Function to toggle the visibility of a section
    function toggleSection(sectionId, button) {
        var section = document.getElementById(sectionId);
        // 38. Check if section element exists
        if (!section) {
            console.error("Element with id \"".concat(sectionId, "\" not found."));
            return;
        }
        // 39. Toggle the 'hidden' class on the section
        section.classList.toggle('hidden');
        // 40. Update the button text based on the section visibility
        if (section.classList.contains('hidden')) {
            button.textContent = 'Reveal more';
        }
        else {
            button.textContent = 'Hide this';
        }
        console.log("Toggled section with id=\"".concat(sectionId, "\""));
    }
    // 41. Hamburger menu functionality
    var hamburger = document.querySelector('.hamburger');
    var menu = document.querySelector('nav ul');
    if (hamburger && menu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    else {
        console.error('Hamburger or menu element not found');
    }
    // 42. Language selector functionality
    var languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', changeLanguage);
    }
    else {
        console.error('Language selector element not found');
    }
    function changeLanguage() {
        var selectedLanguage = (languageSelector === null || languageSelector === void 0 ? void 0 : languageSelector.value) || '';
        fetch("/path/to/".concat(selectedLanguage, ".json"))
            .then(function (response) { return response.json(); })
            .then(function (data) { return updateContent(data); })
            .catch(function (error) { return console.error('Error loading language file:', error); });
    }
    function updateContent(data) {
        var _a;
        document.title = data.title;
        (_a = document.querySelector('meta[name="description"]')) === null || _a === void 0 ? void 0 : _a.setAttribute('content', data.description);
        document.querySelector('nav a[href="/index.html"]').textContent = data.nav.home;
        document.querySelector('nav a[href="/policy.html"]').textContent = data.nav.policy;
        document.querySelector('nav a[href="/economy.html"]').textContent = data.nav.economy;
        document.querySelector('nav a[href="/social.html"]').textContent = data.nav.social;
        document.querySelector('nav a[href="/story.html"]').textContent = data.nav.story;
        document.querySelector('nav a[href="/partner.html"]').textContent = data.nav.partner;
    }
    // 43. JavaScript to set the current year
    document.addEventListener('DOMContentLoaded', function () {
        var currentYearElement = document.getElementById('currentYear');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear().toString();
        }
    });
})();
