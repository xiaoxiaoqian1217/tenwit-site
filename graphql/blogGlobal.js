import gql from 'graphql-tag';
export const blogGlobalQurey = gql`query  {
	global {
    data{
      attributes{

        siteHeader{
          __typename
          title
    
        
           ...on ComponentGlobalNavigation{
        
            navigations{
              data{
                id
                
                attributes{
                  label
                  href
                  isExternal
                  target
    
                 
                }
              }
            }
         
          }

                    

        }
        footer{
          icp

        
           
          
        }
      }
    }
  }
}`