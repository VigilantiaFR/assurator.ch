(function () {
    var gtmLoaded = false;
    var consentPushed = false;

    function getGtmId() {
        if (window.ASSR_GTM_ID) return window.ASSR_GTM_ID;
        var el = document.documentElement;
        if (el && el.getAttribute) {
            var attr = el.getAttribute("data-gtm-id");
            if (attr) return attr;
        }
        return null;
    }

    function ensureGtag() {
        window.dataLayer = window.dataLayer || [];
        if (typeof window.gtag !== "function") {
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
        }
    }

    function pushConsentState(state) {
        ensureGtag();
        window.gtag("consent", "default", {
            ad_storage: "denied",
            analytics_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });
        if (state === "granted") {
            window.gtag("consent", "update", {
                ad_storage: "granted",
                analytics_storage: "granted",
                ad_user_data: "granted",
                ad_personalization: "granted",
            });
        } else {
            window.gtag("consent", "update", {
                ad_storage: "denied",
                analytics_storage: "denied",
                ad_user_data: "denied",
                ad_personalization: "denied",
            });
        }
        consentPushed = true;
    }

    function loadGtm() {
        if (gtmLoaded) return;
        var gtmId = getGtmId();
        if (!gtmId) return;

        gtmLoaded = true;
        ensureGtag();
        window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

        var f = document.getElementsByTagName("script")[0];
        var j = document.createElement("script");
        var dl = "dataLayer" !== "dataLayer" ? "&l=" + "dataLayer" : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + gtmId + dl;
        f.parentNode.insertBefore(j, f);
    }

    function removeGtmScripts() {
        var scripts = document.querySelectorAll('script[src*="googletagmanager.com/gtm.js"]');
        for (var i = 0; i < scripts.length; i += 1) {
            var s = scripts[i];
            if (s && s.parentNode) {
                s.parentNode.removeChild(s);
            }
        }
        if (window.google_tag_manager) {
            try {
                delete window.google_tag_manager;
            } catch (_e) {}
        }
    }

    function hasConsent() {
        if (typeof getTacConsentDecision === "function") {
            return getTacConsentDecision() === true;
        }
        return false;
    }

    function watchConsent() {
        if (!consentPushed) {
            pushConsentState(hasConsent() ? "granted" : "denied");
        }
        if (hasConsent()) {
            loadGtm();
            return;
        } else {
            removeGtmScripts();
        }

        var attempts = 0;
        var timer = window.setInterval(function () {
            attempts += 1;
            if (hasConsent()) {
                pushConsentState("granted");
                loadGtm();
                window.clearInterval(timer);
            } else if (attempts % 4 === 0) {
                pushConsentState("denied");
                removeGtmScripts();
            } else if (attempts >= 120) {
                window.clearInterval(timer);
            }
        }, 500);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", watchConsent);
    } else {
        watchConsent();
    }
})();
