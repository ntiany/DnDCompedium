import { Component } from '../decorators/custom-decorator';
import SchoolItem from './common/school-item-component';

@Component({
    selector: 'dnd-schools',
    template: `
            <div class="box">
                <h2 class="title">Spell Schools</h2>
                <div class="schools"></div>
            </div>
`,
    style:
        `
        .box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: #9a9797;
            border-radius: 8px;
            padding: 1rem;
        }
        
        .title {
            color: white;
        }
        
        .schools {
          display: grid;
          grid-template-columns: repeat(2, auto);
          grid-template-rows: repeat(2, auto);
          grid-gap: 1em;
         }

        dnd-school-item {
            transform: scale(1.0);
            transition: 1s;
        }
        
        dnd-school-item:hover {
            cursor: pointer;
            transform: scale(1.1) rotate(360deg);
            transition: 1s;
        }
    `
})
export class SchoolComponent extends HTMLElement {

    private schools: string[] = ['abjuration', 'conjuration', 'divination', 'enchantement']

    private connectedCallback() {
        this.schools.forEach(school => {
            const item = new SchoolItem();
            item.setAttribute('school', school);
            this.shadowRoot.querySelector('.schools').append(item);
        })

    }

    private disconnectedCallback() {}

}
