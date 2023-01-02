import gql from 'graphql-tag';
export const allGraphicIntros = gql`
    query  {
      graphicIntros {
       data {
         id
         attributes{
           title
           subTitle
           image {
             data { 
               attributes {
                 url
               }
             }
           }
         }
       }
     }
     } 
    `