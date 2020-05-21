'use strict';

let slides = document.querySelector('.slider'),
    sliderItems = document.querySelector('.slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, itemai, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = itemai.querySelectorAll('.slide'),
        slidesLength = slides.length,
        slideSize = itemai.querySelectorAll('.slide')[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    itemai.appendChild(cloneFirst);
    itemai.insertBefore(cloneLast, firstSlide);

    wrapper.classList.add('loaded');

    itemai.onmousedown = dragStart;

    itemai.addEventListener('touchstart', dragStart);
    itemai.addEventListener('touchend', dragEnd);
    itemai.addEventListener('touchmove', dragAction);

    prev.addEventListener('click', function() {shiftSlide(-1)});
    prev.addEventListener('click', function() {shiftSlide(1)});

    itemai.addEventListener('transitionend', checkIndex);

    function dragStart(e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = itemai.offsetLeft;
        if ( e.type == 'touchstart' ) {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousedown = dragAction;
        }
    }

    
    
    function dragAction (e) {
        e = e || window.event;
        
        if ( e.type == 'touchmove' ) {
            posX2 = posX1 - e.touches[0].clientX
            posX1 = e.touches[0].clientX
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        //itemai.style.left = (itemai.offsetLeft - posX2) + 'px0;'
        itemai.style.left = (itemai.offsetLeft - posX2) + 'px';
    }
    
    function dragEnd(e) {
        posFinal = itemai.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            itemai.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }
    
    function shiftSlide(dir, action) {
        itemai.classList.add('shifting');

        if ( allowShift ) {
            if (!action) { posInitial = itemai.offsetLeft; }

            if (dir == 1) {
                itemai.style.left = (posInitial - slideSize) + 'px';
                index++;
            } else if (dir == -1) {
                itemai.style.left = (posInitial + slideSize) + 'px';
                index--;
            }
        };
        allowShift = false;
    }

    function checkIndex() {
        itemai.classList.remove('shifting');

        if (index == -1) {
            itemai.style.left = -(slidesLength * slideSize) + 'px';
            index = slidesLength - 1;
        }
        if (index == slidesLength) {
            itemai.style.left = -(1*slideSize) + 'px';
            index = 0;
        }
        allowShift = true;
    }
}

slide(slides, sliderItems, prev, next); 