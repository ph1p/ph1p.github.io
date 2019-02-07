import React from 'react';
import styled from 'styled-components';
import Header from './header';
import SEO from '../components/seo';

import { rhythm } from '../utils/typography';

const Wrapper = styled.section`
  marginleft: auto;
  marginright: auto;
  maxwidth: rhythm(24);
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

class Layout extends React.Component {
  render() {
    const { children, title, keywords, description } = this.props;

    return (
      <Wrapper>
        <SEO title={title} keywords={keywords} description={description} />
        <Header />
        <main>{children}</main>
        <footer>© {new Date().getFullYear()}</footer>
      </Wrapper>
    );
  }
}

export default Layout;
