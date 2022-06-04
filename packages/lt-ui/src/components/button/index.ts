import { html, LitElement } from "lit";
import { customElement, query, property } from "lit/decorators.js";
import styles from "./styles";


@customElement('lt-button')
export class LtButton extends LitElement {
    static styles = styles

    @query("#btn") btn!: HTMLElement

    static get observedAttributes(): string[] {
        return ['disabled', 'href', 'htmltype']
    }

    @property({ type: Boolean }) disabled: boolean = false
    @property({ type: Boolean }) toggle: boolean = false
    @property({ type: String }) htmltype: string = ""
    @property({ type: String }) name: string = ""
    @property({ type: Boolean }) checked: boolean = false
    @property({ type: String }) href: string = ""
    @property({ type: String }) target: string = "_blank"
    @property({ reflect: true }) rel: any

    connectedCallback() {
        super.connectedCallback();
        this.disabled = this.disabled;
    }

    attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
        super.attributeChangedCallback(name, _old, value);
        if (name == 'disabled') {
            if (value !== null) {
                this.disabled = true;
                this.href = ''
            } else {
                this.disabled = false;
            }
        }
    }

    render() {
        return html`
                <button class="btn" id="btn"></button>
                <slot></slot>
            `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'lt-button': LtButton
    }
}