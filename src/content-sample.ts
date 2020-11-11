import { html, customElement, FASTElement, css, attr, observable, ViewTemplate, Observable } from "@microsoft/fast-element";
import { TypeExplorer } from "./type-explorer";

// This represents some level of content for a site or app.
// The requirement here is that basic typographic elements can be shared between various content parts or frameworks.

const articleTemplate = html`
  <em>Basic content like an article or UI where visual scale follows semantic elements.</em>

  <h1>(h1) If all the world is a stage, I want better lighting</h1>

  <p>
    (p) Studies show the quality of light affects people in many different ways. For example, productivity can be positively affected by well-designed
    illumination.
  </p>

  <h2>(h2) Human Needs</h2>

  <p>(p) It's no secret that people are attracted to well-lighted public facilities, commercial shopping districts and parks.</p>

  <h3>(h3) Mood and Atmosphere</h3>

  <p>(p) Good lighting enhances the mood and desirability of these spaces. It contributes greatly to people's sense of well-being.</p>

  <label>(label) Test label</label>

  <!-- The "fancy" class acts like a css property style api. A consumer can override '.fancy' similar to setting individual properties
  a component is advertised to consume. -->
  <p class="fancy">(p) This is the 'fancy' class. If it looks different it's a custom override.</p>

  <h4>(h4) A sample heading</h4>

  <h5>(h5) A sample heading</h5>

  <h6>(h6) A sample heading</h6>
`;

const sectionTemplate = html`
  <em>News site section with grouped content and hero. Group headings are semantic but visually smaller.</em>

  <h1>(h1) Food</h1>

  <div class="highlights">
    <h2>(h2) Highlights</h2>

    <h3>(h3) The Cradle of Global Bagel Baking?</h3>
    <p>(p) A self-taught baker is helping entrepreneurs all over the world, many with not even a schmear of experience, to open bagel shops.</p>

    <h3>(h3) This Spinach-Potato Pie Feels Like a Hug</h3>
    <p>(p) This reassuring dish is just what we need right now, Yotam Ottolenghi writes.</p>
  </div>

  <h2>(h2) Critic's Notebook</h2>

  <h3>(h3) A Burmese Kitchen That Combines Fidelity and Freedom</h3>

  <h3>(h3) The Perfect Afternoon Snack Has Arrived</h3>

  <h2>(h2) The Pour</h2>

  <h3>(h3) A Study in the Subtleties of Northern Rhône Terroirs</h3>

  <h3>(h3) A September Wine Romance</h3>
`;

const template = html<ContentSample>`
  <p>Sample is <strong>${(x) => (x.styled ? "styled" : "unstyled")}</strong></p>

  ${(x) => x.contentTemplate}
`;

const baseStyles = css`
  :host {
    display: block;
    background-color: lightgrey;
    padding: 20px;
    border-radius: 20px;
  }

  em {
    margin-block-end: 40px;
    display: block;
  }
`;

@customElement({
  name: "content-sample",
  template,
  styles: baseStyles,
})
export class ContentSample extends FASTElement {
  @attr({ mode: "boolean" }) styled: boolean;

  @attr contentType: string = "article";
  @observable contentTemplate: ViewTemplate;

  private typeExplorer: TypeExplorer;

  connectedCallback() {
    this.typeExplorer = document.querySelector("type-explorer");
    // Stand-in for getting from the design system provider.
    // Alternative to inject rather than consume.
    const notifier = Observable.getNotifier(this.typeExplorer);
    const that = this;
    const handler = {
      handleChange(source: any, propertyName: string) {
        if (that.styled) {
          that.$fastController.styles = css`
            ${source.typeStyles} ${baseStyles}
          `;
        }
        //console.log("typeStyles changed", source.typeStyles, propertyName);
        // respond to the change here
        // source will be the person instance
        // propertyName will be "name"
      },
    };
    notifier.subscribe(handler, "typeStyles");

    super.connectedCallback();
  }

  styledChanged() {
    if (this.styled) {
      if (this.typeExplorer) {
        this.$fastController.styles = css`
          ${this.typeExplorer.typeStyles} ${baseStyles}
        `;
      }
    } else {
      // Reset some undesirable inheritance.
      this.$fastController.styles = css`
        :host {
          font-size: initial !important;
          line-height: initial !important;
        }

        ${baseStyles}
      `;
    }
  }

  contentTypeChanged() {
    this.contentTemplate = this.contentType === "article" ? articleTemplate : sectionTemplate;
  }

  setStyles() {}
}
