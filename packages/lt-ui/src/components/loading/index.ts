import { html, LitElement } from "lit";
import { customElement, query, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from './styles';

@customElement('lt-loading')
export class LtLoading extends LitElement {
    static styles = styles

    @query('#loading') loading!: SVGElement;

    render() {
        return html`
            <svg
                class="loading"
                id="loading"
                style="${styleMap({ fontSize: this.fontSize, color: this.color })}"
                viewBox="22 22 44 44">
                <circle class="circle" cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6"></circle>
            </svg>
            <slot></slot>
        `
    }

    @property({ type: Boolean, reflect: true }) size = 40
    @property({ reflect: true }) color: 'green' | 'olivedrab' | 'orange' | '' = ''
    @property({ reflect: true }) fontSize: string = ''

    // 在将组件添加到文档的 DOM 时调用。
    connectedCallback() {
        super.connectedCallback();
        this.size && (this.size = this.size);
        this.color && (this.color = this.color);
    }

    // 当元素的某个更改时调用
    attributeChangedCallback(name: string, oldValue: string, newValue: any) {
        super.attributeChangedCallback(name, oldValue, newValue);
        if (name == 'color') {
            this.color = newValue;
        }
        if (name == 'size') {
            this.fontSize = newValue;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'lt-loading': LtLoading
    }
}