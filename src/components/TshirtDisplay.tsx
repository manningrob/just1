import React from 'react';

const TSHIRTS = [
  {
    id: 'city',
    image: 'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/unisex-basic-softstyle-t-shirt-dark-heather-front-673e62b42998f.png?v=1733598325',
    position: 'hidden lg:block absolute left-[-5%] top-[15%] rotate-[-15deg] w-[35%]',
    animation: 'floating-1'
  },
  {
    id: 'cat',
    image: 'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/unisex-basic-softstyle-t-shirt-black-front-673e624b53957.png?v=1733598306',
    position: 'absolute left-1/2 -translate-x-1/2 bottom-[-25%] w-[80%] rotate-[10deg] lg:left-auto lg:translate-x-0 lg:right-[-10%] lg:top-[45%] lg:w-[40%]'
  },
  {
    id: 'coffee',
    image: 'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/unisex-basic-softstyle-t-shirt-navy-front-673e62e059218.png?v=1733598339',
    position: 'hidden lg:block absolute left-[10%] bottom-[-5%] rotate-[5deg] w-[30%]',
    animation: 'floating-3'
  }
];

export function TshirtDisplay() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-white/40" />
      {TSHIRTS.map((tshirt) => (
        <div 
          key={tshirt.id}
          className={`${tshirt.position} transition-transform duration-[30ms] ease-spring will-change-transform`}
        >
          <img
            src={tshirt.image}
            alt=""
            className={`w-full h-auto object-contain [filter:drop-shadow(0_10px_25px_rgba(0,0,0,0.2))_drop-shadow(0_20px_40px_rgba(0,0,0,0.15))] animate-${tshirt.animation}`}
          />
        </div>
      ))}
    </div>
  );
}