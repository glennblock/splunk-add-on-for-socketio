var splunkjs        = require("splunk-sdk");
var ModularInputs   = splunkjs.ModularInputs;
var Logger          = ModularInputs.Logger;
var Event           = ModularInputs.Event;
var Scheme          = ModularInputs.Scheme;
var Argument        = ModularInputs.Argument;

exports.getScheme = function() {
    var scheme = new Scheme("Socket.IO");
    scheme.description = "Hosts a Socket.IO endpoint which receives events which are streamed to Splunk";
    scheme.useExternalValidation = true;
    scheme.useSingleInstance = true;

    scheme.args = [
        new Argument ({
            name: "port",
            dataType: Argument.dataTypeNumber,
            description: "Port for Socket.IO to listen on",
            requiredOnCreate: false,
            requiredOnEdit: true
        }),
        new Argument ({
            name: "origins",
            dataType: Argument.dataTypeString,
            description: "Origins for CORS. If not set, all origins are allowed",
            requiredOnCreated: false,
            requiredOnEdit: false
        })

    ];
    return scheme;
}

exports.validateInput = function(definition, done) {
    var port = definition.parameters.port;
    isPortTaken(port, function(err, isTaken) {
        if (err) {
            done(err);
        }
        if (isTaken == true) {
            done(new Error("Port is unavailable"));
        }
        else {
            done();
        }
    });
}

exports.streamEvents = function(name, singleInput, eventWriter, done) {
    var app = require('express')()
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    if (singleInput.origins) {
        io.set('origins', singleInput.origins);
    }

    io.on('connection', function(socket) {
        socket.on('event', function(msg) {
            var event = new Event({
                stanza: name,
                sourcetype: "socketio",
                data: {event:msg}
            });
            eventWriter.writeEvent(event);
        });
    });

    http.listen(singleInput.port, function() {  
        Logger.info(name, "Socket.IO server listening");
    });
}

//https://gist.github.com/timoxley/1689041
function isPortTaken(port, fn) {
  var net = require('net')
  var tester = net.createServer()
  .once('error', function (err) {
    if (err.code != 'EADDRINUSE') return fn(err)
    fn(null, true)
  })
  .once('listening', function() {
    tester.once('close', function() { fn(null, false) })
    .close()
  })
  .listen(port)
}
