export const manifest = {
	appDir: "_app",
	assets: new Set(["favicon.png"]),
	_: {
		mime: {".png":"image/png"},
		entry: {"file":"start-1bb16ee4.js","js":["start-1bb16ee4.js","chunks/vendor-9f24c684.js","chunks/preload-helper-ec9aa979.js"],"css":["assets/start-d5b4de3e.css"]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js')
		],
		routes: [
			{
				type: 'page',
				pattern: /^\/%23__layout\/?$/,
				params: null,
				path: "/#__layout",
				a: [0,2],
				b: [1]
			},
			{
				type: 'page',
				pattern: /^(?:\/(.*))?\/?$/,
				params: (m) => ({ index: m[1] || ''}),
				path: null,
				a: [0,3],
				b: [1]
			}
		]
	}
};
