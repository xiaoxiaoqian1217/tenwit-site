import gql from 'graphql-tag';
export const getSlugSeoQuery = gql`
query($slug: String){
  pages(filters: { slug:{ eq: $slug }}){
    data {
      attributes{
        Seo{
          __typename
          ...on ComponentShareSeo{
            metaTitle
            metaDescription
            keywords
          }
        }
      }
    }
  }
}`