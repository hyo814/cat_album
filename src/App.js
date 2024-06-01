import {Breadcrumb, Nodes, ImageView } from "./components/uiComponents.js";
import { renderNodes } from "./dataHandler.js";

export function App() {
    this.app = null;
    this.breadCrumb = null;
    this.modal = null;
    this.states = null;
    this.nodes = null;

    this.render = async () => {
        this.app = document.querySelector('#App');
        this.breadCrumb = new Breadcrumb(this.app, ['root']);
        this.modal = new ImageView();
        this.states = await renderNodes(this.modal, this.breadCrumb, 'root');
        this.nodes = new Nodes(this.app, this.breadCrumb, this.modal, this.states);
    }
}
