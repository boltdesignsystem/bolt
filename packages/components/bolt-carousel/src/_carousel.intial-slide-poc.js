// const slides = document.querySelectorAll('bolt-carousel-slide');

// let observerOptions = {
//   root: this,
//   rootMargin: '10px',
//   threshold: [0.4],
// };

// const slideObserver = new IntersectionObserver(
//   intersectionCallback,
//   observerOptions,
// );

// function intersectionCallback(entries) {
//   entries.forEach(function(entry) {
//     console.log(entry);
//   });
// }

// slides.forEach(slide => {
//   // if (self.firstVisibleChild === '') {
//   slideObserver.observe(slide);
//   // }

//   //   console.log(slide.getBoundingClientRect());
//   //   const slideDimensions = slide.getBoundingClientRect();
//   //   const offsetLeft = slideDimensions.left;
//   //   const slideWidth = slideDimensions.width;

//   //   // console.log(offsetLeft >= 0 || Math.abs(offsetLeft) < slideWidth / 2);

//   //   if (offsetLeft >= 0 || Math.abs(offsetLeft) < slideWidth / 2) {
//   //     self.firstVisibleChild = slide;
//   //     self.firstVisibleChildIndex = Array.from(
//   //       slide.parentNode.children,
//   //     ).indexOf(slide);

//   //     self.firstVisibleChild.scrollIntoView({
//   //       behavior: 'auto',
//   //       block: 'end',
//   //       inline: 'start',
//   //     });
//   //   }
//   // }
// });
