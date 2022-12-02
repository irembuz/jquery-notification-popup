(function () {
  "use strict";

  const LOCAL_STORAGE_KEY = "notificationProducts";

  function getNotificationProductsFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : [];
  }

  function createNotificationModal() {
    $(
      `
      <div class="modal" id="notificationModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">DISCOVER OUR DEALS</h5>
            </div>
            <div id="notificationModalBody">
              <ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
      `
    ).appendTo("body");
    const notificationModal = $("#notificationModal");
    const notificationProducts = getNotificationProductsFromLocalStorage();
    notificationProducts.forEach(element => {
      $("#notificationModalBody ul").append(`<li>${element.title}</li>`);
    });

    notificationModal.show();
  }

  function showModal() {
    if (hasThreeProducts()) {
      createNotificationModal();
    } else {
      console.log("Do not Show Modal");
    }
  }

  function isProductPage() {
    const productPageIndicator = "urun";
    return document.location.pathname.includes(productPageIndicator);
  }

  function hasThreeProducts() {
    const notificationProducts = getNotificationProductsFromLocalStorage();
    return notificationProducts.length === 3;
  }

  function getProductInfoFromCurrentPage() {
    const title = $(".product-title").first().text().trim();
    const description = $("#collapseOne li:first").text().trim();
    const image = $("#productSliderPhotos img:first").attr("src");
    const productLink = document.location.href;

    const product = {
      title: title,
      description: description,
      image: image,
      productLink: productLink,
    };

    return product;
  }

  function addProductIntoLocalStorage() {
    const notificationProducts = getNotificationProductsFromLocalStorage();

    const isCurrentProductIncluded = Boolean(
      notificationProducts.find((element) => {
        return element.productLink === document.location.href;
      })
    );
    if (isCurrentProductIncluded) {
      return;
    }

    if (hasThreeProducts()) {
      notificationProducts.pop();
    }

    const product = getProductInfoFromCurrentPage();
    notificationProducts.unshift(product);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(notificationProducts)
    );
  }

  setTimeout(() => {
    if (isProductPage()) {
      addProductIntoLocalStorage();
    } else {
      showModal();
    }
  }, 1000);
})();
