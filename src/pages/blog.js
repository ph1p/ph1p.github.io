import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from '../components/layout';

class BlogIndex extends React.Component {
  render() {
    return (
      <Layout title="Blog" keywords={[`blog`, `ph1p`]}>
        Blog
        {this.props.data.allMarkdownRemark.edges
          .filter(({ node }) => node.fields.isPost)
          .map(({ node }) => {
            return (
              <div key={node.fields.slug}>
                <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
              </div>
            );
          })}
          <Link to="/me">back</Link>
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          excerpt
          fields {
            slug
            isPost
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
