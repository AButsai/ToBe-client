import Image from 'next/image';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { GiChiliPepper } from 'react-icons/gi';
import { FaLeaf } from 'react-icons/fa';
import { Autoplay } from 'swiper';

import Section from '../../Section/Section';
import Container from '../../Container';
import Button from '../../Button';
import Loader from '../../Loader/Loader';

import { filteredProducts } from '../../../redux/product/productSelectors';

import 'swiper/css';
import s from './SliderMenu.module.scss';
import { useEffect, useState } from 'react';

const SliderMenu = () => {
  const [load, setLoad] = useState(false);
  const data = useSelector(filteredProducts);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <Section>
      <h2 className="visually-hidden">Слайдер продуктів</h2>
      <Container>
        <h2 className={s.title}>Рекомендуємо</h2>
        <div style={{ height: '450px' }}>
          {load && data ? (
            <>
              <Swiper
                modules={[Autoplay]}
                spaceBetween={10}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                speed={1000}
                effect={'flip'}
                grabCursor="true"
                autoplay={{
                  pauseOnMouseEnter: true,
                  delay: 2500,
                  disableOnInteraction: false,
                }}
              >
                {data?.map(products => {
                  const {
                    novelty,
                    price,
                    description,
                    sale,
                    spicy,
                    title,
                    vegan,
                    urlChoose,
                    _id,
                    imageURL,
                    fileName,
                  } = products;

                  const finalePrice = price - price * (sale / 100);

                  const shortTitle = () => {
                    return (
                      title
                        .split(' ')
                        .slice(0, 2)
                        .join(' ')
                        .split('')
                        .slice(0, 15)
                        .join('') + ' ...'
                    );
                  };

                  return (
                    <SwiperSlide key={_id} className={s.card}>
                      <div className={s.imgWrap}>
                        <Image
                          className={s.image}
                          src={imageURL}
                          fill
                          sizes="(max-width: 480px) 480px,
                          (max-width: 768px) 768px,
                          (max-width: 1280px) 1280px,
                          100%"
                          priority
                          alt={fileName}
                        />
                      </div>
                      {novelty && (
                        <div className={s.novelty}>
                          <p className={s.textNew}>NEW</p>
                        </div>
                      )}

                      <div className={s.titlesContainer}>
                        <div className={s.titleWrap}>
                          <h3 className={s.titleSwiper}>{`${shortTitle()}`}</h3>
                          <span>
                            {vegan && <FaLeaf className={s.iconsLeaf} />}
                          </span>
                          <span>
                            {spicy && (
                              <GiChiliPepper className={s.iconsPaper} />
                            )}
                          </span>
                        </div>

                        <div className={s.containerdescription}>
                          <p className={s.text}>{description}</p>
                        </div>

                        <div className={s.price}>
                          <p className={s.text}>Ціна: </p>
                          <div>
                            <span className={sale === 1 ? s.text : s.textline}>
                              {price} грн
                            </span>
                            <span className={s.priceText}>
                              {sale !== 1 ? `-${sale}% ` : null}
                            </span>
                            <span className={s.text}>
                              {sale !== 1 ? `= ${finalePrice} грн` : null}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`${urlChoose}`}
                        target="_blank"
                        className={s.link}
                      >
                        <Button modifClass={s.Button} variant="filled">
                          Детальніше
                        </Button>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </Container>
    </Section>
  );
};

export default SliderMenu;
