export interface CustomComponent {
    selector:string;
    template: string;
    style?: string;
}

export const CustomElement = (customComponent: CustomComponent)  =>  (component)  =>  {

    const template = document.createElement('template');
    if (customComponent.style) {
        customComponent.template = `<style>${customComponent.style}</style> ${customComponent.template}`;
    }

    if (customComponent.template) {
        template.innerHTML = customComponent.template;
    }


    const connectedCallback = component.prototype.connectedCallback;
    const disconnectedCallback = component.prototype.disconnectedCallback;

    component.prototype.connectedCallback = function() {

        const shadowRoot = this.attachShadow({ 'mode': 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        connectedCallback.call(this);

    };

    component.prototype.disconnectedCallback = function() {

        if (disconnectedCallback !== undefined) {
            disconnectedCallback.call(this);
        }

    };

    customElements.define(customComponent.selector, component);
};
