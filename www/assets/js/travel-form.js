document.addEventListener('DOMContentLoaded', function () {
    const leadForm = document.getElementById('lead-capture-form');
    if (!leadForm) {
        return;
    }

    const productTypeInput = document.getElementById('product-type');
    const travelTypeSelect = document.getElementById('travel_type');
    const npaInput = document.getElementById('npa');
    const localityInput = document.getElementById('locality');
    const destinationZoneSelect = document.getElementById('destination_zone');
    const departureTimingInput = document.getElementById('departure_timing');
    const tripDurationSelect = document.getElementById('trip_duration');
    const currentInsurerSelect = document.getElementById('current_insurer');
    const travelersCountSelect = document.getElementById('travelers_count');
    const travelCoverageSelect = document.getElementById('travel_coverage');

    const firstNameInput = document.getElementById('first_name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const consentInput = document.getElementById('consent');

    const submitButton = document.getElementById('submit-btn');
    const nextButton = document.getElementById('step1-next-btn');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const loadingOverlay = document.getElementById('loading-overlay');

    const formStep1 = document.getElementById('form-step-1');
    const formStep2 = document.getElementById('form-step-2');
    const prevButtonContainer = document.getElementById('prev-button-container');

    let currentStep = 1;

    function toggleError(errorId, show) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = show ? 'block' : 'none';
        }
    }

    function setProgress(step) {
        if (!progressBarFill) return;
        progressBarFill.style.width = step === 2 ? '100%' : '50%';
    }

    function updateReturnButton() {
        if (!prevButtonContainer) return;
        prevButtonContainer.innerHTML = '';

        if (currentStep === 2) {
            const prevButton = document.createElement('button');
            prevButton.type = 'button';
            prevButton.className = 'back-btn';
            prevButton.id = 'prev-btn';
            prevButton.textContent = 'Retour';
            prevButton.addEventListener('click', function () {
                goToStep(1);
            });
            prevButtonContainer.appendChild(prevButton);
        }
    }

    function goToStep(step) {
        currentStep = step;
        setProgress(step);
        updateReturnButton();

        var leaving = step === 2 ? formStep1 : formStep2;
        var entering = step === 2 ? formStep2 : formStep1;

        if (!leaving || leaving.style.display === 'none') {
            if (entering) entering.style.display = 'block';
            return;
        }

        leaving.classList.add('form-step-out');
        setTimeout(function () {
            leaving.style.display = 'none';
            leaving.classList.remove('form-step-out');
            if (entering) {
                entering.classList.add('form-step-pre-in');
                entering.style.display = 'block';
                void entering.offsetWidth;
                entering.classList.remove('form-step-pre-in');
            }
        }, 280);
    }

    function isEmailValid(value) {
        return /^\S+@\S+\.\S+$/.test(value);
    }

    function pushLeadEvent() {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'lead_form_submit',
            form_source: 'travel_form',
            product_type: 'VOYAGE',
            page_path: window.location.pathname,
        });
    }

    function validateStep1(showErrors) {
        const travelTypeValue = travelTypeSelect ? travelTypeSelect.value : '';
        const npaValue = npaInput ? npaInput.value.trim() : '';
        const localityValue = localityInput ? localityInput.value.trim() : '';
        const destinationZoneValue = destinationZoneSelect ? destinationZoneSelect.value : '';
        const departureTimingValue = departureTimingInput ? departureTimingInput.value : '';
        const tripDurationValue = tripDurationSelect ? tripDurationSelect.value : '';

        const isTravelTypeValid = travelTypeValue !== '';
        const isNpaValid = /^\d{4}$/.test(npaValue);
        const isLocalityValid = localityValue !== '';
        const isDestinationZoneValid = destinationZoneValue !== '';
        const isDepartureTimingValid = departureTimingValue !== '';
        const isTripDurationValid = tripDurationValue !== '';

        if (showErrors) {
            toggleError('error-travel_type', !isTravelTypeValid);
            toggleError('error-npa', !isNpaValid);
            toggleError('error-locality', !isLocalityValid);
            toggleError('error-destination_zone', !isDestinationZoneValid);
            toggleError('error-departure_timing', !isDepartureTimingValid);
            toggleError('error-trip_duration', !isTripDurationValid);
        }

        return isTravelTypeValid && isNpaValid && isLocalityValid && isDestinationZoneValid && isDepartureTimingValid && isTripDurationValid;
    }

    function validateStep2(showErrors) {
        const firstNameValue = firstNameInput ? firstNameInput.value.trim() : '';
        const phoneValue = phoneInput ? phoneInput.value.trim() : '';
        const emailValue = emailInput ? emailInput.value.trim() : '';
        const consentValue = consentInput ? consentInput.checked : false;

        const isFirstNameValid = firstNameValue !== '';
        const isPhoneValid = phoneValue !== '';
        const isEmailFieldValid = emailValue !== '' && isEmailValid(emailValue);

        if (showErrors) {
            toggleError('error-first_name', !isFirstNameValid);
            toggleError('error-phone', !isPhoneValid);
            toggleError('error-email', !isEmailFieldValid);
            toggleError('error-consent', !consentValue);
        }

        return isFirstNameValid && isPhoneValid && isEmailFieldValid && consentValue;
    }

    if (travelTypeSelect) {
        travelTypeSelect.addEventListener('change', function () {
            toggleError('error-travel_type', false);
        });
    }

    if (npaInput) {
        npaInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '').substring(0, 4);
            toggleError('error-npa', false);
        });
    }

    if (localityInput) {
        localityInput.addEventListener('input', function () {
            toggleError('error-locality', false);
        });
    }

    if (destinationZoneSelect) {
        destinationZoneSelect.addEventListener('change', function () {
            toggleError('error-destination_zone', false);
        });
    }

    if (departureTimingInput) {
        departureTimingInput.addEventListener('change', function () {
            toggleError('error-departure_timing', false);
        });
    }

    if (tripDurationSelect) {
        tripDurationSelect.addEventListener('change', function () {
            toggleError('error-trip_duration', false);
        });
    }

    if (firstNameInput) {
        firstNameInput.addEventListener('input', function () {
            toggleError('error-first_name', false);
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            toggleError('error-phone', false);
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            toggleError('error-email', false);
        });
    }

    if (consentInput) {
        consentInput.addEventListener('change', function () {
            toggleError('error-consent', false);
        });
    }

    function allStep1FieldsFilled() {
        if (!validateStep1(false)) return false;
        var insurer = currentInsurerSelect ? currentInsurerSelect.value : 'ok';
        var count = travelersCountSelect ? travelersCountSelect.value : 'ok';
        var coverage = travelCoverageSelect ? travelCoverageSelect.value : 'ok';
        return insurer !== '' && count !== '' && coverage !== '';
    }

    var autoAdvanceTimer = null;
    function checkAutoAdvance() {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = setTimeout(function () {
            if (currentStep === 1 && allStep1FieldsFilled()) {
                goToStep(2);
            }
        }, 350);
    }

    if (travelTypeSelect) travelTypeSelect.addEventListener('change', checkAutoAdvance);
    if (npaInput) npaInput.addEventListener('input', checkAutoAdvance);
    if (localityInput) localityInput.addEventListener('input', checkAutoAdvance);
    if (destinationZoneSelect) destinationZoneSelect.addEventListener('change', checkAutoAdvance);
    if (departureTimingInput) departureTimingInput.addEventListener('change', checkAutoAdvance);
    if (tripDurationSelect) tripDurationSelect.addEventListener('change', checkAutoAdvance);
    if (currentInsurerSelect) currentInsurerSelect.addEventListener('change', checkAutoAdvance);
    if (travelersCountSelect) travelersCountSelect.addEventListener('change', checkAutoAdvance);
    if (travelCoverageSelect) travelCoverageSelect.addEventListener('change', checkAutoAdvance);

    if (nextButton) {
        nextButton.addEventListener('click', function () {
            if (validateStep1(true)) {
                goToStep(2);
            }
        });
    }

    leadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const step1Valid = validateStep1(true);
        if (!step1Valid) {
            goToStep(1);
            return;
        }

        if (currentStep === 1) {
            goToStep(2);
            return;
        }

        const step2Valid = validateStep2(true);
        if (!step2Valid) {
            return;
        }

        const formData = new FormData();
        formData.append('product_type', productTypeInput ? productTypeInput.value : 'VOYAGE');
        formData.append('travel_type', travelTypeSelect ? travelTypeSelect.value : '');
        formData.append('npa', npaInput ? npaInput.value.trim() : '');
        formData.append('locality', localityInput ? localityInput.value.trim() : '');
        formData.append('destination_zone', destinationZoneSelect ? destinationZoneSelect.value : '');
        formData.append('departure_timing', departureTimingInput ? departureTimingInput.value : '');
        formData.append('trip_duration', tripDurationSelect ? tripDurationSelect.value : '');
        formData.append('current_insurer', currentInsurerSelect ? currentInsurerSelect.value : '');
        formData.append('travelers_count', travelersCountSelect ? travelersCountSelect.value : '');
        formData.append('travel_coverage', travelCoverageSelect ? travelCoverageSelect.value : '');
        formData.append('first_name', firstNameInput ? firstNameInput.value.trim() : '');
        formData.append('phone', phoneInput ? phoneInput.value.trim() : '');
        formData.append('email', emailInput ? emailInput.value.trim() : '');
        formData.append('consent', consentInput && consentInput.checked ? 'on' : '');
        formData.append('lpd_agreement', 'oui');
        formData.append('form_source', 'travel_form');

        if (submitButton) {
            submitButton.disabled = true;
            const btnText = submitButton.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'Envoi en cours...';
            }
        }

        if (loadingOverlay) {
            loadingOverlay.style.display = 'flex';
        }

        fetch('send_email.php', {
            method: 'POST',
            body: formData,
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                }

                if (data.success) {
                    var ecData = {};
                    if (emailInput && emailInput.value.trim()) {
                        ecData.email = emailInput.value.trim().toLowerCase();
                    }
                    if (phoneInput && phoneInput.value.trim()) {
                        ecData.phone_number = phoneInput.value.trim();
                    }
                    window.sessionStorage.setItem('_assr_ec', JSON.stringify(ecData));
                    pushLeadEvent();
                    window.location.href = 'merci.html';
                } else {
                    alert(data.message || 'Une erreur est survenue.');
                }
            })
            .catch(function (error) {
                console.error('Erreur:', error);
                if (loadingOverlay) {
                    loadingOverlay.style.display = 'none';
                }
                alert('Une erreur réseau est survenue.');
            })
            .finally(function () {
                if (submitButton) {
                    submitButton.disabled = false;
                    const btnText = submitButton.querySelector('.btn-text');
                    if (btnText) {
                        btnText.textContent = 'Recevoir ma comparaison gratuite';
                    }
                }
            });
    });
});
