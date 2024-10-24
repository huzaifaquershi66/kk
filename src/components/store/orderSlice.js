import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    designName: "",
    customerName: "",
    customerEmail: "",
    height: "",
    width: "",
    phone: "",
    colorOptions: "",
    format: "Corel Draw",
    expectedDelivery: "",
    comments: "",
    file: null,
    selectedColor: "",
    fabric: "",
    location: "",
    numberOfColors: 1,
  },
  step: 1,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setStep: (state, action) => {
      state.step = action.payload;
    },
  },
});

export const { setFormData, setStep } = orderSlice.actions;

export default orderSlice.reducer;
