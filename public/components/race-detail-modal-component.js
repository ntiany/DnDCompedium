const template = document.createElement('template');


template.innerHTML = `
<style>
    @import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
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
    }
</style>
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

</div>
`
export default class RaceDetailModal extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ 'mode': 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {

        const closeBtn = this.shadowRoot.querySelector('.btn-primary');
        closeBtn.addEventListener('click', () => this.hide());
    }

    static get observedAttributes() {
        return ['race'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.show();
    }

    async fetchData (url) {
        const response = await fetch(url);
        return await response.json();
    }

    async show() {
        const backdrop = this.shadowRoot.querySelector('.backdrop');

        const data = await this.fetchData(`http://www.dnd5eapi.co/api/races/${this.race.toLowerCase()}`);
        
        this.setData(data);
        backdrop.classList.remove('hidden')

    }

    hide() {
        const backdrop = this.shadowRoot.querySelector('.backdrop');
        backdrop.classList.add('hidden');
    }

    setData(data) {
        const title = this.shadowRoot.querySelector('.card-title');
        const content = this.shadowRoot.querySelector('.card-body');
        const contentHTML = `<div><h5 style="font-weight: 500">Age:</h5><span class="age">${data.age}</span></div><br>
        <div><h5 style="font-weight: 500">Size:</h5></span class="size">${data.size_description}</span></div>`
        title.innerHTML = data.name;
        content.innerHTML = contentHTML;
    }

    get race() {
        return this.getAttribute('race');
    }

    set race(race) {
        this.setAttribute('race', race);
    }

}

customElements.define('dnd-race-modal', RaceDetailModal);
