// ===== Select Elements =====
const gallery = document.querySelector('.gallery');
const galleryItems = document.querySelectorAll('.gallery-item img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;

/* ===== Functions ===== */

// Open lightbox
function openLightbox(index) {
  lightbox.setAttribute("aria-hidden", "false");
  lightboxImg.src = galleryItems[index].src;
  currentIndex = index;
}

// Close lightbox
function closeLightbox() {
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImg.src = "";
}

// Show next image
function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
}

// Show previous image
function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

/* ===== Event Listeners ===== */

// Open on click
galleryItems.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

// Close on click
closeBtn.addEventListener("click", closeLightbox);

// Navigation
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (lightbox.getAttribute("aria-hidden") === "false") {
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") closeLightbox();
  }
});

// Filter functionality
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active").classList.remove("active");
    btn.classList.add("active");
    
    const category = btn.dataset.category;

    document.querySelectorAll(".gallery-item").forEach(item => {
      item.style.display = (category === "all" || item.dataset.category === category)
        ? "block" 
        : "none";
    });
  });
});
