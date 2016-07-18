module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: "/*! <%= pkg.filename %> <%= grunt.template.today('yyyy-mm-dd') %> */\n",
        mangle: {toplevel: true},
        squeeze: {dead_code: false},
        codegen: {quote_keys: true}
      },
      build: {
		files: {
			'tmp/js/<%= pkg.filename %>.min.js':'src/js/<%=pkg.filename %>.js'
		}
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/js/*.js'
      ]
    },
    concat: {
      options: {
        separator: '',
        stripBanners: true
      },
      css:{
        src: [
          "src/css/*.css",
		  "bower_components/tinymce-plugin-shapefly/dist/tinymce-plugin-shapefly.min.css"
        ],
        dest: "tmp/css/<%=pkg.filename %>.css"
      },
      allinone_js:{
        src: [
          'bower_components/typed.js/dist/typed.min.js',
          'tmp/js/<%=pkg.filename %>.min.js'
        ],
        dest: 'dist/js/<%=pkg.filename %>_allinone.min.js'
      },
	  mce_plugin_shapefly: {
	    src:[
		  'bower_components/shapefly-plugin/dist/shapefly-plugin.min.js',
		  'bower_components/tinymce-plugin-shapefly/dist/tinymce-plugin-shapefly.min.js'
		],
		dest:'dist/js/tinymce-plugin-shapefly.js'
	  }
    },
    copy: {
      build: {
	    files:[{
          expand: true,
          cwd: 'src/',
          src: ['*.*'],
          dest:'dist/'		
		}, {
          expand: true,
          cwd: 'src/img/',
          src: ['**/*'],
          dest:'dist/img/'
        }, {'dist/js/shapefly-plugin.html':'bower_components/shapefly-plugin/dist/shapefly-plugin.min.html'}]
	  }
    },
    cssmin: {
      options: {
        report: 'gzip'
      },
      build: {
        files: {
        'dist/css/<%= pkg.filename %>.min.css':'tmp/css/<%=pkg.filename %>.css'
        }
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
	    files: [{       
          expand: true,
		  cwd: 'tmp',
		  src: '**/*.html',
		  dest: './'
		}]
      }
    },
	clean:{
		all:['dist','tmp'],
		tpl:['tmp/tpl']
	},
    imagemin: {
      prod: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [
          {expand: true, cwd: 'src', src: ['img/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist'}
        ]
      }
    },
    dotpl: require('./locales')(grunt)
  });
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'clean:all', 'dotpl', 'clean:tpl','uglify','copy','concat','cssmin','htmlmin']);
};