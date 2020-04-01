export interface Configuration {
    selector:string;
    template: string;
    style?: string;
}

export const Component = (configuration: Configuration)  =>  (component)  =>  {

    const template = document.createElement('template');

    if (configuration.style) {
        configuration.template = `<style>${configuration.style}</style> ${configuration.template}`;
    }

    if (configuration.template) {
        template.innerHTML = configuration.template;
    }

    const connectedCallback = component.prototype.connectedCallback;
    const disconnectedCallback = component.prototype.disconnectedCallback;
    const attributeChangedCallback = component.prototype.attributeChangedCallback;


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

    component.prototype.attributeChangedCallback = function(...args) {
        setTimeout(() => {
            attributeChangedCallback.call(this, ...args)
        }, 1);

    }

    customElements.define(configuration.selector, component);
};
