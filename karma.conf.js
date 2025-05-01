// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // * you can add configuration options for Jasmine here
        // * the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // * for example, you can disable the random execution with `random: false`
        // * or set a specific seed with `seed: 4321`
        random: false,
      },
      // * clear the context window after every test
      // * if you set this to false, Karma keeps the window open for the duration of the tests
      // * this can be useful if you want to debug the tests in the browser
      // * default value is true
      clearContext: false,
    },
    jasmineHtmlReporter: {
      // * suppress all logging messages from the reporter
      // * default value is false
      suppressAll: true,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-task-project'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }],
    },
    // * test results reporter to use
    // * possible values: 'dots', 'progress'
    // * available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress', 'kjhtml'],

    // * start these browsers
    // * available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome', 'ChromeHeadless'],

    // * web server port
    port: 9876,

    // * enable / disable colors in the output (reporters and logs)
    colors: true,

    // * level of logging
    // * possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // * enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // * continuous integration mode
    // * if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // * concurrency level
    // * how many browser instances should be started simultaneously
    concurrency: 1,

    // * restart the browser on file change
    restartOnFileChange: true,
  });
};
