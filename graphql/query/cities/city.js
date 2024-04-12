export const queryDataCity = (cityID) => ({
  query: `{
        city(id: ${cityID}) {
          # City Fields
          id
          name
          state_id
          country_id
          country_code
          latitude
          longitude
        }
      },
      `,
});
