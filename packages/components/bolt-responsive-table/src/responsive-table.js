export class BoltResponsiveTable {
  constructor(el) {
    if (!el) return;
    this.el = el;
    // this.toggleNextRows();
    // this.toggleAriaExpanded();
    // this.toggleCheckbox();
    // this.toggleFilters();
  }

  //nextUntil.js method https://vanillajstoolkit.com/helpers/nextuntil/
  // toggleNextRows() {
  //   var nextUntil = function(elem, selector, filter) {
  //     var siblings = [];

  //     elem = elem.nextElementSibling;

  //     while (elem) {
  //       if (elem.matches(selector)) break;

  //       if (filter && !elem.matches(filter)) {
  //         elem = elem.nextElementSibling;
  //       }
  //       siblings.push(elem);
  //       elem = elem.nextElementSibling;
  //     }

  //     return siblings;
  //   };

  //   var start = this.el.querySelectorAll(
  //     '.c-bolt-responsive-table__row--trigger',
  //   );

  //   for (let i = 0; i < start.length; i++) {
  //     const tableButton = start[i].querySelector(
  //       '.js-bolt-responsive-table-toggle-row',
  //     );

  //     var next = nextUntil(start[i], '.c-bolt-responsive-table__row--trigger');
  //     next.forEach(el => {
  //       el.classList.add('c-bolt-responsive-table__row--hidden');
  //     });

  //     tableButton.addEventListener('click', function() {
  //       var next = nextUntil(
  //         start[i],
  //         '.c-bolt-responsive-table__row--trigger',
  //       );
  //       next.forEach(el => {
  //         el.classList.toggle('c-bolt-responsive-table__row--hidden');
  //       });
  //     });
  //   }
  // }

  // toggleAriaExpanded() {
  //   const tableButton = this.el.querySelectorAll(
  //     '.js-bolt-responsive-table-toggle-row',
  //   );
  //   tableButton.forEach(el => {
  //     el.addEventListener('click', () => {
  //       if (el.getAttribute('aria-expanded') === 'true') {
  //         el.setAttribute('aria-expanded', 'false');
  //       } else {
  //         el.setAttribute('aria-expanded', 'true');
  //       }
  //     });
  //   });
  // }

  // toggleCheckbox() {
  //   const mainCheckbox = this.el.querySelector(
  //     '.c-bolt-responsive-table__head .c-bolt-responsive-table__header-checkbox',
  //   );

  //   const rowCheckboxes = this.el.querySelectorAll(
  //     '.c-bolt-responsive-table__body .c-bolt-responsive-table__header-checkbox',
  //   );
  //   rowCheckboxes.forEach(el => {
  //     el.addEventListener('click', () => {
  //       mainCheckbox.checked = true;
  //       let allUnchecked = [...rowCheckboxes].every(e => !e.checked);
  //       if (allUnchecked) {
  //         mainCheckbox.checked = false;
  //       }
  //     });
  //   });

  //   function checkAllCheckboxes() {
  //     rowCheckboxes.forEach(el => {
  //       if (el.checked) {
  //         el.checked = false;
  //       } else {
  //         el.checked = true;
  //       }
  //     });

  //     if (!mainCheckbox.checked) {
  //       rowCheckboxes.forEach(el => {
  //         el.checked = false;
  //       });
  //     }
  //   }

  //   if (mainCheckbox) {
  //     mainCheckbox.addEventListener('click', checkAllCheckboxes);
  //   }
  // }

  // toggleFilters() {
  //   const filtersButton = this.el.querySelectorAll(
  //     '.c-bolt-responsive-table__button--filter',
  //   );

  //   const resetButton = this.el.querySelectorAll(
  //     '.c-bolt-responsive-table__filters-reset',
  //   );

  //   const filters = this.el.querySelectorAll(
  //     '.c-bolt-responsive-table__filters',
  //   );

  //   filters.forEach(el => {
  //     const checkboxes = el.querySelectorAll(
  //       '.c-bolt-responsive-table__filters-checkbox',
  //     );

  //     checkboxes.forEach(el => {
  //       el.addEventListener('click', () => {
  //         let allUnchecked = [...checkboxes].every(e => !e.checked);
  //         el.closest('.c-bolt-responsive-table__filters')
  //           .querySelector('.c-bolt-responsive-table__filters-reset')
  //           .classList.add('c-bolt-responsive-table__filters-reset--visible');

  //         if (allUnchecked) {
  //           el.closest('.c-bolt-responsive-table__filters')
  //             .querySelector('.c-bolt-responsive-table__filters-reset')
  //             .classList.remove(
  //               'c-bolt-responsive-table__filters-reset--visible',
  //             );
  //         }
  //       });
  //     });
  //   });

  //   filtersButton.forEach(el => {
  //     el.addEventListener('click', () => {
  //       el.parentElement.nextElementSibling.classList.toggle(
  //         'c-bolt-responsive-table__filters--visible',
  //       );
  //       if (el.getAttribute('aria-expanded') === 'true') {
  //         el.setAttribute('aria-expanded', 'false');
  //       } else {
  //         el.setAttribute('aria-expanded', 'true');
  //       }
  //     });
  //   });

  //   if (resetButton) {
  //     resetButton.forEach(el => {
  //       el.addEventListener('click', e => {
  //         e.target.classList.remove(
  //           'c-bolt-responsive-table__filters-reset--visible',
  //         );
  //         el.parentElement
  //           .querySelectorAll('.c-bolt-responsive-table__filters-checkbox')
  //           .forEach(el => {
  //             if (el.checked) {
  //               el.checked = false;
  //             }
  //           });
  //         el.parentElement.classList.remove(
  //           'c-bolt-responsive-table__filters--visible',
  //         );
  //       });
  //     });
  //   }
  // }
}

const responsiveTable = document.querySelectorAll('.js-bolt-responsive-table');

responsiveTable.forEach(el => {
  const component = new BoltResponsiveTable(el);
});
