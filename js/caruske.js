'use strict';

let slides = document.querySelector('.caruske');
let sliderItems = document.querySelector('.caruske-content');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

slide(slides, sliderItems, prev, next); 

//setTimeout(function(){ slide(slides, sliderItems, prev, next); }, 3000);

function slide(wrapper, itemai, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = itemai.querySelectorAll('.slides'),
        slidesLength = slides.length,
        slideSize = itemai.querySelectorAll('.slides')[0].offsetWidth,
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




}