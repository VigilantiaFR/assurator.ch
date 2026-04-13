document.addEventListener('DOMContentLoaded', function () {
    const leadForm = document.getElementById('lead-capture-form');
    if (!leadForm) {
        return;
    }

    const productTypeInput = document.getElementById('product-type');
    const productOptions = Array.from(document.querySelectorAll('.product-option[data-product-value]'));

    const formStep1 = document.getElementById('form-step-1');
    const formStep2 = document.getElementById('form-step-2');
    const formStep3 = document.getElementById('form-step-3');

    const step1NextButton = document.getElementById('step1-next-btn');
    const step2PrevButton = document.getElementById('step2-prev-btn');
    const step2NextButton = document.getElementById('step2-next-btn');
    const step3PrevButton = document.getElementById('step3-prev-btn');

    const submitButton = document.getElementById('submit-btn');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const loadingOverlay = document.getElementById('loading-overlay');
    const productSpecificFieldsContainer = document.getElementById('product-specific-fields');

    const progressStepElements = [
        document.getElementById('progress-step-1'),
        document.getElementById('progress-step-2'),
        document.getElementById('progress-step-3'),
    ];

    const INSURER_OPTIONS_REQUIRED = `
        <option value="" disabled selected>Sélectionnez</option>
        <option value="CSS">CSS</option>
        <option value="Helsana">Helsana</option>
        <option value="Groupe Mutuel">Groupe Mutuel</option>
        <option value="SWICA">SWICA</option>
        <option value="Sanitas">Sanitas</option>
        <option value="Assura">Assura</option>
        <option value="Visana">Visana</option>
        <option value="Concordia">Concordia</option>
        <option value="KPT/CPT">KPT/CPT</option>
        <option value="Sympany">Sympany</option>
        <option value="Atupri">Atupri</option>
        <option value="OKK">OKK</option>
        <option value="EGK">EGK</option>
        <option value="Autre">Autre</option>
    `;

    const INSURER_OPTIONS_OPTIONAL = `
        <option value="">Sélectionnez</option>
        <option value="CSS">CSS</option>
        <option value="Helsana">Helsana</option>
        <option value="Groupe Mutuel">Groupe Mutuel</option>
        <option value="SWICA">SWICA</option>
        <option value="Sanitas">Sanitas</option>
        <option value="Assura">Assura</option>
        <option value="Visana">Visana</option>
        <option value="Concordia">Concordia</option>
        <option value="KPT/CPT">KPT/CPT</option>
        <option value="Sympany">Sympany</option>
        <option value="Atupri">Atupri</option>
        <option value="OKK">OKK</option>
        <option value="EGK">EGK</option>
        <option value="Autre">Autre</option>
    `;

    const PRODUCT_CONFIG = {
        LAMAL: {
            formSource: 'main_form',
            requiredFields: [],
            fieldsTemplate: `
                <div class="form-row">
                    <div class="form-group">
                        <p class="text-sm text-slate-500">Aucun champ supplémentaire pour ce produit.</p>
                    </div>
                </div>
            `,
        },
        LCA: {
            formSource: 'lca_form',
            requiredFields: ['lca_need'],
            fieldsTemplate: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="lca_need">Type de couverture recherchée</label>
                        <select id="lca_need" name="lca_need" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="hospitalisation">Hospitalisation complémentaire</option>
                            <option value="ambulatoire">Soins ambulatoires</option>
                            <option value="dentaire">Dentaire</option>
                            <option value="vision">Vision et lunettes</option>
                            <option value="medecines_douces">Médecines alternatives</option>
                            <option value="globale">Couverture globale</option>
                        </select>
                        <div class="error-message" id="error-lca_need">Veuillez sélectionner votre besoin principal.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="budget_range">Budget mensuel visé (facultatif)</label>
                        <select id="budget_range" name="budget_range">
                            <option value="">Sélectionnez</option>
                            <option value="moins_50">Moins de CHF 50</option>
                            <option value="50_100">CHF 50 - 100</option>
                            <option value="100_150">CHF 100 - 150</option>
                            <option value="150_plus">Plus de CHF 150</option>
                        </select>
                    </div>
                </div>
            `,
        },
        PRENATALE: {
            formSource: 'prenatal_form',
            requiredFields: ['pregnancy_status', 'delivery_timing'],
            fieldsTemplate: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="pregnancy_status">Votre statut</label>
                        <select id="pregnancy_status" name="pregnancy_status" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="en_projet">En projet</option>
                            <option value="enceinte">Enceinte</option>
                            <option value="accouchement_bientot">Accouchement prévu bientôt</option>
                        </select>
                        <div class="error-message" id="error-pregnancy_status">Veuillez indiquer votre statut.</div>
                    </div>
                    <div class="form-group">
                        <label for="delivery_timing">Mois prévu / date estimée</label>
                        <input type="month" id="delivery_timing" name="delivery_timing" required />
                        <div class="error-message" id="error-delivery_timing">Veuillez indiquer la période prévue.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="desired_coverage">Couverture recherchée (facultatif)</label>
                        <select id="desired_coverage" name="desired_coverage">
                            <option value="">Sélectionnez</option>
                            <option value="grossesse_accouchement">Grossesse et accouchement</option>
                            <option value="hospitalisation">Hospitalisation maternité</option>
                            <option value="suivi_postnatal">Suivi postnatal</option>
                            <option value="couverture_complete">Couverture complète</option>
                        </select>
                    </div>
                </div>
            `,
        },
        VOYAGE: {
            formSource: 'travel_form',
            requiredFields: ['travel_type', 'destination_zone', 'departure_timing', 'trip_duration'],
            fieldsTemplate: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="travel_type">Type de voyage</label>
                        <select id="travel_type" name="travel_type" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="vacances">Vacances</option>
                            <option value="affaires">Voyage d'affaires</option>
                            <option value="backpacking">Backpacking / Long séjour</option>
                            <option value="famille">Voyage en famille</option>
                            <option value="sport">Voyage sportif / Aventure</option>
                        </select>
                        <div class="error-message" id="error-travel_type">Veuillez sélectionner le type de voyage.</div>
                    </div>
                    <div class="form-group">
                        <label for="destination_zone">Zone de destination</label>
                        <select id="destination_zone" name="destination_zone" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="europe">Europe</option>
                            <option value="monde_entier">Monde entier</option>
                            <option value="amerique">Amériques</option>
                            <option value="asie">Asie / Pacifique</option>
                            <option value="afrique">Afrique / Moyen-Orient</option>
                        </select>
                        <div class="error-message" id="error-destination_zone">Veuillez sélectionner votre destination.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="departure_timing">Date de départ prévue</label>
                        <select id="departure_timing" name="departure_timing" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="moins_1_mois">Dans moins d'un mois</option>
                            <option value="1_3_mois">Dans 1 à 3 mois</option>
                            <option value="3_6_mois">Dans 3 à 6 mois</option>
                            <option value="plus_6_mois">Dans plus de 6 mois</option>
                        </select>
                        <div class="error-message" id="error-departure_timing">Veuillez indiquer votre date de départ.</div>
                    </div>
                    <div class="form-group">
                        <label for="trip_duration">Durée du voyage</label>
                        <select id="trip_duration" name="trip_duration" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="moins_1_semaine">Moins d'une semaine</option>
                            <option value="1_2_semaines">1 à 2 semaines</option>
                            <option value="2_4_semaines">2 à 4 semaines</option>
                            <option value="plus_1_mois">Plus d'un mois</option>
                        </select>
                        <div class="error-message" id="error-trip_duration">Veuillez sélectionner la durée du voyage.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="travelers_count">Nombre de voyageurs (facultatif)</label>
                        <select id="travelers_count" name="travelers_count">
                            <option value="">Sélectionnez</option>
                            <option value="1">1 personne</option>
                            <option value="2">2 personnes</option>
                            <option value="3-4">3 à 4 personnes</option>
                            <option value="5+">5 personnes et +</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="travel_coverage">Type de couverture souhaité (facultatif)</label>
                        <select id="travel_coverage" name="travel_coverage">
                            <option value="">Sélectionnez</option>
                            <option value="annulation">Annulation voyage</option>
                            <option value="medicale">Assistance médicale</option>
                            <option value="bagages">Protection bagages</option>
                            <option value="complete">Couverture complète</option>
                        </select>
                    </div>
                </div>
            `,
        },
        ANIMAUX: {
            formSource: 'animals_form',
            requiredFields: ['animal_type'],
            fieldsTemplate: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="animal_type">Type d'animal</label>
                        <select id="animal_type" name="animal_type" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="chien">Chien</option>
                            <option value="chat">Chat</option>
                        </select>
                        <div class="error-message" id="error-animal_type">Veuillez sélectionner le type d'animal.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="pet_breed">Race ou gabarit (facultatif)</label>
                        <input type="text" id="pet_breed" name="pet_breed" placeholder="Ex: Labrador, Européen, petit gabarit..." />
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="coverage_level">Niveau de couverture souhaité (facultatif)</label>
                        <select id="coverage_level" name="coverage_level">
                            <option value="">Sélectionnez</option>
                            <option value="essentielle">Essentielle</option>
                            <option value="equilibree">?quilibrée</option>
                            <option value="renforcee">Renforcée</option>
                        </select>
                    </div>
                </div>
            `,
        },
        NOUVEAU_RESIDENT: {
            formSource: 'resident_form',
            requiredFields: ['installation_timing', 'household_status'],
            fieldsTemplate: `
                <div class="form-row">
                    <div class="form-group">
                        <label for="installation_timing">Mois d'installation en Suisse</label>
                        <input type="month" id="installation_timing" name="installation_timing" required />
                        <div class="error-message" id="error-installation_timing">Veuillez indiquer votre mois d'installation.</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="household_status">Statut</label>
                        <select id="household_status" name="household_status" required>
                            <option value="" disabled selected>Sélectionnez</option>
                            <option value="seul">Seul</option>
                            <option value="couple">Couple</option>
                            <option value="famille">Famille</option>
                        </select>
                        <div class="error-message" id="error-household_status">Veuillez sélectionner votre statut.</div>
                    </div>
                </div>
            `,
        },
    };

    let currentStep = 1;
    let autoAdvanceTimer = null;

    function toggleError(errorId, show) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.style.display = show ? 'block' : 'none';
        }
    }

    function isEmailValid(value) {
        return /^\S+@\S+\.\S+$/.test(value);
    }

    function getActiveProduct() {
        const activeValue = productTypeInput && productTypeInput.value ? productTypeInput.value : 'LAMAL';
        return PRODUCT_CONFIG[activeValue] ? activeValue : 'LAMAL';
    }

    function getActiveConfig() {
        return PRODUCT_CONFIG[getActiveProduct()];
    }

    function shouldSkipStep2() {
        return getActiveProduct() === 'LAMAL';
    }

    function renderProductSpecificFields() {
        const config = getActiveConfig();
        if (productSpecificFieldsContainer) {
            productSpecificFieldsContainer.innerHTML = config.fieldsTemplate;
        }
    }

    function setProgress(step) {
        if (progressBarFill) {
            // Align with the 3 step markers (left / center / right).
            const widthByStep = {
                1: '0%',
                2: '50%',
                3: '100%',
            };
            progressBarFill.style.width = widthByStep[step] || '0%';
        }

        progressStepElements.forEach(function (stepElement, index) {
            if (!stepElement) return;
            const icon = stepElement.querySelector('i');
            const isDone = index + 1 <= step;

            stepElement.classList.toggle('text-slate-300', !isDone);
            stepElement.classList.toggle('text-slate-600', isDone);

            if (icon) {
                icon.classList.toggle('text-slate-300', !isDone);
                icon.classList.toggle('text-rose-500', isDone);
            }
        });
    }

    function goToStep(step) {
        currentStep = step;
        if (formStep1) formStep1.style.display = step === 1 ? 'block' : 'none';
        if (formStep2) formStep2.style.display = step === 2 ? 'block' : 'none';
        if (formStep3) formStep3.style.display = step === 3 ? 'block' : 'none';
        setProgress(step);
    }

    function validateStep1(showErrors) {
        const npaInput = leadForm.querySelector('[name="npa"]');
        const localityInput = leadForm.querySelector('[name="locality"]');
        const ageRangeInput = leadForm.querySelector('[name="age_range"]');
        const franchiseInput = leadForm.querySelector('[name="franchise"]');
        const insurerInput = leadForm.querySelector('[name="current_insurer"]');

        const npaValue = npaInput && typeof npaInput.value === 'string' ? npaInput.value.trim() : '';
        const localityValue = localityInput && typeof localityInput.value === 'string' ? localityInput.value.trim() : '';
        const ageRangeValue = ageRangeInput && typeof ageRangeInput.value === 'string' ? ageRangeInput.value.trim() : '';
        const franchiseValue = franchiseInput && typeof franchiseInput.value === 'string' ? franchiseInput.value.trim() : '';
        const insurerValue = insurerInput && typeof insurerInput.value === 'string' ? insurerInput.value.trim() : '';

        const isProductValid = !!getActiveProduct();
        const isNpaValid = /^\d{4}$/.test(npaValue);
        const isLocalityValid = localityValue !== '';
        const isAgeRangeValid = ageRangeValue !== '';
        const isFranchiseValid = franchiseValue !== '';
        const isInsurerValid = insurerValue !== '';

        if (showErrors) {
            toggleError('error-npa', !isNpaValid);
            toggleError('error-locality', !isLocalityValid);
            toggleError('error-age_range', !isAgeRangeValid);
            toggleError('error-franchise', !isFranchiseValid);
            toggleError('error-current_insurer', !isInsurerValid);
        }

        return isProductValid && isNpaValid && isLocalityValid && isAgeRangeValid && isFranchiseValid && isInsurerValid;
    }

    function validateStep2(showErrors) {
        const config = getActiveConfig();
        const uniqueRequiredFields = Array.from(new Set(config.requiredFields || []));

        return uniqueRequiredFields.every(function (fieldName) {
            const field = leadForm.querySelector('[name="' + fieldName + '"]');
            if (!field) {
                return false;
            }

            const rawValue = typeof field.value === 'string' ? field.value.trim() : '';
            const isValid = rawValue !== '';

            if (showErrors) {
                toggleError('error-' + fieldName, !isValid);
            }

            return isValid;
        });
    }

    function validateStep3(showErrors) {
        const firstNameInput = document.getElementById('first_name');
        const lastNameInput = document.getElementById('last_name');
        const phoneInput = document.getElementById('phone');
        const emailInput = document.getElementById('email');
        const consentInput = document.getElementById('consent');

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

    function checkAutoAdvanceToStep2() {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = setTimeout(function () {
            if (currentStep === 1 && validateStep1(false)) {
                goToStep(shouldSkipStep2() ? 3 : 2);
            }
        }, 250);
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

        renderProductSpecificFields();
        checkAutoAdvanceToStep2();
    }

    productOptions.forEach(function (button) {
        button.addEventListener('click', function () {
            selectProduct(button);
        });
    });

    if (step1NextButton) {
        step1NextButton.addEventListener('click', function () {
            if (validateStep1(true)) {
                goToStep(shouldSkipStep2() ? 3 : 2);
            }
        });
    }

    if (step2PrevButton) {
        step2PrevButton.addEventListener('click', function () {
            goToStep(1);
        });
    }

    if (step2NextButton) {
        step2NextButton.addEventListener('click', function () {
            if (validateStep2(true)) {
                goToStep(3);
            }
        });
    }

    if (step3PrevButton) {
        step3PrevButton.addEventListener('click', function () {
            goToStep(shouldSkipStep2() ? 1 : 2);
        });
    }

    leadForm.addEventListener('input', function (event) {
        const target = event.target;
        if (!target || !target.name) {
            return;
        }

        if (target.name === 'npa' && typeof target.value === 'string') {
            target.value = target.value.replace(/[^0-9]/g, '').substring(0, 4);
        }

        if (target.name === 'consent') {
            toggleError('error-consent', false);
            return;
        }

        toggleError('error-' + target.name, false);
        checkAutoAdvanceToStep2();
    });

    leadForm.addEventListener('change', function (event) {
        const target = event.target;
        if (!target || !target.name) {
            return;
        }

        if (target.name === 'consent') {
            toggleError('error-consent', false);
            return;
        }

        toggleError('error-' + target.name, false);
        checkAutoAdvanceToStep2();
    });

    leadForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (currentStep === 1) {
            const step1Valid = validateStep1(true);
            if (!step1Valid) {
                return;
            }
            goToStep(shouldSkipStep2() ? 3 : 2);
            return;
        }

        const step2Valid = validateStep2(true);
        if (!step2Valid) {
            goToStep(2);
            return;
        }

        if (currentStep === 2) {
            goToStep(3);
            return;
        }

        const step3Valid = validateStep3(true);
        if (!step3Valid) {
            return;
        }

        const activeProduct = getActiveProduct();
        const config = getActiveConfig();

        const formData = new FormData(leadForm);
        formData.set('product_type', activeProduct);
        formData.set('form_source', config.formSource);
        formData.set('lpd_agreement', 'oui');

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
                    const emailInput = document.getElementById('email');
                    const phoneInput = document.getElementById('phone');

                    const ecData = {};
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

    const defaultSelectedButton = productOptions.find(function (button) {
        return button.classList.contains('is-selected');
    }) || productOptions[0];

    if (defaultSelectedButton) {
        selectProduct(defaultSelectedButton);
    } else {
        renderProductSpecificFields();
    }

    goToStep(1);
});
