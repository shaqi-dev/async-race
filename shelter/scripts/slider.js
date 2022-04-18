export default function slider(wrapperSelector, fieldSelector, buttonsLeftSelector, buttonsRightSelector, cards) {
    const sliderWrapper = document.querySelector(wrapperSelector),
          sliderField = document.querySelector(fieldSelector),
          sliderButtonsLeft = document.querySelectorAll(buttonsLeftSelector),
          sliderButtonsRight = document.querySelectorAll(buttonsRightSelector),
          cardWidth = 270;

    let previousSlides = [],
        currentSlides = [],
        nextSlides = [],
        slideSize = parseInt(cardWidth * 3 + parseInt(window.getComputedStyle(sliderField, null).columnGap) * 3),
        posInitial = -slideSize,
        cardsPerSlide = null,
        posCurrent = posInitial,
        allowShift = true;  

    // Setting max cards per slide

    function setCardsPerSlide() {
        if (window.matchMedia("(min-width: 1280px)").matches && cardsPerSlide !== 3) {
            cardsPerSlide = 3;
            slideSize = parseInt(cardWidth * 3 + parseInt(window.getComputedStyle(sliderField, null).columnGap) * 3);
            posInitial = -slideSize;
            sliderField.style.transform = `translateX(${posInitial}px)`;
        } else if (window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches && cardsPerSlide !== 2) {
            cardsPerSlide = 2;  
            slideSize = parseInt(cardWidth * 3 + parseInt(window.getComputedStyle(sliderField, null).columnGap) * 3);
            posInitial = -slideSize;
            sliderField.style.transform = `translateX(${posInitial}px)`;
        } else if (window.matchMedia("(max-width: 767px)").matches && cardsPerSlide !== 1) {
            cardsPerSlide = 1;        
            slideSize = parseInt(cardWidth * 3 + parseInt(window.getComputedStyle(sliderField, null).columnGap) * 3);
            posInitial = -slideSize;
            sliderField.style.transform = `translateX(${posInitial}px)`;
        }
    }

    setCardsPerSlide();

    window.addEventListener("resize", () => setCardsPerSlide(Math.max(document.documentElement.clientWidth))); 

    // Unique cards initilization

    function getUniqueCards(checkArray, pushArray, maxCardsCount, direction) {
        for (let i = 0; i < maxCardsCount;) {
            const randomCard = cards[Math.floor(Math.random() * 8)];
    
            if (!checkArray.some(e => e.dataset.name === randomCard.dataset.name) && 
                !pushArray.some(e => e.dataset.name === randomCard.dataset.name)) {
                pushArray.push(randomCard.cloneNode(true));
                i++;
            }
        }

        if (direction === 1) {
            sliderField.append(...pushArray);
        } else if (direction === -1) {
            sliderField.prepend(...pushArray);
        }
    }

    function initSlider() {
        getUniqueCards(currentSlides, currentSlides, 3, 1);
        getUniqueCards(currentSlides, previousSlides, 3, -1);
        getUniqueCards(currentSlides, nextSlides, 3, 1);
    }

    initSlider();

    function clearSlider() {
        sliderField.childNodes.forEach(card => sliderField.removeChild(card));
    }

    function refreshSlider() {
        clearSlider();
        initSlider();
    }
    
    // Add event listeners

    sliderButtonsLeft.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            shiftSlide(-1);
        })
    })

    sliderButtonsRight.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            shiftSlide(1);
        })
    })

    // Function to clear DOM from unused cards

    function removeChilds(cardsCount, direction) {
        if (direction === 1) {
            for (let i = 0; i < cardsCount;) {
                const card = sliderField.childNodes[0];

                if (card instanceof Element) {
                    i++ 
                }

                sliderField.removeChild(card);
            } 
        } else if (direction === -1) {
            for (let i = 0; i < cardsCount; ) {
                const card = sliderField.childNodes[sliderField.childNodes.length - 1]

                if (card instanceof Element) {
                    i++
                } 

                sliderField.removeChild(card);
            }
        }
    }

    // The main slider function

    function shiftSlide(direction) {
        if (allowShift) {
            allowShift = false;
            sliderField.classList.add('slider__items_shifting');   
            if (direction === 1) {
                posCurrent = posInitial - parseInt(cardWidth * cardsPerSlide + parseInt(window.getComputedStyle(sliderField, null).columnGap) * cardsPerSlide);
                sliderField.style.transform = `translateX(${posCurrent}px)`;
            } else if (direction === -1) {
                posCurrent = posInitial + parseInt(cardWidth * cardsPerSlide + parseInt(window.getComputedStyle(sliderField, null).columnGap) * cardsPerSlide);
                sliderField.style.transform = `translateX(${posCurrent}px)`;     
            }

            sliderField.addEventListener('transitionend', resetShift);

            function resetShift() {
                sliderField.classList.remove('slider__items_shifting');
                removeChilds(cardsPerSlide, direction);

                if (direction === 1) {
                    previousSlides = [...currentSlides];
                    currentSlides = [...nextSlides];
                    nextSlides = [];  
                    getUniqueCards(currentSlides, nextSlides, cardsPerSlide, 1);
                } else if (direction === -1) {
                    nextSlides = [...currentSlides];
                    currentSlides = [...previousSlides];
                    previousSlides = [];  
                    getUniqueCards(currentSlides, previousSlides, cardsPerSlide, -1);
                }

                sliderField.style.transform = `translateX(${posInitial}px)`;

                sliderField.removeEventListener('transitionend', resetShift);
    
                allowShift = true;
            } 
        }
    }    
}