document.addEventListener('DOMContentLoaded', function () {
    const leadForm = document.getElementById('lead-capture-form');
    if (!leadForm) {
        return;
    }

    const productTypeInput = document.getElementById('product-type');
    const npaInput = document.getElementById('npa');
    const localityInput = document.getElementById('locality');
    const pregnancyStatusSelect = document.getElementById('pregnancy_status');
    const deliveryTimingInput = document.getElementById('delivery_timing');
    const insurerSelect = document.getElementById('current_insurer');
    const desiredCoverageSelect = document.getElementById('desired_coverage');

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
            form_source: 'prenatal_form',
            product_type: 'PRENATALE',
            page_path: window.location.pathname,
        });
    }

    function validateStep1(showErrors) {
        const npaValue = npaInput ? npaInput.value.trim() : '';
        const localityValue = localityInput ? localityInput.value.trim() : '';
        const pregnancyStatusValue = pregnancyStatusSelect ? pregnancyStatusSelect.value : '';
        const deliveryTimingValue = deliveryTimingInput ? deliveryTimingInput.value : '';

        const isNpaValid = /^\d{4}$/.test(npaValue);
        const isLocalityValid = localityValue !== '';
        const isPregnancyStatusValid = pregnancyStatusValue !== '';
        const isDeliveryTimingValid = deliveryTimingValue !== '';

        if (showErrors) {
            toggleError('error-npa', !isNpaValid);
            toggleError('error-locality', !isLocalityValid);
            toggleError('error-pregnancy_status', !isPregnancyStatusValid);
            toggleError('error-delivery_timing', !isDeliveryTimingValid);
        }

        return isNpaValid && isLocalityValid && isPregnancyStatusValid && isDeliveryTimingValid;
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

    if (pregnancyStatusSelect) {
        pregnancyStatusSelect.addEventListener('change', function () {
            toggleError('error-pregnancy_status', false);
        });
    }

    if (deliveryTimingInput) {
        deliveryTimingInput.addEventListener('change', function () {
            toggleError('error-delivery_timing', false);
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
        var insurer = insurerSelect ? insurerSelect.value : 'ok';
        var coverage = desiredCoverageSelect ? desiredCoverageSelect.value : 'ok';
        return insurer !== '' && coverage !== '';
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

    if (npaInput) npaInput.addEventListener('input', checkAutoAdvance);
    if (localityInput) localityInput.addEventListener('input', checkAutoAdvance);
    if (pregnancyStatusSelect) pregnancyStatusSelect.addEventListener('change', checkAutoAdvance);
    if (deliveryTimingInput) deliveryTimingInput.addEventListener('change', checkAutoAdvance);
    if (insurerSelect) insurerSelect.addEventListener('change', checkAutoAdvance);
    if (desiredCoverageSelect) desiredCoverageSelect.addEventListener('change', checkAutoAdvance);

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
        formData.append('product_type', productTypeInput ? productTypeInput.value : 'ASSURANCE_PRENATALE');
        formData.append('npa', npaInput ? npaInput.value.trim() : '');
        formData.append('locality', localityInput ? localityInput.value.trim() : '');
        formData.append('pregnancy_status', pregnancyStatusSelect ? pregnancyStatusSelect.value : '');
        formData.append('delivery_timing', deliveryTimingInput ? deliveryTimingInput.value : '');
        formData.append('current_insurer', insurerSelect ? insurerSelect.value : '');
        formData.append('desired_coverage', desiredCoverageSelect ? desiredCoverageSelect.value : '');
        formData.append('first_name', firstNameInput ? firstNameInput.value.trim() : '');
        formData.append('phone', phoneInput ? phoneInput.value.trim() : '');
        formData.append('email', emailInput ? emailInput.value.trim() : '');
        formData.append('consent', consentInput && consentInput.checked ? 'on' : '');
        formData.append('lpd_agreement', 'oui');
        formData.append('form_source', 'prenatal_form');

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

    goToStep(1);
});
