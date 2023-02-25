import Link from 'next/link';
import Image from 'next/image';

import { useGetGalleryQuery } from 'redux/gallery/galleryAPI';

import List from '../../components/admin/List';
import LayoutHead from '../../components/LayoutHead';
import Error from '../../components/Error/Error';
import Loader from '../../components/Loader/Loader';

import s from '../../styles/Gallery.module.scss';

export default function Gallery() {
  const { data = [], isSuccess, isLoading, isError } = useGetGalleryQuery();

  return (
    <>
      <LayoutHead title="Events" />
      {isError && <Error />}
      {isLoading && <Loader />}
      {isSuccess && (
        <List>
          {data?.folders?.map(({ title, _id, imageURL }) => (
            <li key={_id} className={s.item}>
              <Link className={s.link} href={`/gallery/${_id}`}>
                <p className={s.title}>{title}</p>
                <Image src={imageURL} width={1000} height={1000} alt="pic" />
              </Link>
            </li>
          ))}
        </List>
      )}
    </>
  );
}
