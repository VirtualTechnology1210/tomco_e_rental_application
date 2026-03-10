import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocationState {
    latitude: number | null;
    longitude: number | null;
    cityName: string | null;
    permissionGranted: boolean;
}

const initialState: LocationState = {
    latitude: null,
    longitude: null,
    cityName: null,
    permissionGranted: false,
};

const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setLocation(state, action: PayloadAction<{ latitude: number; longitude: number; cityName?: string }>) {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            if (action.payload.cityName) {
                state.cityName = action.payload.cityName;
            }
        },
        setCityName(state, action: PayloadAction<string>) {
            state.cityName = action.payload;
        },
        setPermission(state, action: PayloadAction<boolean>) {
            state.permissionGranted = action.payload;
        },
    },
});

export const { setLocation, setCityName, setPermission } = locationSlice.actions;
export default locationSlice.reducer;
