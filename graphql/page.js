import gql from 'graphql-tag';
export const pageData = gql`
query  {
 page (id: "1"){
  data {
    id 
    attributes {
      title 
       blocks {
        __typename
        ...on ComponentShareGraphicIntro {
            title
          	subTitle
          image {
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
}`