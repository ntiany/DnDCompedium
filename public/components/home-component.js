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
<div>
    <slot></slot>
    <div class="card" style="width: 25rem;">
        <h4 class="card-title">Welcome!</h4>
        <div class="card-body">
            Look around and find amazing DnD-Stuff!
        </div>
    </div>

</div>
`

export class HomeComponent extends HTMLElement {

    constructor() {
        super();
        const shadowRoot = this.attachShadow({ 'mode': 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));

    }

    connectedCallback() {
    }

}

customElements.define('dnd-home', HomeComponent);
