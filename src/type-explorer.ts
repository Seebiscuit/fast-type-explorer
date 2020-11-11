import { FASTElement, customElement, css, html, attr, ref, ElementStyles, observable, repeat } from "@microsoft/fast-element";
import {
  FASTSlider,
  FASTDesignSystemProvider,
  FASTTabs,
  FASTTab,
  FASTTabPanel,
  FASTCard,
  FASTButton,
  FASTRadioGroup,
} from "@microsoft/fast-components";
import { TypeExample } from "./type-example";
import { ContentSample } from "./content-sample";
import { TypeStyles, ArticleTypeStyles, SectionTypeStyles } from "./type-styles";

FASTDesignSystemProvider;
FASTSlider;
FASTTabs;
FASTTab;
FASTTabPanel;
FASTCard;
FASTButton;
FASTRadioGroup;
TypeExample;
ContentSample;

const template = html<TypeExplorer>`
  <fast-design-system-provider use-defaults background-color="#FFFFFF">
    <div class="row">
      <div>
        <fast-radio-group orientation="vertical" value="${(x) => x.presetIndex}" @change="${(x, c) => x.handlePresetIndex(c.event.target)}">
          <label slot="label">Preset</label>
          ${repeat((x) => x.presets, html`<fast-radio value="${(x, c) => c.index}">${(x, c) => x.name}</fast-radio>`, { positioning: true })}
        </fast-radio-group>
      </div>
      <div>
        <div class="row">
          <div class="col">
            <label>Base font size</label>
            <div class="row">
              <fast-slider max="100" value="${(x) => x.baseFontSize}" @change="${(x, c) => (x.baseFontSize = c.event.target.value)}"></fast-slider>
              <span>${(x) => x.baseFontSize}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Type ramp scale</label>
            <div class="row">
              <fast-slider
                min="1"
                max="2"
                step="0.01"
                value="${(x) => x.typeRampScale}"
                @change="${(x, c) => (x.typeRampScale = c.event.target.value)}"
              ></fast-slider>
              <span>${(x) => x.typeRampScale}</span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label>Line height scale</label>
            <div class="row">
              <fast-slider
                min="1"
                max="2"
                step="0.01"
                value="${(x) => x.lineHeightScale}"
                @change="${(x, c) => (x.lineHeightScale = c.event.target.value)}"
              ></fast-slider>
              <span>${(x) => x.lineHeightScale}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fast-tabs>
      <fast-tab>Type ramp</fast-tab>
      <fast-tab>Headings</fast-tab>
      <fast-tab-panel>
        <div>
          <div style="display: flex; margin-top: 20px;">
            <label style="width: 60px">Offset</label>
            <label style="width: 80px">Size</label>
            <label>Sample</label>
          </div>
          <fast-design-system-provider ${ref("design1")}>
            <type-example offset="-2" sizeLabel="${(x) => x.getSizeLabel(-2)}"></type-example>
            <type-example offset="-1" sizeLabel="${(x) => x.getSizeLabel(-1)}"></type-example>
            <type-example offset="0" sizeLabel="${(x) => x.getSizeLabel(0)}"></type-example>
            <type-example offset="1" sizeLabel="${(x) => x.getSizeLabel(1)}"></type-example>
            <type-example offset="2" sizeLabel="${(x) => x.getSizeLabel(2)}"></type-example>
            <type-example offset="3" sizeLabel="${(x) => x.getSizeLabel(3)}"></type-example>
            <type-example offset="4" sizeLabel="${(x) => x.getSizeLabel(4)}"></type-example>
            <type-example offset="5" sizeLabel="${(x) => x.getSizeLabel(5)}"></type-example>
            <type-example offset="6" sizeLabel="${(x) => x.getSizeLabel(6)}"></type-example>
          </fast-design-system-provider>
        </div>
      </fast-tab-panel>
      <fast-tab-panel>
        <div>
          <p>This tab shows sample content with adaptive styles applied using common type elements or classes</p>
          <div class="row">
            <content-sample contentType="${(x) => x.contentType}"></content-sample>
            <fast-design-system-provider ${ref("design2")}>
              <content-sample contentType="${(x) => x.contentType}" styled></content-sample>
            </fast-design-system-provider>
          </div>
        </div>
      </fast-tab-panel>
    </fast-tabs>
  </fast-design-system-provider>
`;

const styles = css`
  ${TypeStyles}

  :host {
    display: block;
  }

  .row {
    display: flex;
  }
  .row > * {
    flex-grow: 1;
    margin-right: 12px;
  }
  .row > *:last-child {
    margin-right: 0;
  }

  .col {
    display: flex;
    flex-direction: column;
  }

  .styled h1 {
    color: red;
  }
`;

@customElement({
  name: "type-explorer",
  template,
  styles,
})
export class TypeExplorer extends FASTElement {
  private presetDefaults = {
    baseFontSize: 14,
    typeRampScale: 1.2,
    lineHeightScale: 1.3,
    contentType: "article",
  };

  @observable presets = [
    Object.assign({}, this.presetDefaults, {
      name: "Simple type scale",
    }),
    Object.assign({}, this.presetDefaults, {
      name: "NY Times section",
      baseFontSize: 15,
      typeRampScale: 1.15,
      contentType: "section",
    }),
  ];

  @attr presetIndex: number = 0;

  @attr baseFontSize: number = 14;
  @attr typeRampScale: number = 1.2;
  @attr lineHeightScale: number = 1.3;
  @attr contentType: string = "article";

  @observable typeStyles: ElementStyles;

  design1: FASTDesignSystemProvider;
  design2: FASTDesignSystemProvider;

  connectedCallback(): void {
    this.typeStyles = TypeStyles;

    super.connectedCallback();
  }

  public updateProperties(index: number): void {
    this.presetIndex = index;

    const spec = this.presets[index];
    this.baseFontSize = spec.baseFontSize;
    this.typeRampScale = spec.typeRampScale;
    this.lineHeightScale = spec.lineHeightScale;
    this.contentType = spec.contentType;

    console.log("Setting type styles");
    const customStyles: ElementStyles = spec.contentType === "article" ? ArticleTypeStyles : SectionTypeStyles;
    this.typeStyles = css`
      ${TypeStyles} ${customStyles}
    `;
  }

  public handlePresetIndex(target: EventTarget): void {
    if (target.checked) {
      this.updateProperties(target.value);
    }
  }

  baseFontSizeChanged(): void {
    this.calcTypeRamp(this.design1);
    this.calcTypeRamp(this.design2);
  }

  typeRampScaleChanged(oldValue: any, newValue: any): void {
    this.typeRampScale = this.roundValue(newValue, 2);
    this.calcTypeRamp(this.design1);
    this.calcTypeRamp(this.design2);
  }

  lineHeightScaleChanged(oldValue: any, newValue: any): void {
    this.lineHeightScale = this.roundValue(newValue, 2);
    this.calcTypeRamp(this.design1);
    this.calcTypeRamp(this.design2);
  }

  getOffsetSize(offset: number): number {
    return this.roundValue(this.baseFontSize * Math.pow(this.typeRampScale, offset));
  }

  getOffsetHeight(offset: number): string {
    //return this.roundValue(this.getOffsetSize(offset) * this.lineHeightScale);
    return "" + this.lineHeightScale;
  }

  getSizeLabel(offset: number): string {
    return this.getOffsetSize(offset) + "px"; // + this.getOffsetHeight(offset);
  }

  calcTypeRamp(design: FASTDesignSystemProvider): void {
    if (design) {
      design.typeRampMinus2FontSize = this.getOffsetSize(-2) + "px";
      design.typeRampMinus2LineHeight = this.getOffsetHeight(-2);
      design.typeRampMinus1FontSize = this.getOffsetSize(-1) + "px";
      design.typeRampMinus1LineHeight = this.getOffsetHeight(-1);
      design.typeRampBaseFontSize = this.getOffsetSize(0) + "px";
      design.typeRampBaseLineHeight = this.getOffsetHeight(0);
      design.typeRampPlus1FontSize = this.getOffsetSize(1) + "px";
      design.typeRampPlus1LineHeight = this.getOffsetHeight(1);
      design.typeRampPlus2FontSize = this.getOffsetSize(2) + "px";
      design.typeRampPlus2LineHeight = this.getOffsetHeight(2);
      design.typeRampPlus3FontSize = this.getOffsetSize(3) + "px";
      design.typeRampPlus3LineHeight = this.getOffsetHeight(3);
      design.typeRampPlus4FontSize = this.getOffsetSize(4) + "px";
      design.typeRampPlus4LineHeight = this.getOffsetHeight(4);
      design.typeRampPlus5FontSize = this.getOffsetSize(5) + "px";
      design.typeRampPlus5LineHeight = this.getOffsetHeight(5);
      design.typeRampPlus6FontSize = this.getOffsetSize(6) + "px";
      design.typeRampPlus6LineHeight = this.getOffsetHeight(6);
    }
  }

  private roundValue(value: number, precision: number = 0): number {
    const multiple: number = Math.pow(10, precision);
    return Math.round(value * multiple) / multiple;
  }
}
