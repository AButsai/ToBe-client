import { useState, useEffect } from 'react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import Input from './Input';
import Button from './Button';
import UploadFile from './UploadFile';

import {
  useDeleteFolderMutation,
  useUpdateFolderMutation,
  useUploadImageMutation,
} from '../../redux/gallery/galleryAPI';

import s from './styles/Folder.module.scss';

const Folder = ({ folder, setCurrentFolderId }) => {
  const { _id: id, title } = folder;
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);

  const [updateFolder] = useUpdateFolderMutation();
  const [deleteFolder] = useDeleteFolderMutation();
  const [uploadImage] = useUploadImageMutation();

  useEffect(() => {
    if (file) {
      const fetch = async () => {
        try {
          const formData = new FormData();
          formData.append('file', file, file.name);
          await uploadImage({ id, file: formData });
          setFile(null);
        } catch (error) {
          console.log(error.message);
        }
      };

      fetch();
    }

    return () => {
      setLoad(false);
    };
  }, [file]);

  const handleClickUpdate = async title => {
    try {
      await updateFolder({ id, title });
    } catch (error) {
      console.log(error.message);
    }
    setName('');
  };

  const handleDelete = async () => {
    try {
      setLoad(true);
      await deleteFolder({ id });
    } catch (error) {
      console.log(error);
    }
  };

  const useHandleClickFolder = e => {
    setCurrentFolderId(e.currentTarget.id);
  };

  return (
    <li className={s.folder}>
      <div className={s.headerWrap}>
        <p className={s.title}>{title}</p>
        <RemoveRedEyeOutlinedIcon
          id={id}
          className={s.eye}
          onClick={useHandleClickFolder}
        />
        {load ? (
          <CircularProgress color="inherit" size={15} />
        ) : (
          <DeleteOutlineOutlinedIcon
            className={s.icon}
            onClick={handleDelete}
          />
        )}
      </div>

      <div className={s.inputWrap}>
        <Input
          value={name}
          setValue={setName}
          label="Update title folder"
          className="folderInput"
        />
        <Button
          className="folderBtnUpdate"
          onClick={() => handleClickUpdate(name)}
        >
          Update
        </Button>
      </div>
      <UploadFile setFile={setFile} />
    </li>
  );
};

export default Folder;
