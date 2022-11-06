import React, { useEffect } from 'react';
import { useState } from 'react';
import OrderCard from '../../components/Order/OrderCard';
import noCacheFetch from '../../lib/axios/noCacheFetch';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const { data } = await noCacheFetch('/orders');
      setOrders(data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
    const stopInterval = setInterval(getOrders, 10 * 1000);
    return () => clearInterval(stopInterval);
  }, []);

  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-amber-800'>Orders</h1>
      <div className='mx-2 mt-3 flex flex-col items-center gap-2 text-sm xl:flex-row xl:flex-wrap xl:text-base'>
        {orders
          .reduce((acc, el) => {
            if (el.flag === false) {
              return [el, ...acc];
            }
            return [...acc, el];
          }, [])
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map(order => (
            <OrderCard order={order} key={order._id} />
          ))}
      </div>
    </div>
  );
};

export default Orders;
