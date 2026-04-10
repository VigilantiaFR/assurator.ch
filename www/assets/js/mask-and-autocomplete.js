/**
 * Form masking and validation with iMask and libphonenumber-js
 * Handles phone number formatting and NPA/city auto-completion
 */
// Wait a short moment after DOM is loaded to ensure form.js has initialized first
window.addEventListener('load', function() {
    // Check if we're on a page with the form
    if (!document.getElementById('lead-capture-form')) {
        // We're on a page without the form (like conditions-generales.html)
        // Just exit quietly without any error messages
        return;
    }
    // Phone number masking and validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        // Apply mask to phone input
        const phoneMask = IMask(phoneInput, {
            mask: '+41 00 000 00 00',
            lazy: false // Show the format guide
        });

        // Validate phone number on blur
        phoneInput.addEventListener('blur', function(e) {
            const rawValue = phoneMask.unmaskedValue || '';
            // Only validate if there's input
            if (rawValue.length > 0) {
                try {
                    const sanitizedValue = rawValue.replace(/\D/g, '');
                    const formattedNumber = sanitizedValue.startsWith('41') ? `+${sanitizedValue}` : `+41${sanitizedValue}`;

                    let isValid = false;
                    const parser = window.libphonenumber && (libphonenumber.parsePhoneNumberFromString || libphonenumber.parsePhoneNumber);
                    if (parser) {
                        const phoneNumber = parser(formattedNumber, 'CH');
                        if (phoneNumber && typeof phoneNumber.isValid === 'function') {
                            isValid = phoneNumber.isValid();
                        }
                    }

                    // Fallback: basic Swiss number structure +41 followed by 9 digits
                    if (!isValid) {
                        isValid = /^\+41\d{9}$/.test(formattedNumber);
                    }

                    if (!isValid) {
                        e.target.setCustomValidity('Numéro suisse invalide');
                        document.getElementById('error-phone').style.display = 'block';
                    } else {
                        e.target.setCustomValidity('');
                        document.getElementById('error-phone').style.display = 'none';
                    }
                } catch (error) {
                    e.target.setCustomValidity('Numéro de téléphone invalide');
                    document.getElementById('error-phone').style.display = 'block';
                }
            }
        });
    }

    // NPA (postal code) masking and city auto-completion
    const npaInput = document.getElementById('npa');
    const villeInput = document.getElementById('ville') || document.getElementById('locality');
    
    if (npaInput && villeInput) {
        // Utiliser un masque plus simple pour le NPA
        const npaMask = IMask(npaInput, {
            mask: /^[0-9]*$/,
            maxLength: 4,
            prepare: function(str) {
                // Limiter à 4 chiffres
                return str.slice(0, 4);
            }
        });
        
        // Add focus event to ensure cursor is positioned correctly
        npaInput.addEventListener('focus', function() {
            // Small delay to ensure the cursor is positioned after any browser auto-positioning
            setTimeout(() => {
                if (this.value === '') {
                    this.setSelectionRange(0, 0);
                }
            }, 10);
        });

        // Function to fetch city from NPA
        function fetchCityFromNPA(npa) {
            return fetch(`https://api.zippopotam.us/CH/${npa}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('NPA inconnu');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.places && data.places.length > 0) {
                        return data.places[0]['place name']; // Return the first city name
                    } else {
                        throw new Error('Aucune ville trouvée');
                    }
                });
        }

        // Handle NPA input and city auto-completion
        npaInput.addEventListener('input', function() {
            // Only proceed if we have 4 digits
            if (npaMask.unmaskedValue.length === 4) {
                document.getElementById('error-npa').style.display = 'none';
                
                // Fetch city data
                fetchCityFromNPA(npaMask.unmaskedValue)
                    .then(city => {
                        villeInput.value = city;
                        npaInput.setCustomValidity('');
                    })
                    .catch(error => {
                        villeInput.value = '';
                        npaInput.setCustomValidity('NPA invalide ou non reconnu');
                        document.getElementById('error-npa').style.display = 'block';
                        document.getElementById('error-npa').textContent = error.message;
                    });
            } else {
                villeInput.value = '';
            }
        });

        // Validate NPA on blur
        npaInput.addEventListener('blur', function() {
            if (npaMask.unmaskedValue.length > 0 && npaMask.unmaskedValue.length !== 4) {
                npaInput.setCustomValidity('NPA invalide (4 chiffres attendus)');
                document.getElementById('error-npa').style.display = 'block';
            } else if (npaMask.unmaskedValue.length === 0) {
                npaInput.setCustomValidity('');
                document.getElementById('error-npa').style.display = 'none';
            }
        });
    }

    // Handle the exit intent form as well if it exists
    const exitPhoneInput = document.getElementById('exit-phone');
    const exitNpaInput = document.getElementById('exit-npa');
    
    if (exitPhoneInput) {
        // Apply mask to exit phone input
        const exitPhoneMask = IMask(exitPhoneInput, {
            mask: '+41 00 000 00 00',
            lazy: false
        });
    }
    
    if (exitNpaInput) {
        // Apply mask to exit NPA input
        const exitNpaMask = IMask(exitNpaInput, {
            mask: '0000',
            lazy: false
        });
    }
});
