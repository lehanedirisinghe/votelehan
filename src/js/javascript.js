(function() {
    // 1. Wait for the DOM to be fully loaded before running the script
    document.addEventListener("DOMContentLoaded", function() {
        console.log('DOM fully loaded and parsed');
        initializeCriticalComponents();
        initializeNonCriticalComponents();
    });

    // 2. Initialize critical components such as cookies consent and Google Analytics
    function initializeCriticalComponents() {
        initializeCookiesConsent();
        initializeGoogleAnalytics();
    }

    // 3. Initialize the cookies consent functionality
    function initializeCookiesConsent() {
        const cookieConsentElement = document.getElementById('cookie-consent');
        const cookieAcceptButton = document.getElementById('cookie-accept');

        // 4. Check if cookie consent elements exist
        if (!cookieConsentElement || !cookieAcceptButton) {
            console.error('Cookie consent elements not found');
            return;
        }
        try {
            // 5. Show cookie consent if not already accepted
            if (localStorage.getItem('cookiesAccepted') === 'true') {
                console.log('Cookies already accepted, hiding banner');
                cookieConsentElement.style.display = 'none';
            } else {
                console.log('Showing cookie consent');
                cookieConsentElement.style.display = 'block';
            }

            // 6. Add click event listener to the accept button
            cookieAcceptButton.addEventListener('click', (event) => {
                event.preventDefault();
                acceptCookies();
                const sound = getRandomSound('submit'); // Play sound on click
                sound.volume = 0.5; // Set volume to 50%
                sound.play();
            });
        } catch (e) {
            console.error('Local storage not available', e);
        }
    }

    // 7. Handle the acceptance of cookies
    function acceptCookies() {
        try {
            // 8. Store acceptance in local storage
            localStorage.setItem('cookiesAccepted', 'true');
            console.log('Cookies accepted and stored in local storage.');
        } catch (e) {
            console.error('Local storage not available', e);
        }

        const cookieConsentElement = document.getElementById('cookie-consent');

        // 9. Check if cookie consent element exists
        if (!cookieConsentElement) {
            console.error('Cookie consent element not found');
            return;
        }

        // 10. Hide the cookie consent element
        cookieConsentElement.style.display = 'none';
        console.log('Cookie consent element hidden.');
    }

    // 11. Initialize Google Analytics
    function initializeGoogleAnalytics() {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }

        // 12. Define gtag function to send data to Google Analytics
        function gtag() {
            window.dataLayer.push(arguments);
        }

        // 13. Initialize Google Analytics with the provided ID
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        console.log('Google Analytics Initialized');
    }

    // 14. Initialize non-critical components such as user engagement tracking and event listeners
    function initializeNonCriticalComponents() {
        initializeUserEngagementTracking();
        addEventListenersForNavigation();
        addEventListenersForButtons();
        playPageLoadSound(); // Play sound when the page loads
    }

    // 15. Initialize user engagement tracking
    function initializeUserEngagementTracking() {
        console.log('User Engagement Tracking Initialized');
    }

    // 16. Add event listeners to navigation links to highlight the active link
    function addEventListenersForNavigation() {
        const links = document.querySelectorAll('nav a');
        let currentPath = window.location.pathname;

        console.log('Current Path:', currentPath); // Log current path

        // 17. Ensure the current path ends with a trailing slash
        if (!currentPath.endsWith('/')) {
            currentPath += '/';
        }

        // 18. Handle default paths and adjust accordingly
        if (currentPath === '/' || currentPath === '/votelehan.com/' || currentPath === '/terms.html/' || currentPath.startsWith('/problems/') || currentPath === '/127.0.0.1/') {
            currentPath = '/index.html/';
        }

        // Define the six parent menu options
        const parentMenuOptions = [
            '/home/',
            '/about/',
            '/services/',
            '/projects/',
            '/contact/',
            '/blog/'
        ];

        // 19. Loop through each navigation link
        links.forEach(link => {
            let linkPath = new URL(link.href).pathname;

            console.log('Link Path:', linkPath); // Log each link path

            // 20. Ensure linkPath also ends with a trailing slash for consistency
            if (!linkPath.endsWith('/')) {
                linkPath += '/';
            }

            console.log('Link Path:', linkPath);

            // 21. Add 'active' class to the current link and remove from others
            if (linkPath === currentPath) {
                link.classList.add('active');
                console.log(`Adding active class to: ${linkPath}`);
                const soundGroup = parentMenuOptions.includes(linkPath) ? 'navigate' : 'open'; // Determine sound group
                const sound = getRandomSound(soundGroup); // Play sound on navigation
                sound.volume = 0.5; // Set volume to 50%
                sound.play();
            } else {
                link.classList.remove('active'); // Ensure only the relevant item is active
                console.log(`Removing active class from: ${linkPath}`);
            }
        });
        console.log('Navigation Event Listeners Added');
    }

    // 22. Add event listeners to buttons to toggle visibility of sections
    function addEventListenersForButtons() {
        const toggleButtons = document.querySelectorAll('button[data-toggle]');

        // 23. Loop through each button with data-toggle attribute
        toggleButtons.forEach(button => {
            const targetId = button.getAttribute('data-toggle');
            button.addEventListener('click', () => {
                toggleSection(targetId, button);
                const sound = getRandomSound('toggle'); // Play sound on click
                sound.volume = 0.5; // Set volume to 50%
                sound.play();
            });
            console.log(`Event listener added for button with data-toggle="${targetId}"`);
        });

        // Additional event listeners for other buttons (e.g., accept buttons)
        document.querySelectorAll('button.accept, form').forEach(element => {
            element.addEventListener('click', (event) => {
                const sound = getRandomSound('submit');
                sound.volume = 0.5; // Set volume to 50%
                sound.play();
                if (element.tagName.toLowerCase() === 'form') {
                    event.preventDefault();
                    element.submit(); // ensure the form is still submitted
                }
            });
        });

        console.log('Button Event Listeners Added');
    }

    // 24. Toggle the visibility of a section
    function toggleSection(sectionId, button) {
        const section = document.getElementById(sectionId);

        // 25. Check if the section element exists
        if (!section) {
            console.error(`Element with id "${sectionId}" not found.`);
            return;
        }

        // 26. Toggle the hidden class on the section
        section.classList.toggle('hidden');

        // 27. Update button text based on section visibility
        if (section.classList.contains('hidden')) {
            button.textContent = 'Reveal more';
        } else {
            button.textContent = 'Hide this';
        }
        console.log(`Toggled section with id="${sectionId}"`);
    }

    // Define the directory and sound files grouped by folder
    const soundDir = '../src/sound/';
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

    // Function to get a random sound file from a specific group
    function getRandomSound(group) {
        const soundFiles = soundGroups[group];
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const audio = new Audio(soundDir + soundFiles[randomIndex]);
        audio.volume = 0.5; // Set volume to 50%
        return audio;
    }

    // Play a sound when the page loads
    function playPageLoadSound() {
        const sound = getRandomSound('open');
        sound.volume = 0.5; // Set volume to 50%
        sound.play();
    }

    // Event functions to play a random sound from a specified group
    function addSoundEventListener(selector, event, group) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(event, () => {
                const sound = getRandomSound(group);
                sound.volume = 0.5; // Set volume to 50%
                sound.play();
            });
        });
    }

})();
