var slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

let greenSlide = createSlide('green', 'Zalias');
let pinkSlide = createSlide('pink', 'Ruzavs');
let purpleSlide = createSlide('purple', 'Purpuriux');
let graySlide = createSlide('gray', 'grey')
sliderItems.appendChild(greenSlide);
sliderItems.appendChild(pinkSlide);
sliderItems.appendChild(purpleSlide)
sliderItems.appendChild(graySlide);

const kiekPrasuktRatuku = 4;

function createSlide(className, nodeText) {
    let slide = document.createElement('span');
    slide.classList.add('slide', className);
    slide.innerHTML = nodeText;
    return slide;
}


function slide(wrapper, items, prev, next) {
  var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      preLast = slides[slidesLength - 2],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  

  for (let i = 0; i < kiekPrasuktRatuku; i++) {
    let naujasZalias = greenSlide.cloneNode(true);
    let naujasPink = pinkSlide.cloneNode(true);
    let naujasPurple = purpleSlide.cloneNode(true);
    let naujasGray = graySlide.cloneNode(true);
    naujasZalias.innerHTML = `${i+1}-asis zalias`;
    naujasZalias.id = `kurtas${i+1}_zalias`;
    naujasPink.innerHTML = `${i+1}-asis pink`;
    naujasPink.id = `kurtas${i+1}_pink`;
    naujasPurple.innerHTML = `${i+1}-asis purpur`;
    naujasPurple.id = `kurtas${i+1}_purpur`;
    naujasGray.innerHTML = `${i+1}_gray`;
    naujasGray.id = `kurtas${i+1}_gray`;
    sliderItems.appendChild(naujasZalias);
    sliderItems.appendChild(naujasPink);
    sliderItems.appendChild(naujasPurple);
    sliderItems.appendChild(naujasGray);
}

  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) });
  next.addEventListener('click', function () { shiftSlide(1) });

  
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);


  let initSlides = setInterval(function(){shiftSlide(1);}, 1500);
  $('#slides').mouseover(function(){
    clearInterval(initSlides);
  }).mouseout(function(){
    initSlides = setInterval(function(){shiftSlide(1);}, 1500);
  })

  // items.style.transition = 'all 1s';



  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize - 15 ) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize + 15) + "px";
        index--;      
      }
    };
    
    allowShift = false;
    checkIndex ();
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * (slideSize-1)) + "px";
      index = slidesLength -1
    }

    if (index == slidesLength) {
      items.style.left = -(0 * slideSize/slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
}

slide(slider, sliderItems, prev, next);
