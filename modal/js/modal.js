class ItcModal {
  #elem;
  #template = '<div class="itc-modal-backdrop"><div class="itc-modal-content itc-modal-scrollable"><div class="itc-modal-header"><div class="itc-modal-title">{{title}}</div><span class="itc-modal-btn-close" title="Закрыть">×</span></div><div class="itc-modal-body">{{content}}</div>{{footer}}</div></div>';
  #templateFooter = '<div class="itc-modal-footer">{{buttons}}</div>';
  #templateBtn = '<button type="button" class="{{class}}" data-action={{action}}>{{text}}</button>';
  #eventShowModal = new Event('show.itc.modal', { bubbles: true });
  #eventHideModal = new Event('hide.itc.modal', { bubbles: true });
  #disposed = false;

  constructor(options = []) {
    this.#elem = document.createElement('div');
    this.#elem.classList.add('itc-modal');
    let html = this.#template.replace('{{title}}', options.title || 'Новое окно');
    html = html.replace('{{content}}', options.content || '');
    const buttons = (options.footerButtons || []).map((item) => {
      let btn = this.#templateBtn.replace('{{class}}', item.class);
      btn = btn.replace('{{action}}', item.action);
      return btn.replace('{{text}}', item.text);
    });
    const footer = buttons.length ? this.#templateFooter.replace('{{buttons}}', buttons.join('')) : '';
    html = html.replace('{{footer}}', footer);
    this.#elem.innerHTML = html;
    document.body.append(this.#elem);
    this.#elem.addEventListener('click', this.#handlerCloseModal.bind(this));
  }

  #handlerCloseModal(e) {
    if (e.target.closest('.itc-modal-btn-close') || e.target.classList.contains('itc-modal-backdrop')) {
      this.hide();
    }
  }

  show() {
    if (this.#disposed) {
      return;
    }
    this.#elem.classList.add('itc-modal-show');
    const scrollbarWidth = Math.abs(window.innerWidth - document.documentElement.clientWidth);
    if (window.innerWidth > document.body.clientWidth + scrollbarWidth) {
      return;
    }
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.overflow = 'hidden';
    this.#elem.dispatchEvent(this.#eventShowModal);
  }

  hide() {
    this.#elem.classList.remove('itc-modal-show');
    this.#elem.dispatchEvent(this.#eventHideModal);
    document.body.style.paddingRight = '';
    document.body.offsetHeight;
    this.#elem.addEventListener('transitionend', () => {
      document.body.style.overflow = '';
    }, { once: true });
  }

  dispose() {
    this.#elem.remove(this.#elem);
    this.#elem.removeEventListener('click', this.#handlerCloseModal);
    this.#disposed = true;
  }

  setBody(html) {
    this.#elem.querySelector('.itc-modal-body').innerHTML = html;
  }

  setTitle(text) {
    this.#elem.querySelector('.itc-modal-title').innerHTML = text;
  }
}


export default ItcModal


// const helper = {
//   f1: function() {
//     console.log("функция1");
//     return "вернул функция 1"
//   },
//   f2: function() {
//     console.log("функция 2");
//     return "вернул функция 2"
//   }
// }

// export const func1 = helper.f1
// export const func2 = helper.f2