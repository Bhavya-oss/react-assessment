// import { createSlice } from "@reduxjs/toolkit";
// import WIDGETDATA from "../assets/data.json";

// const initialState = {
//   data: WIDGETDATA,
//   searchTerm: "",
//   selectedCategoryIndex: 0,
// };

// const dashboardSlice = createSlice({
//   name: "dashboard",
//   initialState,
//   reducers: {
//     toggleDrawer(state) {
//       state.isDrawerOpen = !state.isDrawerOpen;
//     },
//     setSearchTerm: (state, action) => {
//       state.searchTerm = action.payload;
//     },
//     setSelectedCategoryIndex: (state, action) => {
//       state.selectedCategoryIndex = action.payload;
//     },
//     toggleWidgetShow: (state, action) => {
//       const { categoryName, widgetName } = action.payload;
//       const category = state.data.categories.find(
//         (cat) => cat.name === categoryName
//       );
//       const widget = category.widgets.find((w) => w.name === widgetName);
//       widget.show = !widget.show;
//     },
//     setFilteredWidgets: (state, action) => {
//       const searchTerm = action.payload.toLowerCase();
//       state.data.categories = WIDGETDATA.categories
//         .map((category) => ({
//           ...category,
//           widgets: category.widgets.filter((widget) =>
//             widget.name.toLowerCase().includes(searchTerm)
//           ),
//         }))
//         .filter((category) => category.widgets.length > 0);
//     },
//     updateData: (state, action) => {
//       state.data = action.payload;
//     },
//   },
// });

// export const {
//   toggleDrawer,

//   setSearchTerm,
//   setSelectedCategoryIndex,
//   toggleWidgetShow,
//   setFilteredWidgets,
//   updateData,
// } = dashboardSlice.actions;

// export default dashboardSlice.reducer;
