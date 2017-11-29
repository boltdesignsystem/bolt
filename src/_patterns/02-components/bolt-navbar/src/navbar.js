const lists = document.querySelectorAll('.c-bolt-nav-list');

[].forEach.call(lists, function(list) {
    // For each set of tabs, find the links and indicator.
    const links = list.querySelectorAll('.c-bolt-nav-list__item-link');
    const indicator = list.querySelector('.c-bolt-nav-list__indicator');

    // If the location.hash matches one of the links, use that as the active tab.
    // TODO set this based on the URL if it matches one of the links.
    let active;

    function activateLink() {
        // Remove active state from any link that has it already.
        if (active) {
            active.classList.remove('is-active');
        }

        // Mark this as the new active link.
        this.classList.add('is-active');
        active = this;

        // Move the indicator under the active item.
        indicator.style.width = this.offsetWidth + 'px';
        indicator.style.transform = 'translateX(' + this.offsetLeft + 'px)';
    }


    [].forEach.call(links, function(link) {
        link.addEventListener("click", activateLink);
    });
});
