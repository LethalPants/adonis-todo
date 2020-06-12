import { createSelector } from "reselect";

const selectCategories = (state) => state.categories;

export const selectAllCategories = createSelector(
  [selectCategories],
  (category) => (category ? category.categories : null)
);
