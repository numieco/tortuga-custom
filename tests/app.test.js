import React from "react";
import expect from "expect";
import { shallow } from "enzyme";

import App from "../src/app";

describe("App tests", () => {
	it("renders the app", () => {
		const wrapper = shallow(<App />);
		expect(wrapper.find("h1").text()).toEqual("It Works!");
	});
});
