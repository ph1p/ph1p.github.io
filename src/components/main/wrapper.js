import React, { Component } from 'react';
import TransitionLink from 'gatsby-plugin-transition-link';
import store from '../../store';
import anime from 'animejs/lib/anime.es.js';
import { rhythm } from '../../utils/typography';
import { media } from '../../utils/styles';
import Layout from '../layout';
import Cursor from '../cursor';

import styled from 'styled-components';

const Wrapper = styled(Layout)`
  cursor: none;
  position: relative;
  height: 100vh;
  padding: 40px;
  background-color: ${props => props.bgColor || '#fff'};
  ${media.phone`
    padding: 20px;
  `}
  * {
    cursor: none;
  }
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
  /* pointer-events: none; */
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

const NavigationWrapper = styled.nav`
  justify-self: right;
`;

const Navigation = styled.nav`
  grid-area: navigation;
  text-align: right;
  font-weight: 600;
  pointer-events: all;
  width: 120px;
`;

const NavItem = styled(TransitionLink)`
  position: relative;
  display: block;
  font-size: ${rhythm(1)};
  text-decoration: none;
  padding: 0;
  transition: all 0.3s;
  color: #000c;
  &:after {
    content: '';
    opacity: 0;
    top: 45%;
    right: 0;
    width: 8px;
    height: 8px;
    background-color: #000c;
    border-radius: 100%;
    position: absolute;
    transition: all 0.5s;
  }
  &.active {
    padding: 0 20px 0 0;
    &:after {
      opacity: 1;
    }
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
  background-color: ${props => props.bgColorCircle || '#fcc187'};
  height: 85vh;
  width: 85vh;
  border-radius: 100%;
  z-index: 0;
  transition: all 0.5s;
  transform-origin: 0 0;
`;

const AnimCircle = styled(Circle)`
  transform: scale(0) translate(-50%, -50%);
  z-index: 1;
`;

const BottomLeft = styled.div`
  align-self: end;
  grid-area: bottomLeft;
  position: relative;
  z-index: 1;
  transition: all 0.5s;
`;
const BottomRight = styled.div`
  grid-area: bottomRight;
  align-self: end;
  justify-self: right;
  position: relative;
  z-index: 1;
  ${media.phone`
    justify-self:auto;
  `}
`;

class MainWrapper extends Component {
  constructor(props) {
    super(props);

    this.siteChangeExit = this.siteChangeExit.bind(this);
    this.siteChangeEnter = this.siteChangeEnter.bind(this);

    const { bgColor, bgColorCircle } = store.pages[
      typeof window !== `undefined` ? window.location.pathname : '/'
    ];

    this.state = {
      bgColor,
      bgColorCircle,
      nextBgColor: null,
      nextColorCircle: null
    };
  }

  siteChangeExit(path) {
    const { bgColor, bgColorCircle } = store.pages[path];

    this.setState(
      {
        nextColorCircle: bgColorCircle,
        bgColorCircle: bgColor
      },
      state => {
        this.refs.circle.style.transform = 'scale(4) translate(-50%, -50%)';
        this.refs.animCircle.style.transform = 'scale(1) translate(-50%, -50%)';
        this.refs.bottomLeft.style.opacity = 0;
      }
    );
  }

  siteChangeEnter(node) {
    node.querySelector('.title').style.opacity = 0;
    setTimeout(() => {
      node.querySelector('.title').style.opacity = 1;
    }, 0);
  }

  componentDidMount() {
    this.refs.bottomLeft.style.opacity = 1;
  }

  render() {
    const { title, keywords, bottomLeft, bottomRight } = this.props;

    return (
      <Wrapper title={title} keywords={keywords} bgColor={this.state.bgColor}>
        <Cursor />
        <Main ref="main">
          <Circle bgColorCircle={this.state.bgColorCircle} ref="circle" />
          <AnimCircle
            bgColorCircle={this.state.nextColorCircle}
            ref="animCircle"
          />
          <Logo />
          <NavigationWrapper>
            <Navigation ref="navigation">
              <NavItem
                activeClassName="active"
                to="/me"
                exit={{
                  trigger: () => this.siteChangeExit('/me'),
                  length: 0.5
                }}
                entry={{
                  delay: 0.5,
                  trigger: ({ node }) => this.siteChangeEnter(node)
                }}
              >
                Me
              </NavItem>
              <NavItem
                activeClassName="active"
                to="/work"
                exit={{
                  trigger: () => this.siteChangeExit('/work'),
                  length: 0.5
                }}
                entry={{
                  delay: 0.5,
                  trigger: ({ node }) => this.siteChangeEnter(node)
                }}
              >
                Work
              </NavItem>
              <NavItem
                activeClassName="active"
                to="/music"
                exit={{
                  trigger: () => this.siteChangeExit('/music'),
                  length: 0.5
                }}
                entry={{
                  delay: 0.5,
                  trigger: ({ node }) => this.siteChangeEnter(node)
                }}
              >
                Music
              </NavItem>
            </Navigation>
          </NavigationWrapper>
          <BottomLeft className="title" ref="bottomLeft">
            {bottomLeft}
          </BottomLeft>
          <BottomRight ref="bottomRight">{bottomRight}</BottomRight>
        </Main>
      </Wrapper>
    );
  }
}

export default MainWrapper;
