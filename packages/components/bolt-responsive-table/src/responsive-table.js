export class BoltResponsiveTable {
  constructor(el) {
    if (!el) return;
    this.el = el;
    this.toggleNextRows();
    this.toggleAriaExpanded();
    this.toggleCheckbox();
  }

  toggleNextRows() {
    //nextUntil.js method https://vanillajstoolkit.com/helpers/nextuntil/
    var nextUntil = function(elem, selector, filter) {
      var siblings = [];

      elem = elem.nextElementSibling;

      while (elem) {
        if (elem.matches(selector)) break;

        if (filter && !elem.matches(filter)) {
          elem = elem.nextElementSibling;
        }
        siblings.push(elem);
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

      var next = nextUntil(start[i], '.c-bolt-responsive-table__row--trigger');
      next.forEach(el => {
        el.classList.add('c-bolt-responsive-table__row--hidden');
      });

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
    // console.log('toggle aria expanded');
    const tableButton = this.el.querySelectorAll(
      '.js-bolt-responsive-table-toggle-row',
    );
    // console.log(tableButton);
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

  toggleCheckbox() {
    const mainCheckbox = this.el.querySelector(
      '.c-bolt-responsive-table__head .c-bolt-responsive-table__header-checkbox',
    );

    const rowCheckboxes = this.el.querySelectorAll(
      '.c-bolt-responsive-table__body .c-bolt-responsive-table__header-checkbox',
    );
    rowCheckboxes.forEach(el => {
      el.addEventListener('click', () => {
        mainCheckbox.checked = true;
        let checkboxesArr = Array.from(rowCheckboxes);
        let allUnchecked = checkboxesArr.every(e => !e.checked);
        if (allUnchecked) {
          mainCheckbox.checked = false;
        }
      });
    });

    let myArray = Array.from(rowCheckboxes);

    let result = myArray.every(e => !e.checked);

    console.log(result);

    function checkAllCheckboxes() {
      rowCheckboxes.forEach(el => {
        if (el.checked) {
          el.checked = false;
        } else {
          el.checked = true;
        }
      });

      if (!mainCheckbox.checked) {
        rowCheckboxes.forEach(el => {
          el.checked = false;
        });
      }
    }

    mainCheckbox.addEventListener('click', checkAllCheckboxes);
  }
}

const responsiveTable = document.querySelectorAll(
  '.c-bolt-reponsive-table__table',
);

responsiveTable.forEach(el => {
  const component = new BoltResponsiveTable(el);
});
