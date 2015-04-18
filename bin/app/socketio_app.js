var splunkjs        = require("splunk-sdk");
var ModularInputs   = splunkjs.ModularInputs;
var input = require('./socketioInput.js');
ModularInputs.execute(input, module);