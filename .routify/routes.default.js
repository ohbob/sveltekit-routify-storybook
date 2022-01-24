

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
    },
    {
      "meta": {},
      "id": "_default_one",
      "name": "one",
      "module": false,
      "file": {
        "path": "src/pages/one",
        "dir": "src/pages",
        "base": "one",
        "ext": "",
        "name": "one"
      },
      "children": [
        {
          "meta": {},
          "id": "_default_one_index_svelte",
          "name": "index",
          "module": () => import('../src/pages/one/index.svelte'),
          "file": {
            "path": "src/pages/one/index.svelte",
            "dir": "src/pages/one",
            "base": "index.svelte",
            "ext": ".svelte",
            "name": "index"
          },
          "children": []
        },
        {
          "meta": {},
          "id": "_default_one_two",
          "name": "two",
          "module": false,
          "file": {
            "path": "src/pages/one/two",
            "dir": "src/pages/one",
            "base": "two",
            "ext": "",
            "name": "two"
          },
          "children": [
            {
              "meta": {},
              "id": "_default_one_two_index_svelte",
              "name": "index",
              "module": () => import('../src/pages/one/two/index.svelte'),
              "file": {
                "path": "src/pages/one/two/index.svelte",
                "dir": "src/pages/one/two",
                "base": "index.svelte",
                "ext": ".svelte",
                "name": "index"
              },
              "children": []
            }
          ]
        }
      ]
    }
  ]
}