import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

const pageQuery = graphql`
  {
    gcms {
      posts {
        id
        slug
        title
        createdAt
      }
    }
  }
`

const BlogIndex = (props) => {
  // const { data } = this.props
  // const siteTitle = data.site.siteMetadata.title
  // const posts = data.allMarkdownRemark.edges
  const { gcms: { posts } } = useStaticQuery(pageQuery)
  return (
    <Layout location="location goes here" title="site title goes here...">
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Bio />
      {posts.map((post) => {
        const title = post.title || post.slug
        return (
          <div key={post.slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={post.slug}>
                {title}
              </Link>
            </h3>
            <small>{post.createdAt}</small>
            {/* <p dangerouslySetInnerHTML={{ __html: post.excerpt }} /> */}
            <p>Description goes here</p>
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

// export const pageQuery = graphql`
//   query {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
//       edges {
//         node {
//           excerpt
//           fields {
//             slug
//           }
//           frontmatter {
//             date(formatString: "MMMM DD, YYYY")
//             title
//           }
//         }
//       }
//     }
//   }
// `
