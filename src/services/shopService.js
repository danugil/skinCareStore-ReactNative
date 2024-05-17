import { base_url } from "../firebase/database";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`
        }),
        getProductsById: builder.query({
            query: (id) => `products/${id-1}.json`
        }),
        getCategories: builder.query({
            query: () => "categories.json",
        }),
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
                url: "orders.json",
                method: "POST",
                body: order,
            }),
        }),
        getOrders: builder.query({
            query: (localId) => `orders.json?orderBy="user/localId"&equalTo="${localId}"`
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
        }),
        postProfileImage: builder.mutation({
            query: ({ localId, image }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image,
                },
            }),
        }),
        getUserLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
        }),
        postUserLocation: builder.mutation({
            query: ({localId, location}) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address
                },
            })
        })
    }),
});

export const {
    useGetProductsByCategoryQuery,
    useGetProductsByIdQuery,
    useGetCategoriesQuery,
    usePostOrderMutation,
    useGetOrdersQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetUserLocationQuery,
    usePostUserLocationMutation,
} = shopApi;