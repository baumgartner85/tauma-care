/**
 * Kontaktformular Handler
 * Sendet Formulardaten per E-Mail
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contact-form');
        
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Button deaktivieren während des Sendens
            submitBtn.disabled = true;
            submitBtn.textContent = 'Wird gesendet...';
            submitBtn.style.opacity = '0.7';

            // Formulardaten sammeln
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || 'Nicht angegeben',
                subject: formData.get('subject') || 'Allgemeine Anfrage',
                preferredDate: formData.get('preferred-date') || 'Nicht angegeben',
                message: formData.get('message')
            };

            // E-Mail-Betreff und Body erstellen
            const emailSubject = encodeURIComponent(`Kontaktanfrage: ${data.subject}`);
            const emailBody = encodeURIComponent(
`Neue Kontaktanfrage über www.trauma-care.at

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${data.name}
E-Mail: ${data.email}
Telefon: ${data.phone}
Betreff: ${data.subject}
Wunschtermin: ${data.preferredDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Nachricht:

${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Nachricht wurde über das Kontaktformular auf www.trauma-care.at gesendet.
`
            );

            // Versuche Web3Forms (kostenloser Service) - Falls Access Key vorhanden
            // Alternativ: Öffne E-Mail-Client
            
            try {
                // Methode 1: Wenn ein API-Endpunkt konfiguriert ist (z.B. Web3Forms, Formspree)
                const API_ENDPOINT = form.dataset.apiEndpoint;
                
                if (API_ENDPOINT) {
                    const response = await fetch(API_ENDPOINT, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            access_key: form.dataset.accessKey,
                            ...data,
                            from_name: 'Trauma Care Website',
                            subject: `Kontaktanfrage: ${data.subject}`
                        })
                    });
                    
                    if (response.ok) {
                        showSuccess(form);
                        return;
                    }
                }
                
                // Fallback: Öffne E-Mail-Client
                window.location.href = `mailto:info@trauma-care.at?subject=${emailSubject}&body=${emailBody}`;
                
                // Zeige Hinweis
                showMailtoHint(form, submitBtn, originalText);
                
            } catch (error) {
                console.error('Formular-Fehler:', error);
                
                // Fallback: Öffne E-Mail-Client
                window.location.href = `mailto:info@trauma-care.at?subject=${emailSubject}&body=${emailBody}`;
                showMailtoHint(form, submitBtn, originalText);
            }
        });
    });

    function showSuccess(form) {
        const container = form.parentElement;
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem 2rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">✅</div>
                <h3 style="color: #0f172a; margin-bottom: 1rem;">Vielen Dank!</h3>
                <p style="color: #64748b; margin-bottom: 2rem;">
                    Ihre Anfrage wurde erfolgreich gesendet.<br>
                    Wir melden uns schnellstmöglich bei Ihnen.
                </p>
                <a href="/" class="btn btn-primary">Zur Startseite</a>
            </div>
        `;
    }

    function showMailtoHint(form, submitBtn, originalText) {
        // Button zurücksetzen
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
        
        // Hinweis anzeigen
        let hint = form.querySelector('.mailto-hint');
        if (!hint) {
            hint = document.createElement('div');
            hint.className = 'mailto-hint';
            hint.style.cssText = `
                background: #e0f2fe;
                border: 1px solid #0284c7;
                border-radius: 0.5rem;
                padding: 1rem;
                margin-top: 1rem;
                font-size: 0.9rem;
                color: #0369a1;
            `;
            hint.innerHTML = `
                <strong>📧 E-Mail-Programm geöffnet</strong><br>
                Bitte senden Sie die vorausgefüllte E-Mail über Ihr E-Mail-Programm ab.<br>
                Oder rufen Sie uns direkt an: <a href="tel:+4365827943013" style="color: #0284c7; font-weight: 600;">+43 6582 794 3013</a>
            `;
            form.appendChild(hint);
        }
    }
})();
