import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./category.css";
import { useDispatch, useSelector } from "react-redux";
import { ALLCategoryAction } from "../../redux/action_api/productAction";

const CategoryComp = ({ initialCards, cardsPerPage }) => {
  const dispatch = useDispatch();
  const { loading, error, allCategory } = useSelector(
    (state) => state.allGroup
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(null); // Keep track of the selected category

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(ALLCategoryAction());
  }, [dispatch]);

  // Handle when a category card is clicked
  const handleCardClick = (category, index) => {
    // Change the selected category's background color
    setSelectedCategoryIndex(index);
    // Save the selected category in localStorage (or any further processing)
    localStorage.setItem("selectedCategory", JSON.stringify(category));
  };

  // Handle the "Next" button click
  const handleNextClick = () => {
    navigate("/buisness/detail");
  };

  return (
    <div>
      <h1 className="title">
        <b>Select Business Category</b>
      </h1>

      {/* Category cards */}
      <div className="card-group">
        {allCategory?.map((item, index) => (
          <div
            key={index}
            className={`card ${
              selectedCategoryIndex === index ? "selected-category" : ""
            }`} // Add class dynamically
            onClick={() => handleCardClick(item, index)}
          >
            <img src={item.image} className="card-img-top" alt={item.name} />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination buttons (optional based on total pages) */}
      <div className="pagination-buttons">
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

// Define propTypes
CategoryComp.propTypes = {
  initialCards: PropTypes.arrayOf(
    PropTypes.shape({
      imageSrc: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  cardsPerPage: PropTypes.number,
};

export default CategoryComp;
