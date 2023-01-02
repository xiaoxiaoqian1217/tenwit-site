import gql from 'graphql-tag';
export const articlesQurey = gql`query {
  articles{
    data{
      attributes{
        title
        description
        date
        linkUrl
      }
    }
  }
}`