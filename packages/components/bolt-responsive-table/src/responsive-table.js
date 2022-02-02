export class BoltResponsiveTable {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.toggleNextRows();
    this.toggleAriaExpanded();
  }

  toggleNextRows() {
    console.log('toggletable rows');
    var nextUntil = function(elem, selector, filter) {
      // Setup siblings array
      var siblings = [];

      // Get the next sibling element
      elem = elem.nextElementSibling;

      // As long as a sibling exists
      while (elem) {
        // If we've reached our match, bail
        if (elem.matches(selector)) break;

        // If filtering by a selector, check if the sibling matches
        if (filter && !elem.matches(filter)) {
          elem = elem.nextElementSibling;
        }

        // Otherwise, push it to the siblings array
        siblings.push(elem);

        // Get the next sibling element
        elem = elem.nextElementSibling;
      }

      return siblings;
    };

    var start = this.el.querySelectorAll(
      '.c-bolt-responsive-table__row--trigger',
    );

    for (let i = 0; i < start.length; i++) {
      const tableButton = start[i].querySelector(
        '.js-bolt-responsive-table-toggle-row',
      );

      // ???
      var next = nextUntil(start[i], '.c-bolt-responsive-table__row--trigger');
      next.forEach(el => {
        el.classList.add('c-bolt-responsive-table__row--hidden');
      });
      // ???
      tableButton.addEventListener('click', function() {
        var next = nextUntil(
          start[i],
          '.c-bolt-responsive-table__row--trigger',
        );
        next.forEach(el => {
          el.classList.toggle('c-bolt-responsive-table__row--hidden');
        });
      });
    }
  }

  toggleAriaExpanded() {
    console.log('toggle aria expanded');
    const tableButton = this.el.querySelectorAll(
      '.js-bolt-responsive-table-toggle-row',
    );
    console.log(tableButton);
    tableButton.forEach(el => {
      el.addEventListener('click', event => {
        if (el.getAttribute('aria-expanded') === 'true') {
          el.setAttribute('aria-expanded', 'false');
        } else {
          el.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }
}

const responsiveTable = document.querySelectorAll(
  '.c-bolt-reponsive-table__table',
);

responsiveTable.forEach(el => {
  const component = new BoltResponsiveTable(el);
});
