const toggleButton = document.getElementById('toggleTheme');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('pink-theme');
    toggleButton.textContent = document.body.classList.contains('pink-theme') 
        ? 'Désactiver le thème rose' 
        : 'Activer le thème rose';
});