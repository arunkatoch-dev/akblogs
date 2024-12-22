import { Heading } from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

const classes = {
  1: "text-4xl font-bold",
  2: "text-3xl font-bold",
  3: "text-2xl font-bold",
  4: "text-xl font-bold",
  5: "text-lg font-bold",
  6: "text-base font-bold",
  // ...
};

export const CustomHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const className = classes[level];
    return [
      `h${level}`,
      mergeAttributes(HTMLAttributes, { class: className }),
      0,
    ];
  },
});
