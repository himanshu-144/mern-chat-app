import React, { useState } from "react";

const GenderCheckBox = ({handleCheckForGender, selectedGender}) => {

  return (
    <div className="flex items-center gap-3">
      <div className="form-control">
        <label className={`label cursor-pointer flex gap-2 ${selectedGender === "male" ? "selected" : ""}`}>
          <span className="label-text text-white text-xl">Male</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            name="male"
            value="male"
            checked={selectedGender === "male"}
            onChange={()=>handleCheckForGender("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label className={`label cursor-pointer flex gap-2 ${selectedGender === "female" ? "selected" : ""}`}>
          <span className="label-text text-white text-xl">Female</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary"
            name="female"
            value="female"
            checked={selectedGender === "female"}
            onChange={()=>handleCheckForGender("female")}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
