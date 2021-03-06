import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import remark from 'remark'
import html from 'remark-html'


class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.gcms.post

    let blogBody = '';
    remark()
      .use(html)
      .process(post.body, function (err, file) {
        blogBody = String(file)
      })

    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext

    const displayDate = new Date(post.createdAt).toLocaleDateString('en-GB', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={post.title} description={post.description} />
        <h1>{post.title}</h1>
        <p
          style={{
            ...scale(-1 / 5),
            display: `block`,
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        >
          {displayDate}
        </p>
        <div dangerouslySetInnerHTML={{ __html: blogBody }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={`/${previous.slug}`} rel="prev">
                ← {previous.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/${next.slug}`} rel="next">
                {next.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById($id: ID!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    gcms {
      post(where: {id: $id}) {
        id
        slug
        title
        body
        description
        createdAt
      }
    }
  }
`
