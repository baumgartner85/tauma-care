/**
 * DSGVO-konformes Cookie Banner
 * Zeigt einen Cookie-Hinweis beim ersten Besuch
 */

(function() {
    const COOKIE_NAME = 'trauma-care-cookies-accepted';
    const COOKIE_DURATION = 365; // Tage

    // Prüfen ob bereits akzeptiert
    function hasAcceptedCookies() {
        return document.cookie.split(';').some(c => c.trim().startsWith(COOKIE_NAME + '='));
    }

    // Cookie setzen
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
    }

    // Banner erstellen
    function createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <div class="cookie-text">
                    <span class="cookie-icon">🍪</span>
                    <div>
                        <strong>Diese Website verwendet Cookies</strong>
                        <p>Wir nutzen technisch notwendige Cookies für Spracheinstellungen. 
                        <a href="/datenschutz.html">Mehr erfahren</a></p>
                    </div>
                </div>
                <div class="cookie-buttons">
                    <button id="cookie-accept" class="cookie-btn cookie-btn-primary">Akzeptieren</button>
                    <button id="cookie-decline" class="cookie-btn cookie-btn-secondary">Nur notwendige</button>
                </div>
            </div>
        `;
        document.body.appendChild(banner);

        // Event Listener
        document.getElementById('cookie-accept').addEventListener('click', () => {
            setCookie(COOKIE_NAME, 'all', COOKIE_DURATION);
            hideBanner();
        });

        document.getElementById('cookie-decline').addEventListener('click', () => {
            setCookie(COOKIE_NAME, 'necessary', COOKIE_DURATION);
            hideBanner();
        });
    }

    // Banner ausblenden
    function hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.add('cookie-banner-hidden');
            setTimeout(() => banner.remove(), 300);
        }
    }

    // Styles hinzufügen
    function addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #cookie-banner {
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                background: #0f172a;
                color: white;
                padding: 1rem 1.5rem;
                z-index: 9999;
                box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
                animation: slideUp 0.3s ease-out;
            }

            @keyframes slideUp {
                from {
                    transform: translateY(100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            #cookie-banner.cookie-banner-hidden {
                transform: translateY(100%);
                opacity: 0;
                transition: all 0.3s ease-out;
            }

            .cookie-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1.5rem;
                flex-wrap: wrap;
            }

            .cookie-text {
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                flex: 1;
                min-width: 280px;
            }

            .cookie-icon {
                font-size: 2rem;
                line-height: 1;
            }

            .cookie-text strong {
                display: block;
                margin-bottom: 0.25rem;
                font-size: 1rem;
            }

            .cookie-text p {
                font-size: 0.875rem;
                color: #94a3b8;
                margin: 0;
                line-height: 1.5;
            }

            .cookie-text a {
                color: #38bdf8;
                text-decoration: none;
            }

            .cookie-text a:hover {
                text-decoration: underline;
            }

            .cookie-buttons {
                display: flex;
                gap: 0.75rem;
                flex-shrink: 0;
            }

            .cookie-btn {
                padding: 0.625rem 1.25rem;
                border-radius: 9999px;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                border: none;
                transition: all 0.2s;
                font-family: inherit;
            }

            .cookie-btn-primary {
                background: #0284c7;
                color: white;
            }

            .cookie-btn-primary:hover {
                background: #0369a1;
            }

            .cookie-btn-secondary {
                background: transparent;
                color: #94a3b8;
                border: 1px solid #334155;
            }

            .cookie-btn-secondary:hover {
                background: #1e293b;
                color: white;
            }

            @media (max-width: 640px) {
                #cookie-banner {
                    padding: 1rem;
                }
                
                .cookie-content {
                    flex-direction: column;
                    text-align: center;
                }

                .cookie-text {
                    flex-direction: column;
                    align-items: center;
                }

                .cookie-buttons {
                    width: 100%;
                    justify-content: center;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialisierung
    function init() {
        if (!hasAcceptedCookies()) {
            addStyles();
            // Kurze Verzögerung für bessere UX
            setTimeout(createBanner, 1000);
        }
    }

    // Starten wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
