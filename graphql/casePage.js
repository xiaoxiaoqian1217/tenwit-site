import gql from 'graphql-tag';
export const casePageData = gql`
query  {
  page (id: "2"){
   data {
     id 
     attributes {
       title 
        blocks {
         __typename
         ...on ComponentBlocksHomeFeature {
             graphic_intro{
               data{
                 attributes{
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
                  ...on ComponentBlocksCaseDetail{
            title
            cards{
              title
              text
              image{
                data{
                  attributes{
                    url
                    
                  }
                }
              }
            }
           
          }
           ...on ComponentBlocksPartner{
              title
              graphic_intros{
                data{
                  attributes{
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
     }
     
   }
 }
 }`