import ClassModal from "./class-detail-modal-component";

let data = {};
import { LoadingSpinner } from './loading-spinner-component';

import { Component } from '../decorators/custom-decorator';

@Component({
    selector: 'dnd-classes',
    template: '',
    style: ` 
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
            `
})
export class ClassesComponent extends HTMLElement {
    private spinner = new LoadingSpinner();

    constructor() {
        super();
        this.setAttribute('open', 'true');
    }

    async connectedCallback() {
        this.shadowRoot.append(this.spinner);
        data = await this.fetchData('http://www.dnd5eapi.co/api/classes/');
        this.render(this.shadowRoot, data);
        this.styles('.list-group-item', 'active');
    }

    async fetchData (url: string) {
        const response = await fetch(url);
        return await response.json();
    }

    async render(el: ShadowRoot, data: any) {
        const title = `
        <h2 green">Classes in D&D (${data.count})</h2>`;
        let list = '<ul class="list-group">';
    
        data.results.forEach(clazz => {
            list += `<li class="list-group-item" title="${clazz.index}">${clazz.name}</li>`
        });
        list += '</ul>';
        this.spinner.remove();
        el.innerHTML = el.innerHTML + title + list;
    }
    
    async styles (selector, cssClass) {
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
