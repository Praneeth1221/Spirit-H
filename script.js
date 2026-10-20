document.addEventListener('DOMContentLoaded', () => {
    const continueBtn = document.getElementById('continueBtn');
    const btnText = continueBtn ? continueBtn.querySelector('.btn-text') : null;
    const digitalCard = document.getElementById('digitalCard');
    const originalBtnText = btnText ? btnText.textContent : 'CONTINUE TO NEXT STEP';

    // Flag to prevent double trigger on rapid clicks
    let isRedirecting = false;

    // Function to restore button to active ready state
    function resetButtonState() {
        isRedirecting = false;
        if (continueBtn) {
            continueBtn.disabled = false;
            continueBtn.classList.remove('loading');
            if (btnText) {
                btnText.textContent = originalBtnText;
            }
        }
    }

    // Reset button whenever page is displayed (handles initial load & back button / bfcache)
    window.addEventListener('pageshow', (event) => {
        resetButtonState();
    });

    function handleNavigate(e) {
        if (e) {
            e.preventDefault();
        }

        if (isRedirecting) return;
        isRedirecting = true;

        if (continueBtn) {
            continueBtn.disabled = true;
            continueBtn.classList.add('loading');
            if (btnText) {
                btnText.textContent = 'Working on...';
            }
        }

        // Redirect after brief visual transition
        setTimeout(() => {
            window.location.href = 'https://giftclick.org/aff_c?offer_id=3280&aff_id=172306';
        }, 450);
    }

    if (continueBtn) {
        continueBtn.addEventListener('click', handleNavigate);
    }

    // Initialize clean state
    resetButtonState();

    // Interactive Card 3D tilt effect on desktop
    if (digitalCard) {
        const cardWrapper = digitalCard.parentElement;

        if (cardWrapper && window.matchMedia('(pointer: fine)').matches) {
            cardWrapper.addEventListener('mousemove', (e) => {
                const rect = cardWrapper.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const rotateX = (-y / rect.height) * 10;
                const rotateY = (x / rect.width) * 10;

                digitalCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            });

            cardWrapper.addEventListener('mouseleave', () => {
                digitalCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            });
        }
    }
});
