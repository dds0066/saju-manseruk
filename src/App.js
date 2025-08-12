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
        // 정확한 절기 계산을 적용한 사주 계산
        const saju = calculateSaju(
          birthInfo.year, 
          birthInfo.month, 
          birthInfo.day, 
          birthInfo.hour, 
          birthInfo.minute, 
          birthInfo.city,
          birthInfo.gender
        );

        // 성격 분석
        const dayStemData = getStemCharacter(saju.dayStem);
        const dayBranchData = getBranchCharacter(saju.dayBranch);
        const yearBranchData = getBranchCharacter(saju.yearBranch);
        const monthBranchData = getBranchCharacter(saju.monthBranch);
        const hourBranchData = getBranchCharacter(saju.hourBranch);

        // 오행 분석
        const dayElement = saju.mainElement;
        const yearElement = saju.yearElement;
        const monthElement = saju.monthElement;
        const hourElement = saju.hourElement;

        // 특수 신살 분석
        const branches = [saju.yearBranch, saju.monthBranch, saju.dayBranch, saju.hourBranch];
        const hasDoHwa = branches.includes('묘') || branches.includes('유') || branches.includes('오') || branches.includes('자');
        const hasYeokMa = branches.includes('인') || branches.includes('신') || branches.includes('사') || branches.includes('해');
        
        const specialStars = [];
        if (hasDoHwa) specialStars.push('도화(桃花) - 인기운, 예술적 재능');
        if (hasYeokMa) specialStars.push('역마(驛馬) - 변동, 이동, 활동성');

        // 오행 균형 (간단 계산)
        const elementBalance = {
          목: [saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem].filter(s => 
            ['갑', '을'].includes(s)).length,
          화: [saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem].filter(s => 
            ['병', '정'].includes(s)).length,
          토: [saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem].filter(s => 
            ['무', '기'].includes(s)).length,
          금: [saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem].filter(s => 
            ['경', '신'].includes(s)).length,
          수: [saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem].filter(s => 
            ['임', '계'].includes(s)).length
        };

        // 행운 정보
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
            hour: hourElement,
            balance: elementBalance
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
    }, 1500);
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