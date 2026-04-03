import React, { createContext, useState, useContext, useCallback } from 'react';
import en from '../translations/en.json';
import fr from '../translations/fr.json';

const translations = { EN: en, FR: fr };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLangState] = useState(() => {
        return localStorage.getItem('mtn_lang') || 'EN';
    });

    const setLang = useCallback((newLang) => {
        setLangState(newLang);
        localStorage.setItem('mtn_lang', newLang);
    }, []);

    // Dot-path lookup: t('nav.home') → translations[lang].nav.home
    const t = useCallback((key) => {
        const keys = key.split('.');
        let value = translations[lang];
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // fallback to key if not found
            }
        }
        return typeof value === 'string' ? value : key;
    }, [lang]);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

export default LanguageContext;
