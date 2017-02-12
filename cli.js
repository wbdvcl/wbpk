#!/usr/bin/env node

var spawn = require( 'child_process' ).spawn;
var cmd = spawn( 'node', [ process.cwd() + '/wbpk.js' ] );

cmd.stdout.on('data', function(data) {
    console.log(data);
});

cmd.stderr.on('data', function(data) {
    console.log(data);
});

cmd.on('close', function(code) {
    console.log('child process exited with code ' + code);
});