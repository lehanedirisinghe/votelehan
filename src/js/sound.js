document.addEventListener('DOMContentLoaded', function () {
    // Define the directory and sound files grouped by folder
    const soundDir = '../src/sound/';
    const soundGroups = {
        submit: [
            'submit/classic-camera-click.mp3',
            'submit/camera-shutter-hard-click.mp3',
            'submit/camera-shutter-click.mp3',
            'submit/camera-long-shutter.mp3'
        ],
        hover: [
            'hover/interface-device-click.mp3',
            'hover/game-user-interface-tone.mp3'
        ],
        open: [
            'open/stapling-paper.mp3',
            'open/paper-slide.mp3',
            'open/paper-crumble.mp3'
        ],
        navigate: [
            'navigate/vintage-typewriter-hit.mp3',
            'navigate/typewriter-single-mechanical-hit.mp3',
            'navigate/single-hit-on-typewriter.mp3',
            'navigate/mechanical-typewriter-hit.mp3'
        ],
        toggle: [
            'toggle/cool-interface-click-tone.mp3'
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
        return new Audio(soundDir + soundFiles[randomIndex]);
    }

    // Event functions to play a random sound from a specified group
    function addSoundEventListener(selector, event, group) {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener(event, () => {
                const sound = getRandomSound(group);
                sound.play();
            });
        });
    }

    // 1. Hover over a link
  //  addSoundEventListener('a', 'mouseover', 'hover');

    // 2. Click on a toggle button
    addSoundEventListener('button[data-toggle]', 'click', 'toggle');

    // 3. Click on an accept button or form submit
    document.querySelectorAll('button.accept, form').forEach(element => {
        element.addEventListener('click', (event) => {
            const sound = getRandomSound('submit', 'accept');
            sound.play();
            if (element.tagName.toLowerCase() === 'form') {
                event.preventDefault();
                element.submit(); // ensure the form is still submitted
            }
        });
    });

    // 4. Navigation to parent folders (example implementation, adjust as needed)
    const parentFolders = ['policy', 'economy', 'social', 'story', 'partner'];
    const currentPath = window.location.pathname;

    parentFolders.forEach(folder => {
        if (currentPath.includes(`/${folder}/`)) {
            const sound = getRandomSound('navigate');
            sound.play();
        }
    });
});


// Problems: 
// It is annoying. Sounds all the time. Best to use for toggle. Or form submit. 
// Disable for navigation links. It's too annoying.
// Keep it here, it is disabled, fix it with a web developer.