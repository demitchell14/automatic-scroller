const defaultArgs = {
    type: 'scroll'
}

// curves.easeInOutCubic(.5)
let loop = 0, stopped = false;

const animations = {
    scroll: scrollAnimation
}

const defaultPageArgs = {
    fps: 60,
    delay: 1000,
    scrollBy: 1,
    containerHeight: 0,
    itemHeight: 0,
    startId: 0,
    lastItemId: 0,
}
function ScrollPage(args) {
    args = Object.assign(defaultPageArgs, args);
    const { fps, delay, scrollBy, containerHeight, itemHeight, startId, marginTop, lastItemId, onEnd } = args;

    function getNextStartId() {
        const next = Number.parseInt((containerHeight / itemHeight).toFixed(0)) - 1;
        return next;
    }

    const nextStartId = startId + getNextStartId()
    const nextStartElement = document.querySelector(`[data-id="${nextStartId}"]`);

    let nextBound = { top: 0 };
    if (nextStartElement !== null) {
        nextStartElement.style.backgroundColor = 'cyan'
        nextBound = nextStartElement.getBoundingClientRect();
    }

    const distance = nextBound.top - marginTop;
    const anim = scrollByFPSAnimation({
        fps,
        scrollY: scrollBy,
        distance,
        started() {
            console.log("Scroll Started")
        },
        onStopped(end) {
            console.log("Scroll Stopped");
            if (nextStartElement === null || end ) {
                console.error("RESET Scroller");
                if (onEnd) {
                    setTimeout(onEnd, delay);
                }
            } else {
                ScrollPage({ ...args, startId: nextStartId })
            }
        }
    });

    setTimeout(anim.start, delay);
}

function Scroller(args) {
    args = Object.assign(defaultArgs, args);
    let looper;
    console.log(args);

    const anim = scrollByFPSAnimation({
        fps: 60,
        scrollY: 10,
        // minY: 0,
        // maxY: 3200,
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

    let curve = 1,
        travelled = 0,
        maxDistance = window.scrollY - (args.distance || 0)

    let then = Date.now();
    let now, elapsed, id;
    let started = false,
        stopped = false;

    const margin = Number.parseInt(getComputedStyle(document.body).marginTop) + Number.parseInt(getComputedStyle(document.body).marginBottom);

    const tmp = args.started;
    args.started = (loopId) => {
        id = loopId;
        return tmp(loopId);
    }

    function stop(end = false) {
        stopped = true;
        started = false;
        window.removeEventListener('scroll', scrollListener);
        if (args.onStopped)
            args.onStopped(end);
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

                if (args.distance) {
                    let y = args.scrollY;

                    let nextScroll;
                    if (travelled + args.scrollY > args.distance)
                        nextScroll = args.distance - travelled
                    else
                        nextScroll = scrollY;

                    if (nextScroll <= 0) {
                        stop();
                        cancelAnimationFrame(id);
                    }

                    window.scrollBy(scrollX, nextScroll)
                } else {

                    const pageHeight = document.body.scrollHeight + margin;
                    const maxScroll = pageHeight - window.scrollY - window.innerHeight;

                    // console.log({
                    //     currentY,
                    //     nextY: window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve),
                    //     diff: (window.scrollY + (scrollY * curve < 1 ? 1 : scrollY * curve)) - currentY
                    // })

                    currentY = window.scrollY + scrollY // + (scrollY * curve < 1 ? 1 : scrollY * curve)

                    window.scrollBy(scrollX, currentY);
                    // window.scrollBy(scrollX, scrollY * curve < 1 ? 1 : scrollY * curve);
                    // console.log('ScrollBy: ', scrollY * curve < 1 ? 1 : scrollY * curve, curve)
                }
            }
        }

        return animate();
    }

    function scrollListener(evt) {
        const margin = Number.parseInt(getComputedStyle(document.body).marginTop) + Number.parseInt(getComputedStyle(document.body).marginBottom);

        const pageHeight = document.body.scrollHeight + margin;
        const maxScroll = pageHeight - window.scrollY - window.innerHeight;

        if (args.distance) {
            travelled += maxDistance > window.scrollY ? window.scrollY - maxDistance : scrollY;
            if (travelled >= args.distance || window.scrollY + window.innerHeight >= document.body.scrollHeight + margin) {
                cancelAnimationFrame(id)
                stop(window.scrollY + window.innerHeight >= document.body.scrollHeight + margin);
                return;
            }
        }

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

module.exports = ScrollPage;
