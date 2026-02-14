import { useState } from 'react';
import { ValentineSlides } from './components/ValentineSlides';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 overflow-hidden">
      <ValentineSlides />
    </div>
  );
}
