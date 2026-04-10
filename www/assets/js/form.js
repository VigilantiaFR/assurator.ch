document.addEventListener('DOMContentLoaded', function () {
    const leadForm = document.getElementById('lead-capture-form');
    if (!leadForm) {
        return;
    }

    const productTypeInput = document.getElementById('product-type');
    const productOptions = Array.from(document.querySelectorAll('.product-option[data-product-value]'));

    const npaInput = document.getElementById('npa');
    const localityInput = document.getElementById('locality');
    const ageRangeSelect = document.getElementById('age-range');
    const franchiseSelect = document.getElementById('franchise');
    const insurerSelect = document.getElementById('current_insurer');
    const accidentCoverageSelect = document.getElementById('accident_coverage');

    const firstNameInput = document.getElementById('first_name');
    const lastNameInput = document.getElementById('last_name');
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

        if (formStep1) {
            formStep1.style.display = step === 1 ? 'block' : 'none';
        }
        if (formStep2) {
            formStep2.style.display = step === 2 ? 'block' : 'none';
        }

        setProgress(step);
        updateReturnButton();
    }

    function isEmailValid(value) {
        return /^\S+@\S+\.\S+$/.test(value);
    }

    function validateStep1(showErrors) {
        const npaValue = npaInput ? npaInput.value.trim() : '';
        const localityValue = localityInput ? localityInput.value.trim() : '';
        const ageRangeValue = ageRangeSelect ? ageRangeSelect.value : '';
        const franchiseValue = franchiseSelect ? franchiseSelect.value : '';
        const insurerValue = insurerSelect ? insurerSelect.value : '';

        const isNpaValid = /^\d{4}$/.test(npaValue);
        const isLocalityValid = localityValue !== '';
        const isAgeRangeValid = ageRangeValue !== '';
        const isFranchiseValid = franchiseValue !== '';
        const isInsurerValid = insurerValue !== '';

        if (showErrors) {
            toggleError('error-npa', !isNpaValid);
            toggleError('error-locality', !isLocalityValid);
            toggleError('error-age-range', !isAgeRangeValid);
            toggleError('error-franchise', !isFranchiseValid);
            toggleError('error-current_insurer', !isInsurerValid);
        }

        return isNpaValid && isLocalityValid && isAgeRangeValid && isFranchiseValid && isInsurerValid;
    }

    function validateStep2(showErrors) {
        const firstNameValue = firstNameInput ? firstNameInput.value.trim() : '';
        const lastNameValue = lastNameInput ? lastNameInput.value.trim() : '';
        const phoneValue = phoneInput ? phoneInput.value.trim() : '';
        const emailValue = emailInput ? emailInput.value.trim() : '';
        const consentValue = consentInput ? consentInput.checked : false;

        const isFirstNameValid = firstNameValue !== '';
        const isLastNameValid = lastNameValue !== '';
        const isPhoneValid = phoneValue !== '';
        const isEmailFieldValid = emailValue !== '' && isEmailValid(emailValue);

        if (showErrors) {
            toggleError('error-first_name', !isFirstNameValid);
            toggleError('error-last_name', !isLastNameValid);
            toggleError('error-phone', !isPhoneValid);
            toggleError('error-email', !isEmailFieldValid);
            toggleError('error-consent', !consentValue);
        }

        return isFirstNameValid && isLastNameValid && isPhoneValid && isEmailFieldValid && consentValue;
    }

    function selectProduct(button) {
        productOptions.forEach(function (option) {
            option.classList.remove('is-selected');
        });
        button.classList.add('is-selected');

        const value = button.getAttribute('data-product-value');
        if (productTypeInput && value) {
            productTypeInput.value = value;
        }
    }

    if (productOptions.length > 0) {
        productOptions.forEach(function (button) {
            button.addEventListener('click', function () {
                selectProduct(button);
            });
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

    if (ageRangeSelect) {
        ageRangeSelect.addEventListener('change', function () {
            toggleError('error-age-range', false);
        });
    }

    if (franchiseSelect) {
        franchiseSelect.addEventListener('change', function () {
            toggleError('error-franchise', false);
        });
    }

    if (insurerSelect) {
        insurerSelect.addEventListener('change', function () {
            toggleError('error-current_insurer', false);
        });
    }

    if (firstNameInput) {
        firstNameInput.addEventListener('input', function () {
            toggleError('error-first_name', false);
        });
    }

    if (lastNameInput) {
        lastNameInput.addEventListener('input', function () {
            toggleError('error-last_name', false);
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
        formData.append('product_type', productTypeInput ? productTypeInput.value : 'LAMAL');
        formData.append('npa', npaInput ? npaInput.value.trim() : '');
        formData.append('locality', localityInput ? localityInput.value.trim() : '');
        formData.append('age_range', ageRangeSelect ? ageRangeSelect.value : '');
        formData.append('franchise', franchiseSelect ? franchiseSelect.value : '');
        formData.append('current_insurer', insurerSelect ? insurerSelect.value : '');
        formData.append('accident_coverage', accidentCoverageSelect ? accidentCoverageSelect.value : '');
        formData.append('first_name', firstNameInput ? firstNameInput.value.trim() : '');
        formData.append('last_name', lastNameInput ? lastNameInput.value.trim() : '');
        formData.append('phone', phoneInput ? phoneInput.value.trim() : '');
        formData.append('email', emailInput ? emailInput.value.trim() : '');
        formData.append('consent', consentInput && consentInput.checked ? 'on' : '');
        formData.append('lpd_agreement', 'oui');
        formData.append('form_source', 'main_form');

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
