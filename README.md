# Add-on for Socket.IO

## Overview
This add-on provides provides a Socket.IO Modular Input which hosts a [Socket.IO](http://socket.io) server that can receive large volumes of events realtime which will be fed into Splunk.

![Socket.IO and Splunk](https://dl.dropboxusercontent.com/u/6860088/socketio.jpeg)

## Setup

1. Set the `SPLUNK_HOME` environment variable to the root directory of your Splunk instance.
* Copy this `splunk-socketio` folder to `$SPLUNK_HOME/etc/apps`.
* Open a terminal at `$SPLUNK_HOME/etc/apps/splunk-socketio/bin/app`.
* Run `npm install`.
* Restart Splunk

## Adding the input

* From Splunk Home, click the Settings menu. Under **Data**, click **Data inputs**, and find `Socket.IO`, the input you just added. **Click Add new on that row**.
* Fill in:
    * `name` (whatever name you want to give this input)
    * `port` (the port socket.io should listen on). If the port is taken an error will be returned.
    * (optional) `origins` (the origins to restrict for CORS, * by default)
* Save your input, and navigate back to Splunk Home. You should now have a Socket.IO server listening on the specified port waiting for events.

## Sending events to Splunk
Splunk will listen for a specific message called 'event'. It should contain a single parameter which is a string value.

## Testing out the input

* In the app folder you will find a test.html. Open the file and modify the url in the `io` constructor to point to your host and port.
* Open test.html in your browser.
* Check your browser dev tools to see if you get any errors. If not the event was succesfully sent.
* In Splunk, issue a search for `sourcetype=socket.io`. You should see an event with {"message": "Hello from Socket.IO"}.

## How it works

This mod input spins up a socket.io server on the specified port. Whenever messages are received of type 'event', then it extracts the message and creates an `Event` which is then written back to Splunk.

## Configuring Socket.IO: Transports, Auth etc.

All code for configuring Socket.IO exists in the `app/socketioInput.js` file in the `streamEvents` function. You can easily modify the code to enable Auth or plug in your own middleware.

## License

Apache 2.0

