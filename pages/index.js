import LayoutHead from '../components/LayoutHead';
import About from '../components/Main/About';
import Slider from '../components/Main/Slider/Slider';
import SliderMenu from '../components/Main/SliderMenu/SliderMenu';

import Container from '../components/Container';

export default function Home({ errorCode }) {
  return (
    <Container>
      <LayoutHead title="to be" />
      <Slider />
      <SliderMenu />
      <About />
    </Container>
  );
}
