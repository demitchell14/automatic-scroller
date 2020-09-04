const curves = require('./curves')
const defaultArgs = {
    type: 'scroll'
}

// curves.easeInOutCubic(.5)
let loop = 0, stopped = false;

const animations = {
    scroll: scrollAnimation
}

function Scroller(args) {
    args = Object.assign(defaultArgs, args);
    let looper;
    console.log(args);

    const anim = scrollByFPSAnimation({
        // fps: 60,
        // scrollY: 1,
        // minY: 0,
        maxY: 3200,
        started(loopId) {
            looper = loopId
            console.log('Loop Started', looper)
        },
        onStopped() {
            console.log('Loop Finished', looper);

            setTimeout(() => {
                window.scrollTo(0, args.minY);
                setTimeout(anim.start, 1000);
            }, 2000);
        }
    });


    setTimeout(anim.start, 1000);


    // window.addEventListener('scroll', )
    //
    // const animation = animations[args.type];
    //
    // if (animation) {
    //     setTimeout(() => {
    //         looper = requestAnimationFrame(animation);
    //     }, 2000);
    // }
}

const defaultFPSAnimArgs = {
    fps: 999999,
    scrollY: 1,
    scrollX: 0,
    minY: 0,
}
function scrollByFPSAnimation(args) {
    args = Object.assign(defaultFPSAnimArgs, args);

    let fpsInterval = 1000 / args.fps;
    let scrollY = args.scrollY,
        scrollX = args.scrollX,
        currentY = args.scrollY;

    let curve = 1;

    let then = Date.now();
    let now, elapsed, id;
    let started = false,
        stopped = false;

    const tmp = args.started;
    args.started = (loopId) => {
        id = loopId;
        return tmp(loopId);
    }

    function stop() {
        stopped = true;
        started = false;
        window.removeEventListener('scroll', scrollListener);
        if (args.onStopped)
            args.onStopped();
    }

    function start() {
        stopped = false;
        started = false;
        window.addEventListener('scroll', scrollListener);
        function animate() {
            if (stopped)
                return;

            const id = requestAnimationFrame(animate);
            if (args.started && !started) {
                args.started(id)
                started = true;
            }

            now = Date.now();
            elapsed = now - then;

            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);

                const margin = Number.parseInt(getComputedStyle(document.body).marginTop) + Number.parseInt(getComputedStyle(document.body).marginBottom);

                const pageHeight = document.body.scrollHeight + margin;
                const maxScroll = pageHeight - window.scrollY - window.innerHeight;

                // console.log({
                //     currentY,
                //     nextY: window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve),
                //     diff: (window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve)) - currentY
                // })

                currentY = window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve)

                window.scrollTo(scrollX, currentY);
                // window.scrollBy(scrollX, scrollY * curve < 1 ? 1 : scrollY * curve);
                // console.log('ScrollBy: ', scrollY * curve < 1 ? 1 : scrollY * curve, curve)
            }
        }

        return animate();
    }

    function scrollListener(evt) {
        const margin = Number.parseInt(getComputedStyle(document.body).marginTop) + Number.parseInt(getComputedStyle(document.body).marginBottom);

        const pageHeight = document.body.scrollHeight + margin;
        const maxScroll = pageHeight - window.scrollY - window.innerHeight;

        const curveTest = window.scrollY / (args.maxY ? args.maxY : pageHeight / 2)
        console.log(curveTest)

        if (pageHeight - maxScroll < pageHeight / 2) {
            curve = 5 * curves.easeOutQuad(curveTest);
        } else {
            curve = 5 * curves.easeOutQuad(curveTest);
        }

        // console.log({
        //     pageHeight,
        //     maxScroll,
        //     diff: pageHeight - maxScroll,
        //     scrollY: window.scrollY,
        //     innerHeight: window.innerHeight,
        //     maxY: args.maxY,
        // })

        if (maxScroll <= 0 || (typeof args.maxY === 'number' && window.scrollY >= args.maxY)) {
            if (id) {
                cancelAnimationFrame(id);
                stop();
            }
        }
    }

    return {
        start,
        stop,
    }
}

function scrollAnimation() {
    if (loop % 2 === 0) {
        console.log('scroll by 1')
        window.scrollBy(0, 1);
    }


    if (stopped)
        return;

    loop++;
    requestAnimationFrame(scrollAnimation);
}

module.exports = Scroller;