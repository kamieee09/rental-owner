import React, { useState } from "react";
import {
  Delete,
  Restore,
  Star,
  StarBorder,
  ArrowDropDown,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const reviewsData = [
  {
    id: 1,
    car: "Toyota Grandia 2017",
    user: "Liam Johnson",
    rating: 5,
    review: "Great service Zkyrie’s Car Rental...",
  },
  {
    id: 2,
    car: "Toyota Vios 2024",
    user: "Emma Watson",
    rating: 5,
    review: "Great service Zkyrie’s Car Rental...",
  },
  {
    id: 3,
    car: "GAC M8 Master",
    user: "John Doe",
    rating: 4,
    review: "Great service Zkyrie’s Car Rental...",
  },
];

const Feedbacks = () => {
  const [reviews, setReviews] = useState(reviewsData);
  const [deletedReviews, setDeletedReviews] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filteredReviews = reviews.filter((review) =>
    ratingFilter ? review.rating === ratingFilter : true
  );

  const handleDelete = (id) => {
    const deletedReview = reviews.find((review) => review.id === id);
    Swal.fire({
      title: "Are you sure?",
      text: `Delete review by ${deletedReview.user}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletedReviews([...deletedReviews, deletedReview]);
        setReviews(reviews.filter((r) => r.id !== id));
        Swal.fire("Deleted!", "The review has been deleted.", "success");
      }
    });
  };

  const handleRetrieve = (id) => {
    const restored = deletedReviews.find((r) => r.id === id);
    Swal.fire({
      title: "Restore review?",
      text: `Restore review by ${restored.user}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#38b2ac",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setReviews([...reviews, restored]);
        setDeletedReviews(deletedReviews.filter((r) => r.id !== id));
        Swal.fire("Restored!", "The review has been restored.", "success");
      }
    });
  };

  const handleRatingFilter = (rating) => {
    setRatingFilter(rating === ratingFilter ? 0 : rating);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col w-full h-full p-6 bg-gray-100">
      {/* Page Header + Filter Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Clients Feedback</h1>
          <p className="text-gray-600 mt-1 text-sm">
            See what your clients are saying about your car rental service.
          </p>
        </div>

        {/* Filter Card */}
        <div className="bg-white rounded-xl shadow-md p-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 font-medium">Filter by Rating:</span>
            <div className="relative w-full sm:w-52">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between border border-gray-300 bg-white px-4 py-2 rounded-lg w-full shadow-sm"
              >
                {ratingFilter === 0 ? (
                  <span className="text-gray-500 text-sm">All Ratings</span>
                ) : (
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < ratingFilter ? (
                        <Star key={i} className="text-yellow-500" />
                      ) : (
                        <StarBorder key={i} className="text-gray-300" />
                      )
                    )}
                  </div>
                )}
                <ArrowDropDown className="text-gray-600 ml-2" />
              </button>

              {dropdownOpen && (
                <div className="absolute mt-2 right-0 bg-white border shadow-lg rounded-md w-48 z-10">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => handleRatingFilter(0)}
                  >
                    All Ratings
                  </div>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                      onClick={() => handleRatingFilter(rating)}
                    >
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < rating ? (
                          <Star key={i} className="text-yellow-500" />
                        ) : (
                          <StarBorder key={i} className="text-gray-300" />
                        )
                      )}
                      <span className="ml-2">{rating}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Active Reviews */}
      <div className="bg-white rounded-xl shadow-md p-6">
        
        <div className="grid gap-4 h-[60vh] overflow-y-auto">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-4 rounded-lg shadow relative">
                <button
                  onClick={() => handleDelete(review.id)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-600"
                >
                  <Delete />
                </button>
                <h3 className="text-lg font-bold text-gray-800">{review.car}</h3>
                <p className="text-sm text-gray-600 font-medium">{review.user}</p>
                <p className="text-gray-700 mt-2 text-sm">{review.review}</p>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < review.rating ? (
                      <Star key={index} className="text-yellow-500" />
                    ) : (
                      <StarBorder key={index} className="text-yellow-500" />
                    )
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No reviews found.</p>
          )}
        </div>
      </div>

      {/* Deleted Reviews */}
      {deletedReviews.length > 0 && (
        <div className="bg-gray-50 mt-8 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Deleted Reviews</h2>

          <div className="grid gap-4 h-[30vh] overflow-y-auto">
            {deletedReviews.map((review) => (
              <div key={review.id} className="bg-white p-4 rounded-lg shadow relative">
                <button
                  onClick={() => handleRetrieve(review.id)}
                  className="absolute top-2 right-2 text-green-600 hover:text-green-800"
                >
                  <Restore />
                </button>
                <h3 className="text-lg font-bold text-gray-800">{review.car}</h3>
                <p className="text-sm text-gray-600 font-medium">{review.user}</p>
                <p className="text-gray-700 mt-2 text-sm">{review.review}</p>
                <div className="flex mt-2">
                  {Array.from({ length: 5 }).map((_, index) =>
                    index < review.rating ? (
                      <Star key={index} className="text-yellow-500" />
                    ) : (
                      <StarBorder key={index} className="text-yellow-500" />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedbacks;
