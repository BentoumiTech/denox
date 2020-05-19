const workspace = {
	"scripts": {
		"start": {
			"file": "deno-workspace.ts.ts",
			"deno_options": {
				"reload": true
			}
		}
	},
	"globals": {
		"deno_options": {
			"allow-read": [
				"./files"
			]
		}
	}
};

export { workspace };
