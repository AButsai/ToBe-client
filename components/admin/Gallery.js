import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import Input from './Input';
import Button from './Button';
import List from './List';
import Folder from './Folder';

import {
  useGetGalleryQuery,
  useAddFolderMutation,
  useDeleteImageMutation,
  useGetFolderQuery,
} from '../../redux/gallery/galleryAPI';

import UploadFile from './UploadFile';

import s from './styles/Gallery.module.scss';

const Gallery = () => {
  const [nameFolder, setNameFolder] = useState('');
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [filterFolder, setFilterFolder] = useState([]);
  const [images, setImages] = useState(null);
  const { data = [] } = useGetGalleryQuery();
  const [addFolder] = useAddFolderMutation();
  const [deleteImage] = useDeleteImageMutation();

  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [isCurrentFolderId, setIsCurrentFolderId] = useState(true);

  const { data: folder } = useGetFolderQuery(currentFolderId, {
    skip: isCurrentFolderId,
  });

  useEffect(() => {
    if (currentFolderId) {
      setIsCurrentFolderId(false);
    }

    setImages(folder?.folder.items);
  }, [currentFolderId, folder]);

  useEffect(() => {
    const folders = data.folders?.filter(folder =>
      folder.title?.toLowerCase().includes(nameFolder.toLowerCase())
    );
    setFilterFolder(folders);
    setIsLoad(false);
  }, [nameFolder, data]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!file) {
      setError('Загрузіть фото будь ласка!');
      return;
    } else {
      setError(null);
    }

    setIsLoad(true);

    try {
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('title', nameFolder);

      await addFolder({ formData });
      setNameFolder('');
      setFile(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImage = async (folderId, imgId) => {
    try {
      await deleteImage({ folderId, imgId });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleSubmit}>
        <Input
          value={nameFolder}
          setValue={setNameFolder}
          label="Add folder name"
        />
        <UploadFile className="addFolder" setFile={setFile} />
        <Button className="folderAddName" type="submit">
          {isLoad ? (
            <CircularProgress color="inherit" size={15} />
          ) : (
            'Add folder'
          )}
        </Button>
        {error && <p className={s.errorText}>{error}</p>}
      </form>
      <div className={s.listWrapper}>
        <List>
          {filterFolder?.map(folder => (
            <Folder
              key={folder._id}
              folder={folder}
              setCurrentFolderId={setCurrentFolderId}
            />
          ))}
        </List>
        <span className={s.line}></span>
        <List>
          {images &&
            images.map(({ id, imageURL, fileName }) => (
              <li key={id} className={s.item}>
                <DeleteOutlineOutlinedIcon
                  sx={{ fontSize: 30 }}
                  className={s.deleteIcon}
                  onClick={() => handleDeleteImage(currentFolderId, id)}
                />
                <Image
                  className={s.img}
                  src={imageURL}
                  fill
                  sizes="100%"
                  alt={fileName}
                />
              </li>
            ))}
        </List>
      </div>
    </div>
  );
};

export default Gallery;
