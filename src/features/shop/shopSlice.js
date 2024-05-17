import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../../data/allProducts2.json";
import allCategories from "../../data/categories2.json";

export const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    value: {
      products: allProducts,
      categories: allCategories,
      categorySelected: "",
      productSelected: null,
      productsFilteredByCategory: [],
    },
  },
  reducers: {
    setCategorySelected: (state, action) => {
      const categorySelected = action.payload;
      const productsFiltered = allProducts.filter((products) => products.category === categorySelected)
      state.value.categorySelected = categorySelected
      state.value.productsFilteredByCategory = productsFiltered
    },
    setProductIdSelected: (state, action) => {
      state.value.productSelected = action.payload;
    },
  },
});

export const { setCategorySelected, setProductIdSelected } = shopSlice.actions;

export default shopSlice.reducer;