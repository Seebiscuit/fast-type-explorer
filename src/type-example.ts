import { FASTElement, customElement, css, html, attr, nullableNumberConverter } from "@microsoft/fast-element";
import { TypeStyles } from "./type-styles";

const template = html<TypeExample>`<p class="reset-type" style="width: 60px">${(x) => x.offset}</p>
  <p class="reset-type" style="width: 80px">${(x) => x.sizeLabel}</p>
  <p class="sample">What counts is not necessarily the size of the dog in the fight -<br />it's the size of the fight in the dog.</p>`;

const styles = css`
  :host {
    display: flex;
    margin: 20px 0;
  }
  :host > * {
    flex-shrink: 0;
  }
  p {
    margin: 0;
  }
  .reset-type {
    font-size: initial;
    line-height: initial;
  }
`;

@customElement({
  name: "type-example",
  template,
})
export class TypeExample extends FASTElement {
  @attr({ converter: nullableNumberConverter }) offset: number = 0;
  @attr sizeLabel: string;

  connectedCallback() {
    super.connectedCallback();
  }

  resolveStyles() {
    const rampOffset: string = this.offset === 0 ? "base" : this.offset < 0 ? "minus-" + Math.abs(this.offset) : "plus-" + this.offset;
    // css templat literal below formats with a space before the $, so do this first.
    const fontSizeVar: string = `var(--type-ramp-${rampOffset}-font-size)`;
    const lineHeightVar: string = `var(--type-ramp-${rampOffset}-line-height)`;
    return css`
      ${TypeStyles}
      ${styles}
      .sample {
        font-size: ${fontSizeVar};
        line-height: ${lineHeightVar};
      }
    `;
  }
}
