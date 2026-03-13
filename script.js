document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-grid img");

  const modal = document.createElement("div");
  modal.id = "image-modal";
  modal.innerHTML = `
    <div class="modal-content">
    <span class="modal-close">&times;</span>
    <img id="modal-image" src="" alt="Full Size Image" />
    <div class="modal-nav"> 
        <button class="modal-prev">&#10094;</button>
        <button class="modal-next">&#10095;</button>
    </div>
    </div>
    `;

  document.body.appendChild(modal);

  let currentImageIndex = 0;
  const images = Array.from(galleryImages);

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", function () {
      currentImageIndex = index;
      openModal(img.src);
    });
  });
  document.querySelector(".modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  document.querySelector(".modal-prev").addEventListener("click", function (e) {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    document.getElementById("modal-image").src = images[currentImageIndex].src;
  });
  document.querySelector(".modal-next").addEventListener("click", function (e) {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    document.getElementById("modal-image").src = images[currentImageIndex].src;
  });

  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      if (e.key === "ArrowRight") document.querySelector(".modal-next").click();
      if (e.key === "ArrowLeft") document.querySelector(".modal-prev").click();
      if (e.key === "Escape") closeModal();
    }
  });

  function openModal(src) {
    document.getElementById("modal-image").src = src;
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
