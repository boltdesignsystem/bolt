const lists = document.querySelectorAll('.c-bolt-nav-list');

[].forEach.call(lists, function(list) {
    // For each set of tabs, find the links and indicator.
    const links = list.querySelectorAll('.c-bolt-nav-list__item-link');
    const indicator = list.querySelector('.c-bolt-nav-list__indicator');

    // active: the link element that is active at any given time.
    let active;

    function activateLink() {

        if (!active) {
            // No link is currently active; the first link to become active is a special snowflake when it
            // comes to animation.
            let linkWidth = this.offsetWidth;
            let linkOffsetLeft = this.offsetLeft;
            let linkOffsetCenter = linkOffsetLeft + linkWidth/2;

            // First, immediately center the indicator.
            indicator.style.transition = "none";
            indicator.style.transform = 'translateX(' + linkOffsetCenter + 'px)';

            // Then, reset the transition and expand the indicator to the full width of the link.
            flushCss(indicator);
            indicator.style.transition = "";
            indicator.style.width =  linkWidth + 'px';
            indicator.style.transform = 'translateX(' + linkOffsetLeft + 'px)';
        }
        else {
            // Remove active state from any link that has it already.
            active.classList.remove('is-active');

            // Move the indicator under the active item
            indicator.style.width = this.offsetWidth + 'px';
            indicator.style.transform = 'translateX(' + this.offsetLeft + 'px)';
        }

        // Mark this as the new active link.
        this.classList.add('is-active');
        active = this;
    }

    // flushCss() is used to make sure the previous CSS alterations are complete before continuing.
    // See https://stackoverflow.com/questions/34726154/temporarily-bypass-a-css-transition/34726346
    function flushCss(element) {
        // By reading the offsetHeight property, we are forcing
        // the browser to flush the pending CSS changes (which it
        // does to ensure the value obtained is accurate).
        element.offsetHeight;
    }

    // Set an initially active link if appropriate.
    const initial = list.querySelector('.c-bolt-nav-list__item-link.is-active') || list.querySelector('[href="' + location.hash + '"]');
    if (initial) {
        activateLink.call(initial);
    }

    [].forEach.call(links, function(link) {
        link.addEventListener("click", activateLink);
    });
});
