import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { formatDate } from "../utils/format"

import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
deckDeckGoHighlightElement();

const pageQuery = graphql`
  {
    gcms {
      posts {
        id
        slug
        title
        description
        createdAt
      }
    }
  }
`

const BlogIndex = (props) => {
  const { gcms: { posts } } = useStaticQuery(pageQuery)
  return (
    <Layout location="location goes here" title="site title goes here...">
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />
      <Bio />
      {posts.map(({ title, slug, createdAt, description }) => {
        return (
          <div key={slug}>
            <h3
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: `none` }} to={slug}>
                {title}
              </Link>
            </h3>
            <small>{formatDate(createdAt)}</small>
            <p>{description}</p>
          </div>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
