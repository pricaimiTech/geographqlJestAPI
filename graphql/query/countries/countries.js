export const queryData = (subregion) => ({
  query: `query countries($filter: CountryFilterInput, $pagination: PaginationInput) {
      countries(filter: $filter, page: $pagination) {
        totalCount
        edges {
          cursor
          node {
            id
            name
            iso3
            emoji
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
      subregion: subregion,
    },
    pagination: {
      first: 5,
    },
  },
});
