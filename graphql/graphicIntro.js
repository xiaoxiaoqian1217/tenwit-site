import gql from 'graphql-tag';
export const getGraghicIntroQuery = gql`
query getGraghicIntro ($id: ID) {
  graphicIntro(id:$id){
    data{
      attributes{
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
}`