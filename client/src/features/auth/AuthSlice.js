import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./AuthService";

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
    isVerify: false
}

export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        console.log(user)
        try {
            return await authService.register(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }

    }
)

export const Login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        console.log(user)
        try {
            return await authService.login(user)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const verifyUser = createAsyncThunk(
    'auth/verifyUser',
    async (value, thunkAPI) => {
        console.log(value)
        try {
            return await authService.verify(value)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }

    }
)

export const LogOut = createAsyncThunk(
    'auth/logout',
    async (value, thunkAPI) => {
        console.log(value)
        try {
            return authService.Logout()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }

    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            // state.user = null
            state.isError = false
            state.message = ''
            // state.isVerify = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                }
            )
            .addCase(register.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.user = null
                    state.message = action.payload
                }
            )
            .addCase(verifyUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(verifyUser.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.isVerify = true
                }
            )
            .addCase(verifyUser.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.isVerify = false
                    state.message = action.payload
                }
            )
            .addCase(Login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(Login.fulfilled,
                (state, action) => {
                    state.isLoading = false
                    state.isSuccess = true
                    state.user = action.payload
                }
            )
            .addCase(Login.rejected,
                (state, action) => {
                    state.isLoading = false
                    state.isError = true
                    state.user = null
                    state.message = action.payload
                }
            )
    }
})

export const { reset } = authSlice.actions

export default authSlice.reducer