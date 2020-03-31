import { Component } from '../decorators/custom-decorator';

@Component({
    selector: 'dnd-class-modal',
    template: `
        <div class="backdrop hidden">
            <slot></slot>
            <div class="card" style="width: 25rem;">
                <h4 class="card-title"></h4>
                <div class="card-body">
                    
                </div>
                <div style="display: flex; justify-content: center; margin-bottom: 0.5rem">
                    <button typer="button" class="btn btn-primary" style="width: 5rem;">close</button>
                </div>
            </div>
        </div>`,
    style: ` @import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
    .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        flex-direction: column;
    }

    .hidden {
        display: none;
    }
    
    .card {
        padding: 1rem;
    }`
})
export default class ClassModal extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        const closeBtn = this.shadowRoot.querySelector('.btn-primary');
        closeBtn.addEventListener('click', () => this.hide());
        this.show();


    }

    static get observedAttributes() {
        return ['class'];
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }


    async fetchData (url) {
        const response = await fetch(url);
        return await response.json();
    }

    async show() {
        const backdrop = this.shadowRoot.querySelector('.backdrop');

        const data = await this.fetchData(`http://www.dnd5eapi.co/api/classes/${this.clazz.toLowerCase()}`);

        this.setData(data);
        backdrop.classList.remove('hidden')

    }

    hide() {
        const backdrop = this.shadowRoot.querySelector('.backdrop');
        backdrop.classList.add('hidden');
        this.disconnectedCallback()
    }

    setData(data) {
        let profs = "";
        data.proficiencies.forEach(prof => {
            profs += `<div class="size">${prof.name}</div>`;
        });
        const title = this.shadowRoot.querySelector('.card-title');
        const content = this.shadowRoot.querySelector('.card-body');
        const contentHTML = `<div><h5 style="font-weight: 500">Hit Points:</h5><span class="age">${data.hit_die}</span></div><br>
        <div>
            <h5 style="font-weight: 500">Proficiencies:</h5>
           ${ profs }
         </div>`
        title.innerHTML = data.name;
        content.innerHTML = contentHTML;

    }

    get clazz() {
        return this.getAttribute('class');
    }

    set clazz(clazz) {
        this.setAttribute('class', clazz);
    }

    disconnectedCallback() {
    }

}
