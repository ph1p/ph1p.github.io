const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = ({ graphql, actions: { createPage } }) => {
  const pageTemplate = path.resolve(`src/templates/page.js`);
  const postTemplate = path.resolve(`src/templates/post.js`);

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            excerpt
            fields {
              slug
              isPost
            }
            headings {
              depth
              value
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const nodes = result.data.allMarkdownRemark.edges;

    nodes.forEach(({ node }) => {
      createPage({
        path: node.fields.slug || node.frontmatter.path,
        component: node.fields.isPost ? postTemplate : pageTemplate,
        context: {
          ...node
        }
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    let nodePath = createFilePath({ node, getNode });

    createNodeField({
      name: `isPost`,
      node,
      value: !!nodePath.match(/\/posts\//g)
    });

    createNodeField({
      name: `slug`,
      node,
      value: nodePath.match(/([^\/]*)\/*$/)[1]
    });
  }
};
