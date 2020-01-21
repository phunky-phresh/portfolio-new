require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    logo: 'AB',
    title: 'Aleks Brymora',
    author: 'Aleks Brymora',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `02g4788riobs`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: `preview.contentful.com`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Aleks Brymora - Portfolio`,
        short_name: `Portfolio`,
        start_url: `/`,
        background_color: `#161519`,
        theme_color: `#FFCCCC`,
        display: `standalone`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/projects/`, `/other/`],
      },
    },
  ],
};
