import React from 'react';

// Import Custom PNG Illustrations created by user
import studentBoyHappyPng from '../../assets/illustrations/characters/Cheerful Student Waving with Calculator.png';
import studentGirlHappyPng from '../../assets/illustrations/characters/Cheerful Schoolgirl with Economics Textbook.png';
import studentLearningPng from '../../assets/illustrations/characters/Cheerful Economics Study Avatar.png';
import studentThinkingPng from '../../assets/illustrations/characters/Thoughtful Student Economics Bubble.png';
import studentExplainingPng from '../../assets/illustrations/characters/Student Explains Supply and Demand Curves.png';
import studentCelebratingPng from '../../assets/illustrations/characters/Joyful Student Trophy Celebration.png';
import studentMotivatingPng from '../../assets/illustrations/characters/Pasti Bisa Student Motivator.png';
import studentCuriousPng from '../../assets/illustrations/characters/Curious Student Analyzing Market Trends.png';

const characterMap = {
  // Specific Character Key
  'boy-happy': studentBoyHappyPng,
  'girl-happy': studentGirlHappyPng,

  // General Expressions
  happy: studentBoyHappyPng,
  learning: studentLearningPng,
  thinking: studentThinkingPng,
  explaining: studentExplainingPng,
  celebrating: studentCelebratingPng,
  motivating: studentMotivatingPng,
  curious: studentCuriousPng,
};

const sizeMap = {
  xs: 'w-16 h-16',
  sm: 'w-24 h-24',
  md: 'w-36 h-36',
  lg: 'w-52 h-52',
  xl: 'w-64 h-64',
  '2xl': 'w-80 h-80',
  full: 'w-full h-auto',
};

export default function CharacterIllustration({
  character,
  expression = 'happy',
  size = 'md',
  className = '',
  alt = 'Ilustrasi Karakter Siswa EcoLearn',
  priority = false,
  ...props
}) {
  let imageSrc = characterMap[expression] || studentBoyHappyPng;

  if (character === 'girl' && (expression === 'happy' || !expression)) {
    imageSrc = studentGirlHappyPng;
  } else if (character === 'boy' && (expression === 'happy' || !expression)) {
    imageSrc = studentBoyHappyPng;
  } else if (character && expression && characterMap[`${character}-${expression}`]) {
    imageSrc = characterMap[`${character}-${expression}`];
  }

  // Duo presentation (Boy & Girl together for Hero section)
  if (character === 'duo') {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size] || ''} ${className}`} {...props}>
        <img
          src={studentGirlHappyPng}
          alt="Siswi EcoLearn"
          className="w-1/2 h-full object-contain -mr-6 z-0 drop-shadow-xl transition-transform hover:scale-105 duration-200"
          loading={priority ? 'eager' : 'lazy'}
        />
        <img
          src={studentBoyHappyPng}
          alt="Siswa EcoLearn"
          className="w-3/5 h-full object-contain z-10 drop-shadow-2xl transition-transform hover:scale-105 duration-200"
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        sizeMap[size] || ''
      } ${className}`}
      {...props}
    >
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full object-contain drop-shadow-lg transition-transform hover:scale-105 duration-200"
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
}
