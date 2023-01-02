import gql from 'graphql-tag';
export const twGlobalQurey = gql`
query  {
	twGlobal {
    data{
      attributes{
        siteHeader{
          ...on ComponentGlobalNavigation{
            navigations {
              data{
                attributes{
                  label
                  href
                  target
                  isExternal
           
                }
              }
            }
          }
        
        }
        footer{
          
          __typename
          ...on ComponentGlobalFooter{
            
            footerFields{
              __typename
              ...on ComponentShareField{
                label
                value
              }
            }
            companyInfo{
              des
              fullName
              qwQrcode{
                data{
                  attributes{
                    url
                  }
                }
              }
              iconUrl{
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
}`