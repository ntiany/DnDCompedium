import ClassModal from "./class-detail-modal-component";

let data = {};
import { LoadingSpinner } from './loading-spinner-component';

export class ClassesComponent extends HTMLElement {
    constructor() {
        super();
        this.setAttribute('open', true);
    }

    async connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const spinner = new LoadingSpinner();
        shadowRoot.append(spinner);

        data = await this.fetchData('http://www.dnd5eapi.co/api/classes/');
        this.render(shadowRoot, data);
        this.style('.list-group-item', 'active');

    }

    async fetchData (url) {
        const response = await fetch(url);
        return await response.json();
    }

    async render(el, data) {
        
        const title = `
        <style>
            @import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
            h2, h4, ul {
                width: 18rem;
            }
            :host([open='false']) {
                display: none;
            }
            li {
                cursor: pointer;
            }
            
        </style>
        <h2 green">Classes in D&D (${data.count})</h2>`;
        let list = '<ul class="list-group">';
    
        data.results.forEach(clazz => {
            list += `<li class="list-group-item" title="${clazz.index}">${clazz.name}</li>`
        });
        list += '</ul>';

        el.innerHTML = title + list;

    }
    
    async style (selector, cssClass) {
        const elements = this.shadowRoot.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseover', () => { el.classList.add(cssClass); });
            el.addEventListener('click', this.emitRace);
            el.addEventListener('mouseleave', () => { el.classList.remove(cssClass); })
        });
    }

    emitRace(event) {
        let classModal = new ClassModal();
        classModal.clazz = event.target.innerHTML;
        const body = document.querySelector('body');
        body.append(classModal);
    }

}

customElements.define('dnd-classes', ClassesComponent);