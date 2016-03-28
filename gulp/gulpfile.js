var gulp = require('gulp');
var clean = require('gulp-clean');
var extend = require('util')._extend;
var path = require('path');
var less = require('gulp-less');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssFlexibility = require('postcss-flexibility');
var pxtorem = require('postcss-pxtorem');
var paramsPxtorem = {
	rootValue: 16,
	propWhiteList: ['font', 'font-size']
}
var paramsPostCss = [
	autoprefixer({ 
		browsers: ['last 2 versions'] 
	}),
	postcssFlexibility,
	pxtorem(paramsPxtorem)
];
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var LessPluginCleanCSS = require('less-plugin-clean-css');
var cleancss = new LessPluginCleanCSS({advanced: true});

/* Config */
var pathes = {
	styles: {
		'source': path.join(__dirname, '../sources', 'css', '**', '*.less'),
		'sourceApp': path.join(__dirname, '../sources', 'css', 'app.less'),
		'build': path.join(__dirname, '../compiled', 'assets', 'css')
	},
	scripts: {
		'source': path.join(__dirname, '../sources', 'js', '*.js'),
		'ignore': '!' + path.join(__dirname, '../sources', 'js', '*.min.js'),
		'build': path.join(__dirname, '../compiled', 'assets', 'js')
	},
	templates: {
		'source': path.join(__dirname, '../sources', '*.html'),
		'build': path.join(__dirname, '../compiled')
	}
};

var browserSyncConfig = {
	server: {
		baseDir: '../compiled',
		routes: {
			'/images': '../compiled/assets/images',
			'/css': '../compiled/assets/css',
			'/js': '../compiled/assets/js',
			'/fonts': '../compiled/assets/fonts'
		}
	},
	ghostMode: false,
	notify: false,
	open: false,
	port: 8115
};

/* Tasks */
// styles
gulp.task('clean-styles', function() {
	gulp.src(path.join(pathes.styles.build, '*.css'))
		.pipe(clean({force: true}));
});

gulp.task('styles', ['clean-styles'], function () {
	gulp.src(pathes.styles.sourceApp)
		.pipe(less({
			paths: [pathes.styles.sourceApp],
			plugins: [cleancss]
		}))
		.pipe(postcss(paramsPostCss))
		.pipe(gulp.dest(pathes.styles.build))
		.pipe(reload({stream:true}));
});

// scripts
gulp.task('clean-scripts', function() {
	gulp.src(path.join(pathes.scripts.build, '*.js'))
		.pipe(clean({force: true}));
});

gulp.task('scripts', ['clean-scripts'], function() {
	gulp.src([pathes.scripts.source, pathes.scripts.ignore])
		//.pipe(concat('index.js'))
		.pipe(gulp.dest(pathes.scripts.build))
		.pipe(reload({stream:true}));
});

// templates
gulp.task('clean-templates', function() {
  gulp.src(path.join(pathes.templates.build, '*.html'))
    .pipe(clean({force: true}));
});

gulp.task('templates', ['clean-templates'], function() {
  gulp.src(pathes.templates.source)
    .pipe(gulp.dest(pathes.templates.build))
    .pipe(reload({stream:true}));
});


// livereload
gulp.task('browser-sync', function() {
	browserSync(browserSyncConfig);
});

gulp.task('watchers', function () {
	var stylesWatcher = gulp.watch([path.join(pathes.styles.source)], ['styles']);
	var scriptsWatcher = gulp.watch([path.join(pathes.scripts.source)], ['scripts']);
	var templatesWatcher = gulp.watch([path.join(pathes.templates.source)], ['templates']);

	stylesWatcher.on('change', function(event) { console.log('Less file ' + event.path + ' was ' + event.type + ', running tasks...'); });
	scriptsWatcher.on('change', function(event) { console.log('Script file ' + event.path + ' was ' + event.type + ', running tasks...'); });
	templatesWatcher.on('change', function(event) { console.log('Template file ' + event.path + ' was ' + event.type + ', running tasks...'); });
});

gulp.task('default', ['styles', 'scripts', 'templates', 'watchers', 'browser-sync']);
