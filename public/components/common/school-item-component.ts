import { Component } from '../../decorators/custom-decorator';

@Component({
    selector: 'dnd-school-item',
    template: `
        <div class="school">
            
        </div>
`,
    style:
        `
         @import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";
         .school {
            height: 15rem;
            width: 15rem;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            padding: 0.5rem;
          }
        `
})
export default class SchoolItemComponent extends HTMLElement {


    private connectedCallback() {
        const card = this.shadowRoot.querySelector('.school');
        const src = `url('../../resources/school-icons/${this.getAttribute('school')}.png')`;
        (card as HTMLDivElement).style.backgroundImage = src;
    }

    get school() {
        return this.getAttribute('school');
    }

    set school(school: string) {
        this.setAttribute('school', school);
    }

}
