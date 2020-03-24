class RaceComponent extends HTMLElement {
    isOpen = false;
    data;

    constructor() {
        super();
        
    }

    async connectedCallback() {
        this.data = await this.fetchData('http://www.dnd5eapi.co/api/races/');
        const shadowRoot = this.attachShadow({ mode: 'open'});
        this.render(shadowRoot, this.data);
        this.style('.list-group-item', 'active');
        this.setAttribute('open', false)
    }

    fetchData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    }
    
    render = (el, data) => {
        
        const title = `
        <style>
            @import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
            h2, h4, ul {
                width: 18rem;
            }
            :host([open='false']) {
                display: none;
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
    
    style = (selector, cssClass) => {
        const elements = this.shadowRoot.querySelectorAll(selector);
        elements.forEach(el => {
            el.addEventListener('mouseover', () => { el.classList.add(cssClass); });
            el.addEventListener('click', this.emitRace);
            el.addEventListener('mouseleave', () => { el.classList.remove(cssClass); })
        });
    }

    toggle() {
        this.isOpen === true ? this.setAttribute('open', 'false') : this.setAttribute('open', 'true');
        this.isOpen = !this.isOpen;
    }

    emitRace(event) {
        const raceEvent = 
        new CustomEvent('raceEvent', { bubbles: true, composed: true, detail: {race: event.target.innerHTML } });
        event.target.dispatchEvent(raceEvent);
    }

}

customElements.define('dnd-races', RaceComponent);