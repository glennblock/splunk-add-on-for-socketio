# Overview
This app provides provides a Socket.IO input which hosts a Socket.IO server that can receive events which will be fed into Splunk

# Setup

1. Set the `SPLUNK_HOME` environment variable to the root directory of your Splunk instance.
* Copy this `splunk-socketio` folder to `$SPLUNK_HOME/etc/apps`.
* Open a terminal at `$SPLUNK_HOME/etc/apps/splunk-socketio/bin/app`.
* Run `npm install`.
* Restart Splunk

# Adding an input

* From Splunk Home, click the Settings menu. Under **Data**, click **Data inputs**, and find `Socket.IO`, the input you just added. **Click Add new on that row**.
* Click **Add new** and fill in:
    * `name` (whatever name you want to give this input)
    * `port` (the port socket.io should listen on). If the port is taken an error will be returned.
    * (optional) `origins` (the origins to restrict for CORS, * by default)
* Save your input, and navigate back to Splunk Home.

# Testing out the input

* In the app folder you will find a test.html. Open the file and modify the url in the `io` constructor to point to your host and port.
* Open test.html in your browser.
* Check your browser dev tools to see if you get any errors. If not the event was succesfully sent.
* In Splunk, issue a search for `sourcetype=socket.io`

# License

Apache 2.0

