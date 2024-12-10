document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = header.classList.contains('open');

        document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('open'));
        document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('open'));

        if (!isOpen) {
            header.classList.add('open');
            content.classList.add('open');
        }
    });
});