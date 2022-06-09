import { galleryItems } from "./gallery-items.js";

const galleryEl = document.querySelector(".gallery");
const galleryListItems = createGallery(galleryItems);

function createGallery(collection) {
  return collection
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
						<a class="gallery__link" href="${original}">
							<img
								class="gallery__image"
								src="${preview}"
								data-source="${original}"
								alt="${description}"
							/>
						</a>
					</div>`
    )
    .join("");
}

function addGalleryToPage(el) {
  galleryEl.insertAdjacentHTML("beforeend", el);
}

addGalleryToPage(galleryListItems);

galleryEl.addEventListener("click", (e) => {
  e.preventDefault();

  const isGalleryImg = e.target.classList.contains("gallery__image");

  if (!isGalleryImg) {
    return;
  }
  const instance = basicLightbox.create(
    `
  		<img class="create" src="${e.target.dataset.source}">
  	`,
    {
      onShow: () => {
        document.addEventListener("keydown", closeModalByKeydownEscape);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeModalByKeydownEscape);
      },
    }
  );

  // Close when hitting escape.

  function closeModalByKeydownEscape(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape) {
      instance.close();
    }
  }
  instance.show();
});
