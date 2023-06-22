import { fetchProducts, getProduct } from '../ProductThunk/ProductThunk'
import { createSlice } from '@reduxjs/toolkit'
export const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        error: null,
        isLoading: false,
        products: [],
        // error: '',
        totalPrice: 0,
    },
    reducers: {
        incremet: (state, action) => {
            console.log('action: ', action.payload)
            state.products.map((item) => {
                if (item.id === action.payload) {
                    return {
                        ...item,
                        orderQuantity: (item.orderQuantity =
                            item.orderQuantity + 1),
                        total: (item.total = item.total + item.price),
                    }
                }
                return item
            })
        },
        decrement: (state, action) => {
            state.products.map((item) => {
                if (item.id === action.payload) {
                    item.quantity--
                    item.total = item.total - item.price
                }
                return item
            })
        },

        IncrementById: (state, action) => {
            state.totalPrice += action.payload
        },
        DecrementById: (state, action) => {
            state.totalPrice -= action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProduct.fulfilled, (state, action) => {
                action.payload.map((elem) => {
                    elem.orderQuantity = 0
                    elem.total = 0

                    return elem
                })

                state.products = action.payload
                state.isLoading = false
            })
            .addCase(getProduct.pending, (state, action) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = 'ERROR'
            })
    },
})

export const productActions = productSlice.actions
