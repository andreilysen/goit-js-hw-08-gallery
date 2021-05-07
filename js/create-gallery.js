import gallerys from './gallery-items.js'

const galleryRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
// const lightboxIndex = document.querySelector('#data-index');
const btnCloseModal = document.querySelector('[data-action="close-lightbox"]');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
let index;

const createImage = ({ preview, original, description }, index) => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery__item');
    const galleryLink = document.createElement('a');
    galleryLink.classList.add('gallery__link');
    galleryLink.setAttribute('href', original);
    const galleryImage = document.createElement('img');
    galleryImage.classList.add('gallery__image');
    galleryImage.setAttribute('src', preview);
    galleryImage.setAttribute('data-source', original);
    galleryImage.setAttribute('data-index', index);
    galleryImage.setAttribute('alt', description);
    galleryLink.appendChild(galleryImage);
    galleryItem.appendChild(galleryLink);
    return galleryItem
};

const createGallery = gallerys.map((gallery, index) => createImage(gallery, index));

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
    window.removeEventListener('keydown', changeImage);

    lightboxImage.src = '';
    lightboxImage.alt = '';
    lightboxImage.dataset.index = '';
}

const openModal = (e) => {
    e.preventDefault()
    if (!e.target.classList.contains('gallery__image')) {
        return
    }
    index = Number(e.target.dataset.index);
    // console.log(index)

    btnCloseModal.addEventListener('click', closeModal);
    lightboxOverlay.addEventListener('click', closeModal);
    window.addEventListener('keydown', escCloseModal);
    window.addEventListener('keydown', changeImage);
    lightboxRef.classList.add('is-open');    
    lightboxImage.src = e.target.dataset.source;
    lightboxImage.alt = e.target.alt;
    lightboxImage.dataset.index = index  
}

const onRightNext = () => {
    if (index < gallerys.length - 1) {
        index += 1
    }
    else {
        index = 0
    }
    lightboxImage.src = gallerys[index].original;
    lightboxImage.alt = gallerys[index].description;
    lightboxImage.dataset.index = index;
};

const onLeftNext = () => {
    if (index > 0) {
        index -= 1
    }
    else {
        index = gallerys.length - 1
    }
    lightboxImage.src = gallerys[index].original;
    lightboxImage.alt = gallerys[index].description;
    lightboxImage.dataset.index = index;
};

const changeImage = (e) => {
    if (e.code === 'ArrowRight') {
        onRightNext(Number(lightboxImage.dataset.index))
    };
    if (e.code === 'ArrowLeft') {
        onLeftNext(Number(lightboxImage.dataset.index))
    };
}

galleryRef.addEventListener('click', openModal)