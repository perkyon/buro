// --- Обработчики для выбора категории заявки ---
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.category-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category-option').forEach(function(el){
        el.setAttribute('aria-pressed', 'false');
        el.style.background = '#f5f5f5';
      });
      btn.setAttribute('aria-pressed','true');
      btn.style.background = '#e9e9ff';
      document.getElementById('request-category').value = btn.dataset.category;
    });
  });
});
// --- Восстановление обработчиков для кнопок связи в модальном окне заявки ---
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.contact-option').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.contact-option').forEach(function(el){
        el.setAttribute('aria-pressed', 'false');
        el.style.background = '#f5f5f5';
      });
      btn.setAttribute('aria-pressed','true');
      btn.style.background = '#e9e9ff';
      // Действие по кнопке
      if (btn.dataset.contact === 'email') {
        window.open('mailto:sales@burodsgn.ru');
      }
      if (btn.dataset.contact === 'telegram') {
        window.open('https://t.me/burodsgn');
      }
      if (btn.dataset.contact === 'whatsapp') {
        window.open('https://wa.me/79952025404');
      }
    });
  });
});

// --- Восстановление загрузки иконок соцсетей в футере ---
document.addEventListener('DOMContentLoaded', function() {
  var icons = [
    {key:'instagram', files:['Instagram.svg','instagram.svg'], href:'https://instagram.com/burodsgn'},
    {key:'telegram', files:['telegram.svg','Telegram.svg'], href:'https://t.me/burodsgn'},
    {key:'whatsapp', files:['WhatsApp.svg','whatsapp.svg'], href:'https://wa.me/79952025404'},
    {key:'vk', files:['Vkontak.svg','vkontak.svg','Vk.svg','vk.svg'], href:'https://vk.com/burodsgn'},
    {key:'pinterest', files:['Pinterest.svg','pinterest.svg'], href:'javascript:void(0)'}
  ];
  var container = document.getElementById('footer-left');
  if (!container) return;
  container.style.left = '8px';
  container.style.gap = '8px';
  icons.forEach(function(icon){
    var anchor = document.createElement('a');
    anchor.href = icon.href;
    anchor.setAttribute('aria-label', icon.key + ' — BURO');
    anchor.className = 'footer-link';
    var img = document.createElement('img');
    img.alt = icon.key;
    img.style.width = '40px';
    img.style.height = '40px';
    img.style.display = 'block';
    anchor.appendChild(img);
    container.appendChild(anchor);
    var i = 0;
    function tryNext(){
      if(i >= icon.files.length){
        // Telegram fallback SVG
        if(icon.key === 'telegram'){
          var svg = document.createElement('span');
          svg.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 4L3 10.5l4.5 1.5L9 18l1.5-3 3.5-2.5L21 4z" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
          svg.style.display = 'inline-block';
          svg.style.width = '32px';
          svg.style.height = '32px';
          if(img.parentNode) img.parentNode.removeChild(img);
          anchor.appendChild(svg);
          return;
        }
        if(anchor.parentNode) anchor.parentNode.removeChild(anchor);
        return;
      }
      img.src = 'assets/' + icon.files[i];
      img.onload = function(){ /* ok */ };
      img.onerror = function(){ i++; tryNext(); };
    }
    tryNext();
  });
});
// main.js — скрипты для публичной части
(function(){
  'use strict';
  const stageList = document.getElementById('stage-list');
  const stageProject = document.getElementById('stage-project');
  function showList(){
    stageList.classList.add('active');
    stageProject.classList.remove('active');
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  // ...откат: удалено всё, что связано с единым стилем и визуальным откликом для кнопок и форм...
  // Индивидуальные проекты
  const projects = {
    'surf-coffee': {
      title: 'Проект 1',
    images: ['assets/фото1.jpg', 'assets/фото.jpg'],
      desc: 'Описание Surf Coffee...'
    },
    'project2': {
      title: 'Проект 2',
    images: ['assets/фото2.jpg', 'assets/фото.jpg'],
      desc: 'Описание проекта 2...'
    },
    'project3': {
      title: 'Проект 3',
    images: ['assets/фото3.jpg', 'assets/фото.jpg'],
      desc: 'Описание проекта 3...'
    },
    'project4': {
      title: 'Проект 4',
    images: ['assets/фото4.jpg', 'assets/фото.jpg'],
      desc: 'Описание проекта 4...'
    },
    'project5': {
      title: 'Проект 5',
    images: ['assets/фото5.jpg', 'assets/фото.jpg'],
      desc: 'Описание проекта 5...'
    },
    'project6': {
      title: 'Проект 6',
    images: ['assets/фото6.jpg', 'assets/фото.jpg'],
      desc: 'Описание проекта 6...'
    }
  };

  function showProject(){
    stageProject.classList.add('active');
    stageList.classList.remove('active');
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
  if(hash === '/projects') document.getElementById('frame-projects-list').scrollIntoView({behavior:'smooth'});
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
