import React from 'react';
import { rhythm } from '../utils/typography';

import styled from 'styled-components';

const Wrapper = styled.section`
  position: relative;
  height: 100vh;
  padding: 30px;
`;

const Main = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  .logo {
    background-color: #999;
  }
  .title {
    grid-column: 1 / span 6;
    grid-row: 9 / span 4;
    font-size: ${rhythm(3.5)};
    line-height: ${rhythm(3.5)};
    align-self: end;
    font-weight: 900;
  }
`;

const Skills = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column: 9 / span 4;
  grid-row: 9 / span 4;
  align-self: end;
`;

const Skill = styled.div`
  border-bottom: 1px solid #000c;
  font-weight: 600;
  line-height: 40px;
  &:nth-child(even) {
    text-align: right;
  }
`;

const Logo = styled.div`
  position: relative;
  grid-column: 1 / span 2;
  grid-row: 1 / span 2;
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
  grid-column: 11 / span 2;
  grid-row: 1 / span 5;
  text-align: right;
  font-weight: 900;
`;

const NavItem = styled.a`
  position: relative;
  display: block;
  font-size: ${rhythm(1)};
  text-decoration: none;
  padding: 0 ${props => (props.active ? '20px' : 0)} 0 0;
  transition: all 0.3s;
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
  &:hover {
    transform: translate(-50%, -50%) scale(3);
  }
`;

class BlogIndex extends React.Component {
  render() {
    return (
      <Wrapper title="Blog" keywords={[`blog`, `ph1p`]}>
        <Circle />
        <Main>
          <Logo />
          <Navigation>
            <NavItem active>Job</NavItem>
            <NavItem>Tech</NavItem>
            <NavItem>Me</NavItem>
          </Navigation>

          <div className="title">
            I'm a<br />
            developer
          </div>

          <Skills>
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
