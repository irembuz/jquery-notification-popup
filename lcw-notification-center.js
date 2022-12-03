(function () {
  "use strict";

  const LOCAL_STORAGE_KEY = "notificationProducts";

  function addJQuery() {
    const jQueryScript = document.createElement("script");
    jQueryScript.src = "https://code.jquery.com/jquery-3.6.1.min.js";
    document.body.appendChild(jQueryScript);
  }

  function addBootstrap() {
    const bootstrapCss = document.createElement("link");
    bootstrapCss.rel = "stylesheet";
    bootstrapCss.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapCss);

    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(bootstrapScript);
  }

  function getNotificationProductsFromLocalStorage() {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
      : [];
  }

  function createNotificationModal() {
    jQuery(
      `
      <div class="modal" id="notificationModal"
        style="width: 40%; height: 50%; overflow: visible; position: fixed; top: 10%; left: 60%;"
      >
        <div class="modal-dialog" style="width: 100%;">
          <div class="modal-content" style="border-radius: 10px;">
            <div class="modal-header" style="background-color: #A44476; border-radius: 10px 10px 0 0;">
              <h5 class="modal-title" style="color: white;">LAST VISITED PRODUCTS</h5>
              <button type="button" id="notificationModalCloseButton"
                class="btn-close btn-close-white" aria-label="Close"
              ></button>
            </div>
            <div id="notificationModalBody">
              <ul style="padding: 0px;">
              </ul>
            </div>
          </div>
        </div>
      </div>
      `
    ).appendTo("body");

    const notificationProducts = getNotificationProductsFromLocalStorage();
    notificationProducts.forEach((element) => {
      jQuery("#notificationModalBody ul").append(
        `
        <a href=${element.productLink}>
          <li style="list-style: none; display: flex;">
            <img width="75" height="75" style="margin: 10px;" src=${element.image}>
            <div style="display: flex; flex-direction: column; margin-top: 25px">
              <span>${element.title}</span>
              <span>${element.description}</span>
            </div>
          </li>
        </a>
        `
      );
    });

    const notificationModal = jQuery("#notificationModal");
    notificationModal.show();

    const notificationModalCloseButton = jQuery("#notificationModalCloseButton");
    notificationModalCloseButton.click(function () {
      notificationModal.hide();
    });
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
    const title = jQuery(".product-title").first().text().trim();
    const description = jQuery("#collapseOne li:first").text().trim();
    const image = jQuery("#productSliderPhotos img:first").attr("src");
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

  addJQuery();
  addBootstrap();

  setTimeout(() => {
    if (isProductPage()) {
      addProductIntoLocalStorage();
    } else {
      showModal();
    }
  }, 1000);
})();
