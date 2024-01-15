'use strict';
// Load modules

const Confidence = require('confidence');
const Config = require('./config');
const Chalk = require('chalk');


const criteria = {
    env: process.env.NODE_ENV
};


const manifest = {
    server: {
        debug: {
            $filter: 'env',
            production: false,
            $default: {
                request: ['error']
            }
        },
        port: Config.get('/port/api'),
        routes: {
            cors: Config.get('/routes/cors'),
            security: Config.get('/routes/security')
        }
    },
    register: {
        plugins: [
            {
                plugin: './server/plugins/dbmongoose',
                options: {
                    mongodb_uri: Config.get('/mongodb_uri')
                }
            },
            {
                plugin: './server/plugins/knackAuth'
            },
            {
                plugin: './server/plugins/authenticate'
            },
            './server/plugins/gracefully',
            {
                plugin: 'hapi-cron',
                options: {
                    jobs: [
                        {
                            name: 'data-open-positions',
                            time: '0 2 * * *',
                            timezone: Config.get('/cron/timezone'),
                            request: {
                                method: 'POST',
                                url: `${Config.get('/routes/prefix')}/data-open-positions`
                            },
                            onComplete: () => {
                                console.info(Chalk.green(`finish cron Data open positions chart`));
                            }
                        }
                    ]
                }
            },
            // './server/plugins/knack',
            {

                plugin: 'good',
                options: {
                    ops: {
                        interval: 1000
                    },
                    reporters: {
                        console: [
                            {
                                module: 'good-squeeze',
                                name: 'Squeeze',
                                args: [{ log: '*', response: '*' }]
                            },
                            {
                                module: 'good-console',
                                args: [{
                                    format: 'DD/MM/YY hh:MM a',
                                    utc: false
                                }]
                            },
                            'stdout'
                        ]
                    }
                }
            },
            './server/plugins/knack',
            './server/plugins/checkProcess',
            {
                plugin: './server/api/api',
                routes: {
                    prefix: Config.get('/routes/prefix')
                }
            },
            {
                plugin: './server/api/default'
            },
            {
                plugin: './server/api/aviation',
                routes: {
                    prefix: Config.get('/routes/prefix')
                }
            },
            {
                plugin: './server/api/wrs',
                routes: {
                    prefix: Config.get('/routes/prefix')
                }
            }
        ]
    }
};


const store = new Confidence.Store(manifest);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
