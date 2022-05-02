import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryList = document.querySelector('.gallery');
const itemsMarkup = galleryItems.map(({ preview, original, description}) => {
  return `
  <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
`
}).join('');

let instance;

galleryList.insertAdjacentHTML('afterbegin', itemsMarkup);
galleryList.addEventListener('click', onGalleryListClick);

function onGalleryListClick(event) {
  event.preventDefault();

  if (event.target.classList.contains('gallery__image')) {
    const url = event.target.dataset.source;
    instance = createModal(url);
  
    instance.show(window.addEventListener('keydown', onEscClick));
    };
    
};

function createModal(url) {
  return basicLightbox.create(`
    <img src="${url}">
  `,
    {
      onClose: () => {
        window.removeEventListener('keydown', onEscClick);
      }
    }
  );
};

function onEscClick(event) {
    if (event.code === 'Escape') {
        instance.close();
    }
}
