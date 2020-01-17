import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/Layout';
import Head from '../components/Head';
import style from '../styles/projects.module.sass';
import github from '../img/github.svg';
import website from '../img/website.svg';
import Project from '../components/Project';

export default () => {
  const data = useStaticQuery(
    graphql`
      query projects {
        allContentfulProject(sort: { fields: created, order: DESC }) {
          edges {
            node {
              createdAt(formatString: "MMMM YYYY")
              description {
                json
              }
              hostedAt
              github
              slug
              title
              projectShowcase {
                file {
                  url
                }
              }
              featured
            }
          }
        }
      }
    `
  );

  const featured = data.allContentfulProject.edges.find(
    edge => edge.node.featured
  );
  const all = data.allContentfulProject.edges;
  const [active, setActive] = useState(featured.node);

  const handleProjectChange = slug => {
    const newProject = all.find(edge => edge.node.slug === slug);
    setActive(newProject.node);
  };

  return (
    <Layout>
      <Head title={'Projects'} />
      <div className={style.projects}>
        <div>
          {all.map(edge => (
            <div
              key={edge.node.slug}
              className={style.titles}
              onClick={() => handleProjectChange(edge.node.slug)}
            >
              <p className={style.indicator}>
                {active.slug === edge.node.slug ? '♦' : ''}
              </p>
              <p
                className={
                  style.text +
                  (active.slug === edge.node.slug ? style.activeTitle : '')
                }
              >
                {edge.node.title}
              </p>
            </div>
          ))}
        </div>
        <Project {...active} />
      </div>
    </Layout>
  );
};
