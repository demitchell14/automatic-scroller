(function() {
    fillPage();

    const scroller = require('./scroller');

    // console.log(scroller);
    scroller();
})()

function fillPage() {
    const repeatableElement = document.body.querySelector('[data-repeatable]');

    if (repeatableElement) {
        let count = repeatableElement.getAttribute('data-count');
        try {
            if (count) count = Number.parseInt(count);
        } catch (e) {}

        if (typeof count === 'number') {
            const parent = repeatableElement.parentElement
            for (let i = 1; i < count; i++) {
                const clone = repeatableElement.cloneNode(true);
                parent.appendChild(clone);
            }
        }
    }
}
