#!/bin/bash  
current_dir=$(dirname "$0")
exec "$SPLUNK_HOME/bin/splunk" cmd node "$current_dir/app/socketio_app.js"