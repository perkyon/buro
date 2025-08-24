// Общий модал для проектов: открытие по клику на img внутри .frame
(function(){
  function openModal(src){
    var modal = document.querySelector('.project-modal');
    var img = modal && modal.querySelector('.project-modal__img');
    if(!modal || !img) return;
    img.src = src;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    var modal = document.querySelector('.project-modal');
    if(!modal) return;
    var img = modal.querySelector('.project-modal__img');
    modal.classList.remove('show');
    if(img) img.src = '';
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function(e){
    var t = e.target;
    // открыть только если это IMG внутри .frame и помечена как modal-enabled
    if(t && t.tagName === 'IMG' && t.closest && t.closest('.frame') && t.classList && t.classList.contains('modal-enabled')){
      openModal(t.src);
      return;
    }
    // закрыть при клике по кнопке закрытия
    if(t.classList && t.classList.contains('project-modal__close')){
      closeModal();
      return;
    }
    // закрыть при клике по фону модала
    if(t.classList && t.classList.contains('project-modal') ){
      closeModal();
      return;
    }
  }, false);

  document.addEventListener('keydown', function(e){ if(e.key === 'Escape'){ closeModal(); } });

  // Экспорт для использования в других скриптах, если нужно
  window.projectModal = { open: openModal, close: closeModal };
})();
