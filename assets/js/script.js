'use strict';

/**
 * Utility: Toggle an element's active state with animation.
 */
const elementToggleFunc = (elem) => {
  elem.classList.toggle("active");
  elem.classList.contains("active")
    ? elem.setAttribute("aria-expanded", "true")
    : elem.setAttribute("aria-expanded", "false");
};




/* Sidebar Functionality */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Add transition effect for sidebar toggle
sidebar.style.transition = "transform 0.4s ease";
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

/* Testimonials Modal Functionality */
const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const openModal = (item) => {
  modalImg.src = item.querySelector("[data-testimonials-avatar]").src;
  modalImg.alt = item.querySelector("[data-testimonials-avatar]").alt;
  modalTitle.textContent = item.querySelector("[data-testimonials-title]").textContent;
  modalText.textContent = item.querySelector("[data-testimonials-text]").textContent;
  elementToggleFunc(modalContainer);
  elementToggleFunc(overlay);
};

const closeModal = () => {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
};

// Add events for testimonials modal
testimonialsItems.forEach((item) =>
  item.addEventListener("click", () => openModal(item))
);

[modalCloseBtn, overlay].forEach((elem) =>
  elem.addEventListener("click", closeModal)
);

/* Custom Select Dropdown */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = (selectedValue) => {
  filterItems.forEach((item) => {
    const matches = selectedValue === "all" || selectedValue === item.dataset.category;
    item.classList.toggle("active", matches);
    item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
    item.style.transform = matches ? "scale(1)" : "scale(0.8)";
  });
};

// Dropdown select functionality
select.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach((item) =>
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  })
);

// Filter buttons for large screens
let lastClickedBtn = filterBtn[0];
filterBtn.forEach((btn) =>
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  })
);

/* Contact Form Interactivity */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Disable form button by default
formBtn.setAttribute("disabled", "");

formInputs.forEach((input) =>
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
    formBtn.style.transition = "background-color 0.3s ease, transform 0.3s ease";
    formBtn.style.transform = form.checkValidity() ? "scale(1.1)" : "scale(1)";
  })
);

/* Page Navigation */
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach((link) =>
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();
    pages.forEach((page, index) => {
      const isActive = targetPage === page.dataset.page;
      page.classList.toggle("active", isActive);
      navigationLinks[index].classList.toggle("active", isActive);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  })
);

/* Accessibility Enhancements */
document.querySelectorAll("[data-sidebar-btn], [data-modal-close-btn]").forEach((btn) =>
  btn.setAttribute("aria-label", "Toggle")
);
