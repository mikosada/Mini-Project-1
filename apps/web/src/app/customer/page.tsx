'use client';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Sidebar } from '../customer/component/Sidebar';

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
  referral: string;
}

interface CouponDiscount {
  id: number;
  couponCode: string;
  expirationDate: string;
  discountPercentage: number;
}

export default function profile() {
  const [datas, setDatas] = useState<UserData | null>(null);
  const [coupons, setCoupons] = useState<CouponDiscount[]>([]);

  const storagedToken =
    typeof window !== 'undefined' ? localStorage.getItem('jwtToken') : null;

  const verify = async () => {
    try {
      const token = storagedToken;
      if (token) {
        const response = await axios.post(
          'http://localhost:8000/api/auth/keepLogin',
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const dataUser = response.data;

        setDatas(dataUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCoupon = async () => {
    try {
      const couponDiscount = await axios.get(
        'http://localhost:8000/api/dashboard/getCoupon',
      );

      setCoupons(couponDiscount.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    verify();
    getCoupon();
  }, []);

  const username = datas?.username;
  const email = datas?.email;
  const referral = datas?.referral;

  return (
    <>
      <main className="max-w-6xl 2xl:max-w-screen-xl mx-auto bg-neutral-50">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
          </div>
          <div className="w-full py-14 pr-8 pl-4">
            {datas && (
              <div className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  Your Profile
                </h3>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                  <b>Hello</b>, {username} <br />
                  <b>Your email :</b> {email} <br />
                  <b>Referral code :</b> {referral}
                </p>
              </div>
            )}
            <div className=" my-5 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Your Coupon
              </h3>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                <ul>
                  {coupons.map((coupon) => (
                    <li key={coupon.id}>
                      {coupon.couponCode}
                      <span className="mx-5"></span>
                      {coupon.expirationDate}
                      <span className="mx-5"></span>
                      {coupon.discountPercentage}
                    </li>
                  ))}
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
