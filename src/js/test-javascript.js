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
            if (!localStorage.getItem('cookiesAccepted')) {
                console.log('Showing cookie consent');
                cookieConsentElement.style.display = 'block';
            }

            // 6. Add click event listener to the accept button
            cookieAcceptButton.addEventListener('click', acceptCookies);
        } catch (e) {
            console.error('Local storage not available');
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

// Initialization function to check cookies and add event listener
function initializeCookiesConsent() {
    const cookieConsentElement = document.getElementById('cookie-consent');
    console.log('Initializing cookies consent.');

    if (localStorage.getItem('cookiesAccepted')) {
        console.log('Cookies already accepted.');
        if (cookieConsentElement) {
            cookieConsentElement.style.display = 'none';
        }
    } else {
        if (cookieConsentElement) {
            cookieConsentElement.style.display = 'block';
            console.log('Showing cookie consent.');
        }
        const acceptButton = document.getElementById('acceptCookies');
        if (acceptButton) {
            acceptButton.addEventListener('click', acceptCookies);
            console.log('Event listener added for accept button.');
        }
    }
}

// Call the initialization function when DOM content is loaded
document.addEventListener('DOMContentLoaded', initializeCookiesConsent);


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
            button.addEventListener('click', () => toggleSection(targetId, button));
            console.log(`Event listener added for button with data-toggle="${targetId}"`);
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

})();
