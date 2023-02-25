import { useState } from 'react';
import { wrap } from 'popmotion';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import s from './Slider.module.scss';
import { useEffect } from 'react';

const variants = {
  enter: direction => {
    return {
      x: 0,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: direction => {
    return {
      zIndex: 0,
      x: 0,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Slider = ({ images, close = () => {} }) => {
  const [img, setImg] = useState([]);
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, img.length, page);

  useEffect(() => {
    const imgForSlider = images.map(({ imageURL }) => imageURL);
    setImg(imgForSlider);

    return () => setImg([]);
  }, [images]);

  const paginate = newDirection => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timerId = setTimeout(() => paginate(1), 3000);

    return () => clearTimeout(timerId);
  }, [page]);

  const closeSlider = e => {
    e.stopPropagation();
    if (
      e.target === e.currentTarget ||
      e.currentTarget.getAttribute('dataClose') === 'close'
    ) {
      close(false);
    }
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <div className={s.backdrop} onClick={closeSlider}>
          <div className={s.sliderView}>
            <div
              className={s.sliderClose}
              dataclose="close"
              onClick={closeSlider}
            >
              <CloseIcon />
            </div>
            <motion.img
              key={page}
              src={img[imageIndex]}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            />
            <div className={s.arrowLeft} onClick={() => paginate(-1)}>
              <ArrowBackIosNewIcon />
            </div>
            <div className={s.arrowRight} onClick={() => paginate(1)}>
              <ArrowForwardIosIcon />
            </div>
          </div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default Slider;
