import gallerys from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxContent = document.querySelector('.lightbox__content');
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');

const createImage = ({ preview, original, description }) => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', original);
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', preview);
    galleryImage.setAttribute('data-source', original);
    galleryImage.setAttribute('alt', description);
    galleryLink.appendChild(galleryImage);
    galleryItem.appendChild(galleryLink);
    return galleryItem
};

const createGallery = gallerys.map(gallery => createImage(gallery));

galleryRef.append(...createGallery);


// console.log(createGallery(d))
