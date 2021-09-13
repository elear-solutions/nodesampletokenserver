/*===============================================================================*/
/*********************************************************************************/
/**
 * @fileOverview gulp file for creating and executing gulp tasks
 * @author Narendra Kumar Agarwal, narendra.agarwal@helthasyst.com
 * @copyright Copyright (c) 2021 Elear Solutions Tech Private Limited. All rights
 * reserved.
 * @license To any person (the "Recipient") obtaining a copy of this software and
 * associated documentation files (the "Software"):
 *
 * All information contained in or disclosed by this software is confidential
 * and proprietary information of Elear Solutions Tech Private Limited and all
 * rights therein are expressly reserved. By accepting this material the
 * recipient agrees that this material and the information contained therein is
 * held in confidence and in trust and will NOT be used, copied, modified,
 * merged, published, distributed, sublicensed, reproduced in whole or in part,
 * nor its contents revealed in any manner to others without the express
 * written permission of Elear Solutions Tech Private Limited.
 */
/*********************************************************************************/
/*===============================================================================*/

import gulp from 'gulp';
import babel from 'gulp-babel';
import clean from 'gulp-clean';
import jasmine from 'gulp-jasmine';
import eslint from 'gulp-eslint';
import nodemon from 'gulp-nodemon';

// Files & folders that are to be watched by eslint'
// (for code style) & nodemon(for restart)
const jsFiles = ['./server/**/*.js', './spec/**/*.js'];

// Gulp task to perform code check
gulp.task('lint', () => {
  // ESLint ignores files with "node_modules" paths.
  // So, it's best to have gulp ignore the directory as well.
  // Also, Be sure to return the stream from the task;
  // Otherwise, the task may end before the stream has finished.
  return gulp.src(jsFiles)
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failAfterError last.
    .pipe(eslint.failAfterError());
});

// Gulp task to clean the dist folder
gulp.task('clean', () => {
  return gulp.src('dist', { allowEmpty: true, read: false })
    .pipe(clean());
});

// Task transpiles the code from ES6 to ES5
// and minifies it before storing to dist folder
gulp.task('transpiler', () => {
  return gulp.src(['server/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

// Gulp task for clearing the dist folder and building the new code
gulp.task('build:src', gulp.series('clean', 'transpiler'));

// Gulp task to check lint errors and build the code into dist folder
gulp.task('build', gulp.series('lint', 'build:src'));

// Gulp task for starting the server using nodemon
gulp.task('start:server', (done) => {
  const stream = nodemon({
    script: 'dist/server.js'
    , ext: 'html js'
    , ignore: ['ignored.js']
    , watch: jsFiles
    , tasks: ['build']
  });

  stream.on('restart', () => {
    console.log('restarted!');
    done();
  }).on('crash', () => {
    console.error('Application has crashed!\n');
    stream.emit('restart', 10);  // restart the server in 10 seconds
    done();
  });
});

// Default gulp task to build and run the server
gulp.task('default', gulp.series('build', 'start:server'));

// Gulp task for building the test files into dist folder
gulp.task('build:test', () => {
  return gulp.src(['spec/**/*.js'])
    .pipe(babel())
    .pipe(gulp.dest('dist/spec'));
});

// Gulp task to run jasmine on the spec folder
gulp.task('run:test', (done) => {
  return gulp.src(['dist/spec/**/*.js'])
    .pipe(jasmine({
      verbose: true // Displays spec names
      , includeStackTrace: true // Includes stack traces in failures
      , timeout: 10000 // wait time in millis before a test automatically fails.
    })).on('error', function(error) {
      console.log("Unit Tests failed", error);
      done();
      process.exit(1);
    }).on('end', () => {
      console.log("Test cases ran successfully");
      done();
      process.exit(0);
    });
});

// Gulp task to build the application and run test cases
gulp.task('test', gulp.series('build', 'build:test', 'run:test'));
