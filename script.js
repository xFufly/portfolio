// Modern Portfolio JavaScript

class Portfolio {
    constructor() {
        this.currentLang = 'fr';
        this.currentTheme = 'light';
        this.init();
    }

    // Translations
    translations = {
        fr: {
            name: "Tim DIDELOT",
            subtitle: "Data Analyst • Étudiant BUT Informatique",
            location: "📍 Tarnos • IUT Anglet",
            "status-text": "Disponible pour des projets",
            "hero-description": "Passionné d'informatique depuis l'enfance, je mêle développement et analyse de données pour transformer les idées en produits utiles. Musicien amateur (batterie, piano, basse) — amoureux du jazz.",
            "nav-brand": "xFufly",
            "nav-about": "À propos",
            "nav-experience": "Expérience",
            "nav-projects": "Projets",
            "nav-skills": "Compétences",
            "nav-contact": "Contact",
            "cta-projects": "Voir mes projets",
            "cta-contact": "Me contacter",
            "experience-title": "Expérience",
            "exp-current": "Septembre 2025 - Présent",
            "role-analyst": "Data Analyst",
            "exp-warehouse": "Gestion des entrepôts de données et migrations de bases de données",
            "exp-dashboards": "Création de tableaux de bord pour tous les départements avec Metabase",
            "exp-freelance-date": "2017 - Présent",
            "freelance-title": "Développeur Freelance",
            "exp-websites": "Développement de sites web, mods Minecraft, applications pour associations",
            "exp-neuraflow": "Création de la bibliothèque NodeJS NeuraFlow pour les réseaux de neurones",
            "exp-clients": "Collaboration avec des clients (associations et PME)",
            "exp-president-date": "Sept. 2022 - Juin 2024",
            "exp-festival": "Printemps de la Musique, La Réole",
            "role-president": "Président & Membre du conseil",
            "exp-organization": "Organisation de deux festivals annuels et plusieurs concerts",
            "exp-management": "Gestion de projet et compétences en communication",
            "skills-title": "Compétences",
            "programming-title": "Programmation",
            "web-data-title": "Web & Data",
            "soft-skills-title": "Compétences transversales",
            "education-title": "Formation",
            "edu-current": "2024 - Présent",
            "edu-but": "BUT Informatique",
            "edu-courses": "Programmation (C++ & Python), Bases de données (SQL), Réseaux, Systèmes (Bash), Web (HTML, CSS)",
            "edu-ranking": "3ème sur 60 étudiants en première année, actuellement en deuxième année",
            "edu-bac-date": "2021 - 2024",
            "edu-bac": "Baccalauréat Général",
            "edu-specializations": "Spécialités : Informatique, Anglais, Mathématiques",
            "projects-title": "Projets principaux",
            "storyforge-desc": "Logiciel de création et d'édition de User Stories en SCRUM.",
            "predictionai-desc": "Système IA léger basé sur la bibliothèque NeuraFlow.",
            "neuraflow-desc": "Bibliothèque JavaScript pour le Machine Learning.",
            "fossnote-desc": "PRONOTE auto-hébergé open source et gratuit.",
            "contact-title": "Contact",
            "contact-description": "Intéressé par mon profil ? N'hésitez pas à me contacter !",
            "footer-text": "© 2025 Tim DIDELOT. Tous droits réservés.",
            "skill-sqlbdd": "SQL & Bases de données",
            "skill-git": "Git & Contrôle de version",

            "skill-pm": "Gestion de projet",
            "skill-team": "Travail en équipe",
            "skill-com": "Communication client",
            "skill-details": "Attention aux détails",
            "skill-engage": "Engagement",
        },
        en: {
            name: "Tim DIDELOT",
            subtitle: "Data Analyst • Computer Science Student",
            location: "📍 Tarnos • University Institute of Technology of Bayonne and the Basque Country",
            "status-text": "Available for projects",
            "hero-description": "I've loved computing since I was a kid. I combine software development and data analysis to build useful tools. Amateur musician (drums, piano, bass) and jazz fan.",
            "nav-brand": "xFufly",
            "nav-about": "About",
            "nav-experience": "Experience",
            "nav-projects": "Projects",
            "nav-skills": "Skills",
            "nav-contact": "Contact",
            "cta-projects": "View my projects",
            "cta-contact": "Contact me",
            "experience-title": "Experience",
            "exp-current": "September 2025 - Present",
            "role-analyst": "Data Analyst",
            "exp-warehouse": "Data warehouse management and database migrations",
            "exp-dashboards": "Creating dashboards for all company departments using Metabase",
            "exp-freelance-date": "2017 - Present",
            "freelance-title": "Freelance Developer",
            "exp-websites": "Developed websites, Minecraft mods, applications for associations",
            "exp-neuraflow": "Created NodeJS library NeuraFlow for neural networks",
            "exp-clients": "Collaborated with clients (associations and SMEs)",
            "exp-president-date": "Sept. 2022 - June 2024",
            "exp-festival": "Printemps de la Musique, La Réole",
            "role-president": "President & Board Member",
            "exp-organization": "Organized two annual festivals and several concerts",
            "exp-management": "Project management and communication skills",
            "skills-title": "Skills",
            "programming-title": "Programming",
            "web-data-title": "Web & Data",
            "soft-skills-title": "Soft Skills",
            "education-title": "Education",
            "edu-current": "2024 - Present",
            "edu-but": "Bachelor of Technology in Computer Science",
            "edu-courses": "Programming (C++ & Python), Databases (SQL), Networks, Systems (Bash), Web (HTML, CSS)",
            "edu-ranking": "Ranked 3rd out of 60 students in first year, currently in second year",
            "edu-bac-date": "2021 - 2024",
            "edu-bac": "General Baccalaureate",
            "edu-specializations": "Specializations: Computer Science, English, Mathematics",
            "projects-title": "Main Projects",
            "storyforge-desc": "Software for creating and editing User Stories in SCRUM.",
            "predictionai-desc": "Lightweight AI system based on the NeuraFlow library.",
            "neuraflow-desc": "JavaScript library for Machine Learning.",
            "fossnote-desc": "Self-hosted, open source and free PRONOTE alternative.",
            "contact-title": "Contact",
            "contact-description": "Interested in my profile? Feel free to contact me!",
            "footer-text": "© 2025 Tim DIDELOT. All rights reserved.",
            "skill-sqlbdd": "SQL & Database",
            "skill-git": "Git & Versioning",

            "skill-pm": "Project management",
            "skill-team": "Teamwork",
            "skill-com": "Communication with clients",
            "skill-details": "Attentive to details ",
            "skill-engage": "Commitment",
        }
    };

    init() {
        this.setupTheme();
        this.setupLanguage();
        this.setupScrollAnimations();
        this.setupSmoothScrolling();
        this.setupSkillBars();
        this.setupEventListeners();
        this.loadPreferences();
    }

    // Theme Management
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Update theme icon
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
        
        // Save preference
        localStorage.setItem('theme', this.currentTheme);
    }

    // Language Management
    setupLanguage() {
        // Set initial language
        this.setLang(this.currentLang);
    }

    setLang(lang) {
        this.currentLang = lang;
        
        // Update all translatable elements
        for (const key in this.translations[lang]) {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = this.translations[lang][key];
            }
        }
        
        // Update active language button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Save preference
        localStorage.setItem('language', lang);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all sections
        document.querySelectorAll('section, .project-card, .skill-category').forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = target.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillLevel = entry.target.querySelector('.skill-level');
                    const level = skillLevel.dataset.level;
                    skillLevel.style.setProperty('--level', level + '%');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-item').forEach(skill => {
            skillObserver.observe(skill);
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Navbar scroll effect
        let lastScrollTop = 0;
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove background based on scroll
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(var(--bg-primary-rgb, 255, 255, 255), 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'var(--bg-primary)';
                navbar.style.boxShadow = 'none';
            }
            
            lastScrollTop = scrollTop;
        });

        // Global keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or menus
                this.closeAllModals();
            }
        });
    }

    closeAllModals() {
        // Implementation for closing modals/dropdowns
        console.log('Closing all modals');
    }

    // Load user preferences
    loadPreferences() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        const savedLang = localStorage.getItem('language') || 'fr';
        
        this.currentTheme = savedTheme;
        this.currentLang = savedLang;
        
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        }
        
        // Apply saved language
        this.setLang(this.currentLang);
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
});

// Global functions for backward compatibility
function setLang(lang) {
    if (window.portfolio) {
        window.portfolio.setLang(lang);
    }
}

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical resources
        const criticalImages = document.querySelectorAll('img[loading="lazy"]');
        criticalImages.forEach(img => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        img.src = img.dataset.src || img.src;
                        observer.unobserve(img);
                    }
                });
            });
            observer.observe(img);
        });
    });
}