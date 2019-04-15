import React from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import anime from 'animejs/lib/anime.es.js';
import { rhythm } from '../utils/typography';

import styled, { css } from 'styled-components';

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  padding: 40px;
  ${media.phone`
    padding: 20px;
  `}
`;

const Main = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  /* grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr); */
  grid-template-areas:
    'logo navigation'
    'title skills';
  pointer-events: none;
  .logo {
    background-color: #999;
  }
  grid-template-columns: 1fr 1fr;

  ${media.phone`
    grid-template-areas:
        'logo navigation'
        'title title'
        'skills skills';
  `}
`;

const Title = styled.div`
  grid-area: title;
  font-size: ${rhythm(4.5)};
  line-height: ${rhythm(4.5)};
  align-self: end;
  font-weight: 600;

  ${media.phone`
    font-size: ${rhythm(2)};
    line-height: ${rhythm(2)};
  `}
`;

const Skills = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50%;
  min-width: 400px;

  grid-area: skills;
  align-self: end;
  justify-self: right;

  ${media.phone`
    width: 100%;
    min-width: 100%;
  `}
`;

const Skill = styled.div`
  border-bottom: 1px solid #000c;
  line-height: 40px;
  &:nth-child(even) {
    text-align: right;
  }
`;

const Logo = styled.div`
  position: relative;

  grid-area: logo;
  &:after,
  &:before {
    content: '';
    position: absolute;
    transition: all 0.3s;
    left: 0;
    background-color: #000c;
    border-radius: 100%;
  }
  &:after {
    width: 30px;
    height: 30px;
  }
  &:before {
    width: 15px;
    height: 15px;
    top: 32px;
  }
`;

const Navigation = styled.nav`
  grid-area: navigation;
  text-align: right;
  font-weight: 600;
  pointer-events: all;
`;

const NavItem = styled(TransitionLink)`
  position: relative;
  display: block;
  font-size: ${rhythm(1)};
  text-decoration: none;
  padding: 0 ${props => (props.active ? '20px' : 0)} 0 0;
  transition: all 0.3s;
  color: #000c;
  &:after {
    content: '';
    opacity: ${props => (props.active ? 1 : 0)};
    top: 45%;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #000c;
    border-radius: 100%;
    position: absolute;
    transition: all 0.4s;
  }
  &:hover {
    padding: 0 20px 0 0;
    &:after {
      opacity: 1;
    }
  }
`;

const Circle = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fcc187;
  height: 85vh;
  width: 85vh;
  border-radius: 100%;
  transition: all 0.3s;
`;

class BlogIndex extends React.Component {
  render() {
    return (
      <Wrapper title="Blog" keywords={[`blog`, `ph1p`]}>
        <Circle ref="circle" />
        <Main>
          <Logo />
          <Navigation>
            <NavItem
              active="true"
              to="/blog"
              exit={{
                trigger: ({ exit, node }) => {
                  const skillsTl = anime.timeline({
                    easing: 'cubicBezier(.5, .05, .1, .3)',
                    duration: 1000
                  });
                  skillsTl.add({
                    translateX: {
                      value: 50,
                      duration: 200
                    },
                    opacity: {
                      value: 0,
                      duration: 100
                    },
                    targets: this.refs.skills
                  });

                  const tl = anime.timeline({
                    easing: 'cubicBezier(.5, .05, .1, .3)',
                    transformOrigin: {
                      duration: 0,
                      value: '0 0 0'
                    },
                    scale: {
                      value: 1,
                      duration: 0
                    },
                    duration: 1000
                  });
                  tl.add({
                    translateY: {
                      value: '-50%',
                      duration: 0
                    },
                    translateX: {
                      value: '-50%',
                      duration: 0
                    },
                    targets: this.refs.circle,
                    scale: {
                      value: 2,
                      duration: 0
                    },
                    opacity: {
                      value: 0,
                      duration: 200
                    }
                  });
                },
                length: 1
              }}
              entry={{
                delay: 0.6
              }}
            >
              Work
            </NavItem>
            {/* <NavItem>Tech</NavItem>
            <NavItem>Me</NavItem> */}
          </Navigation>

          <Title>
            I'm a<br />
            developer
          </Title>

          <Skills ref="skills">
            <Skill>JavaScript</Skill>
            <Skill>Typescript</Skill>
            <Skill>React</Skill>
            <Skill>Vue</Skill>
            <Skill>Angular</Skill>
            <Skill>Node</Skill>
            <Skill>Java</Skill>
            <Skill>Databases</Skill>
            <Skill>CSS</Skill>
            <Skill>and and and (:</Skill>
          </Skills>
        </Main>
      </Wrapper>
    );
  }
}

export default BlogIndex;
