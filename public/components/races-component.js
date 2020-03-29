import RaceDetailModal from "./race-detail-modal-component";
import {LoadingSpinner} from './loading-spinner-component';

let data = {};

export class RaceComponent extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        const spinner = new LoadingSpinner();
        shadowRoot.append(spinner)

        data = await this.fetchData('http://www.dnd5eapi.co/api/races/');
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
        <h2 green">Races in D&D (${data.count})</h2>`;
        let list = '<ul class="list-group">';
    
        data.results.forEach(race => {
            list += `<li class="list-group-item" title="${race.index}">${race.name}</li>` 
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
        const raceEvent = 
        new CustomEvent('raceEvent', { bubbles: true, composed: true, detail: {race: event.target.innerHTML } });
        event.target.dispatchEvent(raceEvent);
        let raceModal = new RaceDetailModal();
        raceModal.race = event.target.innerHTML;
        const body = document.querySelector('body');
        body.append(raceModal);
    }

}

customElements.define('dnd-races', RaceComponent);