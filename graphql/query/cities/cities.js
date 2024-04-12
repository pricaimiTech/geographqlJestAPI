export const queryDataCities = (cursor) => ({
  query: `query cities($filter: CityFilterInput, $pagination: PaginationInput) {
        cities(filter: $filter, page: $pagination) {
          totalCount
          edges {
            cursor
            node {
              id
              name
              state_code
              country_code
              country_id
              latitude
              longitude
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
        }
      }`,
  variables: {
    filter: {
      ciso2: "US",
    },
    pagination: {
      first: 5,
      after: cursor,
    },
  },
});
