import React from "react";

export default function RestaurantTabNav({ currentStep, goToStep }) {
  return (
    <div className="row">
      <div role="tab" className="col-lg-2">
        <button
          type="button"
          className={`btn w-150 ${currentStep === 1 ? "btn-primary" : ""}`}
          onClick={() => goToStep(1)}
        >
          Basic Info
        </button>
      </div>
      <div role="tab" className="col-lg-2">
        <button
          type="button"
          className={`btn w-150 ${currentStep === 2 ? "btn-primary" : ""}`}
          onClick={() => goToStep(2)}
        >
          Documents
        </button>
      </div>
      <div role="tab" className="col-lg-2">
        <button
          type="button"
          className={`btn w-150 ${currentStep === 3 ? "btn-primary" : ""}`}
          onClick={() => goToStep(3)}
        >
          Meals
        </button>
      </div>
      <div role="tab" className="col-lg-2">
        <button
          type="button"
          className={`btn w-150 ${currentStep === 4 ? "btn-primary" : ""}`}
          onClick={() => goToStep(4)}
        >
          Meal Plan
        </button>
      </div>
      <div role="tab" className="col-lg-2">
        <button
          type="button"
          className={`btn w-150 ${currentStep === 5 ? "btn-primary" : ""}`}
          onClick={() => goToStep(5)}
        >
          Bank Info
        </button>
      </div>
    </div>
  
  );
}
