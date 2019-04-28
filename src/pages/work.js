import React from 'react';
import MainWrapper from '../components/main/wrapper';
import { rhythm } from '../utils/typography';
import { media } from '../utils/styles';

import styled from 'styled-components';

const Title = styled.div`
  font-size: ${rhythm(4)};
  line-height: ${rhythm(4)};
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

class Work extends React.Component {
  render() {
    return (
      <MainWrapper
        title="Work"
        keywords={[`work`, `ph1p`]}
        bottomLeft={(
          <Title>
            I'm a<br />
            developer
          </Title>
        )}
        bottomRight={(
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
        )}
      />
    );
  }
}

export default Work;
