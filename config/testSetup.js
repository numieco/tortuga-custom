process.env.NODE_ENV = "test";
require("babel-register")();
require.extensions[".sass"] = function() {
	return null;
};
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { document } = new JSDOM("").window;
const exposedProperties = ["window", "navigator", "document"];

global.document = document;
global.navigator = { userAgent: "nodejs" };
global.window = document.defaultView;

Object.keys(document.defaultView).forEach(property => {
	if (typeof global[property] === "undefined") {
		exposedProperties.push(property);
		global[property] = document.defaultView[property];
	}
});

documentRef = document;

// Enzyme setup
const { configure } = require("enzyme");
const Adapter = require("enzyme-adapter-react-15.4");

configure({ adapter: new Adapter() });
