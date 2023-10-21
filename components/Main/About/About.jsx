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
        <h2 className={s.title}>О нас</h2>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          className={s.wrap}
          id="about"
        >
          <motion.p custom={1} variants={textAnimation} className={s.sub_title}>
            Місце де відпочиває душа
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
            <motion.p custom={2} className={s.text}>
              ToBe - це унікальний ресторан, що пропонує смачний ф'южн
              української та азіатської кухні, а також захоплюючий вибір
              коктейлів, чаїв та кальянів. У чотирьох місцях на вибір ви можете
              насолодитися трапезою в основному залі, кальянному залі, на
              балконі або на літній терасі, кожне з яких забезпечує унікальні
              гастрономічні враження.
            </motion.p>
            <motion.p custom={3} variants={textAnimation} className={s.text}>
              У головному залі ви можете насолодитися ароматом
              свіжоприготовлених страв, милуючись елегантним декором та
              атмосферою. Якщо ви налаштовані на екзотичні уподобання та
              розслаблюючу атмосферу, вирушайте в кальянний зал, де ви зможете
              насолодитися смачними закусками та спробувати одні з найкращих
              кальянів у місті.
            </motion.p>
            <motion.p custom={4} variants={textAnimation} className={s.text}>
              Для тих, хто воліє обідати на свіжому повітрі, ідеальним вибором
              стануть балкон та літня тераса. З цих відкритих майданчиків
              відкривається мальовничий краєвид на околиці, що робить їх
              ідеальними для романтичної вечері або неформального обіду з
              друзів.
            </motion.p>
            <motion.div custom={5} variants={pictureAnimationRight}>
              <Image
                className={s.imageRight}
                src={Image2}
                alt="Picture of the author"
                width={420}
                height={420}
              />
            </motion.div>
            <motion.p custom={6} variants={textAnimation} className={s.text}>
              Меню ToBe є чудовим поєднанням українських і азіатських страв,
              починаючи від класичних вареників та борщу та закінчуючи суші та
              смаженою локшиною. Ви також можете насолодитися широким вибором
              освіжаючих коктейлів, чаю та інших напоїв, які доповнять вашу
              трапезу.
            </motion.p>
            <motion.p custom={7} variants={textAnimation} className={s.text}>
              Таким чином, ToBe - фантастичний ресторан, що пропонує унікальне
              поєднання української та азіатської кухні, а також різноманітні
              напої та кальяни. З чотирма різними місцями на вибір, ви
              обов'язково знайдете ідеальне місце для вашого наступної вечері чи
              вечора.
            </motion.p>
          </motion.div>
        </motion.section>
      </Container>
    </Section>
  );
};

export default About;
