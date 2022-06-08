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
  galleryEl.innerHTML = el;
}

addGalleryToPage(galleryListItems);

galleryEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    const instance = basicLightbox.create(
      `
				<img class="create" src="${e.target.dataset.source}">
			`
    );
    instance.show();
  }
});
