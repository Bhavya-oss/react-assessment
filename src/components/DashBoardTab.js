import React from "react";
import { useDispatch } from "react-redux";

function DashBoardTab({
  categories,
  selectedCategoryIndex,
  localSelectedWidgets,
  onWidgetSelect,
}) {
  const dispatch = useDispatch();

  const handleCategoryClick = (index) => {
    dispatch(setSelectedCategoryIndex(index));
  };

  return (
    <div>
      {categories.map((category, index) => (
        <div key={category.id} onClick={() => handleCategoryClick(index)}>
          <h4>{category.name}</h4>
          {category.widgets.map((widget) => (
            <div key={widget.id}>
              <input
                type="checkbox"
                checked={localSelectedWidgets[category.name]?.includes(
                  widget.name
                )}
                onChange={(e) =>
                  onWidgetSelect(category.name, widget, e.target.checked)
                }
              />
              <label>{widget.name}</label>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DashBoardTab;
