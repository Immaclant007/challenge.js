'use strict';
const header = document.querySelector('.header');
const reveal = document.querySelectorAll('.reveal');
const contents = document.querySelectorAll('.content');
const hidebtn = document.querySelector('.hide-btn');
const contentBtn = document.querySelectorAll('.button-style');
const classes = ['slide-up', 'slide-left', 'slide-right'];

const revealer = function (e) {
  const [opacity1, opacity2] = this;
  if (e.target.classList.contains('reveal')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.reveal');
    const logo = document.querySelector('.logo');
    siblings.forEach(sibling => {
      if (sibling !== link) {
        sibling.style.opacity = opacity1;
      }
    });
    logo.style.opacity = opacity2;
  }
};

header.addEventListener('mouseover', revealer.bind([0.5, 0.5]));
header.addEventListener('mouseout', revealer.bind([1, 1]));

// document
//   .querySelectorAll('.content')
//   .forEach(con => con.classList.remove('hidden'));

//   document.querySelectorAll('.reveal').forEach(reveal=> reveal.addEventListener('click', function() {

//   })

// reveal.forEach((rev, i) =>
//   rev.addEventListener('click', function () {
//     content.forEach(c => c.classList.add('hidden'));
//     content[i].classList.remove('hidden');
//   })
// );

// const hideBtn = document.querySelector('.hide-btn');
// hideBtn.addEventListener('click', function () {
//   content.forEach(r => {
//     r.classList.toggle('hidden');
//   });
// });

contents.forEach(c => {
  c.classList.remove('hidden');
});

reveal.forEach((rev, i) => {
  rev.addEventListener('click', function (e) {
    const target = e.target.getAttribute('href');
    document.querySelector(target).scrollIntoView({
      behavior: 'smooth',
    });
  });
});

contents.forEach(hide => hide.classList.add('section-hidden'));

const random = function () {
  return Math.floor(Math.random() * 3);
};

const func = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add(`${classes[random()]}`);
      entry.target.classList.remove('section-hidden');
    }

    setTimeout(() => {
      entry.target.classList.add('active');
    }, 100);
  });
};

const options = {
  root: null,
  threshold: 0.1,
};

const revealFunc = new IntersectionObserver(func, options);
contents.forEach(c => revealFunc.observe(c));

// const contentBtn = document.querySelectorAll('.button-style');
// contentBtn.forEach((content, i) => {
//   content.addEventListener('click', function () {
//     const siblings = content.closest('.main').querySelectorAll('.button-style');
//     siblings.forEach((child, i) => {
//       if (child !== content) {
//         contents[i].classList.add('hidden');
//         console.log(contentBtn[i]);
//       }
//     });
//   });
// });

contentBtn.forEach((btn, i) => {
  btn.addEventListener('click', function (e) {
    const target = e.target.closest('.content');
    const siblings = target.closest('.main').querySelectorAll('.content');
    console.log(siblings);
    siblings.forEach(sibling => {
      if (sibling !== target) {
        sibling.scrollIntoView({ behavior: 'smooth' });
        sibling.classList.toggle('hidden');
        header.classList.toggle('hidden');
      }
    });
  });
});
