

export default {
  "meta": {},
  "id": "_default",
  "module": () => import('../src/pages/_module.svelte'),
  "file": {
    "path": "src/pages/_module.svelte",
    "dir": "src/pages",
    "base": "_module.svelte",
    "ext": ".svelte",
    "name": "_module"
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
          "module": () => import('../src/pages/a/nested/_module.svelte'),
          "file": {
            "path": "src/pages/a/nested/_module.svelte",
            "dir": "src/pages/a/nested",
            "base": "_module.svelte",
            "ext": ".svelte",
            "name": "_module"
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