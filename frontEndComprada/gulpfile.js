'use strict';

var gulp = require('gulp'),
	watch = require('gulp-watch'),
	prefixer = require('gulp-autoprefixer'),
	less = require('gulp-less'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	pug = require('gulp-pug'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	rimraf = require('rimraf'),
	browserSync = require('browser-sync').create();

var path = {
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/',
		libs: 'dist/libs/',
		data: 'dist/data/',
		other: 'dist/'
	},
	source: {
		pug: 'source/pug/*.pug',
		js: 'source/js/**/*.js',
		less: 'source/less/',
		img: 'source/img/**/*.*',
		fonts: 'source/fonts/**/*.*',
		libs: 'source/libs/**/*.*',
		data: 'source/data/**/*.*',
		other: 'source/*.*'
	},
	watch: {
		pug: 'source/pug/**/*.*',
		js: 'source/js/**/*.js',
		less: 'source/less/**/*.*',
		img: 'source/img/**/*.*',
		fonts: 'source/fonts/**/*.*',
		libs: 'source/libs/**/*.*',
		data: 'source/data/**/*.*',
		other: 'source/*.*'
	}
};

gulp.task('pug:build', function () {
	gulp.src(path.source.pug)
		.pipe(pug({ pretty: true, locals: { metrika: false } }))
		.pipe(gulp.dest(path.dist.html));
});

gulp.task('js:build', function () {
	gulp.src(path.source.js)
		.pipe(gulp.dest(path.dist.js));
});

gulp.task('less:build', function () {
	gulp.src(path.source.less+'*.less')
		.pipe(less())
		.pipe(prefixer('last 2 versions'))
		.pipe(gulp.dest(path.dist.css))
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(path.dist.css+'min/'));
});

gulp.task('libs:build', function() {
	gulp.src(path.source.libs)
		.pipe(gulp.dest(path.dist.libs))
});

gulp.task('image:build', function () {
	gulp.src(path.source.img)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()],
			interlaced: true
		}))
		.pipe(gulp.dest(path.dist.img));
});

gulp.task('fonts:build', function() {
	gulp.src(path.source.fonts)
		.pipe(gulp.dest(path.dist.fonts));
});

gulp.task('data:build', function() {
	gulp.src(path.source.data)
		.pipe(gulp.dest(path.dist.data));
});


gulp.task('other:build', function() {
	gulp.src(path.source.other)
		.pipe(gulp.dest(path.dist.other));
});


gulp.task('clean', function (cb) {
	rimraf('./dist', cb);
});

gulp.task('build', [
	'js:build',
	'less:build',
	'libs:build',
	'fonts:build',
	'data:build',
	'image:build',
	'pug:build',
	'other:build'
]);

gulp.task('watch', function(){
	watch([path.watch.pug], function(event, cb) {
		gulp.start('pug:build');
	});
	watch([path.watch.less], function(event, cb) {
		gulp.start('less:build');
	});
	watch([path.watch.js], function(event, cb) {
		gulp.start('js:build');
	});
	watch([path.watch.libs], function(event, cb) {
		gulp.start('libs:build');
	});
	watch([path.watch.img], function(event, cb) {
		gulp.start('image:build');
	});
	watch([path.watch.fonts], function(event, cb) {
		gulp.start('fonts:build');
	});
	watch([path.watch.data], function(event, cb) {
		gulp.start('data:build');
	});
});

gulp.task('serve', ['build'], function() {
	browserSync.init({
		server: {
			baseDir: "dist/"
		}
	});
});

gulp.task('default', ['build', 'watch']);
