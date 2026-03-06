(function initCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor';

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';

    document.body.appendChild(cursor);
    document.body.appendChild(ring);

    
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animateCursor() {
        cursor.style.left = mx + 'px';
        cursor.style.top  = my + 'px';

        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        ring.style.left = rx + 'px';
        ring.style.top  = ry + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverTargets = 'a, button, .skill-card, .project-card, .contact-method, .filter-btn';
    document.querySelectorAll(hoverTargets).forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        ring.style.opacity = '1';
    });
})();


(function() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
    }, { passive: true });
})();


const curtain = (function() {
    const el = document.createElement('div');
    el.className = 'page-curtain';

    for (let i = 0; i < 5; i++) {
        const panel = document.createElement('div');
        panel.className = 'curtain-panel';
        el.appendChild(panel);
    }
    document.body.appendChild(el);

    function open() {
        el.classList.remove('closing');
        el.classList.add('opening');
        return new Promise(res => setTimeout(res, 600));
    }

    function close() {
        el.classList.remove('opening');
        el.classList.add('closing');
        return new Promise(res => setTimeout(res, 700));
    }

    return { open, close };
})();


(function() {
    const path = window.location.pathname.replace(/\/$/, '');
    const currentPage = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href').replace(/\/$/, '');
        const linkPage = href.split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            a.classList.add('active');
        }
    });

    document.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');

        if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.includes('/topdown-action')) {
            return;
        }

        a.addEventListener('click', async e => {
            e.preventDefault();
            await curtain.close();
            window.location.href = href;
        });
    });

    window.addEventListener('load', () => {
        curtain.open();
    });

    const toggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                toggle.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }
})();


(function() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .fade-in');
    if (!els.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    els.forEach(el => observer.observe(el));
})();


(function() {
    const notice = document.getElementById('privacyNotice');
    const closeBtn = document.getElementById('closeNotice');
    if (!notice || !closeBtn) return;

    if (!localStorage.getItem('privacyNoticeDismissed')) {
        setTimeout(() => notice.classList.add('show'), 1500);
    }

    closeBtn.addEventListener('click', () => {
        notice.classList.remove('show');
        localStorage.setItem('privacyNoticeDismissed', 'true');
    });
})();


function createFloatingParticles(container, count) {
    if (!container) return;
    count = count || 50;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = 2 + Math.random() * 5;

        p.style.cssText = [
            'position:absolute',
            'width:' + size + 'px',
            'height:' + size + 'px',
            'background:rgba(255,255,255,' + (0.15 + Math.random() * 0.5) + ')',
            'border-radius:50%',
            'top:' + Math.random() * 100 + '%',
            'left:' + Math.random() * 100 + '%',
            'pointer-events:none',
            'animation:pf' + i + ' ' + (12 + Math.random() * 18) + 's ease-in-out infinite',
            'animation-delay:-' + Math.random() * 15 + 's'
        ].join(';');

        const mx  = -120 + Math.random() * 240;
        const my  = -120 + Math.random() * 240;
        const mx2 =  -80 + Math.random() * 160;
        const my2 =  -80 + Math.random() * 160;

        const s = document.createElement('style');
        s.textContent = `
            @keyframes pf${i} {
                0%,100% { transform: translate(0, 0); opacity: ${0.2 + Math.random() * 0.4}; }
                33%     { transform: translate(${mx * 0.5}px, ${my * 0.5}px); opacity: ${0.4 + Math.random() * 0.4}; }
                66%     { transform: translate(${mx2}px, ${my2}px); opacity: ${0.2 + Math.random() * 0.3}; }
            }
        `;
        document.head.appendChild(s);
        container.appendChild(p);
    }
}


function typeText(el, texts, speed, pause) {
    if (!el || !texts || !texts.length) return;

    speed = speed || 65;
    pause = pause || 2400;

    let textIndex = 0;
    let charIndex  = 0;
    let deleting   = false;

    function tick() {
        const current = texts[textIndex];

        if (!deleting) {
            el.textContent = current.slice(0, ++charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, pause);
                return;
            }
        } else {
            el.textContent = current.slice(0, --charIndex);
            if (charIndex === 0) {
                deleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }

        setTimeout(tick, deleting ? speed * 0.5 : speed);
    }

    tick();
}


window.EL = {
    createFloatingParticles,
    typeText
};
