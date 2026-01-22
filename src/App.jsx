import React from 'react';
import { ArabicFixer } from './ArabicFixer';

// إذا أردت إضافة تنسيق عام للخلفية
import './App.css'; 

export default function App() {
  return (
    <div className="app-container">
      <ArabicFixer />
    </div>
  );
}