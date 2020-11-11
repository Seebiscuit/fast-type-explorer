import { css, ElementStyles, ComposableStyles } from "@microsoft/fast-element";

// This illustrates a placeholder for the ability to get system-generated `TypeStyles` through some means
// that supports individual class overrides `CustomTypeStyles`.

export interface ClassTypeRampMapping {
  name: string;
  rampIndex?: number;
  attributes?: string[];
}

export const generateTypeRampMapping = (classes: ClassTypeRampMapping[]) => {
  const styles: ComposableStyles[] = [];

  for (let i = 0, ii = classes.length; i < ii; ++i) {
    const thisClass: ClassTypeRampMapping = classes[i];
    const namedIndex = thisClass.rampIndex === 0 ? "base" : (thisClass.rampIndex <= 0 ? "minus" : "plus") + "-" + Math.abs(thisClass.rampIndex);
    const attributes: string[] = thisClass.attributes || [];
    if (thisClass.rampIndex) {
      attributes.push(`font-size: var(--type-ramp-${namedIndex}-font-size)`);
      attributes.push(`line-height: var(--type-ramp-${namedIndex}-line-height)`);
    }
    const attr: string = attributes.join(";\n");
    const style: string = `${thisClass.name} {
      ${attr}
  }`;
    styles.push(style);
  }

  return ElementStyles.create(styles);
};

export const ArticleTypeStyles = css`
  h1 {
    color: blue;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 900;
  }
  .large-header {
    font-size: var(--type-ramp-plus-6-font-size);
    line-height: var(--type-ramp-plus-6-line-height);
    font-weight: bold;
  }
  label {
    font-weight: bold;
  }
  /* The fancy class overrides a published "style api" of the content-sample component, similar to if the component consumed css properties. */
  p.fancy {
    color: coral;
  }
`;

// Default values from TypeStyles commented out.

const SectionTypeStyleMapping: ClassTypeRampMapping[] = [
  // { name: "h1", rampIndex: 3 },
  { name: "h2", rampIndex: -2, attributes: ["text-transform: uppercase", "font-weight: lighter"] },
  // { name: "h3", rampIndex: 1 },
  // { name: "h4", rampIndex: 0 },
  // { name: "h5", rampIndex: -1 },
  // { name: "h6", rampIndex: -2 },
  { name: ".highlights", attributes: ["background-color: #80767676", "padding: 10px", "border-radius: 10px"] },
  { name: ".highlights h2", rampIndex: -1 },
  { name: ".highlights h3", rampIndex: 2 },
];

export const SectionTypeStyles = generateTypeRampMapping(SectionTypeStyleMapping);

// Explicit declarations of the above mapping.

/*export const SectionTypeStyles = css`
  h2 {
    font-size: var(--type-ramp-minus-2-font-size);
    line-height: var(--type-ramp-minus-2-line-height);
    text-transform: uppercase;
    font-weight: lighter;
  }
  h3 {
    font-size: var(--type-ramp-plus-1-font-size);
    line-height: var(--type-ramp-plus-1-line-height);
  }
  .highlights {
    background-color: #80767676;
    padding: 10px;
    border-radius: 10px;
  }
  .highlights h2 {
    font-size: var(--type-ramp-minus-1-font-size);
    line-height: var(--type-ramp-minus-1-line-height);
  }
  .highlights h3 {
    font-size: var(--type-ramp-plus-2-font-size);
    line-height: var(--type-ramp-plus-2-line-height);
  }
`;*/

const TypeStyleMapping: ClassTypeRampMapping[] = [
  { name: "*", rampIndex: 0 },
  { name: "h1", rampIndex: 3 },
  { name: "h2", rampIndex: 2 },
  { name: "h3", rampIndex: 1 },
  { name: "h4", rampIndex: 0 },
  { name: "h5", rampIndex: -1 },
  { name: "h6", rampIndex: -2 },
];

export const TypeStyles = generateTypeRampMapping(TypeStyleMapping);

// Explicit declarations of the above mapping.

/*export const TypeStyles = css`
  * {
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
  }
  h1 {
    font-size: var(--type-ramp-plus-3-font-size);
    line-height: var(--type-ramp-plus-3-line-height);
  }
  h2 {
    font-size: var(--type-ramp-plus-2-font-size);
    line-height: var(--type-ramp-plus-2-line-height);
  }
  h3 {
    font-size: var(--type-ramp-plus-1-font-size);
    line-height: var(--type-ramp-plus-1-line-height);
  }
  h4 {
    font-size: var(--type-ramp-base-font-size);
    line-height: var(--type-ramp-base-line-height);
  }
  h5 {
    font-size: var(--type-ramp-minus-1-font-size);
    line-height: var(--type-ramp-minus-1-line-height);
  }
  h6 {
    font-size: var(--type-ramp-minus-2-font-size);
    line-height: var(--type-ramp-minus-2-line-height);
  }
`;*/
