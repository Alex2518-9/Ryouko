import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderActions";
import Sidebar from "../admin/Sidebar";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const { loading, order={} } = useSelector((state) => state.orderDetails);
  const { error, isUpdated } = useSelector((state) => state.order);
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalPrice,
    orderStatus,
  } = order;

  const params = useParams();

  const orderId = params.id;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));

    if (error) {
      // error msg
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // success msg
      dispatch({ type: UPDATE_ORDER_RESET });
    }
  }, [dispatch, error, isUpdated, orderId]);

  const onUpdate = (id) => {
    const formData = new FormData();
    formData.set("status", status);

    dispatch(updateOrder(id, formData));
  };

  const shippingDetails =
    shippingInfo &&
    `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

  const isPaid =
    paymentInfo && paymentInfo.status === "succeeded" ? true : false;

  return (
    <>
      <MetaData title={`Process Order #${order && order._id}`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            {loading ? (
              <Loader />
            ) : (
              <div className="row d-flex justify-content-around">
                <div className="col-12 col-lg-7 order-details">
                  <h2 className="my-5">Order # ${order && order._id}</h2>

                  <h4 className="mb-4">Shipping Info</h4>
                  <p>
                    <b>Name:</b> {user && user.name}
                  </p>
                  <p>
                    <b>Phone:</b>
                    {shippingInfo && shippingInfo.phoneNo}
                  </p>
                  <p className="mb-4">
                    <b>Address:</b>
                    {shippingDetails}
                  </p>
                  <p>
                    <b>Amount:</b> ${totalPrice}
                  </p>

                  <hr />

                  <h4 className="my-4">Payment</h4>
                  <p className={isPaid ? "greenColor" : "redColor"}>
                    <b>{paymentInfo && paymentInfo.id}</b>
                  </p>

                  <h4 className="my-4">Stripe ID</h4>
                  <p>
                    <b>{isPaid ? "PAID" : "NOT PAID"}</b>
                  </p>

                  <h4 className="my-4">Order Status:</h4>
                  <p
                    className={
                      order.orderStatus &&
                      String(order.orderStatus).includes("Delivered")
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    <b>{orderStatus}</b>
                  </p>

                  <h4 className="my-4">Order Items:</h4>

                  <hr />
                  <div className="cart-item my-1">
                    {orderItems &&
                      orderItems.map((item) => (
                        <div key={item.product} className="row my-5">
                          <div className="col-4 col-lg-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              height="45"
                              width="65"
                            />
                          </div>

                          <div className="col-5 col-lg-5">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                            <p>${item.price}</p>
                          </div>

                          <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                            <p>{item.quantity} Piece(s)</p>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </div>

                <div className="col-12 col-lg-3 mt-5">
                  <h4 classNam="my-4">Status</h4>

                  <div className="form-group">
                    <select
                      className="form-control"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => onUpdate(order._id)}
                  >
                    Update Status
                  </button>
                </div>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;