(function () {
  "use strict";

  function addJQuery() {
    const jQueryScript = document.createElement("script");
    jQueryScript.src = "https://code.jquery.com/jquery-3.6.1.min.js";
    document.getElementsByTagName("head")[0].appendChild(jQueryScript);
  }

  addJQuery();

  setTimeout(() => {
    console.log("jQuery has been added.");
  }, 1000);
})();
