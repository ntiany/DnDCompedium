import {ROUTES} from "../router/Routes";

class Router extends HTMLElement {

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});
        const path = window.location.pathname.replace('/', '');

        const that = this;
        const pushState = history.pushState;

        history.pushState = function(state) {
            that.change(shadowRoot, state.url);
            return pushState.apply(history, arguments);
        };

        if (shadowRoot.childNodes.length === 0) {
            this.change(shadowRoot, window.location.pathname.replace('/', ''));
        }

    }

    change(root, newRoute) {
        let oldNode;

        if (root.childNodes.length === 1) {
            oldNode = root.childNodes[0];
        }

        const filter = (route) => route.path  === newRoute;
        let comp = ROUTES.filter(filter)[0];

        if (!comp) {
            comp = ROUTES.filter(route => route.path === '*')[0];
            console.error('This Path doesn\'t exist!');
            window.history.pushState.apply(history,[{url: 'home'}, '', 'home']);
            return;
        }

        if (comp) {
            const el = new comp.component;
            if (!!oldNode && oldNode.nodeName !== el.nodeName) {
                oldNode.remove();
                root.append(el);
                document.title = comp.title;
                return;
            }

            if (!!oldNode && oldNode === el) {
                return;
            }

            if (!!!oldNode)
                root.append(el);
                document.title = comp.title;
        }

    }

}

customElements.define('router-outlet', Router);