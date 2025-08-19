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
  // ...откат: удалено всё, что связано с единым стилем и визуальным откликом для кнопок и форм...
  // Индивидуальные проекты
  const projects = {
    'surf-coffee': {
      title: 'Surf Coffee',
      images: ['фото1.jpg', 'фото.jpg'],
      desc: 'Описание Surf Coffee...'
    },
    'project2': {
      title: 'Проект 2',
      images: ['фото2.jpg', 'фото.jpg'],
      desc: 'Описание проекта 2...'
    },
    'project3': {
      title: 'Проект 3',
      images: ['фото3.jpg', 'фото.jpg'],
      desc: 'Описание проекта 3...'
    },
    'project4': {
      title: 'Проект 4',
      images: ['фото4.jpg', 'фото.jpg'],
      desc: 'Описание проекта 4...'
    },
    'project5': {
      title: 'Проект 5',
      images: ['фото5.jpg', 'фото.jpg'],
      desc: 'Описание проекта 5...'
    },
    'project6': {
      title: 'Проект 6',
      images: ['фото6.jpg', 'фото.jpg'],
      desc: 'Описание проекта 6...'
    }
  };

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
    document.querySelector('#frame-project-detail .font-neutral.b').textContent = data.title;
    // Можно добавить смену фото и описания, если потребуется
    document.querySelector('#frame-project-desc .font-neutral.b').textContent = 'описание';
    document.querySelector('#frame-project-desc span').textContent = data.desc;
  }
  function handleRoute(){
    const hash = (location.hash||'').replace('#','');
    if(hash.startsWith('/project/')){ showProject(); return; }
    // Оферта, соглашение, политика
    if(hash === '/offer') {
      showList();
      document.querySelectorAll('.frame').forEach(f=>f.style.display='none');
      document.getElementById('frame-offer').style.display='block';
      return;
    }
    if(hash === '/agreement') {
      showList();
      document.querySelectorAll('.frame').forEach(f=>f.style.display='none');
      document.getElementById('frame-agreement').style.display='block';
      return;
    }
    if(hash === '/privacy') {
      showList();
      document.querySelectorAll('.frame').forEach(f=>f.style.display='none');
      document.getElementById('frame-privacy').style.display='block';
      return;
    }
    // Стандартные секции
    showList();
    document.querySelectorAll('.frame').forEach(f=>f.style.display='');
    if(hash === '/projects') document.getElementById('frame-projects').scrollIntoView({behavior:'smooth'});
    else if(hash === '/about') document.getElementById('frame-about').scrollIntoView({behavior:'smooth'});
    else if(hash === '/contacts') document.getElementById('frame-contacts').scrollIntoView({behavior:'smooth'});
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
