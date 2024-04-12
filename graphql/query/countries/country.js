export const queryData = (paisISO3) => ({
  query: `
    query country ($pagination: PaginationInput){
        country(iso3: "${paisISO3}") {
          # Country Fields
          id
          name
          iso2
          capital
          tld
          states(page: $pagination) {
            totalCount
            edges {
              cursor
              node {
                id
                name
              }
            }
          }
          currency
          currency_symbol
          emoji
          # ...
        }
      }`,
  variables: {
    pagination: {
      first: 5,
    },
  },
});
