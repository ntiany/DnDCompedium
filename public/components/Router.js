import {ROUTES} from "./Routes";

class Router extends HTMLElement {

    connectedCallback() {
        const path = window.location.href;
        const shadowRoot = this.attachShadow({mode: 'open'});

        const that = this;
        var pushState = history.pushState;
        history.pushState = function () {
            that.change(shadowRoot, arguments);
        };
    }


    change(root, newRoute) {
        const path = window.location.href;
        let oldNode;

        if (root.childNodes.length === 1) {

            oldNode = root.childNodes[0];
        }


        const filter = (route) => window.location.origin + '/' + route.path  === path;
        const comp = ROUTES.filter(filter)[0];

        if (comp) {
            const el = new comp.component;
            if (!!oldNode && oldNode.nodeName !== el.nodeName) {
                oldNode.remove();
                root.append(el);
                return;
            }

            if (!!oldNode && oldNode === el) {
                return;
            }

            if (!!!oldNode)
            root.append(el);
        }

    }

}

customElements.define('router-outlet', Router);