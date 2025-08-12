import React, { useState } from 'react';
import { InputForm } from './components/InputForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingScreen } from './components/LoadingScreen';
import { calculateSaju } from './utils/sajuCalculator';
import { getStemCharacter, getBranchCharacter, getPersonality, getLuckyInfo } from './utils/characterAnalysis';
import { cityLongitudes } from './constants/cityData';

const SajuFortuneTeller = () => {
  const [birthInfo, setBirthInfo] = useState({
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: '0',
    gender: 'male',
    city: 'seoul'
  });
  
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!birthInfo.year || !birthInfo.month || !birthInfo.day || !birthInfo.hour) {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      try {
        const saju = calculateSaju(
          birthInfo.year, 
          birthInfo.month, 
          birthInfo.day, 
          birthInfo.hour, 
          birthInfo.minute, 
          birthInfo.city,
          birthInfo.gender
        );

        const dayStemData = getStemCharacter(saju.dayStem);
        const dayBranchData = getBranchCharacter(saju.dayBranch);
        const yearBranchData = getBranchCharacter(saju.yearBranch);
        const monthBranchData = getBranchCharacter(saju.monthBranch);
        const hourBranchData = getBranchCharacter(saju.hourBranch);

        const dayElement = saju.mainElement;
        const yearElement = saju.yearElement;
        const monthElement = saju.monthElement;
        const hourElement = saju.hourElement;

        const branches = [saju.yearBranch, saju.monthBranch, saju.dayBranch, saju.hourBranch];
        const hasDoHwa = branches.includes('묘') || branches.includes('유') || branches.includes('오') || branches.includes('자');
        const hasYeokMa = branches.includes('인') || branches.includes('신') || branches.includes('사') || branches.includes('해');
        
        const specialStars = [];
        if (hasDoHwa) specialStars.push('도화(桃花) - 인기운, 예술적 재능');
        if (hasYeokMa) specialStars.push('역마(驛馬) - 변동, 이동, 활동성');

        const luckyInfo = getLuckyInfo(dayElement);
        
        setResult({
          saju,
          personality: {
            dayStem: dayStemData,
            dayBranch: dayBranchData,
            yearBranch: yearBranchData,
            monthBranch: monthBranchData,
            hourBranch: hourBranchData,
            mainPersonality: getPersonality(dayElement)
          },
          elements: {
            day: dayElement,
            year: yearElement,
            month: monthElement,
            hour: hourElement
          },
          specialStars,
          luckyInfo
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('사주 계산 오류:', error);
        alert('사주 계산 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    }, 2000); // 로딩 시간을 2초로 증가 (화려한 효과 감상용)
  };

  const resetForm = () => {
    setResult(null);
    setBirthInfo({
      year: '',
      month: '',
      day: '',
      hour: '',
      minute: '0',
      gender: 'male',
      city: 'seoul'
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!result) {
    return (
      <InputForm 
        birthInfo={birthInfo}
        setBirthInfo={setBirthInfo}
        onSubmit={handleSubmit}
        cityLongitudes={cityLongitudes}
      />
    );
  }

  return (
    <ResultDisplay 
      result={result}
      birthInfo={birthInfo}
      onReset={resetForm}
    />
  );
};

export default SajuFortuneTeller;