(function() {
    'use strict';

    // 1. Initialize sound playback only after user interaction
    let userInteracted = false;

    function enableSoundPlayback() {
        userInteracted = true;
    }

    // 2. Add event listeners for user interactions
    document.addEventListener('click', enableSoundPlayback);
    document.addEventListener('keydown', enableSoundPlayback);

    // 3. Declare soundGroups only once
    const soundDir = '/src/sound/';
    const soundGroups = {
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
        const soundFiles = soundGroups[group];
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const audio = new Audio(soundDir + soundFiles[randomIndex]);
        audio.volume = 0.5; // Set volume to 50%
        return audio;
    }

    // 5. Play a sound when the page loads
    function playPageLoadSound() {
        const sound = getRandomSound('open');
        sound.volume = 0.5; // Set volume to 50%
        sound.play().catch(error => console.log('Audio playback failed:', error));
    }

    // Add event listener for the Back to Top button
    const backToTopButton = document.querySelector('a[href="#top"]');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            if (userInteracted) {
                const sound = getRandomSound('navigate');
                sound.play().catch(error => console.log('Audio playback failed:', error));
            }
        });
    }

    const imageElement = document.querySelector('img'); // Adjust the selector as needed
    if (imageElement) {
        imageElement.addEventListener('click', () => {
            if (userInteracted) {
                const sound = getRandomSound('submit');
                sound.play().catch(error => console.log('Audio playback failed:', error));
            }
        });
    }

    
    // Add sound effect for language selector
    const languageSelectElement = document.querySelector('.language-selector');
    if (languageSelectElement) {
        languageSelectElement.addEventListener('change', () => {
            if (userInteracted) {
                const sound = getRandomSound('toggle');
                sound.play().catch(error => console.log('Audio playback failed:', error));
            }
        });
    }


    // Warning : the toggle language selector is working, but the sound is not playing
    // We will study it later

    
    // 6. Event functions to play a random sound from a specified group
    function addSoundEventListener(selector, event, group) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(event, () => {
                const sound = getRandomSound(group);
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(error => console.log('Audio playback failed:', error));
            });
        });
    }


    // 7. Your existing code:
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded and parsed');
        initializeCriticalComponents();
        initializeNonCriticalComponents();
        playPageLoadSound(); // Ensure sound plays on page load
    });


    // Initialize the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Reveal
            } else {
                entry.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Cover
            }
        });
    }, observerOptions);

    // 8. Initialize critical components such as cookies consent and Google Analytics
    function initializeCriticalComponents() {
        initializeCookiesConsent();
        initializeGoogleAnalytics();
    }

    // 9. Initialize the cookies consent functionality
    function initializeCookiesConsent() {
        const cookieConsentElement = document.getElementById('cookie-consent');
        const cookieAcceptButton = document.getElementById('cookie-accept');

        // 10. Check if cookie consent elements exist
        if (!cookieConsentElement || !cookieAcceptButton) {
            console.error('Cookie consent elements not found');
            return;
        }
        try {
            // 11. Show cookie consent if not already accepted
            if (getStorage().getItem('cookiesAccepted') === 'true') {
                console.log('Cookies already accepted, hiding banner');
                cookieConsentElement.style.display = 'none';
            } else {
                console.log('Showing cookie consent');
                cookieConsentElement.style.display = 'block';
            }

            // 12. Add click event listener to the accept button
            cookieAcceptButton.addEventListener('click', (event) => {
                event.preventDefault();
                acceptCookies();
                const sound = getRandomSound('submit'); // Play sound on click
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(error => console.log('Audio playback failed:', error));
            });
        } catch (e) {
            console.error('Storage not available', e);
        }
    }

    // 13. Handle the acceptance of cookies
    function acceptCookies() {
        try {
            // 14. Store acceptance in storage
            getStorage().setItem('cookiesAccepted', 'true');
            console.log('Cookies accepted and stored in storage.');
        } catch (e) {
            console.error('Storage not available', e);
        }

        const cookieConsentElement = document.getElementById('cookie-consent');

        // 15. Check if cookie consent element exists
        if (!cookieConsentElement) {
            console.error('Cookie consent element not found');
            return;
        }

        // 16. Hide the cookie consent element
        cookieConsentElement.style.display = 'none';
        console.log('Cookie consent element hidden.');
    }

    // Function to determine available storage (localStorage, sessionStorage, or none)
    function getStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return localStorage;
        } catch (e) {
            console.warn('LocalStorage not available, using SessionStorage.');
            try {
                sessionStorage.setItem('test', 'test');
                sessionStorage.removeItem('test');
                return sessionStorage;
            } catch (e) {
                console.error('Both LocalStorage and SessionStorage are not available.');
                return null;
            }
        }
    }

    // 17. Initialize Google Analytics
    function initializeGoogleAnalytics() {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }

        // 18. Define gtag function to send data to Google Analytics
        function gtag() {
            window.dataLayer.push(arguments);
        }

        // 19. Initialize Google Analytics with the provided ID
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        console.log('Google Analytics Initialized');
    }

    // 20. Initialize non-critical components such as user engagement tracking and event listeners
    function initializeNonCriticalComponents() {
        initializeUserEngagementTracking();
        addEventListenersForNavigation();
        addEventListenersForButtons();
        playPageLoadSound(); // Play sound when the page loads
    }

    // 21. Initialize user engagement tracking
    function initializeUserEngagementTracking() {
        console.log('User Engagement Tracking Initialized');
    }

    // 22. Add event listeners to navigation links to highlight the active link
    function addEventListenersForNavigation() {
        const links = document.querySelectorAll('nav a');
        let currentPath = window.location.pathname;

        console.log('Current Path:', currentPath); // Log current path

        // 23. Ensure the current path ends with a trailing slash
        if (!currentPath.endsWith('/')) {
            currentPath += '/';
        }

        // 24. Handle default paths and adjust accordingly
        if (currentPath === '/' || currentPath === '/votelehan.com/' || currentPath === '/terms.html/' || currentPath.startsWith('/problems/') || currentPath === '/127.0.0.1/') {
            currentPath = '/index.html/';
        }

        // 25. Define the six parent menu options
        const parentMenuOptions = [
            '/home/',
            '/about/',
            '/services/',
            '/projects/',
            '/contact/',
            '/blog/'
        ];

        // 26. Loop through each navigation link
        links.forEach(link => {
            let linkPath = new URL(link.href).pathname;

            console.log('Link Path:', linkPath); // Log each link path

            // 27. Ensure linkPath also ends with a trailing slash for consistency
            if (!linkPath.endsWith('/')) {
                linkPath += '/';
            }

            console.log('Link Path:', linkPath);

            // 28. Add 'active' class to the current link and remove from others
            if (linkPath === currentPath) {
                link.classList.add('active');
                console.log(`Adding active class to: ${linkPath}`);
                const soundGroup = parentMenuOptions.includes(linkPath) ? 'navigate' : 'open'; // Determine sound group
                const sound = getRandomSound(soundGroup); // Play sound on navigation
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(error => console.log('Audio playback failed:', error));
            } else {
                link.classList.remove('active'); // Ensure only the relevant item is active
                console.log(`Removing active class from: ${linkPath}`);
            }
        });
        console.log('Navigation Event Listeners Added');
    }

    // 29. Add event listeners to buttons to toggle visibility of sections
    function addEventListenersForButtons() {
        const toggleButtons = document.querySelectorAll('button[data-toggle]');

        // 30. Loop through each button with data-toggle attribute
        toggleButtons.forEach(button => {
            const targetId = button.getAttribute('data-toggle');
            button.addEventListener('click', () => {
                toggleSection(targetId, button);
                const sound = getRandomSound('toggle'); // Play sound on click
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(error => console.log('Audio playback failed:', error));
            });
            console.log(`Event listener added for button with data-toggle="${targetId}"`);
        });

        // Additional event listeners for other buttons (e.g., accept buttons)
        document.querySelectorAll('button.accept, form').forEach(element => {
            element.addEventListener('click', (event) => {
                const sound = getRandomSound('submit');
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(error => console.log('Audio playback failed:', error));
                if (element.tagName.toLowerCase() === 'form') {
                    event.preventDefault();
                    element.submit(); // ensure the form is still submitted
                }
            });
        });

        console.log('Button Event Listeners Added');
    }

    // 31. Function to toggle the visibility of a section
    function toggleSection(sectionId, button) {
        const section = document.getElementById(sectionId);

        // 32. Check if section element exists
        if (!section) {
            console.error(`Element with id "${sectionId}" not found.`);
            return;
        }

        // 33. Toggle the 'hidden' class on the section
        section.classList.toggle('hidden');

        // 34. Update the button text based on the section visibility
        if (section.classList.contains('hidden')) {
            button.textContent = 'Reveal more';
        } else {
            button.textContent = 'Hide this';
        }
        console.log(`Toggled section with id="${sectionId}"`);
    }

    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('nav ul');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    } else {
        console.error('Hamburger or menu element not found');
    }
    
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', changeLanguage);
    } else {
        console.error('Language selector element not found');
    }
    
    function changeLanguage() {
        const selectedLanguage = languageSelector.value;
        fetch(`/path/to/${selectedLanguage}.json`)
            .then(response => response.json())
            .then(data => updateContent(data))
            .catch(error => console.error('Error loading language file:', error));
    }

    function updateContent(data) {
        document.title = data.title;
        document.querySelector('meta[name="description"]').setAttribute('content', data.description);
        document.querySelector('nav a[href="/index.html"]').textContent = data.nav.home;
        document.querySelector('nav a[href="/policy.html"]').textContent = data.nav.policy;
        document.querySelector('nav a[href="/economy.html"]').textContent = data.nav.economy;
        document.querySelector('nav a[href="/social.html"]').textContent = data.nav.social;
        document.querySelector('nav a[href="/story.html"]').textContent = data.nav.story;
        document.querySelector('nav a[href="/partner.html"]').textContent = data.nav.partner;
    }


// 35. JavaScript to set the current year
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

})();

// promises

// ajax

// piwikpro 