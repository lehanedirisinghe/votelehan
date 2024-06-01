(function() {
    const ObserverModule = {
        initialize: function() {
            console.log('Observer script loaded');
    
            const initializeObserver = () => {
                console.log('DOM fully loaded and parsed');
    
                if (ObserverModule.observeDomChanges) {
                    ObserverModule.observeDomChanges.disconnect();
                    console.log('Existing observer disconnected');
                    ObserverModule.observeDomChanges = null;
                }
    
                if (!ObserverModule.observeDomChanges) {
                    console.log('Initializing observer for the first time.');
                    ObserverModule.observeDomChanges = new MutationObserver(function(mutationsList, observer) {
                        console.log('DOM changes observed:', mutationsList);
                    });
    
                    const targetNode = document.body;
                    console.log('Target Node:', targetNode);
    
                    if (targetNode instanceof Node) {
                        ObserverModule.observeDomChanges.observe(targetNode, { childList: true, subtree: true });
                        console.log('Observer initialized and observing target node.');
                    } else {
                        console.error('The target node for MutationObserver is not valid.');
                    }
                } else {
                    console.log('Observer already declared');
                }
            };
    
            document.addEventListener("DOMContentLoaded", initializeObserver);
        }
    };
    
    ObserverModule.initialize();
})();



(function() {
    document.addEventListener("DOMContentLoaded", function() {
        console.log('DOM fully loaded and parsed');
        initializeCriticalComponents();
        initializeNonCriticalComponents();
    });

    function initializeCriticalComponents() {
        initializeCookiesConsent();
        initializeGoogleAnalytics();
    }

    function initializeCookiesConsent() {
        const cookieConsentElement = document.getElementById('cookie-consent');
        const cookieAcceptButton = document.getElementById('cookie-accept');

        if (!cookieConsentElement || !cookieAcceptButton) {
            console.error('Cookie consent elements not found');
            return;
        }

        if (!localStorage.getItem('cookiesAccepted')) {
            console.log('Showing cookie consent');
            cookieConsentElement.style.display = 'block';
        }

        cookieAcceptButton.addEventListener('click', acceptCookies);
    }

    function acceptCookies() {
        localStorage.setItem('cookiesAccepted', 'true');
        const cookieConsentElement = document.getElementById('cookie-consent');

        if (!cookieConsentElement) {
            console.error('Cookie consent element not found');
            return;
        }

        cookieConsentElement.style.display = 'none';
        console.log('Cookies accepted');
    }

    function initializeGoogleAnalytics() {
        if (!window.dataLayer) {
            window.dataLayer = [];
        }

        function gtag() {
            window.dataLayer.push(arguments);
        }

        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        console.log('Google Analytics Initialized');
    }

    function initializeNonCriticalComponents() {
        initializeUserEngagementTracking();
        addEventListenersForNavigation();
        addEventListenersForButtons();
    }

    function initializeUserEngagementTracking() {
        console.log('User Engagement Tracking Initialized');
    }

    function addEventListenersForNavigation() {
        const links = document.querySelectorAll('nav a');
        const currentPath = window.location.pathname;

        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
        console.log('Navigation Event Listeners Added');
    }

    function addEventListenersForButtons() {
        const toggleButtons = document.querySelectorAll('button[data-toggle]');

        toggleButtons.forEach(button => {
            const targetId = button.getAttribute('data-toggle');
            button.addEventListener('click', () => toggleSection(targetId, button));
            console.log(`Event listener added for button with data-toggle="${targetId}"`);
        });
        console.log('Button Event Listeners Added');
    }

    function toggleSection(sectionId, button) {
        const section = document.getElementById(sectionId);

        if (!section) {
            console.error(`Element with id "${sectionId}" not found.`);
            return;
        }

        section.classList.toggle('hidden');

        if (section.classList.contains('hidden')) {
            button.textContent = 'See More';
        } else {
            button.textContent = 'See Less';
        }
        console.log(`Toggled section with id="${sectionId}"`);
    }
})();
