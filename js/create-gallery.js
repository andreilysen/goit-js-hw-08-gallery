import gallerys from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
// const lightboxContent = document.querySelector('.lightbox__content');
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

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

const createGallery = gallerys.map((gallery) => createImage(gallery));

galleryRef.append(...createGallery);

const escCloseModal = (e) => {
    if (e.code === 'Escape') {
      closeModal()  
    }
}

const closeModal = () => {
    lightboxRef.classList.remove('is-open');
    btnCloseModal.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', escCloseModal);

    lightboxImage.src = '';
    lightboxImage.alt = '';
}

const openModal = (e) => {
    e.preventDefault()
    if (!e.target.classList.contains('gallery__image')) {
        return
    }
    btnCloseModal.addEventListener('click', closeModal);
    lightboxOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', escCloseModal);
    lightboxRef.classList.add('is-open');    
    lightboxImage.src = e.target.dataset.source;
    lightboxImage.alt = e.target.alt;
    console.log(e.target.dataset.source)
}

galleryRef.addEventListener('click', openModal)