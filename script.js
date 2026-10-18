document.addEventListener('DOMContentLoaded', () => {
    // ============ БУРГЕР-МЕНЮ ============
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('open');
        });
    }

    // ============ МОДАЛЬНОЕ ОКНО ============
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const openModalBtns = document.querySelectorAll('.open-modal');

    if (modalOverlay && modalClose) {
        openModalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modalOverlay.classList.add('active');
                document.body.classList.add('modal-open');
            });
        });
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // ============ ЗАПОМИНАНИЕ ПОЗИЦИИ СКРОЛЛА ============
    // 1. Если мы на главной странице, проверяем, есть ли сохраненная позиция
    const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname === '';
    
    if (isHomePage) {
        const savedScroll = localStorage.getItem('scrollPosition');
        if (savedScroll) {
            const targetElement = document.getElementById(savedScroll);
            if (targetElement) {
                // Плавно скроллим к нужному блоку с небольшой задержкой (чтобы страница прогрузилась)
                setTimeout(() => {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);
            }
            // Очищаем память, чтобы в следующий раз не скроллило туда же
            localStorage.removeItem('scrollPosition');
        }
    }

    // 2. Отслеживаем клики по ссылкам, ведущим на другие страницы
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Если ссылка ведет на отдельную страницу (quiz.html, about.html и т.д.)
            if (href && !href.startsWith('#') && href !== 'index.html' && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
                
                // Находим, какой блок сейчас ближе всего к верху экрана
                const sections = ['quiz', 'about', 'process', 'projects', 'reviews'];
                let closestSection = '';
                let minDistance = Infinity;

                sections.forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        const rect = el.getBoundingClientRect();
                        // Расстояние от верха экрана до блока (берем по модулю, так как блок может быть чуть выше)
                        const distance = Math.abs(rect.top);
                        if (distance < minDistance) {
                            minDistance = distance;
                            closestSection = id;
                        }
                    }
                });

                // Если нашли ближайший блок, сохраняем его ID
                if (closestSection) {
                    localStorage.setItem('scrollPosition', closestSection);
                }
            }
        });
    });
});
