/// <reference path="defs/node.d.ts" />

var PORT = 8899;
var HOST = '192.168.155.40';

var dgram = require('dgram');
// var message = new Buffer("\xc2\x00\x55", "binary");
// var message = new Buffer("\x4E\x02\x55", "binary"); // Bright lo
// var messageHi = new Buffer("\x4E\x33\x55", "binary"); // Bright hi
// var messageHi = new Buffer("\x4E\x33", "binary"); // Bright hi

var messageHi = new Buffer("\x40\x80\x55", "binary"); // Bright hi
var client = dgram.createSocket('udp4');

function allWhite(): Buffer {
    return new Buffer("\xc2\x00\x55", "binary");
}

function brightness(val: number): Buffer {
    const buf = new Buffer("\x4E\x00\x55", "binary");
    buf[1] = Math.max(Math.min(Math.floor(1 + 20*val), 22), 2);
    return buf;
}

function color(val: number): Buffer {
    const buf = new Buffer("\x40\x00\x55", "binary");
    buf[1] = Math.max(Math.min(Math.floor(255*val), 255), 0);
    return buf;
}

function send(buf: Buffer, done: () => void) {
    client.send(buf, 0, buf.length, PORT, HOST, (err, bytes) => {
        done();
    });
};

var br:number = 0.01;

send(allWhite(), () => {});

/*
setInterval(() => {
    send(color(br), () => {
        br += 0.01;
        br = br % 1;
    });
    send(brightness(br), () => {
        br += 0.01;
        br = br % 1;
    });
}, 40);
*/

/*
client.send(messageHi, 0, messageHi.length, PORT, HOST, function (err, bytes) {
    console.log('UDP message sent to ' + HOST + ':' + PORT, err, bytes);
    // client.close();

    setTimeout(() => {
        var message = new Buffer("\xc2\x00\x55", "binary"); // Color
        client.send(message, 0, message.length, PORT, HOST, function (err, bytes) {
            client.close();
        });
    }, 3000);
});
*/
