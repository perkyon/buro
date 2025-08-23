// main.js — скрипты для публичной части
(function(){
  'use strict';
    const stageList = document.getElementById('stage-list');
    const stageProject = document.getElementById('stage-project');
    function showList(){
      stageList.classList.add('active');
      stageProject.classList.remove('active');
      window.scrollTo(0,0);
    }
    // данные проектов берутся из отдельного JS-файла для удобства редактирования
    const projects = window.PROJECTS || {}; 
    function populateProjects(){
      Object.entries(projects).forEach(([id, data])=>{
        const grid = document.querySelector(`.projects-grid[data-category="${data.category}"]`);
        if(!grid) return;
        const link = document.createElement('a');
        link.className = 'project-card click';
        link.setAttribute('data-go', `#/project/${id}`);
        const img = document.createElement('img');
        img.src = data.thumbnail || (data.images && data.images[0]) || '';
        img.alt = data.title;
        link.appendChild(img);
        grid.appendChild(link);
      });
    }
    populateProjects();
    handleRoute();

  function showProject(){
    stageProject.classList.add('active');
    stageList.classList.remove('active');
    window.scrollTo(0,0);
    // Получаем id проекта из hash
    const hash = (location.hash||'').replace('#','');
    const match = hash.match(/^\/project\/(.+)$/);
    if (!match) return;
    const projectId = match[1];
      const data = projects[projectId];
      if (!data) return;
      // Заполняем контент
      const titleEl = document.getElementById('project-title');
      if(titleEl) titleEl.textContent = data.title;
      const imgWrap = document.getElementById('project-images');
      if(imgWrap){
        imgWrap.innerHTML='';
        (data.images||[]).forEach(src=>{
          const img=document.createElement('img');
          img.src=src;
          img.alt=data.title;
          imgWrap.appendChild(img);
        });
      }
      const descEl = document.getElementById('project-desc');
      if(descEl) descEl.textContent = data.desc;
      if(typeof enableProjectImageModal === 'function') enableProjectImageModal();
    }
  function handleRoute(){
    const hash = (location.hash||'').replace('#','');
    if(hash.startsWith('/project/')){ showProject(); return; }
    // Оферта, соглашение, политика
    if(hash === '/offer') {
      showList();
      document.querySelectorAll('.frame').forEach(f=>f.style.display='none');
      const fo = document.getElementById('frame-offer');
      if(fo) fo.style.display='block';
      return;
    }
    if(hash === '/agreement') {
      showList();
      document.querySelectorAll('.frame').forEach(f=>f.style.display='none');
      const ag = document.getElementById('frame-agreement');
      if(ag) ag.style.display='block';
      return;
    }
    if(hash === '/privacy') {
      showList();
      document.querySelectorAll('.frame').forEach(f=>f.style.display='none');
      const pr = document.getElementById('frame-privacy');
      if(pr) pr.style.display='block';
      return;
    }
    // Стандартные секции
    showList();
    document.querySelectorAll('.frame').forEach(f=>f.style.display='');
  if(hash === '/projects') { const fp = document.getElementById('frame-projects'); if(fp) fp.scrollIntoView({behavior:'smooth'}); }
  else if(hash === '/about') { const fa = document.getElementById('frame-about'); if(fa) fa.scrollIntoView({behavior:'smooth'}); }
  else if(hash === '/contacts') { const fc = document.getElementById('frame-contacts'); if(fc) fc.scrollIntoView({behavior:'smooth'}); }
  }
  document.addEventListener('click', (e)=>{
    const go = e.target.closest('[data-go]');
    if(!go || !document.contains(go)) return;
    e.preventDefault();
    const target = go.getAttribute('data-go');
    if(target){ location.hash = target; }
  });
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
  function wrapFrames(){
    const frames = Array.from(document.querySelectorAll('.frame'));
    frames.forEach(frame=>{
      if (frame.parentElement && frame.parentElement.classList.contains('frame-fit')) return;
      const fit = document.createElement('div');
      fit.className = 'frame-fit';
      frame.parentNode.insertBefore(fit, frame);
      fit.appendChild(frame);
    });
    applyScale();
  }
  function applyScale(){
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const base = 1152, baseH = 700;
    const k = vw / base;
    document.querySelectorAll('.frame-fit').forEach(fit=>{
      fit.style.setProperty('--scale', k);
      fit.style.height = (baseH * k) + 'px';
      const inner = fit.querySelector('.frame');
      if (inner) inner.style.transform = 'scale(' + k + ')';
    });
  }
  function cleanupWrap(){
    document.querySelectorAll('.frame-fit').forEach(fit=>{
      const inner = fit.querySelector('.frame');
      if (inner){
        inner.style.transform = '';
        fit.parentNode.insertBefore(inner, fit);
      }
      fit.remove();
    });
  }
  function handleResize(){
    cleanupWrap();
    wrapFrames();
    applyScale();
  }
  wrapFrames();
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);
})();
