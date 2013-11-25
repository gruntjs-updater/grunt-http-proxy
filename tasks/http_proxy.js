/*
 * grunt-http-proxy
 * https://github.com/shivanykshenoy/grunt-http-proxy
 *
 * Copyright (c) 2013 shivanykshenoy
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('http_proxy', 'http proxy server that can serve local content as well redirect to a remote server for http requests.', function() {

      //read any js and css files

      //compile less files to css

      var http = require('http-server'),
          httpProxy = require('http-proxy'),
          options = {
              router: {
              }
          };

      options.router['localhost/' + this.options.forwardPath] = this.options.forwardHost + "/" + this.options.forwardPath;
      options.router.localhost = 'localhost:' + this.options.localPort;

      //
      // Create your proxy server
      //
      httpProxy.createServer(options).listen(this.options.proxyPort);

      //
      // Create your target server
      //
      http.createServer().listen(this.options.localPort);
  });
};
