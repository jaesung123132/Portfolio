document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const currentNumEl = document.getElementById("page-current");

    let cardList = Array.from(pages);
    let isAnimating = false;

    updateStackVisuals();
    updateIndicator();

    window.addEventListener("wheel", (e) => {
        if (isAnimating) return;
        if (e.deltaY > 0) nextCard();
        else if (e.deltaY < 0) prevCard();
    });

    window.addEventListener("keydown", (e) => {
        if (isAnimating) return;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") nextCard();
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") prevCard();
    });

    function nextCard() {
        if (cardList.length < 2) return;
        isAnimating = true;

        const topCard = cardList[0];
        topCard.style.transform = `translateX(150%) rotate(10deg) scale(1)`;
        topCard.style.zIndex = 100;

        setTimeout(() => {
            cardList.push(cardList.shift());
            updateStackVisuals();
            isAnimating = false;
            updateIndicator();
        }, 500);
    }

    function prevCard() {
        if (cardList.length < 2) return;
        isAnimating = true;

        const lastCard = cardList[cardList.length - 1];

        lastCard.style.transition = "none";
        lastCard.style.transform = `translateX(150%) rotate(10deg) scale(1)`;
        lastCard.style.zIndex = 100;

        cardList.pop();
        cardList.unshift(lastCard);

        setTimeout(() => {
            lastCard.style.transition = "transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.5s, filter 0.5s";
            updateStackVisuals();

            setTimeout(() => {
                isAnimating = false;
                updateIndicator();
            }, 500);
        }, 20);
    }

    function updateStackVisuals() {
        cardList.forEach((card, index) => {
            card.style.zIndex = cardList.length - index;
            const scale = 1 - (index * 0.05);
            const translateY = index * 10;
            const brightness = 1 - (index * 0.15);

            card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            card.style.filter = `brightness(${brightness})`;
            card.style.opacity = index > 2 ? 0 : 1;

            card.style.pointerEvents = index === 0 ? 'auto' : 'none';
        });
    }

    function updateIndicator() {
        if (!currentNumEl) return;

        const currentClass = cardList[0].className.match(/page-(\d+)/);

        if (currentClass) {
            const num = currentClass[1].padStart(2, '0');
            currentNumEl.textContent = num;
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".slider-track");

    sliders.forEach(track => {
        let index = 0;
        const images = track.querySelectorAll(".slide-img");

        if (images.length === 0) return;

        function showNext() {
            images.forEach((img, i) => {
                img.style.display = (i === index) ? "block" : "none";
            });
            index = (index + 1) % images.length;
        }

        showNext();
        setInterval(showNext, 3000);
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const sliders = document.querySelectorAll(".project-slider");

    sliders.forEach(slider => {

        const images = slider.querySelectorAll(".slider-track img");
        const prevBtn = slider.querySelector(".prev");
        const nextBtn = slider.querySelector(".next");

        let index = 0;
        let interval;

        function showImage(i) {
            images.forEach(img => img.classList.remove("active"));
            images[i].classList.add("active");
        }

        function next() {
            index = (index + 1) % images.length;
            showImage(index);
        }

        function prev() {
            index = (index - 1 + images.length) % images.length;
            showImage(index);
        }

        function startAuto() {
            stopAuto();
            interval = setInterval(next, 3000);
        }

        function stopAuto() {
            if (interval) clearInterval(interval);
        }


        nextBtn.addEventListener("click", () => {
            next();
            startAuto();
        });

        prevBtn.addEventListener("click", () => {
            prev();
            startAuto();
        });

        slider.addEventListener("mouseenter", stopAuto);
        slider.addEventListener("mouseleave", startAuto);

        startAuto();
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".toggle-detail-btn").forEach(btn => {

        btn.addEventListener("click", () => {
            const overlay = btn.parentElement.querySelector(".project-detail-overlay");

            const isOpen = overlay.classList.contains("active");

            if (isOpen) {
                overlay.classList.remove("active");
                btn.textContent = "▼";
            } else {
                overlay.classList.add("active");
                btn.textContent = "▲";
            }
        });

    });
});

