const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
    let defaultConfig = createDefaultConfig(config);
    defaultConfig.browsers = [];
    config.set(
        merge(defaultConfig, {
            customLaunchers: {
                ChromeWithDebugger: {
                    base: 'Chrome',
                    flags: ['--auto-open-devtools-for-tabs',
                        '--no-sandbox',
                        '--disable-setuid-sandbox']
                }
            },
            browsers: ['ChromeWithDebugger'],
            files: [
                // runs all files ending with -spec in the src folder,
                // can be overwritten by passing a --grep flag. examples:
                //
                // npm run test -- --grep src/foo/bar-spec.js
                // npm run test -- --grep test/bar/*
                { pattern: config.grep ? config.grep : 'build/ts-out/**/*-spec.js', type: 'module' }
            ],

            // see the karma-esm docs for all options
            esm: {
                // if you are using 'bare module imports' you will need this option
                nodeResolve: true
            }
        })
    );
    return config;
};
