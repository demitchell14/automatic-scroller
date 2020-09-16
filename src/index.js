import './style/main.scss';
// require('./main.scss')
(function() {
    fillPage();

    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const items = document.querySelectorAll('[data-repeatable]');
    const table = document.getElementById('list');

    let containerHeight = window.innerHeight;
    if (header) {
        containerHeight -= header.clientHeight;
        table.style.paddingTop = header.clientHeight + "px"
    }
    if (footer) {
        containerHeight -= footer.clientHeight;
        table.style.paddingBottom = footer.clientHeight + "px"
    }

    const scroller = require('./scroller');
    scroller({
        containerHeight,
        fps: 10,
        delay: 5000,
        scrollBy: 52,
        itemHeight: items.length > 0 ? items[0].clientHeight : 0,
        marginTop: header.clientHeight,
        lastItemId: Number.parseInt(items[items.length - 1].getAttribute('data-id')),
        onEnd() {
            window.scrollTo(0, 0);
            location.reload();
        }
    });
})()


/**
 * Testing function to build table
 */
function fillPage() {
    const repeatableElement = document.body.querySelector('[data-repeatable]');

    if (repeatableElement) {
        let count = repeatableElement.getAttribute('data-count');
        repeatableElement.removeAttribute('data-count');
        repeatableElement.setAttribute('data-id', 0)
        try {
            if (count) count = Number.parseInt(count);
        } catch (e) {}

        if (typeof count === 'number') {
            const parent = repeatableElement.parentElement
            for (let i = 1; i < count; i++) {
                const clone = repeatableElement.cloneNode(true);
                clone.setAttribute('data-id', i + "")

                parent.appendChild(clone);
            }
        }
    }
}
