// ----- Hamburger ----- //

const hamburger = document.querySelector("[for=toggle]");
const menu = document.querySelector(".sliding-menu");

function openMenu() {
    menu.classList.add("open");
}
function closeMenu() {
    menu.classList.remove("open");
}

hamburger.addEventListener('click', () => {
    if (!menu.classList.contains("open")) {
        openMenu()
    } else {
        closeMenu()
    }
});

//  ------ Carousel ------ //

// Aside - There is probably a more elogant way to create this.  I've never made one before, and I didn't use any tutorials as a guide.  It's not perfect, but I'm proud of it and learnt a lot.  There's a known bug where if you shrink the window too quickly, the mobile version will break.  Will revisit in the future.

//Global variables
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const slider = document.querySelector('.slider');


// Event Listener that checks to see that window size has shrunken to mobile size.  If it has, it will show a one image carousel, starting the carousel at the start, and remove classes from the image elements
const mobileMediaQuery = window.matchMedia('(max-width: 760px)');

mobileMediaQuery.addEventListener('change', function() {
    slider.childNodes.forEach(child => {
        if(child.nodeName==="IMG") {
            if(child.classList.contains('middleImage')) {
                child.classList.remove('middleImage');
            }

            if(child.classList.contains('rightImage')) {
                child.classList.remove('rightImage')
            }

            if(child.classList.contains('leftImage')) {
                child.classList.remove('leftImage');
                slider.firstElementChild.classList.add('leftImage');
            }
        }
    })
    // if needed, resets the next arrow icon
    if (next.classList.contains('end')) {
        next.classList.remove('end');
    }
})

// Event listener that checks to see if the screen has resized to desktop.  If it has, it will set the carousel back to the start, and apply classes to the first 3 img elements in the carousel
const desktopMediaQuery = window.matchMedia('(min-width: 769px)');

desktopMediaQuery.addEventListener('change', function() {
    slider.childNodes.forEach(child => {
        if (child.nodeName === "IMG") {
            if (child.classList.contains('leftImage')) {
                child.classList.remove('leftImage');
                slider.firstElementChild.classList.add('leftImage');
                slider.firstElementChild.nextElementSibling.classList.add('middleImage');
                slider.firstElementChild.nextElementSibling.nextElementSibling.classList.add('rightImage');
            }
        }
    })
    // if needed, resets the next arrow
    if(next.classList.contains('end')) {
        next.classList.remove('end');
    }
})

// Checks to see if on page load, the screen is a mobile size, and will remove the middle and right img elements from page
if (window.matchMedia('(max-width: 760px)').matches) {
    document.querySelector('.middleImage').classList.remove('middleImage');
    document.querySelector('.rightImage').classList.remove('rightImage');
}

// Event listener for click the next arrow key
next.addEventListener('click', function() {
    const leftImg = document.querySelector('.leftImage');
    rightImg = document.querySelector('.rightImage');
    middleImg = document.querySelector('.middleImage');
    // if the window size matches a desktop AND the right image isn't at the end of the slider, move each classlist (3 images) over by one until the end
    if (window.matchMedia('(min-width: 769px)').matches && rightImg !== slider.lastElementChild) {

        rightImg.classList.remove('rightImage');
        rightImg.nextElementSibling.classList.add('rightImage');
        middleImg.classList.remove('middleImage');
        middleImg.nextElementSibling.classList.add('middleImage');
        leftImg.classList.remove('leftImage');
        leftImg.nextElementSibling.classList.add('leftImage');
        previous.classList.remove('end');
    }
    // if the window size matches mobiles AND the left (and only) image isn't at the end of the slider, move one image by one
    if (window.matchMedia('(max-width: 760px)').matches && leftImg !== slider.lastElementChild) {
        leftImg.classList.remove('leftImage');
        leftImg.nextElementSibling.classList.add('leftImage');
        previous.classList.remove('end');
    }
    
    // If the slider ends on the right image(for desktop), or left image (for mobile), arrow button recieves class of "end" for UI to not click further
    if (slider.lastElementChild.classList.contains('rightImage') || slider.lastElementChild.classList.contains('leftImage')) {
        next.classList.add('end');
    }
})

previous.addEventListener('click', function() {
    const leftImg = document.querySelector('.leftImage');
    // if the window size matches mobiles AND the left (and only) image isn't at the start of the slider, move one image by one
    if (window.matchMedia('(max-width: 760px)').matches && leftImg !== slider.firstElementChild) {
        leftImg.classList.remove('leftImage');
        leftImg.previousElementSibling.classList.add('leftImage');
        next.classList.remove('end');
    }
    // if the window size matches a desktop AND the left image isn't at the start of the slider, move each classlist (3 images) over by one until the end
    if (window.matchMedia('(min-width: 769px)').matches && leftImg !== slider.firstElementChild) {
        rightImg = document.querySelector('.rightImage');
        middleImg = document.querySelector('.middleImage');

        rightImg.classList.remove('rightImage');
        rightImg.previousElementSibling.classList.add('rightImage');
        middleImg.classList.remove('middleImage');
        middleImg.previousElementSibling.classList.add('middleImage');
        leftImg.classList.remove('leftImage');
        leftImg.previousElementSibling.classList.add('leftImage');
        next.classList.remove('end');
    }

    // If the left Image is at the beginning of the slidder, arrow button recieves class of "end" for UI to not click further
    if (slider.firstElementChild.classList.contains('leftImage')) {
        previous.classList.add('end');
    }
})
