import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import { clearErrors, deleteReview, getProductReviews } from "../../actions/productActions";
import Sidebar from "../admin/Sidebar";
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";

const ProductReviews = () => {
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const { loading, error, reviews } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.review);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      // error msg
      dispatch(clearErrors());
    }
    if (productId !== "") {
      dispatch(getProductReviews(productId));
    }

    if (isDeleted) {
      // success msg

      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, isDeleted,  productId]);

  const onDelete = (id) => {
    dispatch(deleteReview(id, productId));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getProductReviews(productId));
  };

  const setReviews = () => {
    const data = {
      columns: [
        {
          label: "Review ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Rating",
          field: "rating",
          sort: "asc",
        },
        {
          label: "Comment",
          field: "comment",
          sort: "asc",
        },
        {
          label: "User",
          field: "user",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    reviews.forEach((review) => {
      data.rows.push({
        id: review._id,
        rating: review.rating,
        comment: `${review.comment}`,
        user: review.name,

        actions: (
          <>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => onDelete(review._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };
  return (
    <>
      <MetaData title={"Product Review"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <div className="row justify-content-center mt-5">
              <div className="col-5">
                <form onSubmit={onSubmit}>
                  <div className="form-group">
                    <label hrmlFor="productId_field">Enter Product ID</label>
                    <input
                      type="text"
                      id="productId_field"
                      className="form-control"
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                    />
                  </div>

                  <button
                    id="search_button"
                    type="submit"
                    className="btn btn-primary btn-block py-2"
                  >
                    SEARCH
                  </button>
                </form>
              </div>
            </div>
            {reviews && reviews.length > 0 ? (
              <MDBDataTable
                data={setReviews}
                className="px-3"
                bordered
                striped
                hover
              />
            ) : (
              <p className="mt-5 text-center">No Reviews</p>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProductReviews;
