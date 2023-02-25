import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Error from '../../components/Error/Error';
import Gallery from '../../components/Gallery/Gallery';
import Loader from '../../components/Loader/Loader';

import { useGetFolderQuery } from '../../redux/gallery/galleryAPI';
import { createObjectsPhotos } from '../../utils/photos';

const Folder = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();
  const { folderId } = router.query;
  const {
    data = {},
    isSuccess,
    isLoading,
    isError,
  } = useGetFolderQuery(folderId);

  useEffect(() => {
    const img = data?.folder?.items.map(({ imageURL }) => imageURL) || [];
    for (const url of img) {
      createObjectsPhotos(url)
        .then(img => setImages(prev => [...prev, img]))
        .catch(err => err);
    }
  }, [data]);

  return (
    <>
      {isError && <Error />}
      {isLoading && <Loader />}
      {isSuccess && <Gallery images={images} />}
    </>
  );
};

export default Folder;
