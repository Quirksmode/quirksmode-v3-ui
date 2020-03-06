import {
  findByTestAttr,
  mountRender,
  reduxWrap
} from 'tests/testUtils';
import Hero from './Hero';
import 'tests/mocks/intersectionObserver';

describe('Hero', () => {
  let wrapper;
  const props = {
    hero: {
      image: {
        alt: 'Hero Image Alt Test',
        sizes: {
          fullWidth481: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1-481x200.jpg',
          fullWidth481_2x: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1-962x401.jpg',
          fullWidth768: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1-768x320.jpg',
          fullWidth768_2x: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1-1536x640.jpg',
          fullWidth1024: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1-1024x427.jpg',
          fullWidth1024_2x: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1.jpg',
          fullWidth1800: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1-1800x750.jpg',
          fullWidth1800_2x: 'https://cms.quirksmode.co.uk/wp-content/uploads/2020/01/smashingconf-barcelona-neckinfo-1.jpg'
        }
      },
      alignCenter: true
    },
    title: 'Smashing Conference 2015 - Barcelona',
    url: 'https://cms.quirksmode.co.uk/blog/smashing-conference-2015-barcelona/',
    subtitle: '15th November 2015',
    type: 'project'
  };

  beforeEach(() => {
    wrapper = mountRender(reduxWrap(Hero, props));
  });

  it('matches snapshot', () => {
    expect(wrapper.html).toMatchSnapshot();
  });

  it('should display title', () => {
    const title = findByTestAttr(wrapper, 'Hero__textWrapTitle');
    expect(title.text()).toBe(props.title);
  });

  it('should display subtitle', () => {
    const subtitle = findByTestAttr(wrapper, 'Hero__subtitle');
    expect(subtitle.text()).toBe(props.subtitle);
  });

  it('should display image', () => {

  });

  it('should apply grid__content--center class when alignCenter is true', () => {

  });

  it('should show breadcrumbs', () => {

  });

  it('should display the correct Type', () => {

  });

  it('should show share links', () => {

  });
});
