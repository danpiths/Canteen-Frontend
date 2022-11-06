import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import serverFetch from '../../lib/axios/serverFetch';

const OrderCard = ({ order, isClient }) => {
  const [isPrepared, setIsPrepared] = useState(order.isPrepared);
  const user = useSelector(state => state.user);

  const orderPrepared = async () => {
    try {
      await serverFetch.patch(`/orders/${order._id}`, { isPrepared: true });
      setIsPrepared(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex w-full flex-col rounded p-3 ${
        isClient ? 'xl:w-[24.5%]' : 'xl:w-[32%]'
      } xl:self-stretch ${
        isPrepared
          ? 'bg-emerald-100 text-emerald-800'
          : 'bg-rose-100 text-rose-800'
      }`}
    >
      <Link
        to={
          user.role === 'admin'
            ? `/admin/orders/${order._id}`
            : `/orders/${order._id}`
        }
        className='flex h-full flex-col gap-3'
      >
        <p>Order ID: {order._id}</p>
        <div
          className={`flex-1 border-2 p-2 ${
            isPrepared ? 'border-emerald-800' : 'border-rose-800'
          }`}
        >
          {order.orderItems?.map(orderItem => {
            return (
              <div key={orderItem._id}>
                <div className='flex gap-2 pr-1'>
                  <p className='flex-1'>{orderItem.name}</p>
                  <p className='flex-1'>
                    ₹{orderItem.price} x {orderItem.quantity}
                  </p>
                  <p>₹{orderItem.price * orderItem.quantity}</p>
                </div>
                <div
                  className={`my-1 h-[1px] w-full ${
                    isPrepared ? 'bg-emerald-800' : 'bg-rose-800'
                  }`}
                ></div>
              </div>
            );
          })}
          <p className='flex items-center justify-end gap-3 py-2'>
            Total Price:
            <span
              className={`rounded-sm p-1 font-bold ${
                isPrepared
                  ? 'bg-emerald-800 text-emerald-100'
                  : 'bg-rose-800 text-rose-100'
              }`}
            >
              ₹{order.totalPrice}
            </span>
          </p>
        </div>
        <p
          className={`rounded px-2 py-1 text-center ${
            isPrepared
              ? 'bg-emerald-800 text-emerald-100'
              : 'bg-rose-800 text-rose-100'
          }`}
        >
          Status: {isPrepared ? 'Done' : 'Pending'}
        </p>
      </Link>
      {!isPrepared && user.role === 'admin' && (
        <button
          className='mt-3 rounded border-2 border-rose-800 px-2 py-2 text-center transition duration-100 ease-out hover:bg-rose-800/20 focus:bg-rose-800 focus:text-rose-100 focus:ring-2 focus:ring-rose-800 focus:ring-offset-2'
          onClick={orderPrepared}
        >
          Order Prepared
        </button>
      )}
    </div>
  );
};

export default OrderCard;
