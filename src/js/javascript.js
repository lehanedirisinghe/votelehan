/*
1. Initialization and User Interaction
   1.1. Strict Mode Activation
   1.2. Initialize sound playback
   1.3. Event listeners for user interactions

2. Sound Management
   2.1. Declare sound groups and directory
   2.2. Function to get a random sound file from a specific group

3. Event Listeners for Specific Interactions
   3.1. Back to Top button
   3.2. Image click

4. Additional Event Functions
   4.1. Generic sound event listener

5. DOMContentLoaded Event Listener
   5.1. Initialization of components
   5.2. Load translation function
   5.3. Update content function
   5.4. Switch language function
   5.5. Detect browser language
   5.6. Language selector event listener
   5.7. Redirect index.html to root URL

6. Scroll Event Listeners
   6.1. Navbar scroll effects

7. Intersection Observer
   7.1. Initialize Intersection Observer

8. Screen Blur on Menu Hover
   8.1. Event listeners for menu items

9. Initialization of Critical Components
   9.1. Initialize cookies consent
   9.2. Initialize Google Analytics

10. Cookies Consent Functionality
   10.1. Initialize cookies consent
   10.2. Accept cookies function
   10.3. Determine available storage

11. Google Analytics Initialization
   11.1. Initialize Google Analytics

12. Initialization of Non-Critical Components
   12.1. Initialize user engagement tracking
   12.2. Event listeners for navigation
   12.3. Event listeners for buttons

13. Toggle Section Visibility
   13.1. Toggle section function

14. Hamburger Menu Functionality
   14.1. Hamburger menu toggle

15. Set Current Year
   15.1. Set current year function

16. Prefetch Pages
   16.1. Prefetch pages after main page load
*/

// Chapter 1: Initialization
// 1.1. Strict Mode Activation
(function() {
    'use strict';

// 1.2. Initialize sound playback
let userInteracted = false;

function enableSoundPlayback() {
    userInteracted = true;
}

// 1.3. Event listeners for user interactions
document.addEventListener('click', enableSoundPlayback);
document.addEventListener('keydown', enableSoundPlayback);
document.addEventListener('touchstart', enableSoundPlayback);
document.addEventListener('mousemove', enableSoundPlayback);
document.addEventListener('scroll', enableSoundPlayback);

// Chapter 2: Sound Management
// 2.1. Declare sound groups and directory
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

// 2.2. Function to get a random sound file from a specific group
function getRandomSound(group) {
    const soundFiles = soundGroups[group];
    const randomIndex = Math.floor(Math.random() * soundFiles.length);
    const audio = new Audio(`${soundDir}${soundFiles[randomIndex]}`);
    audio.volume = 0.2; // Set volume to 20%
    return audio;
}

// Chapter 3: Event Listeners for Specific Interactions
// 3.1. Back to Top button
const backToTopButton = document.querySelector('a[href="#top"]');
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        if (userInteracted) {
            const sound = getRandomSound('navigate');
            sound.play().catch(error => console.log('Back to Top Audio playback failed:', error));
        }
    });
}

// 3.2. Image click
const imageElement = document.querySelector('img'); // Adjust the selector as needed
if (imageElement) {
    imageElement.addEventListener('click', () => {
        if (userInteracted) {
            const sound = getRandomSound('submit');
            sound.play().catch(error => console.log('Image Click Audio playback failed:', error));
        }
    });
}

// Chapter 4: Additional Event Functions
// 4.1. Generic sound event listener
function addSoundEventListener(selector, event, group) {
    document.querySelectorAll(selector).forEach(element => {
        element.addEventListener(event, () => {
            const sound = getRandomSound(group);
            sound.volume = 0.5; // Set volume to 50%
            sound.play().catch(error => console.log('Audio playback system failed:', error));
        });
    });
}

// Chapter 5: DOMContentLoaded Event Listener
// 5.1. Initialization of components
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    initializeCriticalComponents();
    initializeNonCriticalComponents();

    // 5.2. Load translation function
    function loadTranslation(language, page) {
        fetch(`/src/translations/${language}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Loaded data:', data);
                if (data.global) {
                    updateContent(data.global, true);
                }
                if (data[page]) {
                    updateContent(data[page]);
                } else {
                    console.error(`Page '${page}' not found in ${language}.json`);
                }
            })
            .catch(error => console.error('Error loading language file:', error));
    }

// 5.3. Update content function
function updateContent(data) {
    console.log('Updating content:', data);
    document.title = data.title || document.title;

    // Update meta tags
    if (data.description) {
        document.querySelector('meta[name="description"]').setAttribute('content', data.description);
        console.log('Updated description:', document.querySelector('meta[name="description"]').getAttribute('content'));
    }
    if (data.keywords) {
        document.querySelector('meta[name="keywords"]').setAttribute('content', data.keywords);
        console.log('Updated keywords:', document.querySelector('meta[name="keywords"]').getAttribute('content'));
    }
    if (data.subject) {
        document.querySelector('meta[name="subject"]').setAttribute('content', data.subject);
        console.log('Updated subject:', document.querySelector('meta[name="subject"]').getAttribute('content'));
    }
    // Update navigation
    if (data.nav) {
        document.querySelector('nav a[href="/index.html"]').textContent = data.nav.home;
        document.querySelector('nav a[href="/policy.html"]').textContent = data.nav.policy;
        document.querySelector('nav a[href="/economy.html"]').textContent = data.nav.economy;
        document.querySelector('nav a[href="/social.html"]').textContent = data.nav.social;
        document.querySelector('nav a[href="/story.html"]').textContent = data.nav.story;
        document.querySelector('nav a[href="/partner.html"]').textContent = data.nav.partner;
    }

    // Update content elements
    if (data.content) {
        document.querySelectorAll('[data-lang-key]').forEach(element => {
            const key = element.getAttribute('data-lang-key');
            const keys = key.split('.');
            let value = data.content;
            keys.forEach(k => {
                value = value ? value[k] : null;
            });
            if (value) {
                element.textContent = value;
                console.log(`Updated element with data-lang-key ${key} with content: ${value}`);
            }
        });
    }
}

    
    // 5.4. Switch language function
    function switchLanguage(language) {
        const elements = document.querySelectorAll('[data-lang]');
        let found = false;
        elements.forEach(element => {
            if (element.getAttribute('data-lang') === language) {
                element.style.display = 'block';
                found = true;
            } else {
                element.style.display = 'none';
            }
        });

        // If no elements with the language found, load the translation file
        if (!found) {
            let page = window.location.pathname.split('/').pop().split('.').shift();
            if (page === '') {
                page = 'index'; // Default to 'index' for the root URL
            }
            console.log('Page identifier:', page);
            loadTranslation(language, page);
        }
    }

    // 5.5. Detect browser language
    const userLang = navigator.language || navigator.userLanguage;

    // 5.6. Language mappings
    const languageMappings = {
        'si': 'si', // Sinhala
        'ta': 'ta', // Tamil
        'en': 'en', // English
        'zh': 'zh', // Mandarin Chinese
        'hi': 'hi', // Hindi
        'es': 'es', // Spanish
        'fr': 'fr', // French
        'ar': 'ar', // Arabic
        'ru': 'ru', // Russian
        'ja': 'ja', // Japanese
        'pt': 'pt', // Portuguese
        'nl': 'nl' // Dutch
    };

    // Default to English if no match is found
    let selectedLanguage = 'en';

    // 5.7. Determine the selected language based on the user's browser language
    for (const langPrefix in languageMappings) {
        if (userLang.startsWith(langPrefix)) {
            selectedLanguage = languageMappings[langPrefix];
            break;
        }
    }

    // Handle language selection from the dropdown
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLang = languageSelector.value;
            switchLanguage(selectedLang);
            localStorage.setItem('preferredLanguage', selectedLang); // Save the preference
        });
    }

    // Check if a preferred language is saved in localStorage
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
        selectedLanguage = savedLanguage;
    }

    // Switch to the detected or saved language
    switchLanguage(selectedLanguage);

    // Redirect index.html to root URL while preserving the language
    if (window.location.pathname === '/index.html') {
        window.location.href = `/?lang=${selectedLanguage}`;
    }

    if (window.location.pathname === '/') {
        switchLanguage(selectedLanguage);
    }
});


    // Chapter 16: Prefetch Pages
    // 16.1. Prefetch pages after main page load
    const pages = [
        '/policy.html',
        '/economy.html',
        '/social.html',
        '/story.html',
        '/partner.html'
    ];

    pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });


// Chapter 6: Scroll Event Listeners
// 6.1. Navbar scroll effects
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

// Chapter 7: Intersection Observer
// 7.1. Initialize Intersection Observer
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

// Chapter 9: Initialization of Critical Components
// 9.1. Initialize cookies consent and Google Analytics
function initializeCriticalComponents() {
    initializeCookiesConsent();
    initializeGoogleAnalytics();
}

// Chapter 10: Cookies Consent Functionality
// 10.1. Initialize cookies consent
function initializeCookiesConsent() {
    const cookieConsentElement = document.getElementById('cookie-consent');
    const cookieAcceptButton = document.getElementById('cookie-accept');

    // Check if cookie consent elements exist
    if (!cookieConsentElement || !cookieAcceptButton) {
        console.error('Cookie consent elements not found');
        return;
    }
    try {
        // Show cookie consent if not already accepted
        if (getStorage().getItem('cookiesAccepted') === 'true') {
            console.log('Cookies already accepted, hiding banner');
            cookieConsentElement.style.display = 'none';
        } else {
            console.log('Showing cookie consent');
            cookieConsentElement.style.display = 'block';
        }

        // Add click event listener to the accept button
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

// 10.2. Accept cookies function
function acceptCookies() {
    try {
        // Store acceptance in storage
        getStorage().setItem('cookiesAccepted', 'true');
        console.log('Cookies accepted and stored in storage.');
    } catch (e) {
        console.error('Storage not available', e);
    }

    const cookieConsentElement = document.getElementById('cookie-consent');

    // Check if cookie consent element exists
    if (!cookieConsentElement) {
        console.error('Cookie consent element not found');
        return;
    }

    // Hide the cookie consent element
    cookieConsentElement.style.display = 'none';
    console.log('Cookie consent element hidden.');
}

// 10.3. Determine available storage
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

// Chapter 11: Google Analytics Initialization
// 11.1. Initialize Google Analytics
function initializeGoogleAnalytics() {
    if (!window.dataLayer) {
        window.dataLayer = [];
    }

    // Define gtag function to send data to Google Analytics
    function gtag() {
        window.dataLayer.push(arguments);
    }

    // Initialize Google Analytics with the provided ID
    gtag('js', new Date());
    gtag('config', 'G-80876GKS9T');
    console.log('Google Analytics Initialized');
}

// Chapter 12: Initialization of Non-Critical Components
// 12.1. Initialize user engagement tracking
function initializeNonCriticalComponents() {
    initializeUserEngagementTracking();
    addEventListenersForNavigation();
    addEventListenersForButtons();
}

// 12.2. Initialize user engagement tracking
function initializeUserEngagementTracking() {
    console.log('User Engagement Tracking Initialized');
}

// 12.3. Event listeners for navigation links
function addEventListenersForNavigation() {
    const links = document.querySelectorAll('nav a');
    let currentPath = window.location.pathname;

    console.log('Current Path:', currentPath); // Log current path

    // Ensure the current path ends with a trailing slash
    if (!currentPath.endsWith('/')) {
        currentPath += '/';
    }

    // Handle default paths and adjust accordingly
    if (currentPath === '/' || currentPath === '/votelehan.com/' || currentPath === '/terms.html/' || currentPath.startsWith('/problems/') || currentPath === '/127.0.0.1/') {
        currentPath = '/index.html/';
    }

    // Define the six parent menu options
    const parentMenuOptions = [
        '/problem/',
        '/policy/',
        '/economy/',
        '/social/',
        '/story/',
        '/partner/'
    ];

    // Loop through each navigation link
    links.forEach(link => {
        let linkPath = new URL(link.href).pathname;

        console.log('Link Path:', linkPath); // Log each link path

        // Ensure linkPath also ends with a trailing slash for consistency
        if (!linkPath.endsWith('/')) {
            linkPath += '/';
        }

        console.log('Link Path:', linkPath);

        // Add 'active' class to the current link and remove from others
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

// Event listeners for buttons
function addEventListenersForButtons() {
    const toggleButtons = document.querySelectorAll('button[data-toggle]');

    // Loop through each button with data-toggle attribute
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

// Chapter 13: Toggle Section Visibility
// 13.1. Toggle section function
function toggleSection(sectionId, button) {
    const section = document.getElementById(sectionId);

    // Check if section element exists
    if (!section) {
        console.error(`Element with id "${sectionId}" not found.`);
        return;
    }

    // Toggle the 'hidden' class on the section
    section.classList.toggle('hidden');

    // Update the button text based on the section visibility
    if (section.classList.contains('hidden')) {
        button.textContent = 'Reveal more';
    } else {
        button.textContent = 'Hide this';
    }
    console.log(`Toggled section with id="${sectionId}"`);
}

// Chapter 14: Hamburger Menu Functionality
// 14.1. Hamburger menu toggle
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

// Chapter 15: Set Current Year
// 15.1. Set current year function
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

})();
