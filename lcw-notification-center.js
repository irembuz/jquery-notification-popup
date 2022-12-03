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

      const notificationBellModal = jQuery("#notificationBellModal");
      if (!notificationBellModal.length) {
        createNotificationBellModal();
      } else {
        notificationBellModal.show();
      }
    });
  }

  function createNotificationBellModal() {
    jQuery(
      `
      <div class="modal" id="notificationBellModal"
        style="width: 3%; height: 10%; overflow: visible; position: fixed; top: 10%; left: 96%;"
      >
        <div class="modal-dialog" style="width: 100%;">
          <div class="modal-content" style="border-radius: 50%;">
            <button type="button" class="btn btn-secondary" style="background-color: #A44476; border-radius: 50%;">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      `
    ).appendTo("body");

    const notificationBellModal = jQuery("#notificationBellModal");
    notificationBellModal.show();

    notificationBellModal.click(function () {
      notificationBellModal.hide();
      const notificationModal = jQuery("#notificationModal");
      notificationModal.show();
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

  function main() {
    addJQuery();

    setTimeout(() => {
      addBootstrap();
    }, 300);

    setTimeout(() => {
      if (isProductPage()) {
        addProductIntoLocalStorage();
      } else {
        showModal();
      }
    }, 1000);
  }

  main();

})();
