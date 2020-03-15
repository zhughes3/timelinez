import React from 'react';
import './HorizontalTimeline.css';

class HorizontalTimeline extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.timeline = document.querySelector(".h-timeline ol");
        this.elH = document.querySelectorAll(".h-timeline li > div");
        this.arrows = document.querySelectorAll(".h-timeline .h-arrows .h-arrow");
        this.arrowPrev = document.querySelector(".h-timeline .h-arrows .h-arrow-prev");
        this.arrowNext = document.querySelector(".h-timeline .h-arrows .h-arrow-next");
        this.firstItem = document.querySelector(".h-timeline li:first-child");
        this.lastItem = document.querySelector(".h-timeline li:last-child");
        this.xScrolling = 280;
        this.disabledClass = "disabled";

        setEqualHeights(this.elH);
        this.animateTimeline(this.xScrolling, this.arrows, this.timeline);
        this.setKeyboardFunction(this.arrowPrev, this.arrowNext);
        // setSwipeFunction(timeline, arrowPrev, arrowNext);
    }

    //helpers
    animateTimeline(scrolling, el, tl) {
        let arrowPrev = this.arrowPrev;
        let arrowNext = this.arrowNext;
        let firstItem = this.firstItem;
        let lastItem = this.lastItem;
        let setButtonState = this.setButtonState.bind(this);
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

    setButtonState(el, flag = true) {
        if (flag) {
            el.classList.add(this.disabledClass);
        } else {
            if (el.classList.contains(this.disabledClass)) {
                el.classList.remove(this.disabledClass);
            }
            el.disabled = false;
        }
    }

    setKeyboardFunction(prev, next) {
        document.addEventListener("keydown", (e) => {
            if ((e.which === 37) || (e.which === 39)) {
                
                const timelineOfTop = this.timeline.offsetTop;
                const y = window.pageYOffset;
                if (timelineOfTop !== y) {
                    window.scrollTo(0, timelineOfTop);
                }
                if (e.which === 37) {
                    prev.click();
                } else if (e.which === 39) {
                    next.click();
                }
            }
        });
    }


    render() {
        return(
            <section className="h-timeline">
                <ol>
                    {this.props.items.map(item => (
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
        )
    }
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

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// function setSwipeFunction(tl, prev, next) {
//     const hammer = new Hammer(tl);
//     hammer.on("swipeleft", () => next.click());
//     hammer.on("swiperight", () => prev.click());
// }

export default HorizontalTimeline;