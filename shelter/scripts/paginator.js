export default function paginator(fieldSelector, buttonsSelector, cards) {
    const field = document.querySelector(fieldSelector),
          buttons = document.querySelectorAll(buttonsSelector),
          buttonFirst = buttons[0].querySelector('button'),
          buttonPrevious = buttons[1].querySelector('button'),
          buttonCurrentPage = buttons[2].querySelector('button'),
          buttonNext = buttons[3].querySelector('button'),
          buttonLast = buttons[4].querySelector('button'),
          cardWidth = 270;

    let cardsArray = [],   
        columnsCount = null,
        pageSize = parseInt(cardWidth + parseInt(window.getComputedStyle(field, null).columnGap)) * columnsCount,
        pagesCount = 6,
        posCurrent = 0,
        currentPage = 1,
        allowShift = true;  

    // Setting max cards per slide

    function setCounts() {
        if (window.matchMedia("(min-width: 1280px)").matches && columnsCount !== 4) {
            columnsCount = 4;
            pagesCount = 6;
            currentPage = 1,
            posCurrent = 0
            field.style.transform = `translateX(${posCurrent}px)`;
            checkPage();
        } else if (window.matchMedia("(min-width: 768px) and (max-width: 1279px)").matches && columnsCount !== 2) {
            columnsCount = 2;
            pagesCount = 8;
            currentPage = 1,
            posCurrent = 0
            field.style.transform = `translateX(${posCurrent}px)`;
            checkPage();
        } else if (window.matchMedia("(max-width: 767px)").matches && columnsCount !== 1) {
            columnsCount = 1;
            pagesCount = 16;
            currentPage = 1,
            posCurrent = 0
            field.style.transform = `translateX(${posCurrent}px)`;
            checkPage();
        }
    }

    setCounts();

    window.addEventListener("resize", setCounts); 

    // Unique cards initilization

    function getUniqueArray() {
        let res6 = [];
        let res8 = [];

        let set6 = new Set();
        let set8 = new Set();

        for (let i = 0; i < 7; i++) {
            for (let k = 0; k < 8; k++) {

                if (set6.size === 6) {
                    res6 = [...res6, [...set6]];
                    set6.clear()
                }

                if (set8.size === 8) {
                    res8 = [...res8, [...set8]];
                    set8.clear()
                }

                while (set8.size - 1 < k) {
                    const randomNumber = Math.floor(Math.random() * 8);
                    if (!set6.has(randomNumber) && !set8.has(randomNumber)) {
                        set6.add(randomNumber);
                        set8.add(randomNumber);
                    } 
                }
            }
        }

        const totalResult = [];
        
        res8.forEach(arr => totalResult.push(...arr));

        return totalResult;
    }

    const uniqueNumbers = getUniqueArray();

    function generateCards(numbersArray) {
        const res = [];
        
        numbersArray.forEach(num => {
            const currentCard = cards[num];
            res.push(currentCard.cloneNode(true));
        })  

        cardsArray = [...res];
    }

    generateCards(uniqueNumbers);

    function renderPages() {
        cardsArray.forEach(element => {
            field.append(element);
        })
    }

    renderPages();

    // Add event listeners

    buttonFirst.addEventListener('click', (e) => {
        e.preventDefault();
        shiftSlide(0);
    })

    buttonPrevious.addEventListener('click', (e) => {
        e.preventDefault();
        shiftSlide(-1);
    })

    buttonNext.addEventListener('click', (e) => {
        e.preventDefault();
        shiftSlide(1);
    })

    buttonLast.addEventListener('click', (e) => {
        e.preventDefault();
        shiftSlide(2);
    })

    // Function to control page number and paginator buttons

    function checkPage() {
        console.log(currentPage, pagesCount);
        if (currentPage === 1) {
            buttonFirst.classList.add('button-paginator__disabled');
            buttonPrevious.classList.add('button-paginator__disabled');
            buttonNext.classList.remove('button-paginator__disabled');
            buttonLast.classList.remove('button-paginator__disabled');
        } else if (currentPage !== 1 && currentPage !== pagesCount) {
            buttonFirst.classList.remove('button-paginator__disabled');
            buttonPrevious.classList.remove('button-paginator__disabled');
            buttonNext.classList.remove('button-paginator__disabled');
            buttonLast.classList.remove('button-paginator__disabled');
        } else if (currentPage == pagesCount) {
            buttonFirst.classList.remove('button-paginator__disabled');
            buttonPrevious.classList.remove('button-paginator__disabled');
            buttonNext.classList.add('button-paginator__disabled');
            buttonLast.classList.add('button-paginator__disabled');
        }

        buttonCurrentPage.querySelector('.button-paginator__inner-text').innerText = `${currentPage}`
    }

    checkPage();

    // The main slider function

    function shiftSlide(direction) {
        if (allowShift) {
            allowShift = false;
            field.classList.add('our-friends__cards_shifting');   
            if (direction === 1) {
                posCurrent -= parseInt(cardWidth + parseInt(window.getComputedStyle(field, null).columnGap)) * columnsCount;
                field.style.transform = `translateX(${posCurrent}px)`;
                currentPage += 1
            } else if (direction === -1) {
                posCurrent += parseInt(cardWidth + parseInt(window.getComputedStyle(field, null).columnGap)) * columnsCount;
                field.style.transform = `translateX(${posCurrent}px)`;
                currentPage -= 1 
            } else if (direction === 0) {
                posCurrent = 0
                field.style.transform = `translateX(${posCurrent}px)`;
                currentPage = 1;
            } else if (direction === 2) {
                posCurrent = -parseInt(cardWidth + parseInt(window.getComputedStyle(field, null).columnGap)) * columnsCount * (pagesCount - 1);
                field.style.transform = `translateX(${posCurrent}px)`;
                currentPage = pagesCount;
            }    

            checkPage();

            field.addEventListener('transitionend', resetShift);

            function resetShift() {
                field.classList.remove('our-friends__cards_shifting');
                field.removeEventListener('transitionend', resetShift);
                allowShift = true;
            } 
        }
    }    
}