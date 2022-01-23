import { c as create_ssr_component, h as add_styles, e as escape, v as validate_component } from "./index-774a777c.js";
const Test = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label = "Example" } = $$props;
  let { bg = "none" } = $$props;
  let { color = "white" } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0)
    $$bindings.bg(bg);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  return `<button class="${"border-2 p-2 px-4 rounded-full"}"${add_styles({ "background-color": bg, color })}>${escape(label)}</button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Test, "Button").$$render($$result, { bg: "red" }, {}, {})}
  ${validate_component(Test, "Button").$$render($$result, { bg: "green" }, {}, {})}
  ${validate_component(Test, "Button").$$render($$result, { bg: "yellow", color: "black" }, {}, {})}`;
});
export { Page as default };
