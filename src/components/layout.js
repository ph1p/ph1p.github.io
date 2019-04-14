import React from 'react';
import styled from 'styled-components';
// import Header from './header';
import SEO from '../components/seo';

import { rhythm } from '../utils/typography';

const LayoutWrapper = styled.div`
  height: 100vh;
`;

const ContentWrapper = styled.div`
  margin: 0 auto;
  height: auto;
  max-width: ${rhythm(40)};
  width: 100%;
  padding: 0 ${rhythm(2.4)};
`;

class Layout extends React.Component {
  render() {
    const { children, title, keywords, description, className } = this.props;

    return (
      <LayoutWrapper className={className}>
        <SEO title={title} keywords={keywords} description={description} />
        {/* <Header /> */}
        {children}
        {/* <footer>© {new Date().getFullYear()}</footer> */}
      </LayoutWrapper>
    );
  }
}

export const Content = ({ children, className }) => (
  <ContentWrapper className={className}>{children}</ContentWrapper>
);

export default Layout;
