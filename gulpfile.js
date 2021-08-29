//require
// function css(done){
//     console.log('Compilando sass... ');
//     done();
// }
// function javaScript(done){
//     console.log('compilando... JavaScript');
//     done();
// }
// function minifirHtml(done){
//     console.log('Minificando...');
//     done();
// }
// //exports
// exports.css = css;
// exports.javaScript = javaScript;
// ///si se le coloca default no es necesario agregar nombre
// //paralel las inicia en paralelo
// exports.default = series(css, javaScript, minifirHtml);
const { series, src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//uitilidades css

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano  = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//utilidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');


//funcion que compila sass
const path = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

function css(){
    return src( path.scss)
    .pipe(sourcemaps.init())
    .pipe(sass() )
    .pipe( postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe( dest('./build/css'))
}

function javaScript(){
    return src( path.js )
    .pipe(sourcemaps.init())
    .pipe( concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix:'.min'}))
    .pipe( dest('./build/js'))

}
function imagenes(){
    return src(path.imagenes)
    .pipe( imagemin() )
    .pipe(dest('./build/img'))
    .pipe( notify({message:'imagen minificada'}))
}

function watchArchivos(){
    watch( path.scss, css);//con los asteriscos busca dentro de todas las carpetas y busca los archivos con esa extencion
    watch(path.js, javaScript)
}
function versionWebp(){
    return src(path.imagenes)
    .pipe( webp() )
    .pipe(dest('./build/img'))
    .pipe( notify({message:'version de webp terminada'}))
}
exports.css = css;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css, javaScript, imagenes, versionWebp, watchArchivos);