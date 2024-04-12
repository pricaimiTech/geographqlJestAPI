export const queryData = () => ({
  query: `query states($filter: StateFilterInput, $pagination: PaginationInput) {
        states(filter: $filter, page: $pagination) {
          totalCount
          edges {
            cursor
            node {
              name
              state_code
              country_code
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
    },
  },
});
