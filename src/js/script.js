// 1. DOM or document object model has to be loaded. This lets us make our html and css based website look cooler with js. 

document.addEventListener("DOMContentLoaded", function() {
    console.log('DOM fully loaded and parsed');

    // Check if the user has already accepted cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        console.log('Showing cookie consent');
        document.getElementById('cookie-consent').style.display = 'block';
    }

  // Add event listener to the accept cookies button
  var cookieButton = document.getElementById('cookie-accept');
  if (cookieButton) {
      cookieButton.addEventListener('click', function() {
          acceptCookies();
      });
  }
});

function acceptCookies() {
  // Store the cookie acceptance in localStorage
  localStorage.setItem('cookiesAccepted', 'true');
  // Hide the cookie consent message
  document.getElementById('cookie-consent').style.display = 'none';
  console.log('Cookies accepted');
}


// 2. User Engagement Tracking
    // Code to track user engagement goes here
    // Enter code here for tracking user engagement

    // Global site tag (gtag.js) - Google Analytics


// 3. Event Handling
    // Add event listeners and respond to user actions like clicks, mouse movements, and keyboard input.
    // Enter code here for event handling

// 4. Interactive Buttons
    // Enable users to interact with elements on a webpage, such as clicking a button to submit a form or navigate to another page.
    // Enter code here for interactive buttons

    // 3.1. Cookie Button


    function acceptCookies() {
        function acceptCookies() {
            // Check if cookie consent element exists
            const cookieConsent = document.getElementById('cookie-consent');
            if (cookieConsent !== null) {
                // Add a check to see if cookiesAccepted is already set in localStorage
                if (!localStorage.getItem('cookiesAccepted')) {
                    console.log('Cookies accepted');
                    // Set a flag in sessionStorage for enhanced privacy
                    sessionStorage.setItem('cookiesAccepted', 'true');
                    // Replace direct manipulation of style.display with class toggle method
                    cookieConsent.classList.toggle('hidden');
                }
            }
        }
    // 4. DOM Manipulation
    // Modify the content and structure of the web page dynamically.
    // Enter code here for DOM manipulation

    // 5. AJAX
    // Make asynchronous requests to the server without reloading the entire page.
    // Add later: to connect server endpoint
    // Enter code here for AJAX

    // 6. Form Validation
    // Validate user input before submitting forms.
    // Enter code here for form validation

    // 7. Animation
    // Add visual effects and animations to elements on the web page.
    // Enter code here for animation

    // 8. Data Manipulation
    // Process and manipulate data retrieved from external sources or stored locally.
    // Enter code here for data manipulation

    // 9. Error Handling
    // Handle and manage errors that occur during script execution.
    // Enter code here for error handling

    // 10. Cookies and Local Storage
    // Store and retrieve data on the client-side.
    // Enter code here for cookies and local storage

    // 11. Event Delegation
    // Handle events on multiple elements efficiently using event delegation.
    // Enter code here for event delegation

    // 12. Promises
    // Handle asynchronous operations and resolve callback hell scenarios effectively.
    // Enter code here for promises

    // 13. Tables
    // Bla bla bla beautiful table appear
    // Enter code here for creating and managing tables

    // 14. Modal Pop Up
    // Bla bla it shows up
    // Enter code here for modal pop-up creation and management

    // 15. Menu Highlight to Identify Location
    // Highlight the active navigation link based on current page
    
    var currentPath = window.location.pathname; // Get the current path
    var links = document.querySelectorAll('nav a'); // Select all nav links

    // Iterate over each link and add 'active' class if href matches the current path
    links.forEach(function(link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 16. Scroll to Top Button
    // Show a button that scrolls back to the top of the page when clicked
    var scrollToTopBtn = document.querySelector('.scroll-to-top'); // Select scroll-to-top button

// Close the document ready event listener  

    }
