(function () {
  "use strict";

  function addJQuery() {
    const jQueryScript = document.createElement("script");
    jQueryScript.src = "https://code.jquery.com/jquery-3.6.1.min.js";
    document.getElementsByTagName("head")[0].appendChild(jQueryScript);
  }

  function showModal() {
    if (isProductPage() && hasThreeProducts()) {
      console.log("Show Modal");
    } else {
      console.log("Do not Show Modal");
    }
  }

  function isProductPage() {
    const productPageIndicator = "urun";
    return document.location.pathname.includes(productPageIndicator);
  }

  function hasThreeProducts() {
    const notificationProducts = localStorage.getItem("notificationProducts")
      ? JSON.parse(localStorage.getItem("notificationProducts"))
      : null;
    return notificationProducts && notificationProducts.length === 3;
  }

  addJQuery();

  setTimeout(() => {
    showModal();
  }, 1000);
})();
