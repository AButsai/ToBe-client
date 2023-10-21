import { useState, useEffect } from 'react';
import PhotoAlbum from 'react-photo-album';
import Lightbox from 'yet-another-react-lightbox';

import Container from '../Container';

import { photosForGallery, slidesForGallery } from '../../utils/photos';

import 'yet-another-react-lightbox/styles.css';

const Gallery = ({ images = [] }) => {
  const [index, setIndex] = useState(-1);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    setPhotos(photosForGallery(images));
  }, [images]);

  const handleClick = e => {
    if (e.target.localName === 'div') {
      setIndex(-1);
    }
  };

  return (
    <Container>
      <PhotoAlbum
        photos={photos}
        layout="rows"
        onClick={({ index }) => setIndex(index)}
      />

      <div onClick={handleClick}>
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={photos}
        />
      </div>
    </Container>
  );
};

export default Gallery;
