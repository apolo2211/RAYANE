/**
 * RAYANE - Éditeur HTML/CSS Innovant
 * Créé par Ouared Seraidi
 * Ksar El Boukhari, Algérie
 * WhatsApp: +213675137284
 */

// Configuration globale
const RAYANE_CONFIG = {
    version: '1.0.0',
    creator: 'Ouared Seraidi',
    location: 'Ksar El Boukhari',
    phone: '+213675137284',
    autoSave: true,
    autoSaveDelay: 1000,
    theme: 'light'
};

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 RAYANE Editor initialized');
    console.log(`👨‍💻 Created by ${RAYANE_CONFIG.creator} from ${RAYANE_CONFIG.location}`);
    console.log(`📱 Contact: ${RAYANE_CONFIG.phone}`);
    
    initializeEditors();
    setupEventListeners();
    loadExample('modern'); // Charger un exemple par défaut
});

function initializeEditors() {
    // Récupérer les éléments
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    
    // Ajouter des numéros de ligne (optionnel)
    if (htmlEditor && cssEditor) {
        addLineNumbers(htmlEditor);
        addLineNumbers(cssEditor);
    }
}

function setupEventListeners() {
    const htmlEditor = document.getElementById('html-editor');
    const cssEditor = document.getElementById('css-editor');
    
    // Mise à jour automatique avec debounce
    let timeout;
    
    [htmlEditor, cssEditor].forEach(editor => {
        if (editor) {
            editor.addEventListener('input', () => {
                updateCharCount(editor.id, editor.value.length);
                
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    updatePreview();
                    showStatus('Mise à jour en cours...');
                }, RAYANE_CONFIG.autoSaveDelay);
            });
        }
    });
}

function updateCharCount(editorId, count) {
    const countElement = document.getElementById(`${editorId.replace('-editor', '-count')}`);
    if (countElement) {
        countElement.textContent = `${count} caractère${count > 1 ? 's' : ''}`;
        
        // Animation du compteur
        countElement.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            countElement.style.animation = '';
        }, 300);
    }
}

function showStatus(message) {
    const statusElement = document.getElementById('update-status');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.style.opacity = '1';
        
        setTimeout(() => {
            statusElement.style.opacity = '0.7';
        }, 2000);
    }
}

function clearEditor(type) {
    if (confirm(`Voulez-vous effacer le contenu ${type.toUpperCase()} ?`)) {
        const editor = document.getElementById(`${type}-editor`);
        if (editor) {
            editor.value = '';
            updateCharCount(`${type}-editor`, 0);
            updatePreview();
            showStatus(`Éditeur ${type.toUpperCase()} effacé`);
        }
    }
}

function copyToClipboard(type) {
    const editor = document.getElementById(`${type}-editor`);
    if (editor) {
        editor.select();
        document.execCommand('copy');
        
        // Feedback visuel
        showStatus(`Code ${type.toUpperCase()} copié !`);
        
        // Animation du bouton
        const button = event.target;
        button.style.transform = 'scale(1.2)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}

function refreshPreview() {
    updatePreview();
    showStatus('Aperçu actualisé');
}

function toggleFullscreen() {
    const preview = document.querySelector('.preview-container');
    if (!document.fullscreenElement) {
        preview.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function exportAsHTML() {
    const html = document.getElementById('html-editor').value;
    const css = document.getElementById('css-editor').value;
    
    const fullHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Export RAYANE</title>
    <style>
        /* CSS créé avec RAYANE */
        /* Par Ouared Seraidi - Ksar El Boukhari */
        ${css}
    </style>
</head>
<body>
    ${html}
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rayane-export-${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    showStatus('Fichier exporté avec succès !');
}

function loadExample(type) {
    const examples = {
        modern: {
            html: `<div class="hero">
    <h1 class="glitch-text">RAYANE</h1>
    <p class="subtitle">L'éditeur qui donne vie à vos idées</p>
    <button class="cta-button">Commencer</button>
</div>

<div class="features">
    <div class="feature-card">
        <div class="icon">🚀</div>
        <h3>Rapide</h3>
        <p>Prévisualisation en temps réel</p>
    </div>
    <div class="feature-card">
        <div class="icon">🎨</div>
        <h3>Cratéif</h3>
        <p>Liberté totale d'expression</p>
    </div>
    <div class="feature-card">
        <div class="icon">🌍</div>
        <h3>Global</h3>
        <p>De Ksar El Boukhari au monde</p>
    </div>
</div>`,
            css: `body {
    margin: 0;
    padding: 40px 20px;
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    color: white;
}

.hero {
    text-align: center;
    padding: 60px 20px;
}

.glitch-text {
    font-size: 4rem;
    margin: 0;
    text-shadow: 2px 2px 0 #ff6b6b, 4px 4px 0 #4ecdc4;
    animation: glitch 3s infinite;
}

@keyframes glitch {
    0%, 100% { transform: translate(0); }
    33% { transform: translate(-2px, 2px); }
    66% { transform: translate(2px, -2px); }
}

.subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin: 20px 0;
}

.cta-button {
    background: white;
    border: none;
    padding: 15px 40px;
    border-radius: 50px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.cta-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
}

.feature-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    border: 1px solid rgba(255,255,255,0.2);
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-10px);
    background: rgba(255,255,255,0.15);
}

.feature-card .icon {
    font-size: 3rem;
    margin-bottom: 15px;
}

.feature-card h3 {
    margin: 10px 0;
    font-size: 1.3rem;
}

.feature-card p {
    opacity: 0.8;
    font-size: 0.95rem;
    margin: 0;
}

@media (max-width: 768px) {
    .glitch-text {
        font-size: 2.5rem;
    }
}`
        },
        algeria: {
            html: `<div class="algeria-container">
    <div class="flag">
        <div class="green"></div>
        <div class="white"></div>
        <div class="red-star">⭐</div>
    </div>
    <h1 class="title">Ksar El Boukhari</h1>
    <p class="description">Perle de la Médéa, là où l'authenticité rencontre la modernité</p>
    <div class="cultural-elements">
        <div class="element">🏺 Patrimoine</div>
        <div class="element">🌿 Nature</div>
        <div class="element">🍵 Thé</div>
        <div class="element">🎵 Chaâbi</div>
    </div>
</div>`,
            css: `body {
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #f5f7fa 0%, #e9eef5 100%);
    font-family: 'Arial', sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.algeria-container {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
    padding: 40px;
    background: rgba(255,255,255,0.9);
    border-radius: 30px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.flag {
    display: flex;
    width: 300px;
    height: 150px;
    margin: 0 auto 30px;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    position: relative;
}

.green {
    flex: 1;
    background: #006233;
}

.white {
    flex: 1;
    background: white;
    position: relative;
}

.red-star {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: #d21034;
    animation: rotate 10s linear infinite;
}

@keyframes rotate {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg); }
}

.title {
    color: #006233;
    font-size: 2.5rem;
    margin: 20px 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.description {
    color: #666;
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 20px 0;
}

.cultural-elements {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-top: 40px;
}

.element {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px;
    border-radius: 15px;
    font-size: 1rem;
    transition: all 0.3s;
    cursor: pointer;
}

.element:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(102,126,234,0.4);
}

@media (max-width: 768px) {
    .cultural-elements {
        grid-template-columns: repeat(2, 1fr);
    }
}`
        },
        animation: {
            html: `<div class="animation-demo">
    <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
    </div>
    <h1 class="animated-title">Bienvenue dans RAYANE</h1>
    <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
</div>`,
            css: `body {
    margin: 0;
    min-height: 100vh;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Arial', sans-serif;
    overflow: hidden;
}

.animation-demo {
    text-align: center;
    position: relative;
    z-index: 1;
}

.floating-shapes {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
}

.shape {
    position: absolute;
    background: rgba(255,255,255,0.2);
    border-radius: 50%;
    animation: float 20s infinite;
}

.shape-1 {
    width: 100px;
    height: 100px;
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.shape-2 {
    width: 150px;
    height: 150px;
    top: 60%;
    right: 15%;
    animation-delay: -5s;
}

.shape-3 {
    width: 80px;
    height: 80px;
    bottom: 20%;
    left: 20%;
    animation-delay: -10s;
}

@keyframes float {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(100px, 100px) rotate(90deg); }
    50% { transform: translate(0, 200px) rotate(180deg); }
    75% { transform: translate(-100px, 100px) rotate(270deg); }
}

.animated-title {
    color: white;
    font-size: 3rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    animation: slideIn 1s ease-out, pulse 2s ease-in-out infinite;
}

@keyframes slideIn {
    from {
        transform: translateY(-100px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.loader {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 50px;
}

.circle {
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.circle:nth-child(1) { animation-delay: -0.32s; }
.circle:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
}`
        }
    };
    
    if (examples[type]) {
        document.getElementById('html-editor').value = examples[type].html;
        document.getElementById('css-editor').value = examples[type].css;
        updateCharCount('html-editor', examples[type].html.length);
        updateCharCount('css-editor', examples[type].css.length);
        updatePreview();
        showStatus(`Exemple "${type}" chargé !`);
    }
}

// Export global
window.RAYANE = {
    config: RAYANE_CONFIG,
    version: '1.0.0',
    creator: 'Ouared Seraidi',
    location: 'Ksar El Boukhari',
    contact: '+213675137284'
};