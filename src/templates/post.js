import React from 'react';

import Layout from '../components/layout';

export default (props) => {
  const title = props.pageContext.frontmatter.title;
  const html = props.pageContext.html;
  const excerpt = props.pageContext.excerpt;

  return (
    <Layout title={title} keywords={[title, `ph1p`]} description={excerpt}>
      <h3>{title}</h3>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};
