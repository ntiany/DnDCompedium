import { Component } from '../decorators/custom-decorator';

@Component({
    selector: 'dnd-home',
    template: `
        <div>
            <slot></slot>
            <div class="card" style="width: 25rem;">
                <h4 class="card-title">Welcome!</h4>
                <div class="card-body">
                    Look around and find amazing DnD-Stuff!
                </div>
            </div>
        </div>`,
    style:
        `@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
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
export class HomeComponent extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {}

    disconnectedCallback() {}

}

