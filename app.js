(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const bookingUrl = 'https://calendly.com/jkevinmortola/new-meeting';

  const detailPages = new Set([
    'case-study-education-operations-automation.html',
    'case-study-hospitality-automation.html',
    'concept-ai-lead-engine.html',
    'concept-multilocation-service-operations.html',
    'concept-ecommerce-ai-support-operations.html',
    'concept-recruitment-onboarding-automation.html',
    'concept-self-hosted-ai-knowledge-operations.html'
  ]);

  const enhancedPages = new Set([
    'index.html','case-studies.html','crm-automation-consultant.html','n8n-automation-consultant.html',
    'ai-automation-consultant.html','agentic-ai-automation.html','thankyou.html', ...detailPages
  ]);

  const addStylesheet = href => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  if (detailPages.has(currentFile)) addStylesheet('portfolio-pages.css');
  if (enhancedPages.has(currentFile)) addStylesheet('portfolio-enhancements.css');

  const configs = {
    'case-study-education-operations-automation.html': ['Selected Work · Education Operations','education'],
    'case-study-hospitality-automation.html': ['Selected Work · Hospitality Operations','hospitality'],
    'concept-ai-lead-engine.html': ['AI Systems · Revenue Operations','revenue'],
    'concept-multilocation-service-operations.html': ['Automation Systems · Service Operations','service'],
    'concept-ecommerce-ai-support-operations.html': ['AI Systems · Customer Operations','support'],
    'concept-recruitment-onboarding-automation.html': ['Automation Systems · People Operations','people'],
    'concept-self-hosted-ai-knowledge-operations.html': ['AI Systems · Private AI','private']
  };

  const config = configs[currentFile];
  if (config) {
    document.querySelectorAll('.demo-banner').forEach(el => el.remove());
    const hero = document.querySelector('main > .hero');
    const eyebrow = hero?.querySelector('.eyebrow');
    if (eyebrow) eyebrow.textContent = config[0];

    const preview = document.querySelector('.portfolio-preview-section');
    if (preview) preview.querySelector('.system-mockup')?.classList.add(`visual-${config[1]}`);

    if (currentFile === 'concept-multilocation-service-operations.html' && !preview && hero) {
      const section = document.createElement('section');
      section.className = 'portfolio-preview-section';
      section.innerHTML = `<div class="shell"><div class="system-mockup visual-service reveal"><div class="mock-toolbar"><strong>Multi-Location Service Command Center</strong><span>Service operations system view</span></div><div class="mock-flow"><div class="mock-node"><b>CRM</b><span>Customer · service</span></div><div class="mock-arrow">→</div><div class="mock-node"><b>Routing</b><span>Branch · geography · capacity</span></div><div class="mock-arrow">→</div><div class="mock-node"><b>Work Order</b><span>Operational record</span></div><div class="mock-arrow">→</div><div class="mock-node"><b>Field Delivery</b><span>Schedule · status</span></div><div class="mock-arrow">→</div><div class="mock-node"><b>Control Tower</b><span>SLA · exceptions · reports</span></div></div><div class="mock-main"><div class="mock-metrics"><div class="mock-card"><b>Work orders</b><strong>Centralized</strong><p>Shared operating states</p></div><div class="mock-card"><b>Routing</b><strong>Branch-aware</strong><p>Rules before assignment</p></div><div class="mock-card"><b>Exceptions</b><strong>Visible</strong><p>Operator review queue</p></div></div></div></div><p class="mock-caption"><strong>System view:</strong> interface reconstruction showing the workflow architecture and controls.</p></div>`;
      hero.insertAdjacentElement('afterend', section);
    }
  }

  document.querySelectorAll('.nav-links a[href="case-studies.html"]').forEach(link => {
    link.textContent = link.textContent.trim().startsWith('←') ? '← Portfolio' : 'Portfolio';
  });

  document.querySelectorAll('.nav-links .btn-primary').forEach(link => {
    if (link.href.startsWith('mailto:') || link.classList.contains('booking-btn')) {
      link.href = bookingUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Book a discovery call';
    }
  });

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const revealTargets = [...document.querySelectorAll('.reveal')];
  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach((el,index) => {
      el.classList.add('particle-ready');
      el.style.transitionDelay = `${Math.min((index % 4) * 45,135)}ms`;
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() => entry.target.classList.add('particle-visible','visible'));
        observer.unobserve(entry.target);
      });
    }, {threshold:.08,rootMargin:'0px 0px -4% 0px'});
    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('particle-visible','visible'));
  }

  const heroVisual = document.querySelector('.hero-visual');
  const orbitNodes = heroVisual ? ['.n1','.n2','.n3','.n4'].map(sel => heroVisual.querySelector(sel)).filter(Boolean) : [];
  if (heroVisual && orbitNodes.length && !reduceMotion) {
    let rafId = null;
    let paused = false;
    const speed = .00022;
    const setOrbitBase = () => orbitNodes.forEach(node => {
      node.style.top = '0'; node.style.left = '0'; node.style.right = 'auto'; node.style.bottom = 'auto';
    });
    const drawOrbit = time => {
      const rect = heroVisual.getBoundingClientRect();
      const cx = rect.width * .53, cy = rect.height * .51;
      const rx = Math.min(rect.width * .39,178), ry = Math.min(rect.height * .34,146);
      orbitNodes.forEach((node,i) => {
        const angle = time * speed + i * (Math.PI * 2 / orbitNodes.length) - Math.PI / 2;
        const x = cx + Math.cos(angle) * rx, y = cy + Math.sin(angle) * ry;
        const depth = (Math.sin(angle)+1)/2;
        node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${.94 + depth * .08})`;
        node.style.opacity = `${.74 + depth * .26}`;
        node.style.zIndex = `${4 + Math.round(depth * 2)}`;
      });
      if (!paused) rafId = requestAnimationFrame(drawOrbit);
    };
    setOrbitBase();
    rafId = requestAnimationFrame(drawOrbit);
    heroVisual.addEventListener('mouseenter',() => {paused=true;if(rafId) cancelAnimationFrame(rafId);});
    heroVisual.addEventListener('mouseleave',() => {if(!paused)return;paused=false;rafId=requestAnimationFrame(drawOrbit);});
  }
})();