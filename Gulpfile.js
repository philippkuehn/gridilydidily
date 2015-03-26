var gulp   = require("gulp"),
    rename = require("gulp-rename"),
    prefix = require("gulp-autoprefixer"),
    sass   = require("gulp-ruby-sass");

gulp.task("sass", function () {
  return sass(__dirname + "/demo/sass/style.scss", {sourcemap: false})
    .pipe(prefix({
        browsers: ["last 2 versions", "Explorer >= 10", "Android >= 4.4"]
    }))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("./demo/css"));
});

gulp.task("default", ["watch"]);

gulp.task("watch", ["sass"], function(){

    gulp.watch([
      "**/*.scss"
    ], ["sass"]);

});