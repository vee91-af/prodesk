import React from 'react';

// 1. Button Component with Variants (Primary/Secondary/Disabled)
export const MyButton = ({ primary, label, disabled, ...props }) => {
  const mode = primary ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black';
  return (
    <button
      className={`px-4 py-2 rounded font-bold ${mode} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

// 2. Input Component
export const MyInput = ({ label, placeholder, ...props }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-bold text-gray-700">{label}</label>
    <input className="border p-2 rounded" placeholder={placeholder} {...props} />
  </div>
);

// 3. Simple Product Card
export const ProductCard = ({ title, price }) => (
  <div className="border p-4 rounded-lg shadow-md w-48">
    <div className="h-32 bg-gray-100 mb-2 rounded"></div>
    <h3 className="font-bold">{title}</h3>
    <p className="text-blue-600">${price}</p>
  </div>
);