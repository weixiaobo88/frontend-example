module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		path: {
			temp: '.tmp',
			dist: 'public',
			view: 'view'
		},
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'<%= path.dist %>/style/style.css': '<%= path.view %>/scss/main.scss'
				}
			}
		},
		watch: {
			css: {
				files: '<%= path.view %>/**/*.scss',
				tasks: ['sass']
			},
			view: {
				files: ['<%= path.view %>/*.html', '<%= path.view %>/images/*', '<%= path.view %>/vendor/*'],
				tasks: ['copy']
			}
		}
	});

	grunt.config('connect', {
		server: {
			options: {
				port: 9001,
				base: '<%= path.dist %>'
			}
		},
	});

	grunt.config('clean', {
		dist: ['<%= path.dist %>/*']
	});

	grunt.config('copy', {
		lib: {
			expand: true,
			cwd: '<%= path.view %>/vendor/',
			src: ['**'],
			dest: '<%= path.dist %>/vendor/'
		},
		assets: {
			expand: true,
			cwd: '<%= path.view %>/images/',
			src: ['**'],
			dest: '<%= path.dist %>/images'
		},
		pages: {
			expand: true,
			cwd: '<%= path.view %>',
			src: ['**.html'],
			dest: '<%= path.dist %>'
		}
	});

	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('build', ['clean', 'sass', 'copy']);
}