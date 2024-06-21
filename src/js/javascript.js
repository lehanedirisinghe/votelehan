/*
1. Initialization and User Interaction
   1.1. Initialize sound playback
   1.2. Event listeners for user interactions

2. Sound Management
   2.1. Declare sound groups and directory
   2.2. Function to get a random sound file from a specific group

3. Event Listeners
   3.1. Event listeners for specific interactions
       3.1.1. Back to Top button
       3.1.2. Image click
   3.2. Event functions to play a random sound from a specified group
   3.3. DOMContentLoaded event listener
   3.4. Scroll event listeners

4. Intersection Observer
   4.1. Initialize Intersection Observer

5. Critical Component Initialization
   5.1. Initialize cookies consent
   5.2. Initialize Google Analytics

6. Non-Critical Component Initialization
   6.1. Initialize user engagement tracking
   6.2. Event listeners for navigation
   6.3. Event listeners for buttons

7. Additional Functionalities
   7.1. Hamburger menu functionality
   7.2. Language selector functionality
   7.3. Setting the current year
*/

// 1. Initialization and User Interaction
// 1.1. Initialize sound playback
// 1.2. Event listeners for user interactions

// 2. Sound Management
// 2.1. Declare sound groups and directory
// 2.2. Function to get a random sound file from a specific group

// 3. Event Listeners
// 3.1. Event listeners for specific interactions
// 3.1.1. Back to Top button
// 3.1.2. Image click
// 3.2. Event functions to play a random sound from a specified group
// 3.3. DOMContentLoaded event listener
// 3.4. Scroll event listeners

// 4. Intersection Observer
// 4.1. Initialize Intersection Observer

// 5. Critical Component Initialization
// 5.1. Initialize cookies consent
// 5.2. Initialize Google Analytics

// 6. Non-Critical Component Initialization
// 6.1. Initialize user engagement tracking
// 6.2. Event listeners for navigation
// 6.3. Event listeners for buttons

// 7. Additional Functionalities
// 7.1. Hamburger menu functionality
// 7.2. Language selector functionality
// 7.3. Setting the current year

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
    document.addEventListener('touchstart', enableSoundPlayback);
    document.addEventListener('mousemove', enableSoundPlayback);
    document.addEventListener('scroll', enableSoundPlayback);

    // 3. Declare sound groups and directory
    const soundDir = '/src/sound/';
    const soundGroups = {
        submit: [
            'submit/classic-camera-click.mp3',
            'submit/camera-shutter-hard-click.mp3',
            'submit/camera-shutter-click.mp3',
            'submit/camera-long-shutter.mp3'
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
    };

    // 4. Function to get a random sound file from a specific group
    function getRandomSound(group) {
        const soundFiles = soundGroups[group];
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const audio = new Audio(soundDir + soundFiles[randomIndex]);
        audio.volume = 0.2; // Set volume to 20%
        return audio;
    }

    // 5. Event listeners for specific interactions
    // 5.1 Back to Top button
    const backToTopButton = document.querySelector('a[href="#top"]');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            if (userInteracted) {
                const sound = getRandomSound('navigate');
                sound.play().catch(error => console.log('Back to Top Audio playback failed:', error));
            }
        });
    }

    // 5.2 Image click
    const imageElement = document.querySelector('img'); // Adjust the selector as needed
    if (imageElement) {
        imageElement.addEventListener('click', () => {
            if (userInteracted) {
                const sound = getRandomSound('submit');
                sound.play().catch(error => console.log('Image Click Audio playback failed:', error));
            }
        });
    }

    // 6. Additional event functions
    // 6.1 Event functions to play a random sound from a specified group
    function addSoundEventListener(selector, event, group) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(event, () => {
                const sound = getRandomSound(group);
                sound.volume = 0.5; // Set volume to 50%
                sound.play().catch(error => console.log('Audio playback system failed:', error));
            });
        });
    }

    // 7. DOMContentLoaded event listener
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM fully loaded and parsed');
        initializeCriticalComponents();
        initializeNonCriticalComponents();
    });

    // 8. Scroll event listeners
    const navbar = document.querySelector('nav'); // Ensure the correct selector for your navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adjust the scroll position threshold
            navbar.classList.add('navbar-white');
        } else {
            navbar.classList.remove('navbar-white');
        }
    });

    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) { // Adjust this value as needed
            nav.classList.add('nav-faded');
        } else {
            nav.classList.remove('nav-faded');
        }
    });

    // 9. Initialize the Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Reveal
            } else {
                entry.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'; // Cover
            }
        });
    }, observerOptions);

    // 10. Initialize critical components such as cookies consent and Google Analytics
    function initializeCriticalComponents() {
        initializeCookiesConsent();
        initializeGoogleAnalytics();
    }

    // 11. Initialize the cookies consent functionality
    function initializeCookiesConsent() {
        const cookieConsentElement = document.getElementById('cookie-consent');
        const cookieAcceptButton = document.getElementById('cookie-accept');

        // 11.1 Check if cookie consent elements exist
        if (!cookieConsentElement || !cookieAcceptButton) {
            console.error('Cookie consent elements not found');
            return;
        }
        try {
            // 11.2 Show cookie consent if not already accepted
            if (getStorage().getItem('cookiesAccepted') === 'true') {
                console.log('Cookies already accepted, hiding banner');
                cookieConsentElement.style.display = 'none';
            } else {
                console.log('Showing cookie consent');
                cookieConsentElement.style.display = 'block';
            }

            // 11.3 Add click event listener to the accept button
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

    // 12. Handle the acceptance of cookies
    function acceptCookies() {
        try {
            // 12.1 Store acceptance in storage
            getStorage().setItem('cookiesAccepted', 'true');
            console.log('Cookies accepted and stored in storage.');
        } catch (e) {
            console.error('Storage not available', e);
        }

        const cookieConsentElement = document.getElementById('cookie-consent');

        // 12.2 Check if cookie consent element exists
        if (!cookieConsentElement) {
            console.error('Cookie consent element not found');
            return;
        }

        // 12.3 Hide the cookie consent element
        cookieConsentElement.style.display = 'none';
        console.log('Cookie consent element hidden.');
    }

    // 13. Function to determine available storage (localStorage, sessionStorage, or none)
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

    // 14. Initialize Google Analytics
    function initializeGoogleAnalytics() {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }

        // 14.1 Define gtag function to send data to Google Analytics
        function gtag() {
            window.dataLayer.push(arguments);
        }

        // 14.2 Initialize Google Analytics with the provided ID
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        console.log('Google Analytics Initialized');
    }

    // 15. Initialize non-critical components such as user engagement tracking and event listeners
    function initializeNonCriticalComponents() {
        initializeUserEngagementTracking();
        addEventListenersForNavigation();
        addEventListenersForButtons();
    }

    // 16. Initialize user engagement tracking
    function initializeUserEngagementTracking() {
        console.log('User Engagement Tracking Initialized');
    }

    // 17. Add event listeners to navigation links to highlight the active link
    function addEventListenersForNavigation() {
        const links = document.querySelectorAll('nav a');
        let currentPath = window.location.pathname;

        console.log('Current Path:', currentPath); // Log current path

        // 17.1 Ensure the current path ends with a trailing slash
        if (!currentPath.endsWith('/')) {
            currentPath += '/';
        }

        // 17.2 Handle default paths and adjust accordingly
        if (currentPath === '/' || currentPath === '/votelehan.com/' || currentPath === '/terms.html/' || currentPath.startsWith('/problems/') || currentPath === '/127.0.0.1/') {
            currentPath = '/index.html/';
        }

        // 17.3 Define the six parent menu options
        const parentMenuOptions = [
            '/problem/',
            '/policy/',
            '/economy/',
            '/social/',
            '/story/',
            '/partner/'
        ];

        // 17.4 Loop through each navigation link
        links.forEach(link => {
            let linkPath = new URL(link.href).pathname;

            console.log('Link Path:', linkPath); // Log each link path

            // 17.5 Ensure linkPath also ends with a trailing slash for consistency
            if (!linkPath.endsWith('/')) {
                linkPath += '/';
            }

            console.log('Link Path:', linkPath);

            // 17.6 Add 'active' class to the current link and remove from others
            if (linkPath === currentPath) {
                link.classList.add('active');
                console.log(`Adding active class to: ${linkPath}`);
            } else {
                link.classList.remove('active'); // Ensure only the relevant item is active
                console.log(`Removing active class from: ${linkPath}`);
            }
        });
        console.log('Navigation Event Listeners Added');
    }

    // 18. Add event listeners to buttons to toggle visibility of sections
    function addEventListenersForButtons() {
        const toggleButtons = document.querySelectorAll('button[data-toggle]');

        // 18.1 Loop through each button with data-toggle attribute
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

        // 18.2 Additional event listeners for other buttons (e.g., accept buttons)
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

    // 19. Function to toggle the visibility of a section
    function toggleSection(sectionId, button) {
        const section = document.getElementById(sectionId);

        // 19.1 Check if section element exists
        if (!section) {
            console.error(`Element with id "${sectionId}" not found.`);
            return;
        }

        // 19.2 Toggle the 'hidden' class on the section
        section.classList.toggle('hidden');

        // 19.3 Update the button text based on the section visibility
        if (section.classList.contains('hidden')) {
            button.textContent = 'Reveal more';
        } else {
            button.textContent = 'Hide this';
        }
        console.log(`Toggled section with id="${sectionId}"`);
    }

    // 20. Hamburger menu functionality
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

    // 21. Language selector functionality
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

    // 22. JavaScript to set the current year
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('currentYear').textContent = new Date().getFullYear();
    });

})();

    // 23. Prefetch pages after the main page has loaded
        document.addEventListener("DOMContentLoaded", function() {
        // Prefetch pages after the main page has loaded
        const pages = [
        '/policy.html',
        '/economy.html',
        '/social.html',
        '/story.html',
        '/partner.html'
        ];

        pages.forEach(function(page) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
        });
});



// We have to do promises, but thus far, no fail / issues reported
// We might do modal and tool tips
// Ajax is a good one for the home page news feed
// Test, do not tolerate if js load speed is over 1000ms
// Cut anything off, if it slows down the page load 
// We can develop menu, to make nav easier
//