(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const currentFile = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  const bookingUrl = 'https://calendly.com/jkevinmortola/new-meeting';

  const portfolioFiles = new Set([
    'case-study-education-operations-automation.html',
    'case-study-hospitality-automation.html',
    'concept-ai-lead-engine.html',
    'concept-multilocation-service-operations.html',
    'concept-ecommerce-ai-support-operations.html',
    'concept-recruitment-onboarding-automation.html',
    'concept-self-hosted-ai-knowledge-operations.html'
  ]);

  const addStylesheet = href => {
    if (document.querySelector(`link[href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  };

  if (portfolioFiles.has(currentFile)) addStylesheet('portfolio-pages.css');
  if (portfolioFiles.has(currentFile) || currentFile === 'index.html' || currentFile === 'case-studies.html') {
    addStylesheet('portfolio-enhancements.css');
  }

  const configs = {
    'case-study-education-operations-automation.html': {
      eyebrow: 'Selected Work · Education Operations',
      title: 'Education Operations <span class="gradient-text">Control System.</span>',
      pageTitle: 'Education Operations Control System | Jan Kevin Mortola',
      visual: 'education',
      ownershipLabel: 'What I owned',
      ownershipNote: 'Architecture and automation work across the connected operations model.',
      ownership: ['ClickUp architecture','Data relationships','Custom fields & states','n8n workflow logic','Validation & duplicate prevention','Exception handling','Testing & documentation'],
      cta: 'Need a ClickUp operating system like this?'
    },
    'case-study-hospitality-automation.html': {
      eyebrow: 'Selected Work · Hospitality Operations',
      title: 'Reservation Operations <span class="gradient-text">Engine.</span>',
      pageTitle: 'Reservation Operations Engine | Jan Kevin Mortola',
      visual: 'hospitality',
      ownershipLabel: 'What I owned',
      ownershipNote: 'Operations design and workflow automation around reservation and property context.',
      ownership: ['Operations design','Reservation workflow logic','Data reconciliation','Exception routing','Automation design','Documentation','Team handoff'],
      cta: 'Need reservation data to drive operations automatically?'
    },
    'concept-ai-lead-engine.html': {
      eyebrow: 'AI Systems · Revenue Operations',
      title: 'AI Revenue & Lead <span class="gradient-text">Routing System.</span>',
      pageTitle: 'AI Revenue & Lead Routing System | Jan Kevin Mortola',
      visual: 'revenue',
      ownershipLabel: 'System responsibilities',
      ownershipNote: 'End-to-end architecture, routing logic and control design for the system.',
      ownership: ['Lead architecture','Identity & deduplication logic','AI qualification design','CRM routing','SLA controls','Exception paths','Testing strategy'],
      cta: 'Need a lead system that does more than move contacts?'
    },
    'concept-multilocation-service-operations.html': {
      eyebrow: 'Automation Systems · Service Operations',
      title: 'Multi-Location Operations <span class="gradient-text">Command Center.</span>',
      pageTitle: 'Multi-Location Operations Command Center | Jan Kevin Mortola',
      visual: 'service',
      ownershipLabel: 'System responsibilities',
      ownershipNote: 'Architecture for central control with branch-aware execution and exception handling.',
      ownership: ['Operating model','Routing logic','Work-order states','Capacity controls','SLA monitoring','Reconciliation design','Management reporting'],
      cta: 'Need one operating model across multiple locations?'
    },
    'concept-ecommerce-ai-support-operations.html': {
      eyebrow: 'AI Systems · Customer Operations',
      title: 'AI Customer Support <span class="gradient-text">Operations System.</span>',
      pageTitle: 'AI Customer Support Operations System | Jan Kevin Mortola',
      visual: 'support',
      ownershipLabel: 'System responsibilities',
      ownershipNote: 'Architecture separating AI understanding from policy, authorization and human review.',
      ownership: ['AI triage design','Order-context layer','Policy gates','Approval logic','Exception queue','Audit model','Evaluation strategy'],
      cta: 'Need AI support that knows when not to automate?'
    },
    'concept-recruitment-onboarding-automation.html': {
      eyebrow: 'Automation Systems · People Operations',
      title: 'Talent Acquisition & <span class="gradient-text">Onboarding Engine.</span>',
      pageTitle: 'Talent Acquisition & Onboarding Engine | Jan Kevin Mortola',
      visual: 'people',
      ownershipLabel: 'System responsibilities',
      ownershipNote: 'Architecture for moving candidate information through hiring and operational onboarding.',
      ownership: ['Candidate data model','Resume extraction flow','AI-assist boundaries','Interview orchestration','Approval gates','Onboarding handoff','Exception handling'],
      cta: 'Need recruiting and onboarding to run as one connected system?'
    },
    'concept-self-hosted-ai-knowledge-operations.html': {
      eyebrow: 'AI Systems · Private AI',
      title: 'Private AI Knowledge <span class="gradient-text">Operations System.</span>',
      pageTitle: 'Private AI Knowledge Operations System | Jan Kevin Mortola',
      visual: 'private',
      ownershipLabel: 'System responsibilities',
      ownershipNote: 'Architecture for permission-aware retrieval, local inference and controlled tool use.',
      ownership: ['RAG architecture','Permission gates','Local model layer','Tool boundaries','Human approvals','Evaluation harness','Audit design'],
      cta: 'Need a private AI system with real operational guardrails?'
    }
  };

  const previewData = {
    'case-study-hospitality-automation.html': {
      title: 'Reservation-to-Operations Control View', subtitle: 'Hospitality automation dashboard',
      stages: [['Reservation Event','PMS · form · schedule'],['Identity Match','Reservation ID + fallback'],['Context Check','Property + open issues'],['Operational Action','Message · turnover · task'],['Exception Queue','Blocked or unclear cases']],
      metrics: [['Reservation state','Live','Current operating context'],['Identity match','Validated','Confidence before action'],['Unclear cases','Review queue','No silent guessing']]
    },
    'concept-ai-lead-engine.html': {
      title: 'AI Lead & CRM Revenue Control View', subtitle: 'Sales automation dashboard',
      stages: [['Lead Intake','Ads · forms · chat'],['Identity','Normalize + dedupe'],['AI Qualification','Intent + evidence'],['CRM Pipeline','Owner + stage + SLA'],['Revenue Handoff','Follow-up + operations']],
      metrics: [['Lead intake','Unified','Multiple sources normalized'],['Qualification','Structured','AI assist with rules'],['Follow-up','SLA monitored','Stalled leads surfaced']]
    },
    'concept-multilocation-service-operations.html': {
      title: 'Multi-Location Service Command Center', subtitle: 'Service operations dashboard',
      stages: [['CRM','Customer + service'],['Routing','Branch + geography'],['Work Order','ClickUp operational record'],['Field Delivery','Schedule + status'],['Control Tower','SLA + exceptions + reports']],
      metrics: [['Work orders','Centralized','Shared operating states'],['Routing','Branch-aware','Rules before assignment'],['Exceptions','Visible','Operator review queue']]
    },
    'concept-ecommerce-ai-support-operations.html': {
      title: 'E-Commerce AI Support Operations', subtitle: 'Support and order operations dashboard',
      stages: [['Support Inbox','Email · chat · ticket'],['AI Triage','Intent + urgency'],['Order Context','Order + shipment'],['Policy Gate','Risk + authorization'],['Resolve / Escalate','Action + audit log']],
      metrics: [['Triage','AI assisted','Language becomes structured context'],['Sensitive actions','Approval gated','Policy controls consequences'],['Audit trail','Logged','Context and actions preserved']]
    },
    'concept-recruitment-onboarding-automation.html': {
      title: 'Recruitment & Onboarding Control View', subtitle: 'People operations dashboard',
      stages: [['Application','Form · email · job board'],['Normalize','Resume + identity'],['Screen','Rules + AI evidence'],['Interview','Calendar + evaluation'],['Onboarding','Docs + tasks + access']],
      metrics: [['Candidate data','Structured','Reusable through the lifecycle'],['Decisions','Human-led','AI summarizes evidence'],['Onboarding','Connected','Approved hires trigger setup']]
    },
    'concept-self-hosted-ai-knowledge-operations.html': {
      title: 'Self-Hosted AI Operations Console', subtitle: 'Private AI operations dashboard',
      stages: [['User / Workflow','Question or business event'],['Permission Gate','Role + source access'],['RAG Retrieval','Approved context'],['Local Model','Private inference'],['Tool / Approval','Controlled action']],
      metrics: [['Knowledge access','Scoped','Only permitted sources'],['Tool actions','Controlled','Narrow business functions'],['Evaluation','Tracked','Grounding and tool-use tests']]
    }
  };

  const config = configs[currentFile];
  if (config) {
    document.title = config.pageTitle;
    document.querySelectorAll('.demo-banner').forEach(el => el.remove());

    const hero = document.querySelector('main > .hero');
    if (hero) {
      const eyebrow = hero.querySelector('.eyebrow');
      const h1 = hero.querySelector('h1');
      if (eyebrow) eyebrow.textContent = config.eyebrow;
      if (h1) h1.innerHTML = config.title;
    }

    document.querySelectorAll('a[href="case-studies.html"]').forEach(link => {
      if (link.closest('.nav-links')) link.textContent = '← Portfolio';
      else if (/Back to|concept/i.test(link.textContent)) link.textContent = 'Back to portfolio';
    });

    document.querySelectorAll('.nav-links .btn-primary, .callout .btn-primary').forEach(link => {
      link.href = bookingUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Book a discovery call';
    });

    const existingPreview = document.querySelector('.portfolio-preview-section');
    if (!existingPreview && previewData[currentFile]) {
      const data = previewData[currentFile];
      const section = document.createElement('section');
      section.className = 'portfolio-preview-section sample-screenshot';
      section.innerHTML = `<div class="shell"><div class="system-mockup visual-${config.visual} reveal"><div class="mock-toolbar"><strong>${data.title}</strong><span>${data.subtitle}</span></div><div class="mock-flow">${data.stages.map((stage,index)=>`${index?'<div class="mock-arrow">→</div>':''}<div class="mock-node"><b>${stage[0]}</b><span>${stage[1]}</span></div>`).join('')}</div><div class="mock-main"><div class="mock-metrics">${data.metrics.map(metric=>`<div class="mock-card"><b>${metric[0]}</b><strong>${metric[1]}</strong><p>${metric[2]}</p></div>`).join('')}</div></div></div><p class="mock-caption"><strong>System view:</strong> representative interface showing the workflow architecture, controls and operating logic.</p></div>`;
      if (hero) hero.insertAdjacentElement('afterend', section);
    } else if (existingPreview) {
      const mock = existingPreview.querySelector('.system-mockup');
      if (mock) mock.classList.add(`visual-${config.visual}`);
      existingPreview.querySelectorAll('.mock-caption').forEach(caption => {
        caption.innerHTML = '<strong>System view:</strong> representative interface showing the workflow architecture, controls and operating logic.';
      });
    }

    if (currentFile === 'case-study-education-operations-automation.html') {
      const cards = [...document.querySelectorAll('.portfolio-preview-section .mock-card')];
      const safeMetrics = [
        ['Session state','Tracked','Current delivery status'],
        ['PO coverage','Calculated','Delivered vs contracted'],
        ['Exceptions','Escalated','Director review queue']
      ];
      cards.forEach((card,index) => {
        const metric = safeMetrics[index];
        if (!metric) return;
        const b = card.querySelector('b'); const strong = card.querySelector('strong'); const p = card.querySelector('p');
        if (b) b.textContent = metric[0]; if (strong) strong.textContent = metric[1]; if (p) p.textContent = metric[2];
      });
    }

    const anchor = document.querySelector('.portfolio-preview-section') || hero;
    if (anchor && !document.querySelector('.system-proof')) {
      const proof = document.createElement('section');
      proof.className = 'system-proof reveal';
      proof.innerHTML = `<div class="shell"><div class="system-proof-box"><div class="system-proof-head"><h3>${config.ownershipLabel}</h3><p>${config.ownershipNote}</p></div><div class="ownership-items">${config.ownership.map(item=>`<span class="ownership-chip">${item}</span>`).join('')}</div></div></div>`;
      anchor.insertAdjacentElement('afterend', proof);
    }

    const finalCallout = [...document.querySelectorAll('main > .section')].reverse().find(section => section.querySelector('.callout'));
    if (finalCallout && !document.querySelector('.reliability-panel')) {
      const reliability = document.createElement('section');
      reliability.className = 'reliability-panel reveal';
      reliability.innerHTML = `<div class="shell"><div><span class="badge">Reliability layer</span><h2>Built for the failure path, not just the happy path.</h2><p class="lede">The workflow is only useful when validation, verification and recovery are designed alongside the automation.</p></div><div class="reliability-grid"><div class="reliability-card" data-step="01"><strong>Validate</strong><span>Check identity, required data, permissions and current state before action.</span></div><div class="reliability-card" data-step="02"><strong>Automate</strong><span>Execute the approved workflow with explicit routing and ownership.</span></div><div class="reliability-card" data-step="03"><strong>Verify</strong><span>Confirm the expected record or state actually changed after the write.</span></div><div class="reliability-card" data-step="04"><strong>Recover</strong><span>Route ambiguous, failed or sensitive cases into a visible exception path.</span></div></div></div>`;
      finalCallout.insertAdjacentElement('beforebegin', reliability);

      const cta = document.createElement('section');
      cta.className = 'inline-cta reveal';
      cta.innerHTML = `<div class="shell"><div class="inline-cta-box"><div><h3>${config.cta}</h3><p>Show me the current workflow, tools and bottlenecks. I’ll help map the system, automation boundaries and first implementation step.</p></div><a class="btn btn-primary" href="${bookingUrl}" target="_blank" rel="noopener noreferrer">Book a discovery call</a></div></div>`;
      reliability.insertAdjacentElement('afterend', cta);
    }

    document.querySelectorAll('.footer p').forEach(el => {
      el.textContent = el.textContent.replace('Concept Architecture ·', 'Automation Systems ·');
    });
  }

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
    }, {threshold:.1,rootMargin:'0px 0px -5% 0px'});
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
    setOrbitBase(); rafId = requestAnimationFrame(drawOrbit);
    heroVisual.addEventListener('mouseenter',() => {paused=true;if(rafId)cancelAnimationFrame(rafId);});
    heroVisual.addEventListener('mouseleave',() => {if(!paused)return;paused=false;rafId=requestAnimationFrame(drawOrbit);});
  }
})();