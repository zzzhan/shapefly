module.exports = function(grunt) {
    return {
      options: {
        index:'src/tpl/index.html',
        framework:'src/tpl/framework.html',
        plugin:'tmp/tpl/plugin.html',
        about:'tmp/tpl/about.html'
      },
	  framework: {
		options: {
			opener:'<%',
			closer:'%>',
			tag:'[tpl]',
			renderer: function(k, v) {
				if(k==='sub_tpl') {
					v = grunt.file.read(this.ctx.dest.replace('tmp', 'src'));
				}
				return v;
			}
		},
        files: {
          'tmp/tpl/plugin.html': [],
          'tmp/tpl/about.html': []
        }
	  },
      index: {
        files: {
          'tmp/index.html': ['src/locales/en-US/main.json'],
          'tmp/index_zh-CN.html': ['src/locales/en-US/main.json','src/locales/zh-CN/main.json']
        }
	  },
      plugin: {
        files: {
          'tmp/pages/plugin/index.html': ['src/locales/en-US/main.json','src/locales/en-US/plugin.json'],
          'tmp/pages/plugin/index_zh-CN.html': ['src/locales/zh-CN/main.json','src/locales/zh-CN/plugin.json']
        }
	  },
      about: {
        files: {
          'tmp/pages/about/index.html': ['src/locales/en-US/main.json','src/locales/en-US/about.json'],
          'tmp/pages/about/index_zh-CN.html': ['src/locales/zh-CN/main.json','src/locales/zh-CN/about.json']
        }
	  }
    };
  };