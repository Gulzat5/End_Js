import { getProducts } from '../../JS/dataService'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getProduct = createAsyncThunk(
    'product/getProduct',
    async (_, { rejectWithValue }) => {
        try {
            const { products } = await getProducts()

            return products
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)
