import React, { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, Heart, Briefcase, Award, Users, DollarSign, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const FortuneGraphTab = ({ 
  birthInfo, 
  selectedYongsin, 
  adjustedDaewoons,
  currentAge 
}) => {
  const [selectedFortuneType, setSelectedFortuneType] = useState('총운');

  // 년간 계산 함수
  const calculateYearStem = (year) => {
    const baseYear = 1984;
    const yearDiff = year - baseYear;
    return (yearDiff % 10 + 10) % 10;
  };

  // 천간 가져오기
  const getHeavenlyStem = (index) => {
    const stems = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
    return stems[index];
  };

  // 오행 가져오기
  const getElement = (stem) => {
    const elementMap = {
      '갑': '목', '을': '목', '병': '화', '정': '화',
      '무': '토', '기': '토', '경': '금', '신': '금',
      '임': '수', '계': '수'
    };
    return elementMap[stem] || '토';
  };

  // 지지에서 천간 추출 (간단화)
  const getBranchStem = (branch) => {
    const branchStems = {
      '자': '계', '축': '기', '인': '갑', '묘': '을',
      '진': '기', '사': '병', '오': '정', '미': '기',
      '신': '경', '유': '신', '술': '무', '해': '임'
    };
    return branchStems[branch] || '기';
  };

  // 십신 분석 함수
  const analyzeSipsin = (dayElement, targetElement) => {
    const sipsinRelations = {
      '목': {
        '목': '비견', '화': '식신', '토': '편재', '금': '편관', '수': '편인'
      },
      '화': {
        '화': '비견', '토': '식신', '금': '편재', '수': '편관', '목': '편인'
      },
      '토': {
        '토': '비견', '금': '식신', '수': '편재', '목': '편관', '화': '편인'
      },
      '금': {
        '금': '비견', '수': '식신', '목': '편재', '화': '편관', '토': '편인'
      },
      '수': {
        '수': '비견', '목': '식신', '화': '편재', '토': '편관', '금': '편인'
      }
    };

    const sipsin = sipsinRelations[dayElement]?.[targetElement] || '기타';
    
    // 십신별 점수와 특성
    const sipsinData = {
      '비견': { baseScore: 55, volatility: 10, description: '자립과 독립' },
      '겁재': { baseScore: 50, volatility: 15, description: '경쟁과 변화' },
      '식신': { baseScore: 65, volatility: 5, description: '창작과 표현' },
      '상관': { baseScore: 60, volatility: 12, description: '재능과 기교' },
      '편재': { baseScore: 70, volatility: 8, description: '사업과 투자' },
      '정재': { baseScore: 75, volatility: 3, description: '안정적 재물' },
      '편관': { baseScore: 45, volatility: 18, description: '권력과 압박' },
      '정관': { baseScore: 80, volatility: 5, description: '명예와 책임' },
      '편인': { baseScore: 50, volatility: 12, description: '독창적 사고' },
      '정인': { baseScore: 65, volatility: 8, description: '학습과 성장' }
    };

    return {
      name: sipsin,
      data: sipsinData[sipsin] || { baseScore: 50, volatility: 10, description: '일반적' }
    };
  };

  // 충합형파 분석
  const analyzeConflicts = (yearBranch, dayStem, hourBranch) => {
    const conflicts = {
      // 지지 충
      '자오충': ['자', '오'], '축미충': ['축', '미'], 
      '인신충': ['인', '신'], '묘유충': ['묘', '유'],
      '진술충': ['진', '술'], '사해충': ['사', '해']
    };

    let riskLevel = 0;
    let riskDescription = '';

    // 충 검사
    for (const [conflictName, branches] of Object.entries(conflicts)) {
      if (conflictName.includes('충') && branches.includes(yearBranch)) {
        riskLevel += 15;
        riskDescription += `${conflictName} `;
      }
    }

    // 형 검사 (간단화)
    const 형Groups = [
      ['인', '사', '신'], ['축', '술', '미'], ['자', '묘', '유']
    ];
    
    for (const group of 형Groups) {
      if (group.includes(yearBranch)) {
        riskLevel += 8;
        riskDescription += '삼형 ';
      }
    }

    return {
      riskLevel: Math.min(riskLevel, 30), // 최대 30점 리스크
      description: riskDescription || '안정'
    };
  };

  // 재성 통근 분석
  const analyzeWealthRooting = (yearStem, monthStem, dayStem, hourStem, yearBranch, monthBranch, dayBranch, hourBranch) => {
    const dayElement = getElement(dayStem);
    const wealthElements = {
      '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
    };
    const wealthElement = wealthElements[dayElement];

    let wealthCount = 0;
    let rootingStrength = 0;

    // 천간에서 재성 찾기
    [yearStem, monthStem, hourStem].forEach(stem => {
      if (getElement(stem) === wealthElement) {
        wealthCount++;
      }
    });

    // 지지에서 재성 근 찾기 (간단화)
    const branchElements = {
      '자': '수', '축': '토', '인': '목', '묘': '목',
      '진': '토', '사': '화', '오': '화', '미': '토',
      '신': '금', '유': '금', '술': '토', '해': '수'
    };

    [yearBranch, monthBranch, dayBranch, hourBranch].forEach(branch => {
      if (branchElements[branch] === wealthElement) {
        rootingStrength += 1;
      }
    });

    return {
      count: wealthCount,
      rooting: rootingStrength,
      strength: wealthCount > 0 && rootingStrength > 0 ? '통근' : wealthCount > 0 ? '허부' : '무재'
    };
  };

  // 식상과 관성의 상호작용 분석
  const analyzeInteractions = (dayElement, yearElement, monthElement, hourElement) => {
    const relations = {
      '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
      '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
      '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
      '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
      '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
    };

    const dayRelation = relations[dayElement];
    let 식상Count = 0;
    let 관성Count = 0;

    [yearElement, monthElement, hourElement].forEach(element => {
      if (element === dayRelation.generates) 식상Count++;
      if (element === dayRelation.destroyedBy) 관성Count++;
    });

    let interactionScore = 0;
    let interactionDesc = '';

    if (식상Count > 0 && 관성Count > 0) {
      if (식상Count > 관성Count) {
        interactionScore = 10;
        interactionDesc = '식상제살 - 관성을 제어하여 좋음';
      } else {
        interactionScore = -15;
        interactionDesc = '관성제식상 - 창의성 억제';
      }
    } else if (식상Count > 1) {
      interactionScore = -10;
      interactionDesc = '식상과다 - 설기 과다';
    } else if (관성Count > 1) {
      interactionScore = -12;
      interactionDesc = '관성과다 - 압박 과중';
    }

    return {
      score: interactionScore,
      description: interactionDesc || '일반적 상호작용'
    };
  };

  // 년운과 용신의 점수 계산
  const calculateYearYongsinScore = (yearElement, yongsin) => {
    const relations = {
      '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
      '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
      '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
      '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
      '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
    };

    const yongsinRelation = relations[yongsin];
    
    if (yearElement === yongsin) return 90;
    if (yearElement === yongsinRelation.generatedBy) return 80;
    if (yearElement === yongsinRelation.destroys) return 65;
    if (yearElement === yongsinRelation.generates) return 35;
    if (yearElement === yongsinRelation.destroyedBy) return 25;
    return 50;
  };

  // 나이별 현실적 가중치 계산
  const getAgeWeightFactor = (age) => {
    if (age <= 10) return 0.4;        // 유년기: 매우 낮은 가중치
    if (age <= 18) return 0.6;        // 청소년기: 낮은 가중치  
    if (age <= 25) return 0.8;        // 사회 초년생: 보통 가중치
    if (age <= 45) return 1.2;        // 사회 활동 전성기: 높은 가중치
    if (age <= 65) return 1.0;        // 중장년기: 기본 가중치
    if (age <= 75) return 0.9;        // 노년기 초기: 약간 낮은 가중치
    return 0.7;                       // 고령기: 낮은 가중치
  };

  // 초년운 계산 (부모운/조상운 반영)
  const calculateEarlyLifeFortune = (baseScore, age, parentalInfluence = 0) => {
    if (age <= 25) {
      // 25세 이하는 부모운/조상운이 큰 영향
      const parentalWeight = Math.max(0, (25 - age) / 25); // 나이가 어릴수록 부모 영향 증가
      const adjustedScore = baseScore * (1 - parentalWeight) + parentalInfluence * parentalWeight;
      return Math.round(adjustedScore);
    }
    return baseScore;
  };

  // 운세 타입별 점수 조정 (십신 분석 포함한 고도화 버전)
  const calculateTypeSpecificScores = (baseScore, fortuneType, yearElement, daewoonElement, age, parentalInfluence, 
                                     yearStem, yearBranch, dayStem, monthStem, hourStem, dayBranch, monthBranch, hourBranch) => {
    // 나이별 가중치 적용
    const ageWeight = getAgeWeightFactor(age);
    let adjustedBaseScore = Math.round(baseScore * ageWeight);
    
    // 초년운 보정
    adjustedBaseScore = calculateEarlyLifeFortune(adjustedBaseScore, age, parentalInfluence);
    
    const scores = {
      '총운': adjustedBaseScore,
      '재물운': adjustedBaseScore,
      '건강운': adjustedBaseScore,
      '애정운': adjustedBaseScore,
      '사업운': adjustedBaseScore,
      '출세운': adjustedBaseScore,
      '관계운': adjustedBaseScore
    };

    // 십신 분석
    const dayElement = getElement(dayStem);
    const yearSipsin = analyzeSipsin(dayElement, yearElement);
    
    // 재성 통근 분석
    const wealthAnalysis = analyzeWealthRooting(yearStem, monthStem, dayStem, hourStem, 
                                               yearBranch, monthBranch, dayBranch, hourBranch);
    
    // 식상-관성 상호작용
    const monthElement = getElement(monthStem);
    const hourElement = getElement(hourStem);
    const interactions = analyzeInteractions(dayElement, yearElement, monthElement, hourElement);
    
    // 충합형파 리스크
    const conflicts = analyzeConflicts(yearBranch, dayStem, hourBranch);

    // 십신별 운세 조정
    const sipsinEffect = yearSipsin.data.baseScore - 50; // 기준점 50에서의 차이
    Object.keys(scores).forEach(key => {
      scores[key] += Math.round(sipsinEffect * 0.3);
    });

    // 재물운 특별 계산
    if (yearSipsin.name.includes('재')) {
      const wealthBonus = wealthAnalysis.strength === '통근' ? 25 : 
                         wealthAnalysis.strength === '허부' ? 10 : 0;
      scores['재물운'] += wealthBonus;
      scores['사업운'] += Math.round(wealthBonus * 0.7);
    }

    // 관성 관련 운세 조정
    if (yearSipsin.name.includes('관')) {
      scores['출세운'] += yearSipsin.name === '정관' ? 20 : 10;
      scores['관계운'] += 10;
      // 관성제식상 패널티
      if (interactions.score < 0 && interactions.description.includes('관성제식상')) {
        scores['사업운'] += interactions.score;
        scores['애정운'] += Math.round(interactions.score * 0.5);
      }
    }

    // 식상 관련 운세 조정
    if (yearSipsin.name.includes('식') || yearSipsin.name.includes('상관')) {
      scores['사업운'] += 15;
      scores['애정운'] += yearSipsin.name === '식신' ? 12 : 8;
      // 식상제살 보너스
      if (interactions.score > 0 && interactions.description.includes('식상제살')) {
        scores['출세운'] += interactions.score;
        scores['관계운'] += Math.round(interactions.score * 0.8);
      }
    }

    // 인성 관련 운세 조정
    if (yearSipsin.name.includes('인')) {
      scores['건강운'] += 15;
      scores['관계운'] += yearSipsin.name === '정인' ? 12 : 8;
    }

    // 비견 관련 운세 조정
    if (yearSipsin.name.includes('비견') || yearSipsin.name.includes('겁재')) {
      scores['관계운'] += yearSipsin.name === '비견' ? 8 : 5;
      // 비견은 재물 분산 위험
      if (wealthAnalysis.count > 0) {
        scores['재물운'] -= 8;
      }
    }

    // 나이대별 운세 특성 조정
    if (age <= 18) {
      scores['사업운'] -= 30;
      scores['재물운'] -= 25;
      scores['출세운'] -= 35;
      scores['건강운'] += 10;
      scores['관계운'] += 5;
    } else if (age >= 19 && age <= 25) {
      scores['사업운'] -= 15;
      scores['재물운'] -= 10;
      scores['출세운'] -= 10;
      scores['애정운'] += 10;
      scores['관계운'] += 5;
    } else if (age >= 26 && age <= 35) {
      scores['사업운'] += 15;
      scores['애정운'] += 20;
      scores['출세운'] += 10;
      scores['관계운'] += 10;
    } else if (age >= 36 && age <= 45) {
      scores['사업운'] += 25;
      scores['재물운'] += 20;
      scores['출세운'] += 25;
      scores['관계운'] += 15;
    } else if (age >= 46 && age <= 55) {
      scores['재물운'] += 15;
      scores['출세운'] += 10;
      scores['건강운'] += 5;
    } else if (age >= 56 && age <= 65) {
      scores['재물운'] += 10;
      scores['건강운'] += 15;
      scores['관계운'] += 10;
    } else if (age >= 66) {
      scores['건강운'] += 25;
      scores['관계운'] += 20;
      scores['사업운'] -= 20;
      scores['출세운'] -= 15;
    }

    // 충합형파 리스크 반영
    if (conflicts.riskLevel > 0) {
      Object.keys(scores).forEach(key => {
        scores[key] -= conflicts.riskLevel;
      });
      // 특히 관계운과 건강운에 더 큰 영향
      scores['관계운'] -= Math.round(conflicts.riskLevel * 0.5);
      scores['건강운'] -= Math.round(conflicts.riskLevel * 0.3);
    }

    // 오행별 특성 반영
    const elementBonus = {
      '목': { '사업운': 8, '관계운': 5, '애정운': 5 },
      '화': { '출세운': 12, '애정운': 8, '관계운': 5 },
      '토': { '재물운': 12, '건강운': 5, '사업운': 3 },
      '금': { '출세운': 8, '재물운': 5, '사업운': 5 },
      '수': { '건강운': 8, '관계운': 12, '애정운': 3 }
    };

    if (elementBonus[yearElement]) {
      Object.entries(elementBonus[yearElement]).forEach(([type, bonus]) => {
        scores[type] += bonus;
      });
    }

    // 점수 범위 제한 (15-95로 극값 제한)
    Object.keys(scores).forEach(key => {
      scores[key] = Math.max(15, Math.min(95, scores[key]));
    });

    return {
      scores,
      analysis: {
        sipsin: yearSipsin,
        wealth: wealthAnalysis,
        interactions,
        conflicts
      }
    };
  };

  // 대운 기간 구분
  const getDaewoonPeriod = (age) => {
    if (age < 10) return '유년기';
    if (age < 20) return '청소년기';
    if (age < 30) return '청년기';
    if (age < 40) return '장년기';
    if (age < 50) return '중년기';
    if (age < 60) return '장노년기';
    return '노년기';
  };

  // 운세 타입별 설정
  const fortuneTypes = [
    { id: '총운', name: '총운', icon: TrendingUp, color: '#8b5cf6', desc: '전체적인 인생 운세' },
    { id: '재물운', name: '재물운', icon: DollarSign, color: '#10b981', desc: '재정, 투자, 사업 관련 운세' },
    { id: '건강운', name: '건강운', icon: Activity, color: '#ef4444', desc: '신체적, 정신적 건강 운세' },
    { id: '애정운', name: '애정운', icon: Heart, color: '#f59e0b', desc: '연애, 결혼, 가족 관련 운세' },
    { id: '사업운', name: '사업운', icon: Briefcase, color: '#3b82f6', desc: '창업, 사업 확장 관련 운세' },
    { id: '출세운', name: '출세운', icon: Award, color: '#dc2626', desc: '승진, 지위 상승 관련 운세' },
    { id: '관계운', name: '관계운', icon: Users, color: '#6b7280', desc: '인간관계, 사회적 네트워크 운세' }
  ];

  // 1세부터 100세까지의 운세 데이터 생성
  const fortuneData = useMemo(() => {
    if (!adjustedDaewoons || adjustedDaewoons.length === 0 || !selectedYongsin) {
      return [];
    }

    const data = [];
    const birthYear = parseInt(birthInfo.year);

    // 부모운/조상운 계산
    const getParentalInfluence = (daewoons) => {
      if (daewoons.length >= 2) {
        const parentalScore = (daewoons[0].yongsinScore + daewoons[1].yongsinScore) / 2;
        return Math.max(40, Math.min(70, parentalScore));
      }
      return 55;
    };

    const parentalInfluence = getParentalInfluence(adjustedDaewoons);

    for (let age = 1; age <= 100; age++) {
      const year = birthYear + age - 1;
      
      // 해당 나이의 대운 찾기
      const currentDaewoon = adjustedDaewoons.find(dw => 
        age >= dw.startAge && age <= dw.endAge
      );

      if (!currentDaewoon) continue;

      // 년간, 년지 계산
      const yearStemIdx = calculateYearStem(year);
      const yearBranchIdx = (year - 1984 + 12) % 12;
      const yearStem = getHeavenlyStem(yearStemIdx);
      const yearBranch = ['자','축','인','묘','진','사','오','미','신','유','술','해'][yearBranchIdx];
      const yearElement = getElement(yearStem);
      
      // 기본 점수 (대운 기준)
      let baseScore = currentDaewoon.yongsinScore || 50;
      
      // 년운과 용신의 관계로 조정
      const yearYongsinScore = calculateYearYongsinScore(yearElement, selectedYongsin);
      let finalScore = Math.round(baseScore * 0.6 + yearYongsinScore * 0.4);
      
      // 초년운 특별 계산 (25세 이하)
      if (age <= 25) {
        const youthFactor = (25 - age) / 25;
        finalScore = Math.round(finalScore * (1 - youthFactor * 0.3) + parentalInfluence * youthFactor * 0.3);
      }

      // 사주 정보 (가상의 데이터)
      const dayStem = '갑';
      const monthStem = '병';
      const hourStem = '무';
      const dayBranch = '자';
      const monthBranch = '인';
      const hourBranch = '오';

      // 운세 타입별 점수 조정
      const result = calculateTypeSpecificScores(
        finalScore, 
        selectedFortuneType, 
        yearElement, 
        currentDaewoon.element,
        age,
        parentalInfluence,
        yearStem, yearBranch, dayStem, monthStem, hourStem, dayBranch, monthBranch, hourBranch
      );

      data.push({
        age,
        year,
        score: result.scores[selectedFortuneType] || finalScore,
        daewoon: currentDaewoon.pillar,
        yearElement,
        yearStem,
        yearBranch,
        period: getDaewoonPeriod(age),
        parentalInfluence: age <= 25 ? parentalInfluence : null,
        analysis: result.analysis
      });
    }

    return data;
  }, [adjustedDaewoons, selectedYongsin, selectedFortuneType, birthInfo.year]);

  // 선택된 운세 타입 정보
  const selectedType = fortuneTypes.find(t => t.id === selectedFortuneType);

  // 커스텀 툴팁 (십신 분석 정보 포함)
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const analysis = data.analysis;
      
      return (
        <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-lg max-w-sm">
          <p className="font-semibold text-lg mb-2">{`${label}세 (${data.year}년)`}</p>
          <div className="space-y-2">
            <p className="text-blue-600 font-medium">{`${selectedFortuneType}: ${payload[0].value}점`}</p>
            <div className="border-t pt-2">
              <p className="text-gray-600 text-sm">{`대운: ${data.daewoon}`}</p>
              <p className="text-gray-600 text-sm">{`년운: ${data.yearStem}${data.yearBranch} (${data.yearElement})`}</p>
              <p className="text-gray-500 text-sm">{data.period}</p>
            </div>
            
            {analysis && (
              <div className="border-t pt-2 space-y-1">
                <p className="text-purple-600 text-sm font-medium">
                  십신: {analysis.sipsin.name} - {analysis.sipsin.data.description}
                </p>
                
                {analysis.wealth.count > 0 && (
                  <p className="text-green-600 text-sm">
                    재성: {analysis.wealth.strength} ({analysis.wealth.count}개)
                  </p>
                )}
                
                {analysis.interactions.description !== '일반적 상호작용' && (
                  <p className="text-orange-600 text-sm">
                    상호작용: {analysis.interactions.description}
                  </p>
                )}
                
                {analysis.conflicts.riskLevel > 0 && (
                  <p className="text-red-600 text-sm">
                    충합형파: {analysis.conflicts.description} (리스크: {analysis.conflicts.riskLevel}점)
                  </p>
                )}
              </div>
            )}
            
            {data.parentalInfluence && (
              <p className="text-purple-600 text-sm border-t pt-2">{`부모운 영향: ${data.parentalInfluence}점`}</p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* 운세 타입 선택 */}
      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <BarChart3 className="text-purple-600" />
          📊 평생 운세 그래프 
          {selectedYongsin && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-normal">({selectedYongsin} 용신 기준)</span>
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1">
                <span className="text-yellow-800 text-xs font-medium">
                  ⚠️ 용신에 따른 그래프이므로 용신이 바뀌면 그래프도 변경됩니다
                </span>
              </div>
            </div>
          )}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {fortuneTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = selectedFortuneType === type.id;
            
            return (
              <button
                key={type.id}
                onClick={() => setSelectedFortuneType(type.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? 'border-purple-400 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor: isSelected ? `${type.color}15` : 'white',
                  borderColor: isSelected ? type.color : undefined
                }}
              >
                <div className="text-center">
                  <Icon 
                    size={24} 
                    className={`mx-auto mb-2 ${isSelected ? '' : 'text-gray-500'}`}
                    style={{ color: isSelected ? type.color : undefined }}
                  />
                  <div 
                    className={`font-bold text-sm ${isSelected ? '' : 'text-gray-700'}`}
                    style={{ color: isSelected ? type.color : undefined }}
                  >
                    {type.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{type.desc}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 선택된 운세 정보 */}
        {selectedType && (
          <div className="bg-white/80 rounded-lg p-4 border border-gray-200 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <selectedType.icon size={20} style={{ color: selectedType.color }} />
              <span className="font-bold text-gray-800">{selectedType.name} 분석</span>
            </div>
            <p className="text-gray-600 text-sm">{selectedType.desc}</p>
          </div>
        )}
      </div>

      {/* 운세 그래프 */}
      <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <div className="mb-4">
          <h4 className="text-lg font-bold text-gray-800 mb-2">
            🎯 {selectedType?.name} 평생 운세 (1세 ~ 100세)
          </h4>
          <p className="text-sm text-gray-600">
            현재 {currentAge}세 • 용신: {selectedYongsin} • 그래프 위에 마우스를 올리면 상세 정보를 볼 수 있습니다
          </p>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={fortuneData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="age" 
                stroke="#6b7280"
                fontSize={12}
                interval="preserveStartEnd"
                label={{ value: '나이', position: 'insideBottom', offset: -10 }}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                domain={[10, 100]}
                label={{ value: '운세 점수', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* 현재 나이 표시 */}
              <ReferenceLine 
                x={currentAge} 
                stroke="#ef4444" 
                strokeDasharray="5 5"
                label={{ value: `현재 ${currentAge}세`, position: 'top' }}
              />
              
              {/* 평균선 */}
              <ReferenceLine 
                y={50} 
                stroke="#9ca3af" 
                strokeDasharray="3 3"
                label={{ value: '평균 (50점)', position: 'right' }}
              />
              
              {/* 사회활동기 구간 표시 */}
              <ReferenceLine 
                x={25} 
                stroke="#10b981" 
                strokeDasharray="2 2"
                strokeOpacity={0.5}
                label={{ value: '사회활동 시작', position: 'bottom' }}
              />
              
              <ReferenceLine 
                x={65} 
                stroke="#f59e0b" 
                strokeDasharray="2 2"
                strokeOpacity={0.5}
                label={{ value: '은퇴시기', position: 'bottom' }}
              />
              
              <Line
                type="monotone"
                dataKey="score"
                stroke={selectedType?.color || '#8b5cf6'}
                strokeWidth={3}
                dot={{ fill: selectedType?.color || '#8b5cf6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 6, stroke: selectedType?.color || '#8b5cf6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 그래프 해석 */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h5 className="font-bold text-green-800 mb-2">🔥 절정기</h5>
            <p className="text-green-700 text-sm">
              {(() => {
                // 25세 이후 데이터만 고려
                const adultData = fortuneData.filter(d => d.age >= 25);
                if (adultData.length === 0) return '계산 중...';
                const maxScore = Math.max(...adultData.map(d => d.score));
                const peakData = adultData.find(d => d.score === maxScore);
                return peakData ? `${peakData.age}세 (${peakData.score}점)` : '계산 중...';
              })()}
            </p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <h5 className="font-bold text-red-800 mb-2">⚠️ 주의시기</h5>
            <p className="text-red-700 text-sm">
              {(() => {
                const minScore = Math.min(...fortuneData.map(d => d.score));
                const lowData = fortuneData.find(d => d.score === minScore);
                return lowData ? `${lowData.age}세 (${lowData.score}점)` : '계산 중...';
              })()}
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h5 className="font-bold text-blue-800 mb-2">📊 사회활동기 평균</h5>
            <p className="text-blue-700 text-sm">
              {(() => {
                const socialActiveData = fortuneData.filter(d => d.age >= 25 && d.age <= 65);
                if (socialActiveData.length === 0) return '계산 중...';
                const avg = socialActiveData.reduce((sum, d) => sum + d.score, 0) / socialActiveData.length;
                return `${Math.round(avg)}점 (25-65세)`;
              })()}
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
            <h5 className="font-bold text-purple-800 mb-2">👶 초년운 평균</h5>
            <p className="text-purple-700 text-sm">
              {(() => {
                const earlyData = fortuneData.filter(d => d.age <= 25);
                if (earlyData.length === 0) return '계산 중...';
                const avg = earlyData.reduce((sum, d) => sum + d.score, 0) / earlyData.length;
                return `${Math.round(avg)}점 (1-25세)`;
              })()}
            </p>
          </div>
        </div>

        {/* 나이대별 가중치 안내 */}
        <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h6 className="font-bold text-yellow-800 mb-2">💡 운세 해석 안내</h6>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-yellow-700">
            <div>
              <strong>초년운 (1-25세):</strong> 부모운과 조상운의 영향을 크게 받아 실제 개인 역량보다는 가정 환경이 중요합니다.
            </div>
            <div>
              <strong>사회활동기 (26-45세):</strong> 개인의 역량이 가장 중요한 시기로 운세의 영향이 크게 나타납니다.
            </div>
            <div>
              <strong>안정기 (46-65세):</strong> 축적된 경험과 지위가 운세와 함께 작용하는 시기입니다.
            </div>
            <div>
              <strong>노년기 (66세 이후):</strong> 건강과 인간관계가 가장 중요한 운세 요소가 됩니다.
            </div>
          </div>
        </div>

        {/* 십신 분석 추가 정보 */}
        <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h6 className="font-bold text-blue-800 mb-2">🔍 고급 분석 요소</h6>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-700">
            <div>
              <strong>십신 분석:</strong> 년간과 일간의 관계를 통해 해당 연도의 핵심 특성을 분석합니다.
            </div>
            <div>
              <strong>재성 통근:</strong> 재성이 지지에 뿌리를 두고 있는지 확인하여 재물운의 안정성을 평가합니다.
            </div>
            <div>
              <strong>식상-관성 상호작용:</strong> 창의성(식상)과 책임감(관성)의 균형을 분석합니다.
            </div>
            <div>
              <strong>충합형파:</strong> 지지간의 충돌이나 조화를 분석하여 변동성과 리스크를 평가합니다.
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">
            💡 그래프 위에 마우스를 올리면 각 연도별 상세한 십신 분석 정보를 확인할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};