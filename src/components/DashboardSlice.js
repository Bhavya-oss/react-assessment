// export const SET_DATA = "SET_DATA";
// export const OPEN_DRAWER = "OPEN_DRAWER";
// export const CLOSE_DRAWER = "CLOSE_DRAWER";
// export const DELETE_WIDGET = "DELETE_WIDGET";
// export const ADD_WIDGET = "ADD_WIDGET";
// export const UPDATE_SEARCH_TERM = "UPDATE_SEARCH_TERM";
// export const TOGGLE_WIDGET = "TOGGLE_WIDGET";

// // Set data for widgets
// export const setData = (data) => ({
//   type: SET_DATA,
//   payload: data,
// });

// // Open drawer
// export const openDrawer = (index) => ({
//   type: OPEN_DRAWER,
//   payload: index,
// });

// // Close drawer
// export const closeDrawer = () => ({
//   type: CLOSE_DRAWER,
// });

// // Delete widget
// export const deleteWidget = (categoryName, widgetName) => ({
//   type: DELETE_WIDGET,
//   payload: { categoryName, widgetName },
// });

// // Add widget
// export const addWidget = (categoryName, widget) => ({
//   type: ADD_WIDGET,
//   payload: { categoryName, widget },
// });

// // Update search term
// export const updateSearchTerm = (searchTerm) => ({
//   type: UPDATE_SEARCH_TERM,
//   payload: searchTerm,
// });

// // Toggle widget visibility
// export const toggleWidget = (categoryName, widgetName, isVisible) => ({
//   type: TOGGLE_WIDGET,
//   payload: { categoryName, widgetName, isVisible },
// });

// const initialState = {
//     data: {},
//     isDrawerOpen: false,
//     selectedCategoryIndex: 0,
//     searchTerm: "",
//   };

//   const dashboardReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case SET_DATA:
//         return {
//           ...state,
//           data: action.payload,
//         };

//       case OPEN_DRAWER:
//         return {
//           ...state,
//           isDrawerOpen: true,
//           selectedCategoryIndex: action.payload,
//         };

//       case CLOSE_DRAWER:
//         return {
//           ...state,
//           isDrawerOpen: false,
//         };

//       case DELETE_WIDGET:
//         const { categoryName, widgetName } = action.payload;
//         return {
//           ...state,
//           data: {
//             ...state.data,
//             categories: state.data.categories.map((category) => {
//               if (category.name === categoryName) {
//                 return {
//                   ...category,
//                   widgets: category.widgets.map((widget) =>
//                     widget.name === widgetName ? { ...widget, show: false } : widget
//                   ),
//                 };
//               }
//               return category;
//             }),
//           },
//         };

//       case ADD_WIDGET:
//         const { categoryName: addCategoryName, widget } = action.payload;
//         return {
//           ...state,
//           data: {
//             ...state.data,
//             categories: state.data.categories.map((category) => {
//               if (category.name === addCategoryName) {
//                 return {
//                   ...category,
//                   widgets: [...category.widgets, widget],
//                 };
//               }
//               return category;
//             }),
//           },
//         };

//       case UPDATE_SEARCH_TERM:
//         return {
//           ...state,
//           searchTerm: action.payload,
//         };

//       case TOGGLE_WIDGET:
//         const { categoryName: toggleCategoryName, widgetName: toggleWidgetName, isVisible } = action.payload;
//         return {
//           ...state,
//           data: {
//             ...state.data,
//             categories: state.data.categories.map((category) => {
//               if (category.name === toggleCategoryName) {
//                 return {
//                   ...category,
//                   widgets: category.widgets.map((widget) =>
//                     widget.name === toggleWidgetName ? { ...widget, show: isVisible } : widget
//                   ),
//                 };
//               }
//               return category;
//             }),
//           },
//         };

//       default:
//         return state;
//     }
//   };

//   export default dashboardReducer;
