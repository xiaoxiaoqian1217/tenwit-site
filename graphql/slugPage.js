import gql from 'graphql-tag';
export const getSlugPageQuery = gql`
query($slug: String){
  pages(filters: { slug:{ eq: $slug }}){
    data{
      attributes{
        slug
        graphic_intro{
          __typename
          ...on GraphicIntroEntityResponse{
            data{
              id
              attributes{
                title
                subTitle
                image{
                  data{
                    attributes{
                      url
                    }
                  }
                }
              }
            }
          }
  
        }
        
      }
    }
  }
}`