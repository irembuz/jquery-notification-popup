(function () {
  "use strict";

  const LOCAL_STORAGE_KEY = "notificationProducts";

  function addJQuery() {
    const jQueryScript = document.createElement("script");
    jQueryScript.src = "https://code.jquery.com/jquery-3.6.1.min.js";
    document.getElementsByTagName("head")[0].appendChild(jQueryScript);
  }

  function showModal() {
    if (hasThreeProducts()) {
      console.log("Show Modal");
    } else {
      console.log("Do not Show Modal");
    }
  }

  function isProductPage() {
    const productPageIndicator = "urun";
    return document.location.pathname.includes(productPageIndicator);
  }

  function getNotificationProductsFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : [];
  }

  function hasThreeProducts() {
    const notificationProducts = getNotificationProductsFromLocalStorage();
    return notificationProducts.length === 3;
  }

  function addProductIntoLocalStorage() {
    const notificationProducts = getNotificationProductsFromLocalStorage();
    if (hasThreeProducts()) {
      notificationProducts.pop();
    }
    notificationProducts.unshift({ name: "Ayakkabi" });
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(notificationProducts)
    );
  }

  addJQuery();

  setTimeout(() => {
    if (isProductPage()) {
      addProductIntoLocalStorage();
    } else {
      showModal();
    }
  }, 1000);
})();
