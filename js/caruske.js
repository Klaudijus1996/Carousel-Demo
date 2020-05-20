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

    //itemai.appendChild(cloneFirst);
    //itemai.insertBefore(cloneLast, firstSlide);
}