import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import OrderCard from '../components/Order/OrderCard';
import serverFetch from '../lib/axios/serverFetch';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector(state => state.user);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await serverFetch('/orders/myOrders');
      setOrders(data.userOrders);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    !user.userId && navigate('/');
  }, [user.userId, navigate]);

  useEffect(() => {
    getOrders();
  }, []);

  return user.role !== 'admin' ? (
    <div>
      <h1 className='text-center text-2xl font-bold text-amber-800'>Orders</h1>
      <div className='mx-2 mt-3 flex flex-col items-center gap-2 xl:flex-row xl:flex-wrap'>
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
  ) : (
    <div className='flex flex-1 flex-col items-center justify-center gap-3'>
      <p>To view orders, please go to admin panel.</p>
      <Link
        to='/admin/orders'
        className='rounded-md border-2 border-amber-500 bg-amber-100 px-4 py-2 font-bold uppercase tracking-wide text-amber-700'
      >
        Admin Panel Orders
      </Link>
    </div>
  );
};

export default Orders;
