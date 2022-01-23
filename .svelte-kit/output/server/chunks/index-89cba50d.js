import { c as create_ssr_component, b as subscribe, j as add_attribute } from "./index-774a777c.js";
import { c as contexts, d as derived, p as populateUrl } from "./_...index_-a2af345d.js";
const getMRCA = (node1, node2) => {
  const lineage1 = [node1, ...node1.ancestors];
  const lineage2 = [node2, ...node2.ancestors];
  return lineage1.find((node) => lineage2.includes(node));
};
const getPath = (node1, node2) => {
  const lineage1 = [node1, ...node1.ancestors];
  const lineage2 = [node2, ...node2.ancestors];
  const mrca = getMRCA(node1, node2);
  const backtrackSteps = lineage1.indexOf(mrca);
  const backtrackStr = backtrackSteps ? "../".repeat(backtrackSteps) : "";
  const forwardSteps = lineage2.indexOf(mrca);
  const forwardStepsStr = lineage2.slice(0, forwardSteps).reverse().map((n) => n.name).join("/");
  return backtrackStr + forwardStepsStr;
};
const url = {
  subscribe: (run, invalidate) => {
    const { router } = contexts;
    const originalOriginNode = contexts.fragment.node;
    return derived(router.activeRoute, (activeRoute) => {
      const originNode = router.rootNode.traverse(originalOriginNode.path);
      return (inputPath, userParams = {}) => {
        const offset = inputPath.startsWith("/") ? router.rootNode.path : "";
        const targetNode = originNode.traverse(offset + inputPath);
        if (!targetNode) {
          console.error("could not find destination node", inputPath);
          return;
        }
        const mrca = getMRCA(targetNode, router.rootNode);
        const path = "/" + getPath(mrca, targetNode);
        const params = {
          ...inheritedParams(targetNode, activeRoute),
          ...userParams
        };
        const internalUrl = populateUrl(path, params, activeRoute);
        return router.getExternalUrl(internalUrl);
      };
    }).subscribe(run, invalidate);
  }
};
const inheritedParams = (node, route) => {
  const lineage = [node, ...node.ancestors].reverse();
  const params = lineage.map((_node) => route.allFragments.find((fragment) => fragment.node === _node || fragment.node.path === _node.path)?.params);
  return Object.assign({}, ...params);
};
const Pages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $url, $$unsubscribe_url;
  $$unsubscribe_url = subscribe(url, (value) => $url = value);
  $$unsubscribe_url();
  return `<h1>Welcome to SvelteKit + Routify</h1>
<a${add_attribute("href", $url("../a/page"), 0)}>a page</a>`;
});
export { Pages as default };
