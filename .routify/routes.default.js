

export default {
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
      "id": "_default___layout_svelte",
      "name": "__layout",
      "module": () => import('../src/pages/__layout.svelte'),
      "file": {
        "path": "src/pages/__layout.svelte",
        "dir": "src/pages",
        "base": "__layout.svelte",
        "ext": ".svelte",
        "name": "__layout"
      },
      "children": []
    },
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
          "module": () => import('../src/pages/a/__reset.svelte'),
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
          "id": "_default_a_index_svelte",
          "name": "index",
          "module": () => import('../src/pages/a/index.svelte'),
          "file": {
            "path": "src/pages/a/index.svelte",
            "dir": "src/pages/a",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "children": []
        },
        {
          "meta": {},
          "id": "_default_a_nested",
          "name": "nested",
          "module": false,
          "file": {
            "path": "src/pages/a/nested",
            "dir": "src/pages/a",
            "base": "nested",
            "ext": "",
            "name": "nested"
          },
          "children": [
            {
              "meta": {},
              "id": "_default_a_nested_index_svelte",
              "name": "index",
              "module": () => import('../src/pages/a/nested/index.svelte'),
              "file": {
                "path": "src/pages/a/nested/index.svelte",
                "dir": "src/pages/a/nested",
                "base": "index.svelte",
                "ext": ".svelte",
                "name": "index"
              },
              "children": []
            }
          ]
        },
        {
          "meta": {},
          "id": "_default_a_page_svelte",
          "name": "page",
          "module": () => import('../src/pages/a/page.svelte'),
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
      "module": () => import('../src/pages/index.svelte'),
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
}