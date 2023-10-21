import { JSDOM } from "jsdom";
import { assert } from "chai";
import sinon from "sinon";

describe("UserJourney component", function () {
 
  let UserJourney;

  before(function () {
    const dom = new JSDOM("<!doctype html><html><body></body></html>");
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = { userAgent: "node.js" };

    
    import("./path/to/UserJourney").then((module) => {
      UserJourney = module.default;
    });
  });

  after(function () {
    global.window = undefined;
    global.document = undefined;
    global.navigator = undefined;
  });

  

  it("should call getJourneys when mounted", function () {
    // Mock the axios module and its get method
    import("axios").then((axios) => {
      const axiosGet = sinon.stub(axios.default, "get");
      axiosGet.resolves({ data: [] });

      // Mock the React useEffect hook
      import("react").then((React) => {
        const { useEffect } = React.default;
        const useEffectMock = sinon.stub(useEffect);
        useEffectMock.callsArg(0); // Call the provided callback

        // Render the component
        const container = document.createElement("div");
        document.body.appendChild(container);
        const component = UserJourney();

    
        assert.strictEqual(component, undefined);

        // Check if the axios.get method was called
        sinon.assert.calledOnce(axiosGet);
        
        sinon.assert.calledWith(
          axiosGet,
          "http://localhost:5005/journey/user/UID"
        );

        // Clean up
        document.body.removeChild(container);
        axiosGet.restore();
        useEffectMock.restore();
      });
    });
  });
  it('should open the "Add New Journey" modal when the plus icon is clicked', function () {
    // Mock the React useState hook to track the modal's state
    import("react").then((React) => {
      const { useState } = React.default;
      const useStateMock = sinon.stub(React, "useState");

      // Initially, the modal should be closed (mocking a state change)
      useStateMock.onCall(0).returns([false, sinon.stub()]);

      // Render the component
      const container = document.createElement("div");
      document.body.appendChild(container);
      const component = UserJourney();

      // Find the plus icon element and simulate a click
      const plusIcon = container.querySelector(".plus-icon"); // Adjust the selector based on your component
      plusIcon.click();

      // Assert that the modal state has changed to open (true)
      assert(useStateMock.calledWith(true));

      // Clean up
      document.body.removeChild(container);
      useStateMock.restore();
    });
  });

  
  it('should open the "Update Journey" modal when the edit icon is clicked', function () {
    // Mock the React useState hook to track the modal's state
    import("react").then((React) => {
      const { useState } = React.default;
      const useStateMock = sinon.stub(React, "useState");

      // Initially, the modal should be closed (mocking a state change)
      useStateMock.onCall(0).returns([false, sinon.stub()]);

      // Render the component
      const container = document.createElement("div");
      document.body.appendChild(container);
      const component = UserJourney();

      // Find the edit icon element and simulate a click
      const editIcon = container.querySelector(".edit-icon"); // Adjust the selector based on your component
      editIcon.click();

      // Assert that the modal state has changed to open (true)
      assert(useStateMock.calledWith(true));

      // Clean up
      document.body.removeChild(container);
      useStateMock.restore();
    });
  });


});
