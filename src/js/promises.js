// Basic Promise Example
function basicPromiseExample() {
    return new Promise((resolve, reject) => {
        const success = true; // Simulate success/failure
        if (success) {
            resolve("Promise resolved successfully!");
        } else {
            reject("Promise rejected.");
        }
    });
}

// Fetch API Example
function fetchApiExample(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Fetch API data:", data);
            return data;
        })
        .catch(error => {
            console.error("Fetch API error:", error);
            throw error;
        });
}

// Async/Await Example
async function asyncAwaitExample(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("Async/Await data:", data);
        return data;
    } catch (error) {
        console.error("Async/Await error:", error);
        throw error;
    }
}

// Promise.all for Multiple Promises Example
function multiplePromisesExample(urls) {
    const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));
    return Promise.all(fetchPromises)
        .then(results => {
            console.log("Promise.all results:", results);
            return results;
        })
        .catch(error => {
            console.error("Promise.all error:", error);
            throw error;
        });
}

// Handling Errors Gracefully Example
function errorHandlingExample(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Data:", data);
            return data;
        })
        .catch(error => {
            console.error("Error:", error);
            return { error: error.message }; // Handle error gracefully
        });
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    const urls = ['https://votelehan.com/api/data1', 'https://votelehan.com/api/data2'];

    // Basic Promise Example
    basicPromiseExample()
        .then(result => console.log(result))
        .catch(error => console.error(error));

    // Fetch API Example
    fetchApiExample('https://votelehan.com/api/data')
        .then(data => console.log(data));

    // Async/Await Example
    asyncAwaitExample('https://votelehan.com/api/data')
        .then(data => console.log(data));

    // Promise.all Example
    multiplePromisesExample(urls)
        .then(results => console.log(results));

    // Error Handling Example
    errorHandlingExample('https://votelehan.com/api/data')
        .then(data => {
            if (data.error) {
                console.error("Handled error:", data.error);
            } else {
                console.log(data);
            }
        });
});
