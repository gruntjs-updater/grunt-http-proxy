/*
 * grunt-http-proxy
 * https://github.com/shivanykshenoy/grunt-http-proxy
 *
 * Copyright (c) 2013 shivanykshenoy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('http_proxy', 'http proxy server that can serve local content as well redirect to a remote server for http requests.', function () {

        var http = require('http-server'),
            httpProxy = require('http-proxy'),
            proxy,
            server,
            options = {
                router: {
                }
            },
            taskTarget = this.target,
            proxyPort = this.options.proxyPort,
            localPort = this.options.localPort,
            done = this.async();

        options.router['localhost/' + this.options.forwardPath] = this.options.forwardHost + "/" + this.options.forwardPath;
        options.router.localhost = 'localhost:' + proxyPort;

        //
        // Create your proxy server
        //
        proxy = httpProxy.createServer(options).listen(proxyPort).on('listening', function () {

            grunt.log.writeln('Started proxy web server on localhost:' + proxyPort + '.');


            grunt.event.emit('http proxy' + taskTarget + '.listening on localhost' + proxyPort);

        })
            .on('error', function (err) {
                if (err.code === 'EADDRINUSE') {
                    grunt.fatal('Port ' + proxyPort + ' is already in use by another process.');
                } else {
                    grunt.fatal(err);
                }
            });

        //
        // Create your target server
        //
        http.createServer().listen(localPort).on('listening', function () {

            grunt.log.writeln('Started web server on localhost:' + localPort + '.');


            grunt.event.emit('http proxy ' + taskTarget + '.listening on localhost' + localPort);

        })
            .on('error', function (err) {
                if (err.code === 'EADDRINUSE') {
                    grunt.fatal('Port ' + localPort + ' is already in use by another process.');
                } else {
                    grunt.fatal(err);
                }
            });;
    });
};
