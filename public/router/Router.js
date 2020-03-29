import {ROUTES} from "../router/Routes";

class Router extends HTMLElement {

    connectedCallback() {
        const shadowRoot = this.attachShadow({mode: 'open'});

        const that = this;

        const path = window.location.pathname.replace('/', '');

        if (shadowRoot.childNodes.length === 0 && path.length > 0) {
            this.change(shadowRoot, window.location.pathname.replace('/', ''));
            return;
        }


        const pushState = history.pushState;
        history.pushState = function(state) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state});
            }
            that.change(shadowRoot, state.url);
            return pushState.apply(history, arguments);
        };

    }


    change(root, newRoute) {
        let oldNode;
        if (root.childNodes.length === 1) {

            oldNode = root.childNodes[0];
        }

        const filter = (route) => route.path  === newRoute;
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