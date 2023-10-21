import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { Navigation, Autoplay } from 'swiper';
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi';

import Section from '../../Section/Section';
import { filteredBanners } from '../../../redux/product/productSelectors';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';

import s from './Slider.module.scss';

const Slider = () => {
  const [load, setLoad] = useState(false);
  const swiperNextBtn = useRef(null);
  const swiperPrevBtn = useRef(null);
  const data = useSelector(filteredBanners);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <Section>
      <h2 className="visually-hidden">Слайдер</h2>
      <div className={s.sliderWrapper}>
        {load && (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            speed={700}
            loop={true}
            touchRatio={1.5}
            effect={'flip'}
            autoplay={{
              delay: 5000,
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: swiperPrevBtn.current,
              nextEl: swiperNextBtn.current,
            }}
            onInit={swiper => {
              swiper.params.navigation.prevEl = swiperPrevBtn.current;
              swiper.params.navigation.nextEl = swiperNextBtn.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            className={s.swiper}
          >
            {data?.map(({ imageURL, _id, fileName }) => (
              <SwiperSlide key={_id} className={s.imageWrap}>
                <Image
                  src={imageURL}
                  className={s.imageSwiper}
                  fill
                  sizes="(max-width: 480px) 480px,
                  (max-width: 768px) 768px,
                  (max-width: 1280px) 1280px,
                  100%"
                  priority
                  alt={fileName}
                />
              </SwiperSlide>
            ))}
            <div className={s.swiperPrevBtn} ref={swiperPrevBtn}>
              <BiCaretLeft className={s.icon} />
            </div>
            <div className={s.swiperNextBtn} ref={swiperNextBtn}>
              <BiCaretRight className={s.icon} />
            </div>
          </Swiper>
        )}
      </div>
    </Section>
  );
};

export default Slider;
