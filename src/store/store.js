import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './ProductSlice/ProductSlice'

const store = configureStore({
    reducer: {
        [productSlice.name]: productSlice.reducer,
    },
})
export default store

export const RootState = store.getState
export const AppDispatch = store.dispatch
