'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const allButtons = document.getElementsByTagName('button');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
header.prepend(message);
// header.append(message);

//prepend - add the node before the first child
//append add it as a last child
//we can move as well elemends with append and prepend, because an element cannot be on multiple places simultaneously.
// if we want to place it on multiple places we can clone the element
// header.append(message.cloneNode(true))

// we can use .before(message) and .after(message)

// Delete elements

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // message.parentElement.removeChild(message);
  });

// Styles using style property it's inline style in the DOM
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// if we want to see the computed styles in the css
// console.log(getComputedStyle(message).style);
// changing computed style
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// we can change css variables, selecting the root element and using the setProperty property
//document.documentElement.style.setProperty('--color-primary', 'green');

// Attributes

const logo = document.querySelector('.nav__logo');
// console.log(logo.alt)

logo.alt = 'Beautiful minimalist logo';
logo.setAttribute('company', 'Banklist');
// accessing a non-standart attribute
console.log(logo.getAttribute('company'));

console.log(logo.getAttribute('src'));
console.log(logo.src);

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes - starts always with data-something-sth.. These attributes are stored into the dataset object
// it is written as data-version-number="3.0" into the HTML and here we just have to write it in camelCase format
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c'); // if there is no such class it will be added, if there is such class it will be removed. It is really useful for creating dynamic elements on the webpage such as showing and hiding burger menues
logo.classList.contains('c'); // check whether the element contains certain class

// DO NOT USE because it is going to overwrite all the classes
// logo.className = 'jonas'

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// Page Navigation
// !!!!!!!!!!!!! In Event Delegation we put the listener to the common parent of the elements. With this technique we use the bubble phase of the events

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// h1.closest('h1') - closest is the oposite of querySelector, because it searches for parentElements, not for a children ones. It is used mostly in event delegation

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Gueard clause
  if (!clicked) return;

  // removing in advanced all clicked behavior
  tabs.forEach((t) => t.classList.remove('operations__tab--active'));

  // deactivating all content areas in advance
  document
    .querySelectorAll('.operations__content')
    .forEach((content) =>
      content.classList.remove('operations__content--active')
    );

  // activating the class which makes the button goes up when its clicked
  clicked.classList.add('operations__tab--active');

  // activating content area

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// menu fade animation
const nav = document.querySelector('.nav');

const handleHover = function (e, opacity) {
  const link = e.target;
  if (e.target.classList.contains('nav__link')) {
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// passing an argument into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//Implementing a sticky navigation, using Intersection observer API
// This API allows our code to basically observe changes to the way that a certain target element intersects another element, or the way it intersects the viewport
// to use the intersection observer API we need to create a new intersec observer
// const obsCallback = function (entries, observer) {
//   entries.forEach((entry) => {});
// };

// const obsOptions = {
//   root: null,
//   treshhold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// // our target element is intersecting the root element at the threshold that we defined
// observer.observe(section1);

//const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, //because we are interested in the entire viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// revealling sections on scroll

//const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //because we don't want to appear immediately after entering the section
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
