const html = document.documentElement;
const btnToggle = document.getElementById('theme-toggle');
const btnReset = document.getElementById('theme-reset');
const statusText = id => document.getElementById(id);

function updateStatus(hour) {
    const el = statusText('time-status');
    if (el) el.innerText = `Horário detectado: ${hour}h - Modo ${hour >= 18 || hour < 6 ? 'Noite' : 'Dia'}`;
}

function aplicarTema() {
    const manual = localStorage.getItem('theme-preference');
    const hour = new Date().getHours();
    
    if (manual) {
        manual === 'dark' ? html.setAttribute('data-theme', 'dark') : html.removeAttribute('data-theme');
    } else {
        if (hour >= 18 || hour < 6) {
            html.setAttribute('data-theme', 'dark');
        } else {
            html.removeAttribute('data-theme');
        }
    }
    updateStatus(hour);
}

btnToggle.addEventListener('click', () => {
    const isDark = html.hasAttribute('data-theme');
    if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme-preference', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme-preference', 'dark');
    }
});

btnReset.addEventListener('click', () => {
    localStorage.removeItem('theme-preference');
    aplicarTema();
});

// Inicializa imediatamente
aplicarTema();

// Verifica a cada 60 segundos
setInterval(aplicarTema, 60000);

// Função para observar o scroll e revelar elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 }); // Ativa quando 10% do elemento estiver visível

// Seleciona todos os elementos com a classe .reveal e começa a observar
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));