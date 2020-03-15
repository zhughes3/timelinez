import React from 'react';
import './HorizontalTimeline.css';

function HorizontalTimeline(props) {
    const timeline = document.querySelector(".h-timeline ol"),
        elH = document.querySelectorAll(".h-timeline li > div"),
        arrows = document.querySelectorAll(".h-timeline .h-arrows .h-arrow"),
        arrowPrev = document.querySelector(".h-timeline .h-arrows .h-arrow-prev"),
        arrowNext = document.querySelector(".h-timeline .h-arrows .h-arrow-next"),
        firstItem = document.querySelector(".h-timeline li:first-child"),
        lastItem = document.querySelector(".h-timeline li:last-child"),
        xScrolling = 280,
        disabledClass = "disabled";
    window.addEventListener("load", init);
    function init() {
        setEqualHeights(elH);
        animateTimeline(xScrolling, arrows, timeline);
        // setSwipeFunction(timeline, arrowPrev, arrowNext);
        // setKeyboardFunction(arrowPrev, arrowNext);
    }

    function setEqualHeights(el) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            const singleHeight = el[i].offsetHeight;

            if (counter < singleHeight) {
                counter = singleHeight;
            }
        }

        for (let i = 0; i < el.length; i++) {
            el[i].style.height = `${counter}px`;
        }
    }

    function animateTimeline(scrolling, el, tl) {
        let counter = 0;
        for (let i = 0; i < el.length; i++) {
            el[i].addEventListener("click", function() {
                if (!arrowPrev.disabled) {
                    arrowPrev.disabled = true;
                }
                if (!arrowNext.disabled) {
                    arrowNext.disabled = true;
                }

                const sign = (this.classList.contains("h-arrow-prev")) ? "" : "-";
                if (counter === 0) {
                    tl.style.transform = `translateX(-${scrolling}px)`;
                } else {
                    const tlStyle = getComputedStyle(tl);
                    //you might need to add more browser prefixes here if needed
                    const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
                    const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
                    tl.style.transform = `translateX(${values}px)`;
                }
                counter++;

                setTimeout(() => {
                    isElementInViewport(firstItem) ? setButtonState(arrowPrev) : setButtonState(arrowPrev, false);
                    isElementInViewport(lastItem) ? setButtonState(arrowNext) : setButtonState(arrowNext, false);
                }, 1100)
            });
        }
    }
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    function setButtonState(el, flag = true) {
        if (flag) {
            el.classList.add(disabledClass);
        } else {
            if (el.class.contains(disabledClass)) {
                el.classList.remove(disabledClass);
            }
            el.disabled = false;
        }
    }

    // function setSwipeFunction(tl, prev, next) {
    //     const hammer = new Hammer(tl);
    //     hammer.on("swipeleft", () => next.click());
    //     hammer.on("swiperight", () => prev.click());
    // }

    // function setKeyboardFunction(prev, next) {
    //     document.addEventListener("keydown", (e) => {
    //         if ((e.which === 37) || (e.which === 39)) {
    //             const timelineOfTop = timeline.offsetTop;
    //             const y = window.pageYOffset;
    //             if (timelineOfTop !== y) {
    //                 window.scrollTo(0, timelineOfTop);
    //             }
    //             if (e.which === 37) {
    //                 prev.click();
    //             } else if (e.which === 39) {
    //                 next.click();
    //             }
    //         }
    //     });
    // }
    return (
        <section className="h-timeline">
            <ol>
                {props.items.map(item => (
                <li>
                    <div>
                        <time>{item.time}</time>
                        {item.content}
                    </div>
                </li>
                )
                )}
            </ol>
            <div className="h-arrows">
                <button className="h-arrow h-arrow-prev disabled" disabled>&lt;</button>
                <button className="h-arrow h-arrow-next">&gt;</button>
            </div>
        </section>
    );
}

export default HorizontalTimeline;