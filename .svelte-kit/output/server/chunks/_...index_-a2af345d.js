var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _regex, _urlReflector;
import { n as noop, a as safe_not_equal, b as subscribe, r as run_all, i as is_function, g as get_store_value, d as getContext, c as create_ssr_component, s as setContext, v as validate_component, m as missing_component, f as globals, o as onDestroy } from "./index-774a777c.js";
var routes = {
  "meta": {},
  "id": "_default",
  "file": {
    "path": "src/pages",
    "dir": "src",
    "base": "pages",
    "ext": "",
    "name": "pages"
  },
  "rootName": "default",
  "routifyDir": import.meta.url,
  "children": [
    {
      "meta": {},
      "id": "_default_a",
      "name": "a",
      "module": false,
      "file": {
        "path": "src/pages/a",
        "dir": "src/pages",
        "base": "a",
        "ext": "",
        "name": "a"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_a___reset_svelte",
          "name": "__reset",
          "module": () => import("./__reset-69eb23c9.js"),
          "file": {
            "path": "src/pages/a/__reset.svelte",
            "dir": "src/pages/a",
            "base": "__reset.svelte",
            "ext": ".svelte",
            "name": "__reset"
          },
          "children": []
        },
        {
          "meta": {},
          "id": "_default_a_page_svelte",
          "name": "page",
          "module": () => import("./page-39e5ee49.js"),
          "file": {
            "path": "src/pages/a/page.svelte",
            "dir": "src/pages/a",
            "base": "page.svelte",
            "ext": ".svelte",
            "name": "page"
          },
          "children": []
        }
      ]
    },
    {
      "meta": {},
      "id": "_default_index_svelte",
      "name": "index",
      "module": () => import("./index-89cba50d.js"),
      "file": {
        "path": "src/pages/index.svelte",
        "dir": "src/pages",
        "base": "index.svelte",
        "ext": ".svelte",
        "name": "index"
      },
      "children": []
    }
  ]
};
const subscriber_queue = [];
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  const auto = fn.length < 2;
  return readable(initial_value, (set) => {
    let inited = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set);
      if (auto) {
        set(result);
      } else {
        cleanup = is_function(result) ? result : noop;
      }
    };
    const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
      values[i] = value;
      pending &= ~(1 << i);
      if (inited) {
        sync();
      }
    }, () => {
      pending |= 1 << i;
    }));
    inited = true;
    sync();
    return function stop() {
      run_all(unsubscribers);
      cleanup();
    };
  });
}
const spreadsLast = (node) => node.name.match(/\[\.\.\.(.+)\]/) ? 1 : -1;
const getNearestAncestorNodeWithSpreadParam = (routeFragments) => {
  for (const fragment of [...routeFragments].reverse()) {
    for (const node of fragment.node.parent?.children || []) {
      const match = node.name.match(/\[\.\.\.(.+)\]/);
      if (match)
        return node;
    }
  }
};
const getUrlFragments = (url) => url.replace(/[?#].+/, "").replace(/\/$/, "").split("/").slice(1);
const indexOfNode = (fragments, node) => fragments.findIndex((fragment) => fragment.node === node);
const URIDecodeObject = (obj) => Object.entries(obj).reduce((_return, [key, value]) => ({
  ..._return,
  [key]: decodeURI(value)
}), {});
class RouteFragment {
  constructor(route, node, urlFragment) {
    __publicField(this, "_params", {});
    this.route = route;
    this.node = node;
    this.load = void 0;
    this.urlFragment = urlFragment;
    Object.defineProperty(this, "route", { enumerable: false });
  }
  get params() {
    return this._params;
  }
  setParams(params) {
    this._params = URIDecodeObject(params);
  }
  getParamsFromFragment() {
    const { getFieldsFromName, getValuesFromPath, mapFieldsWithValues } = this.route.router.instance.utils;
    return mapFieldsWithValues(getFieldsFromName(this.node.name), getValuesFromPath(this.node.regex, this.urlFragment));
  }
}
const URL_STATES = ["pushState", "replaceState", "popState"];
class Route {
  constructor(router2, url, mode) {
    __publicField(this, "allFragments", []);
    __publicField(this, "loaded");
    __publicField(this, "load", {
      status: 200,
      error: null,
      maxage: null,
      props: {},
      redirect: null
    });
    this.router = router2;
    this.url = url;
    this.mode = mode;
    if (!router2.rootNode) {
      this.router.log.error("Can't navigate without a rootNode");
      const err = new Error("Can't navigate without a rootNode");
      Object.assign(err, { routify: { router: router2 } });
      throw err;
    }
    if (!URL_STATES.includes(mode))
      throw new Error("url.mode must be pushState, replaceState or popState");
    this.allFragments = this._createFragments();
  }
  get fragments() {
    const moduleFragments = this.allFragments.filter((f) => f.node.module);
    return this.router.transformFragments.run(moduleFragments);
  }
  get params() {
    const match = this.url.match(/\?.+/);
    const query = match && match[0] || "";
    return Object.assign({}, ...this.allFragments.map((fragment) => fragment.params), this.router.queryHandler.parse(query, this));
  }
  async loadRoute() {
    const { router: router2 } = this;
    const pipeline = [
      this.runBeforeUrlChangeHooks,
      this.loadComponents,
      this.runGuards,
      this.runPreloads
    ];
    this.loaded = new Promise(async (resolve, reject) => {
      for (const pretask of pipeline) {
        const passedPreTask = await pretask.bind(this)();
        const routerHasNewerPendingRoute = this !== router2.pendingRoute.get();
        if (!router2.pendingRoute.get()) {
          resolve({ route: router2.activeRoute.get() });
          return;
        } else if (routerHasNewerPendingRoute) {
          router2.pendingRoute.get().loaded.then(resolve).catch(reject);
          return;
        } else if (!passedPreTask) {
          router2.pendingRoute.set(null);
          return;
        }
      }
      const $activeRoute = this.router.activeRoute.get();
      if ($activeRoute)
        router2.history.push($activeRoute);
      router2.activeRoute.set(this);
      router2.afterUrlChange.run({
        route: this,
        history: [...router2.history].reverse()
      });
      router2.pendingRoute.set(null);
      resolve({ route: this });
    });
    return this.loaded;
  }
  async loadComponents() {
    await Promise.all(this.fragments.map(async (fragment) => {
      const module = await fragment.node.module();
      fragment.node.module = () => module;
    }));
    return true;
  }
  async runPreloads() {
    const ctx = {
      route: this,
      node: [...this.fragments].pop().node
    };
    for (const fragment of this.fragments) {
      if (fragment.node.module()?.load) {
        fragment.load = await fragment.node.module().load(ctx);
        Object.assign(this.load, fragment.load);
        if (this.load.redirect)
          return this.router.url.replace(this.load.redirect);
      }
    }
    return this;
  }
  async runGuards() {
    const components = this.fragments.map((fragment) => fragment.node.module()).filter((module) => module?.guard);
    for (const module of components) {
      console.warn('"guard" will be deprecated. Please use "load.redirect" instead.');
      const result = await module.guard(this);
      if (!result)
        return false;
    }
    return true;
  }
  async runBeforeUrlChangeHooks() {
    return await this.router.beforeUrlChange.run({ route: this });
  }
  _createFragments() {
    const { url = "", router: router2 } = this;
    const { rootNode } = router2;
    let currentSpreadParam = [];
    let currentNode = rootNode;
    const createFragment = (node, urlFragment, spreadParam) => {
      const fragment = new RouteFragment(this, node, urlFragment);
      const spreadMatch = node.name.match(/\[\.\.\.(.+)\]/);
      if (spreadMatch)
        spreadParam.push(urlFragment);
      else
        spreadParam = [];
      if (spreadMatch)
        fragment.setParams({ [spreadMatch[1]]: spreadParam });
      else
        fragment.setParams(fragment.getParamsFromFragment());
      return fragment;
    };
    const urlFragments = getUrlFragments(url);
    const routeFragments = [new RouteFragment(this, currentNode, "")];
    for (let ufIndex = 0; ufIndex < urlFragments.length; ufIndex++) {
      const urlFragment = urlFragments[ufIndex];
      const children = currentNode.children.filter((child2) => !child2.name.startsWith("_"));
      const child = children.find((child2) => child2.name === urlFragment) || children.sort(spreadsLast).find((child2) => child2.regex.test(urlFragment));
      if (child) {
        routeFragments.push(createFragment(child, urlFragment, currentSpreadParam));
        currentNode = child;
      } else if (currentSpreadParam.length) {
        currentSpreadParam.push(urlFragment);
      } else {
        const nearestSpreadNode = getNearestAncestorNodeWithSpreadParam(routeFragments);
        if (nearestSpreadNode) {
          const nodeIndex = indexOfNode(routeFragments, nearestSpreadNode);
          const removed = routeFragments.splice(nodeIndex);
          ufIndex = ufIndex - removed.length;
          routeFragments.push(createFragment(nearestSpreadNode, urlFragments[ufIndex], currentSpreadParam));
          currentNode = nearestSpreadNode;
        } else {
          const fallback = currentNode._fallback;
          if (!fallback) {
            throw new Error(`router: "${router2.name || "[default]"}" could not find route: ${url}`);
          }
          routeFragments.splice(fallback.level);
          routeFragments.push(new RouteFragment(this, fallback, ""));
          break;
        }
      }
    }
    let lastNode = routeFragments[routeFragments.length - 1].node;
    while (lastNode) {
      lastNode = lastNode.children.find((node) => node.name === "index");
      if (lastNode)
        routeFragments.push(new RouteFragment(this, lastNode, ""));
    }
    if (!routeFragments.filter(({ node }) => node.module).length)
      throw new Error(`could not find route: ${url}`);
    return routeFragments;
  }
}
const fromEntries = (iterable) => {
  return [...iterable].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
};
const populateUrl = (path, params, route) => {
  const overloads = {};
  Object.entries(params).forEach(([param, value]) => {
    const RE = new RegExp(`\\[${param}\\]|\\:${param}`);
    if (path.match(RE))
      path = path.replace(`[${param}]`, encodeURI(value));
    else
      overloads[param] = value;
  });
  const query = route.router.queryHandler.stringify(overloads, route);
  return path + query;
};
const urlFromAddress = () => (({ pathname, search, hash }) => pathname + search + hash)(window.location);
const contexts = {
  get router() {
    return getContext("routify-fragment-context").route.router;
  },
  get fragment() {
    return getContext("routify-fragment-context");
  }
};
const getContextMaybe = (name) => {
  try {
    return getContext(name);
  } catch (err) {
  }
};
const getable = (value, start) => {
  const store = writable(value, start);
  return Object.assign(store, { get: () => get_store_value(store) });
};
const identicalRoutes = (...routes2) => routes2.map((route) => JSON.stringify([route?.allFragments, route?.url])).reduce((prev, curr) => prev === curr && curr);
class BaseReflector {
  constructor(router2) {
    this.router = router2;
    this.log = this.router.log;
  }
  install() {
  }
  uninstall() {
  }
  reflect() {
  }
}
const createBrowserAdapter = (opts) => {
  const delimiter = opts?.delimiter || ";";
  return {
    toRouter: (url, router2) => {
      const formatRE = router2.name ? `${router2.name}=(.+?)` : `(.+?)`;
      const RE = new RegExp(`(^|${delimiter})${formatRE}(${delimiter}|$)`);
      const matches = url.match(RE);
      return matches ? matches[2] : "/";
    },
    toBrowser: (routers) => routers.map((r) => (r.name ? `${r.name}=` : "") + r.url.external()).join(delimiter)
  };
};
class Global {
  constructor() {
    __publicField(this, "instances", []);
    __publicField(this, "browserAdapter", createBrowserAdapter());
    __publicField(this, "urlFromBrowser", (router2) => {
      return this.browserAdapter.toRouter(urlFromAddress(), router2);
    });
    if (typeof window !== "undefined")
      window["__routify"] = this;
  }
  get routers() {
    return [].concat(...this.instances.map((instance) => instance.routers));
  }
  register(instance) {
    this.instances.push(instance);
    return this;
  }
}
const globalInstance = new Global();
const defaultRe = /\[(.+?)\]/gm;
class UrlParamUtils {
  constructor(RE = defaultRe) {
    __publicField(this, "getFieldsFromName", (name) => [...name.matchAll(this.RE)].map((v) => v[1]));
    __publicField(this, "getRegexFromName", (name) => new RegExp("^" + name.replace(this.RE, "(.+)") + "$"));
    __publicField(this, "getValuesFromPath", (re, path) => (path.match(re) || []).slice(1));
    __publicField(this, "mapFieldsWithValues", (fields, values) => this.haveEqualLength(fields, values) && fields.reduce((map, field, index) => {
      map[field] = values[index];
      return map;
    }, {}));
    __publicField(this, "haveEqualLength", (fields, values) => {
      if (fields.length !== values.length)
        throw new Error(`fields and values should be of same length
fields: ${JSON.stringify(fields)}
values: ${JSON.stringify(values)}`);
      return true;
    });
    this.RE = RE;
  }
}
class RNode {
  constructor(name, module, instance) {
    __publicField(this, "instance");
    __publicField(this, "parent");
    __publicField(this, "meta", {});
    __publicField(this, "id");
    this.instance = instance;
    this.name = name;
    instance.nodeIndex.push(this);
    this.module = module;
    Object.defineProperty(this, "Instance", { enumerable: false });
    Object.defineProperty(this, "instance", { enumerable: false });
    Object.defineProperty(this, "parent", { enumerable: false });
  }
  appendChild(child) {
    child.parent = this;
  }
  createChild(name, module) {
    const node = this.instance.createNode(name, module);
    this.appendChild(node);
    return node;
  }
  get descendants() {
    return this.instance.nodeIndex.filter((node) => node.ancestors.find((n) => n === this));
  }
  remove() {
    const { nodeIndex } = this.instance;
    const index = nodeIndex.findIndex((node) => node === this);
    nodeIndex.splice(index, 1);
  }
  get ancestors() {
    let node = this;
    const ancestors = [];
    while (node = node.parent)
      ancestors.push(node);
    return ancestors;
  }
  get root() {
    let node = this;
    while (node.parent)
      node = node.parent;
    return node;
  }
  get isRoot() {
    return this === this.root;
  }
  get children() {
    return this.instance.nodeIndex.filter((node) => node.parent === this);
  }
  get level() {
    return (this.parent?.level || 0) + 1;
  }
  traverse(path) {
    const originNode = path.startsWith("/") ? this.root : this;
    const steps = path.split("/").filter((snip) => snip !== ".").filter(Boolean);
    try {
      const target = steps.reduce((target2, step) => step === ".." ? target2.parent : target2.children.find((node) => node.name === step), originNode);
      return target;
    } catch (err) {
      console.error("can't resolve path", path, "from", this.path, "\n", err);
    }
  }
  toJSON() {
    return {
      ...this,
      children: [...this.children]
    };
  }
  get path() {
    return "/" + [this, ...this.ancestors].reverse().map((node) => node.name).filter(Boolean).join("/");
  }
}
const CTX = "routify-fragment-context";
const Node = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { node } = $$props;
  let { passthrough } = $$props;
  const context = { ...getContext(CTX), node };
  setContext(CTX, context);
  let Component2;
  if (node.module)
    node.getRawComponent().then((r) => Component2 = r);
  if ($$props.node === void 0 && $$bindings.node && node !== void 0)
    $$bindings.node(node);
  if ($$props.passthrough === void 0 && $$bindings.passthrough && passthrough !== void 0)
    $$bindings.passthrough(passthrough);
  return `${node.module ? `${Component2 ? `${validate_component(Component2, "Component").$$render($$result, Object.assign(passthrough, { context }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}` : ``}` : `${slots.default ? slots.default({}) : ``}`}`;
});
class RNodeRuntime extends RNode {
  constructor() {
    super(...arguments);
    __privateAdd(this, _regex, {});
    __publicField(this, "importTree", (snapshotRoot) => {
      const queue = [[this, snapshotRoot]];
      while (queue.length) {
        const [node, snapshot] = queue.pop();
        const { children, ...nodeSnapshot } = snapshot;
        Object.assign(node, nodeSnapshot);
        for (const childSnapshot of children) {
          const childNode = node.createChild(snapshot.name || snapshot.rootName || "");
          queue.push([childNode, childSnapshot]);
        }
      }
      return this;
    });
  }
  get regex() {
    const { name } = this;
    if (!__privateGet(this, _regex)[name])
      __privateGet(this, _regex)[name] = this.instance.utils.getRegexFromName(this.name);
    return __privateGet(this, _regex)[name];
  }
  set regex(value) {
    __privateGet(this, _regex)[this.name] = new RegExp(value);
  }
  get children() {
    const nodes = this.instance.nodeIndex;
    return nodes.filter((node) => node.parent === this).sort((prev, curr) => (prev.meta.order || 0) - (curr.meta.order || 0));
  }
  get pages() {
    return this.children.filter((node) => node.name !== "index").filter((node) => !node.meta.fallback).filter((node) => !node.name.startsWith("_")).filter((node) => !node.name.includes("[")).filter((node) => !(node.meta?.order === false));
  }
  getRawComponent() {
    return this.module && new Promise((resolve) => {
      const modulePromise = this.module();
      const rawComponent = modulePromise.then ? modulePromise.then((r) => r.default) : modulePromise.default;
      resolve(rawComponent);
    });
  }
  get component() {
    const node = this;
    return function(options) {
      options.props = {
        ...options.props,
        passthrough: options.props,
        node
      };
      return new Node({ ...options });
    };
  }
  appendChild(child) {
    if (child.instance)
      child.parent = this;
  }
  get _fallback() {
    return this.children.find((node) => node.meta.fallback) || this.parent?._fallback;
  }
}
_regex = new WeakMap();
class Routify {
  constructor(options) {
    __publicField(this, "Node", RNode);
    __publicField(this, "mode", "runtime");
    __publicField(this, "nodeIndex", []);
    __publicField(this, "rootNodes", {});
  }
  createNode(name, module) {
    return new this.Node(name, module, this);
  }
}
class RoutifyRuntime extends Routify {
  constructor(options) {
    super();
    __publicField(this, "Node", RNodeRuntime);
    __publicField(this, "mode", "runtime");
    __publicField(this, "routers", []);
    __publicField(this, "rootNodes", {});
    this.options = options;
    if (options.routes) {
      this.rootNodes[options.routes.rootName || "unnamed"] = this.createNode(options.routes.rootName).importTree(options.routes);
    }
    this.utils = new UrlParamUtils();
    this.global = globalInstance.register(this);
    Object.defineProperty(this, "routers", { enumerable: false });
    this.log = this.global.log;
  }
}
const createHooksCollection = (runner) => {
  const hooks = [];
  const hooksCollection = (hook) => {
    hooks.push(hook);
    return () => hooks.splice(hooks.indexOf(hook), 1);
  };
  hooksCollection.hooks = hooks;
  hooksCollection.run = runner(hooks);
  return hooksCollection;
};
const createPipelineCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((pipedValue, hook) => pipedValue?.then ? pipedValue.then((r) => hook(r, ...rest)) : hook(pipedValue, ...rest), value));
const createSequenceHooksCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((last, hook) => last?.then ? last.then((_) => hook(value, ...rest)) : hook(value, ...rest), value));
const createGuardsCollection = (type) => createHooksCollection((hooks) => (value, ...rest) => hooks.reduce((pipedValue, hook) => pipedValue?.then ? pipedValue.then((r) => r && hook(value, ...rest)) : pipedValue && hook(value, ...rest), value || true));
class AddressReflector extends BaseReflector {
  constructor(router2) {
    super(router2);
    __publicField(this, "reflect", () => {
      const { mode } = get_store_value(this.router.activeRoute);
      if (mode === "popState")
        return false;
      const { routers, browserAdapter } = this.router.instance.global;
      const addressRouters = routers.filter((router2) => router2.urlReflector instanceof this.constructor);
      const url = browserAdapter.toBrowser(addressRouters);
      history[`${mode}Native`]({}, "", url);
    });
    const { instance, urlRewrites } = router2;
    const { urlFromBrowser, browserAdapter } = instance.global;
    if (!history["onPushstate"]) {
      polyfillHistory();
    }
    const createStateEventHandler = (method) => {
      return function(data, title, url) {
        const routerName = data?.routify?.router ?? false;
        if (routerName === false)
          url = browserAdapter.toRouter(url, router2);
        else if (routerName !== router2.name)
          return false;
        for (const rewrite of urlRewrites)
          url = rewrite.toInternal(url, { router: router2 });
        router2.url[method](url);
      };
    };
    this.absorb = () => router2.url.replace(urlFromBrowser(router2));
    this._pushstateHandler = createStateEventHandler("push");
    this._replacestateHandler = createStateEventHandler("replace");
    this._popstateHandler = () => router2.url.pop(urlFromBrowser(router2));
  }
  install() {
    this.hooks = [
      history["onPushstate"](this._pushstateHandler),
      history["onReplacestate"](this._replacestateHandler),
      history["onPopstate"](this._popstateHandler)
    ];
    if (!get_store_value(this.router.activeRoute))
      this.absorb();
    else
      this.reflect();
  }
  uninstall() {
    this.hooks.forEach((unreg) => unreg());
    setTimeout(() => this.reflect());
  }
}
function polyfillHistory() {
  const hooks = {
    onPushstate: createSequenceHooksCollection(),
    onReplacestate: createSequenceHooksCollection(),
    onPopstate: createSequenceHooksCollection()
  };
  Object.assign(history, hooks);
  const { pushState, replaceState } = history;
  history["pushStateNative"] = pushState;
  history["replaceStateNative"] = replaceState;
  history.pushState = hooks.onPushstate.run;
  history.replaceState = hooks.onReplacestate.run;
  window.addEventListener("popstate", hooks.onPopstate.run);
  return true;
}
class InternalReflector extends BaseReflector {
}
const sleep = () => new Promise(requestAnimationFrame);
const scrollIsIdle = (timeout = 100) => new Promise((resolve) => {
  let scrollTimeout;
  const listener = async (e) => {
    clearTimeout(scrollTimeout);
    await sleep();
    scrollTimeout = setTimeout(() => {
      resolve();
      removeEventListener("scroll", listener);
    }, timeout);
  };
  addEventListener("scroll", listener);
});
const isParentToARouter = (elem) => globalInstance.routers.find((router2) => router2.parentElem === elem);
const createScrollHandler = () => {
  const isScrolling = writable(false);
  const run = ({ route, history: history2, ...rest }) => {
    const [path, hash] = route.url.split("#");
    const [prevPath, _prevHash] = history2[0]?.url.split("#") || [];
    const softScroll = async (shouldObserve) => {
      const samePath = path === prevPath;
      const elem = document.getElementById(hash);
      if (elem)
        elem.scrollIntoView({ behavior: samePath ? "smooth" : "auto" });
      if (samePath && elem) {
        isScrolling.set(true);
        await scrollIsIdle();
        isScrolling.set(false);
      }
      if (!samePath && shouldObserve) {
        const observer = new MutationObserver(() => softScroll());
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        });
        setTimeout(observer.disconnect.bind(observer), 500);
      }
    };
    const resetScroll = (element) => {
      if (element) {
        element.scrollTop = 0;
        const parent = element.parentElement;
        if (parent && parent.scrollTo && parent?.dataset["routify-scroll"] !== "lock" && !isParentToARouter(parent))
          resetScroll(element.parentElement);
      }
    };
    if (hash)
      softScroll(true);
    else
      resetScroll(route.router.parentElem);
  };
  return { isScrolling, run };
};
const plugin = {
  beforeRouterInit: ({ router: router2 }) => {
    const { isScrolling, run } = createScrollHandler();
    router2.afterUrlChange(run);
    router2["scrollHandler"] = { isScrolling };
  }
};
var reset = () => ({
  beforeUrlChange: ({ route }) => {
    const fragments = route.allFragments;
    fragments.forEach((fragment) => {
      const { reset: reset2 } = fragment.node.meta;
      if (reset2) {
        const index = fragments.indexOf(fragment);
        const deleteCount = reset2 === true ? index : Number(reset2);
        const start = index - deleteCount;
        fragments.splice(start, index);
      }
    });
    return true;
  }
});
const stripNullFields = (obj) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
const normalizeRouterOptions = (options, config) => {
  config = config || {
    name: "",
    beforeRouterInit: [],
    afterRouterInit: [],
    urlRewrite: [],
    beforeUrlChange: [],
    afterUrlChange: [],
    transformFragments: [],
    onDestroy: []
  };
  const { plugins, ...optionsOnly } = options;
  const optionsGroups = [...plugins || [], optionsOnly];
  optionsGroups.forEach((pluginOptions) => {
    if ("plugin" in pluginOptions)
      normalizeRouterOptions(pluginOptions, config);
    Object.entries(pluginOptions).forEach(([field, value]) => {
      if (Array.isArray(config[field]))
        config[field].push(...[value].flat().filter(Boolean));
      else
        config[field] = value || config[field];
    });
  });
  return config;
};
const defaultPlugins = [plugin, reset()];
const _Router = class {
  constructor(input) {
    __publicField(this, "pendingRoute", getable(null));
    __publicField(this, "activeRoute", getable(null));
    __privateAdd(this, _urlReflector, null);
    __publicField(this, "urlRewrites", []);
    __publicField(this, "beforeRouterInit", createSequenceHooksCollection());
    __publicField(this, "afterRouterInit", createSequenceHooksCollection());
    __publicField(this, "beforeUrlChange", createGuardsCollection());
    __publicField(this, "afterUrlChange", createSequenceHooksCollection());
    __publicField(this, "transformFragments", createPipelineCollection());
    __publicField(this, "onDestroy", createSequenceHooksCollection());
    __publicField(this, "parentElem", null);
    __publicField(this, "queryHandler", {
      parse: (search, route) => fromEntries(new URLSearchParams(search)),
      stringify: (params, route) => {
        const query = new URLSearchParams(params).toString();
        return query ? `?${query}` : "";
      }
    });
    __publicField(this, "url", {
      internal: () => this.url.getPending() || this.url.getActive(),
      external: () => this.getExternalUrl(),
      getActive: () => get_store_value(this.activeRoute)?.url,
      getPending: () => get_store_value(this.pendingRoute)?.url,
      toString: () => this.url.internal(),
      set: this._setUrl,
      push: (url) => this._setUrl(url, "pushState"),
      replace: (url) => this._setUrl(url, "replaceState"),
      pop: (url) => this._setUrl(url, "popState")
    });
    __publicField(this, "ready", (() => new Promise((resolve) => {
      let unsub;
      unsub = this.activeRoute.subscribe((route) => {
        if (route)
          resolve();
        if (unsub)
          unsub();
      });
    }))());
    __publicField(this, "history", []);
    __publicField(this, "setParentElem", (elem) => this.parentElem = elem.parentElement);
    __publicField(this, "getExternalUrl", (url) => {
      const result = this.urlRewrites.reduce((_url, rewrite) => rewrite.toExternal(_url, { router: this }), url || this.url.internal());
      return result;
    });
    __publicField(this, "getInternalUrl", (url) => this.urlRewrites.reduce((_url, rewrite) => rewrite.toInternal(_url, { router: this }), url));
    const { subscribe: subscribe2, set } = writable(this);
    this.subscribe = subscribe2;
    this.triggerStore = () => set(this);
    input.plugins = [...input.plugins || [], ...defaultPlugins].filter(Boolean);
    this.init(input);
    this.params = derived(this.activeRoute, ($activeRoute) => $activeRoute.params);
    this.afterUrlChange(() => setTimeout(() => __privateGet(this, _urlReflector).reflect()));
    this.activeRoute.get = () => get_store_value(this.activeRoute);
    this.pendingRoute.get = () => get_store_value(this.pendingRoute);
  }
  init(input) {
    const firstInit = !this.options;
    input = stripNullFields(input);
    this.options = normalizeRouterOptions({ ...this.options, ...input });
    let {
      instance,
      rootNode,
      name,
      routes: routes2,
      urlRewrite,
      urlReflector,
      url,
      passthrough,
      beforeUrlChange,
      afterUrlChange,
      transformFragments,
      onDestroy: onDestroy2,
      beforeRouterInit,
      afterRouterInit,
      queryHandler
    } = this.options;
    if (queryHandler)
      this.queryHandler = queryHandler;
    beforeUrlChange.forEach(this.beforeUrlChange);
    transformFragments.forEach(this.transformFragments);
    afterUrlChange.forEach(this.afterUrlChange);
    onDestroy2.forEach(this.onDestroy);
    beforeRouterInit.forEach(this.beforeRouterInit);
    afterRouterInit.forEach(this.afterRouterInit);
    this.beforeRouterInit.run({ router: this, firstInit });
    const parentCmpCtx = getContextMaybe("routify-fragment-context");
    this.instance = instance || this.instance || parentCmpCtx?.route.router.instance || globalInstance.instances[0] || new RoutifyRuntime({});
    this.name = name;
    this.urlRewrites = urlRewrite;
    if (passthrough && !(passthrough instanceof _Router))
      passthrough = parentCmpCtx?.route.router || passthrough;
    this.passthrough = passthrough || this.passthrough;
    globalInstance.instances.forEach((inst) => {
      const index = inst.routers.indexOf(this);
      if (index !== -1)
        inst.routers.splice(index, 1);
    });
    this.instance.routers.push(this);
    if (routes2)
      this.importRoutes(routes2);
    this.parentCmpCtx = parentCmpCtx;
    this.rootNode = rootNode || this.rootNode || this.instance.rootNodes.default;
    if (this.url.getActive()) {
      this._setUrl(this.url.getActive(), "pushState", true);
    }
    const shouldInstallUrlReflector = !this.urlReflector || urlReflector && !(this.urlReflector instanceof urlReflector);
    if (shouldInstallUrlReflector) {
      urlReflector = urlReflector || (typeof window != "undefined" ? AddressReflector : InternalReflector);
      this.setUrlReflector(urlReflector);
    }
    if (url)
      this.url.replace(url);
    this.triggerStore();
    this.afterRouterInit.run({ router: this, firstInit });
  }
  importRoutes(routes2) {
    this.rootNode = this.instance.createNode().importTree(routes2);
    this.instance.rootNodes[routes2.rootName || "unnamed"] = this.rootNode;
  }
  async _setUrl(url, mode, isInternal) {
    if (!isInternal)
      url = this.getInternalUrl(url);
    url = url || "/";
    url = url.replace(/(.+)\/+([#?]|$)/, "$1$2");
    const { activeRoute, pendingRoute } = this;
    activeRoute.get();
    if (!url.startsWith("/"))
      url = url.replace(new URL(url).origin, "");
    const route = new Route(this, url, mode);
    const currentRoute = pendingRoute.get() || activeRoute.get();
    if (identicalRoutes(currentRoute, route)) {
      return true;
    }
    pendingRoute.set(route);
    await route.loadRoute();
    return true;
  }
  destroy() {
    this.instance.routers = this.instance.routers.filter((router2) => router2 !== this);
    this.onDestroy.run({ router: this });
  }
  get urlReflector() {
    return __privateGet(this, _urlReflector);
  }
  setUrlReflector(UrlReflector) {
    __privateGet(this, _urlReflector)?.uninstall();
    __privateSet(this, _urlReflector, new UrlReflector(this));
    __privateGet(this, _urlReflector).install();
    this.triggerStore();
  }
};
let Router = _Router;
_urlReflector = new WeakMap();
const createRouter = (options) => new Router(options);
const Noop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { context = null } = $$props;
  if ($$props.context === void 0 && $$bindings.context && context !== void 0)
    $$bindings.context(context);
  return `${slots.default ? slots.default({}) : ``}`;
});
const { Object: Object_1 } = globals;
const Component = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fragment;
  let restFragments;
  let node;
  let load2;
  let route;
  let { fragments } = $$props;
  let { decorator = null } = $$props;
  let { props = {} } = $$props;
  let context = {};
  setContext("routify-fragment-context", context);
  if ($$props.fragments === void 0 && $$bindings.fragments && fragments !== void 0)
    $$bindings.fragments(fragments);
  if ($$props.decorator === void 0 && $$bindings.decorator && decorator !== void 0)
    $$bindings.decorator(decorator);
  if ($$props.props === void 0 && $$bindings.props && props !== void 0)
    $$bindings.props(props);
  [fragment, ...restFragments] = [...fragments];
  ({ node, load: load2, route } = fragment);
  context = Object.assign(context, { route, node, load: load2, fragment });
  return `${validate_component(decorator || Noop || missing_component, "svelte:component").$$render($$result, { context }, {}, {
    default: () => {
      return `${validate_component(fragment.node.module().default || missing_component, "svelte:component").$$render($$result, Object_1.assign({ context }, props, load2?.props), {}, {
        default: ({ props: props2, decorator: decorator2 }) => {
          return `${restFragments.length ? `${validate_component(Component, "svelte:self").$$render($$result, {
            fragments: restFragments,
            props: props2,
            decorator: decorator2
          }, {}, {})}` : ``}`;
        }
      })}`;
    }
  })}`;
});
const Router_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let activeRoute;
  let fragments;
  let $activeRoute, $$unsubscribe_activeRoute = noop, $$subscribe_activeRoute = () => ($$unsubscribe_activeRoute(), $$unsubscribe_activeRoute = subscribe(activeRoute, ($$value) => $activeRoute = $$value), activeRoute);
  let { router: router2 = null } = $$props;
  let { routes: routes2 = null } = $$props;
  let { decorator = null } = $$props;
  let { urlReflector = null } = $$props;
  let { instance = null } = $$props;
  let { urlRewrite = null } = $$props;
  let { url = null } = $$props;
  let { name = null } = $$props;
  let { rootNode = null } = $$props;
  let { passthrough = null } = $$props;
  let { beforeRouterInit = null } = $$props;
  let { afterRouterInit = null } = $$props;
  let { beforeUrlChange = null } = $$props;
  let { afterUrlChange = null } = $$props;
  let { transformFragments = null } = $$props;
  let { onDestroy: onDestroy$1 = null } = $$props;
  let { plugins = null } = $$props;
  let { queryHandler = null } = $$props;
  if (typeof window !== "undefined")
    onDestroy(() => router2.destroy());
  if ($$props.router === void 0 && $$bindings.router && router2 !== void 0)
    $$bindings.router(router2);
  if ($$props.routes === void 0 && $$bindings.routes && routes2 !== void 0)
    $$bindings.routes(routes2);
  if ($$props.decorator === void 0 && $$bindings.decorator && decorator !== void 0)
    $$bindings.decorator(decorator);
  if ($$props.urlReflector === void 0 && $$bindings.urlReflector && urlReflector !== void 0)
    $$bindings.urlReflector(urlReflector);
  if ($$props.instance === void 0 && $$bindings.instance && instance !== void 0)
    $$bindings.instance(instance);
  if ($$props.urlRewrite === void 0 && $$bindings.urlRewrite && urlRewrite !== void 0)
    $$bindings.urlRewrite(urlRewrite);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  if ($$props.rootNode === void 0 && $$bindings.rootNode && rootNode !== void 0)
    $$bindings.rootNode(rootNode);
  if ($$props.passthrough === void 0 && $$bindings.passthrough && passthrough !== void 0)
    $$bindings.passthrough(passthrough);
  if ($$props.beforeRouterInit === void 0 && $$bindings.beforeRouterInit && beforeRouterInit !== void 0)
    $$bindings.beforeRouterInit(beforeRouterInit);
  if ($$props.afterRouterInit === void 0 && $$bindings.afterRouterInit && afterRouterInit !== void 0)
    $$bindings.afterRouterInit(afterRouterInit);
  if ($$props.beforeUrlChange === void 0 && $$bindings.beforeUrlChange && beforeUrlChange !== void 0)
    $$bindings.beforeUrlChange(beforeUrlChange);
  if ($$props.afterUrlChange === void 0 && $$bindings.afterUrlChange && afterUrlChange !== void 0)
    $$bindings.afterUrlChange(afterUrlChange);
  if ($$props.transformFragments === void 0 && $$bindings.transformFragments && transformFragments !== void 0)
    $$bindings.transformFragments(transformFragments);
  if ($$props.onDestroy === void 0 && $$bindings.onDestroy && onDestroy$1 !== void 0)
    $$bindings.onDestroy(onDestroy$1);
  if ($$props.plugins === void 0 && $$bindings.plugins && plugins !== void 0)
    $$bindings.plugins(plugins);
  if ($$props.queryHandler === void 0 && $$bindings.queryHandler && queryHandler !== void 0)
    $$bindings.queryHandler(queryHandler);
  {
    {
      const options = {
        instance,
        rootNode,
        name,
        routes: routes2,
        urlRewrite,
        urlReflector,
        passthrough,
        beforeRouterInit,
        afterRouterInit,
        beforeUrlChange,
        afterUrlChange,
        transformFragments,
        onDestroy: onDestroy$1,
        plugins,
        queryHandler
      };
      if (!router2)
        router2 = new Router(options);
      else
        router2.init(options);
    }
  }
  {
    if (url && url !== router2.url.internal())
      router2.url.replace(url);
  }
  $$subscribe_activeRoute(activeRoute = router2.activeRoute);
  fragments = $activeRoute?.fragments || [];
  $$unsubscribe_activeRoute();
  return `${$activeRoute ? `<div style="${"display: contents"}">${validate_component(Component, "Component").$$render($$result, { fragments, decorator }, {}, {})}</div>` : ``}

${!router2.parentElem ? `<div></div>` : ``}`;
});
const router = createRouter({ routes });
const load = ({ url }) => router.url.replace(url.path);
const U5B_indexu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Router_1, "Router").$$render($$result, { router }, {}, {})}`;
});
export { U5B_indexu5D as U, contexts as c, derived as d, load as l, populateUrl as p };
