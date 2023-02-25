import Image from 'next/image';
import { motion } from 'framer-motion';

import Section from '../../Section/Section';
import Container from '../../Container';
import Image1 from '/public/about/hookah.jpg';
import Image2 from '/public/about/large-place.jpg';

import s from './About.module.scss';

const textAnimation = {
  hidden: {
    y: 130,
    opacity: 0,
  },
  visible: custom => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.7 },
  }),
};

const pictureAnimationLeft = {
  hidden: {
    x: -130,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.7 },
  }),
};

const pictureAnimationRight = {
  hidden: {
    x: 130,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.2, duration: 0.7 },
  }),
};

const About = () => {
  return (
    <Section>
      <Container>
        <h2 className={s.title}>Про нас</h2>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className={s.wrap}
          id="about"
        >
          <motion.p custom={1} variants={textAnimation} className={s.sub_title}>
            'Місце де відпочиває душа.'
          </motion.p>

          <motion.div
            custom={2}
            variants={textAnimation}
            style={{ width: '100%' }}
          >
            <motion.div custom={2} variants={pictureAnimationLeft}>
              <Image
                className={s.imageLeft}
                src={Image1}
                alt="Picture of the author"
                width={300}
                height={300}
              />
            </motion.div>
            <p className={s.text}>
              Чудовим завершенням робочого дня може бути випитий тобою New York
              Sour у стінах to be. Він допоможе тобі розслабитися, вивести з
              організму токсини і налагодити метаболізм так, щоб потім
              побалувати себе порцією Шоколадного лав-кейка.
            </p>
            <motion.div custom={2} variants={pictureAnimationRight}>
              <Image
                className={s.imageRight}
                src={Image2}
                alt="Picture of the author"
                width={420}
                height={420}
              />
            </motion.div>
          </motion.div>
          <motion.p custom={3} variants={textAnimation} className={s.text}>
            to be подбав про такі заходи, як банкети, ювілеї, корпоративи або
            просто сімейні святкування. При проектуванні самої будівлі він
            розподілив площі таким чином, щоб врахувати всі нюанси, побажання та
            смаки своїх гостей.
          </motion.p>
        </motion.section>
      </Container>
    </Section>
  );
};

export default About;
