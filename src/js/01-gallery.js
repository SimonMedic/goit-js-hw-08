// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

import SimpleLightBox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryElement = document.querySelector('.gallery');

const galleryList = galleryItems
  .map(
    ({ preview, original, description }) => `
<li class="gallery_item">
<a href="${original}">
<img class="gallery_image" src="${preview}" alt="${description}" />
</a>
</li>
`
  )
  .join('');

galleryElement.insertAdjacentHTML('beforeend', galleryList);

let lightbox = new SimpleLightBox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

console.log(galleryItems);
