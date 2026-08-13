(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const portfolioFiles = new Set([
    'case-study-education-operations-automation.html',
    'case-study-hospitality-automation.html',
    'concept-ai-lead-engine.html',
    'concept-multilocation-service-operations.html',
    'concept-ecommerce-ai-support-operations.html',
    'concept-recruitment-onboarding-automation.html',
    'concept-self-hosted-ai-knowledge-operations.html'
  ]);
  const currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  if (portfolioFiles.has(currentFile) && !document.querySelector('link[href="portfolio-pages.css"]')) {
    const detailStyles = document.createElement('link');
    detailStyles.rel = 'stylesheet';
    detailStyles.href = 'portfolio-pages.css';
    document.head.appendChild(detailStyles);
  }

  const previewData = {
    'case-study-hospitality-automation.html': {
      title: 'Reservation-to-Operations Control View',
      subtitle: 'Sample hospitality automation dashboard',
      stages: [['Reservation Event','PMS · form · schedule'],['Identity Match','Reservation ID + fallback'],['Context Check','Property + open issues'],['Operational Action','Message · turnover · task'],['Exception Queue','Blocked or unclear cases']],
      metrics: [['Active stays','38','Current operating context'],['Matches cleared','96%','High-confidence links'],['Manual review','4','Requires confirmation']]
    },
    'concept-ai-lead-engine.html': {
      title: 'AI Lead & CRM Revenue Control View',
      subtitle: 'Sample sales automation dashboard',
      stages: [['Lead Intake','Ads · forms · chat'],['Identity','Normalize + dedupe'],['AI Qualification','Intent + evidence'],['CRM Pipeline','Owner + stage + SLA'],['Revenue Handoff','Follow-up + operations']],
      metrics: [['New leads','124','Multi-source intake'],['Qualified','41','Priority sales queue'],['SLA risk','6','Follow-up exceptions']]
    },
    'concept-multilocation-service-operations.html': {
      title: 'Multi-Location Service Command Center',
      subtitle: 'Sample service operations dashboard',
      stages: [['CRM','Customer + service'],['Routing','Branch + geography'],['Work Order','ClickUp operational record'],['Field Delivery','Schedule + status'],['Control Tower','SLA + exceptions + reports']],
      metrics: [['Open work orders','76','Across branches'],['On-time','93%','Current delivery'],['Exceptions','8','Operator review queue']]
    },
    'concept-ecommerce-ai-support-operations.html': {
      title: 'E-Commerce AI Support Operations',
      subtitle: 'Sample support and order dashboard',
      stages: [['Support Inbox','Email · chat · ticket'],['AI Triage','Intent + urgency'],['Order Context','Order + shipment'],['Policy Gate','Risk + authorization'],['Resolve / Escalate','Action + audit log']],
      metrics: [['Tickets today','1,268','Unified queue'],['AI assisted','68%','Low-risk cases'],['Human review','32%','Sensitive actions']]
    },
    'concept-recruitment-onboarding-automation.html': {
      title: 'Recruitment & Onboarding Control View',
      subtitle: 'Sample people operations dashboard',
      stages: [['Application','Form · email · job board'],['AI Assist','Resume evidence'],['Interview','Calendar + evaluation'],['Decision','Human approval'],['Onboarding','Docs + tasks + access']],
      metrics: [['Active candidates','47','Across open roles'],['Interviews','12','This week'],['Onboarding','5','New hires in progress']]
    },
    'concept-self-hosted-ai-knowledge-operations.html': {
      title: 'Self-Hosted AI Operations Console',
      subtitle: 'Sample private AI dashboard',
      stages: [['User / Workflow','Question or business event'],['Permission Gate','Role + source access'],['RAG Retrieval','Approved context'],['Local Model','Private inference'],['Tool / Approval','Controlled action']],
      metrics: [['Knowledge sources','12','Permission-aware retrieval'],['Pending approvals','2','Sensitive actions held'],['Audit coverage','100%','Sources + tools logged']]
    }
  };

  if (previewData[currentFile] && !document.querySelector('.portfolio-preview-section')) {
    const data = previewData[currentFile];
    const section = document.createElement('section');
    section.className = 'portfolio-preview-section sample-screenshot';
    section.innerHTML = `<div class="shell"><div class="system-mockup reveal"><div class="mock-toolbar"><strong>${data.title}</strong><span>${data.subtitle}</span></div><div class="mock-flow">${data.stages.map((stage,index)=>`${index?'<div class="mock-arrow">→</div>':''}<div class="mock-node"><b>${stage[0]}</b><span>${stage[1]}</span></div>`).join('')}</div><div class="mock-main"><div class="mock-metrics">${data.metrics.map(metric=>`<div class="mock-card"><b>${metric[0]}</b><strong>${metric[1]}</strong><p>${metric[2]}</p></div>`).join('')}</div></div></div><p class="mock-caption"><strong>Sample system screenshot:</strong> portfolio visualization of the architecture; identifying data is intentionally omitted.</p></div>`;
    const detailHero = document.querySelector('main > .hero');
    if (detailHero) detailHero.insertAdjacentElement('afterend', section);
  }

  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  const revealTargets = [...document.querySelectorAll('.reveal')];

  if (!reduceMotion && 'IntersectionObserver' in window) {
    revealTargets.forEach((el, index) => {
      el.classList.add('particle-ready');
      el.style.transitionDelay = `${Math.min((index % 4) * 45, 135)}ms`;
    });

    const burstParticles = el => {
      if (el.dataset.particlesPlayed === '1') return;
      el.dataset.particlesPlayed = '1';

      const layer = document.createElement('span');
      layer.className = 'build-particles';
      layer.setAttribute('aria-hidden', 'true');

      const colors = ['#7c3aed', '#60a5fa', '#22d3ee', '#a78bfa'];
      const count = el.classList.contains('callout') ? 26 : 16;

      for (let i = 0; i < count; i++) {
        const particle = document.createElement('i');
        particle.className = 'build-particle';
        const edgeBias = Math.random();
        let left = Math.random() * 100;
        let top = Math.random() * 100;

        if (edgeBias < .45) {
          const edge = Math.floor(Math.random() * 4);
          if (edge === 0) top = Math.random() * 12;
          if (edge === 1) left = 88 + Math.random() * 12;
          if (edge === 2) top = 88 + Math.random() * 12;
          if (edge === 3) left = Math.random() * 12;
        }

        const dx = (Math.random() - .5) * 150;
        const dy = (Math.random() - .5) * 110;
        const size = 2 + Math.random() * 3.2;

        particle.style.setProperty('--left', `${left}%`);
        particle.style.setProperty('--top', `${top}%`);
        particle.style.setProperty('--dx', `${dx}px`);
        particle.style.setProperty('--dy', `${dy}px`);
        particle.style.setProperty('--size', `${size}px`);
        particle.style.setProperty('--delay', `${Math.random() * 180}ms`);
        particle.style.setProperty('--duration', `${720 + Math.random() * 420}ms`);
        particle.style.setProperty('--particle-color', colors[i % colors.length]);
        layer.appendChild(particle);
      }

      el.appendChild(layer);
      window.setTimeout(() => layer.remove(), 1500);
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        burstParticles(el);
        requestAnimationFrame(() => el.classList.add('particle-visible', 'visible'));
        observer.unobserve(el);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('particle-visible', 'visible'));
  }

  const hero = document.querySelector('.hero-visual');
  const orbitNodes = hero ? ['.n1', '.n2', '.n3', '.n4'].map(sel => hero.querySelector(sel)).filter(Boolean) : [];

  if (hero && orbitNodes.length && !reduceMotion) {
    let rafId = null;
    let paused = false;
    const speed = .00022;

    const setOrbitBase = () => {
      orbitNodes.forEach(node => {
        node.style.top = '0';
        node.style.left = '0';
        node.style.right = 'auto';
        node.style.bottom = 'auto';
      });
    };

    const drawOrbit = time => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.width * .53;
      const cy = rect.height * .51;
      const rx = Math.min(rect.width * .39, 178);
      const ry = Math.min(rect.height * .34, 146);

      orbitNodes.forEach((node, i) => {
        const angle = time * speed + i * (Math.PI * 2 / orbitNodes.length) - Math.PI / 2;
        const x = cx + Math.cos(angle) * rx;
        const y = cy + Math.sin(angle) * ry;
        const depth = (Math.sin(angle) + 1) / 2;
        node.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${.94 + depth * .08})`;
        node.style.opacity = `${.74 + depth * .26}`;
        node.style.zIndex = `${4 + Math.round(depth * 2)}`;
      });

      if (!paused) rafId = requestAnimationFrame(drawOrbit);
    };

    setOrbitBase();
    rafId = requestAnimationFrame(drawOrbit);

    hero.addEventListener('mouseenter', () => {
      paused = true;
      if (rafId) cancelAnimationFrame(rafId);
    });
    hero.addEventListener('mouseleave', () => {
      if (!paused) return;
      paused = false;
      rafId = requestAnimationFrame(drawOrbit);
    });
    window.addEventListener('resize', setOrbitBase, { passive: true });
  }
})();
