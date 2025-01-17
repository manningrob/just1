import React, { useRef, useEffect } from 'react';
import { useImageCycle } from '../hooks/useImageCycle';

const TSHIRT_IMAGES = {
  city: [
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/unisex-basic-softstyle-t-shirt-dark-heather-front-673e62b42998f.png?v=1733598325',
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/4e1f45c2df1489e4efb34e3c7fe43a0c.png?v=1737129941',
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/a34d08b64fe3e1079149f33302934807.png?v=1736966712'
  ],
  cat: [
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/unisex-basic-softstyle-t-shirt-black-front-673e624b53957.png?v=1733598306',
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/f489f3989ddf2d9758a3099aa8b5342c.png?v=1736968420',
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/47bae37025784829ce2b3f6b5ea6ffa1.png?v=1736966841'
  ],
  coffee: [
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/unisex-basic-softstyle-t-shirt-navy-front-673e62e059218.png?v=1733598339',
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/01447575c355e733c5228d463161060f.png?v=1735363036',
    'https://cdn.shopify.com/s/files/1/0877/7577/2967/files/f10ac46cf74a2e3e8642774c2efb8923.png?v=1735069653'
  ]
};

const TSHIRTS = [
  {
    id: 'city',
    position: 'hidden lg:block absolute left-[-5%] top-[15%] rotate-[-15deg] w-[35%]',
    initialDelay: 4000,
    cycleDelay: 6000
  },
  {
    id: 'cat',
    position: 'absolute left-1/2 -translate-x-1/2 bottom-[-25%] w-[80%] rotate-[10deg] lg:left-auto lg:translate-x-0 lg:right-[-10%] lg:top-[45%] lg:w-[40%]',
    initialDelay: 8000,
    cycleDelay: 6000
  },
  {
    id: 'coffee',
    position: 'hidden lg:block absolute left-[10%] bottom-[-5%] rotate-[5deg] w-[30%]',
    initialDelay: 12000,
    cycleDelay: 6000
  }
];

export function TshirtDisplay() {
  // Create a single start time for all images
  const startTimeRef = useRef(Date.now());

  return (
    <div className="fixed inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-white/40" />
      {TSHIRTS.map((tshirt) => {
        const currentImage = useImageCycle({
          images: TSHIRT_IMAGES[tshirt.id as keyof typeof TSHIRT_IMAGES],
          initialDelay: tshirt.initialDelay,
          cycleDelay: tshirt.cycleDelay,
          startTime: startTimeRef.current
        });

        return (
          <div 
            key={tshirt.id}
            className={tshirt.position}
          >
            <img
              src={currentImage}
              alt=""
              className="w-full h-auto object-contain [filter:drop-shadow(0_10px_25px_rgba(0,0,0,0.2))_drop-shadow(0_20px_40px_rgba(0,0,0,0.15))]"
            />
          </div>
        );
      })}
    </div>
  );
}
