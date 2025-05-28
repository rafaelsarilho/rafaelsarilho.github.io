// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('nav-active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navbar.classList.remove('nav-active');
            menuToggle.classList.remove('active');
        }
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !menuToggle.contains(e.target)) {
        navbar.classList.remove('nav-active');
        menuToggle.classList.remove('active');
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Formulário de contato
const form = document.getElementById('form-lead');
const submitBtn = form.querySelector('.submit-btn');
const successMessage = document.getElementById('form-success');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Animação de loading
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Simular envio (substitua pela sua lógica)
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Mostrar mensagem de sucesso
        successMessage.classList.add('show');
        form.reset();
        
        // Esconder mensagem após 5 segundos
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }, 2000);
});

// Animação de scroll nos cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animação
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.step-card, .plan-card, .info-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(el);
    });
});

// Efeito parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroDecoration = document.querySelector('.hero-decoration');
    
    if (heroDecoration) {
        const rate = scrolled * -0.3;
        heroDecoration.style.transform = `translateY(${rate}px)`;
    }
});

// Validação de formulário
const inputs = form.querySelectorAll('input, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    clearError(e);
    
    if (field.hasAttribute('required') && !value) {
        showError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showError(field, 'Por favor, insira um e-mail válido');
        return false;
    }
    
    return true;
}

function clearError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '';
}

function showError(field, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error)';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.style.borderColor = 'var(--error)';
    field.parentNode.appendChild(errorElement);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contador de caracteres para textarea (opcional)
const textarea = document.getElementById('mensagem');
if (textarea) {
    const maxLength = 500;
    
    const counter = document.createElement('div');
    counter.style.textAlign = 'right';
    counter.style.fontSize = '0.8rem';
    counter.style.color = 'var(--text-secondary)';
    counter.style.marginTop = '0.25rem';
    
    textarea.parentNode.appendChild(counter);
    
    textarea.addEventListener('input', () => {
        const remaining = maxLength - textarea.value.length;
        counter.textContent = `${remaining} caracteres restantes`;
        
        if (remaining < 50) {
            counter.style.color = 'var(--warning)';
        } else if (remaining < 0) {
            counter.style.color = 'var(--error)';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    });
    
    // Trigger inicial
    textarea.dispatchEvent(new Event('input'));
}
