import React from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import anime from 'animejs/lib/anime.es.js';
import { rhythm } from '../../utils/typography';
import { media } from '../../utils/styles';
import Layout from '../layout';

import styled from 'styled-components';

const Wrapper = styled(Layout)`
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
    'bottomLeft bottomRight';
  pointer-events: none;
  .logo {
    background-color: #999;
  }
  grid-template-columns: 1fr 1fr;

  ${media.phone`
    grid-template-areas:
        'logo navigation'
        'bottomLeft bottomLeft'
        'bottomRight bottomRight';
  `}
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

const BottomLeft = styled.div`
  align-self: end;
  grid-area: bottomLeft;
`;
const BottomRight = styled.div`
  grid-area: bottomRight;
  align-self: end;
  justify-self: right;
  ${media.phone`
    justify-self:auto;
  `}
`;

class BlogIndex extends React.Component {
  render() {
    const { title, keywords, bottomLeft, bottomRight } = this.props;
    return (
      <Wrapper title={title} keywords={keywords}>
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
                    duration: 1000,
                    scale: {
                      value: 1,
                      duration: 0
                    },
                    transformOrigin: {
                      duration: 0,
                      value: '0 0 0'
                    },
                    translateX: {
                      value: 0,
                      duration: 0
                    }
                  });
                  skillsTl.add({
                    targets: [this.refs.bottomRight, this.refs.bottomLeft],
                    opacity: {
                      value: 0,
                      duration: 400
                    },
                    scale: {
                      value: 2,
                      duration: 500
                    }
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
                    targets: this.refs.circle,
                    translateY: {
                      value: '-50%',
                      duration: 0
                    },
                    translateX: {
                      value: '-50%',
                      duration: 0
                    },
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
                delay: 0.5
              }}
            >
              Work
            </NavItem>
          </Navigation>
          <BottomLeft ref="bottomLeft">{bottomLeft}</BottomLeft>
          <BottomRight ref="bottomRight">{bottomRight}</BottomRight>
        </Main>
      </Wrapper>
    );
  }
}

export default BlogIndex;
