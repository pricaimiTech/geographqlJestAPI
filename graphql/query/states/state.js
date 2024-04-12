export const queryData = (country_code, state_code) => ({
  query: `query state($locationCode: StateCountryCodeInput ) {
        state(locationCode: $locationCode){
          id
          name
          country_id
          country_code
          state_code
          cities(page: { first: 4 }) {
              totalCount
              edges {
                cursor
                node {
                  id
                  name
                }
              }
            }
        }
        }`,
  variables: {
    locationCode: {
      country_code: country_code,
      state_code: state_code,
    },
  },
});
