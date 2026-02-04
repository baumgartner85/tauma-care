/**
 * Simple Client-Side Internationalization (I18n)
 * Automatically detects browser language and swaps text.
 */

document.addEventListener('DOMContentLoaded', () => {
    initI18n();
});

async function initI18n() {
    // 1. Detect Language
    // Check localStorage first, then browser settings
    let lang = localStorage.getItem('trauma-care-lang');

    if (!lang) {
        // Get browser language (e.g., "en-US" -> "en")
        const browserLang = navigator.language || navigator.userLanguage;
        lang = browserLang.startsWith('de') ? 'de' : 'en';
    }

    // Default to German if something weird happens, but we support DE and EN.
    if (lang !== 'de' && lang !== 'en') {
        lang = 'en'; // Default fallback for non-German speakers is English
    }

    // If it's German, we might not need to do anything if the static HTML is already German,
    // BUT for consistency and ability to switch back and forth, we should load it too 
    // OR just rely on the static text. 
    // To be safe and allow switching, we will load the JSON.

    console.log(`🌍 Initializing Language: ${lang}`);
    document.documentElement.lang = lang;

    try {
        await loadLanguage(lang);
    } catch (e) {
        console.error("Failed to load language:", e);
    }
}

async function loadLanguage(lang) {
    try {
        // Absolute path to ensure it works from any sub-path
        const response = await fetch(`assets/i18n/${lang}.json`);

        if (!response.ok) {
            throw new Error(`File not found: ${lang}.json`);
        }

        const translations = await response.json();
        applyTranslations(translations);

        // Save preference
        localStorage.setItem('trauma-care-lang', lang);
    } catch (e) {
        console.error("Language load error:", e);
        alert("Fehler beim Laden der Sprache: " + e.message);
    }
}

function applyTranslations(translations) {
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);

        if (value) {
            // Check if element is an input with placeholder
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = value;
            } else {
                el.innerHTML = value; // Use innerHTML to allow <br> tags
            }
        } else {
            console.warn(`Missing translation for key: ${key}`);
        }
    });

    // Handle select options separately? 
    // Actually, for selects, we can put data-i18n on the <option> tag.
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj);
}

// Function to manually switch language (can be called from console or UI)
window.setLanguage = async (lang) => {
    if (lang === 'de' || lang === 'en') {
        await loadLanguage(lang);
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
};

window.toggleLanguage = () => {
    const current = localStorage.getItem('trauma-care-lang') || 'de';
    const next = current === 'de' ? 'en' : 'de';
    window.setLanguage(next);
};
