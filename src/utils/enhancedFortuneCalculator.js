import { getElement } from './characterAnalysis';
import { heavenlyStems, earthlyBranches } from '../constants/sajuData';

// 용신 기준 대운 분석
export const analyzeDaewoonWithYongsin = (daewoonElement, yongsin, birthElement) => {
  // 오행 상생상극 관계
  const elementRelations = {
    '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
    '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
    '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
    '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
    '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
  };

  const yongsinRelation = elementRelations[yongsin];
  let fortuneScore = 50; // 기본 점수
  let fortuneType = '보통';
  let description = '';
  let advice = '';
  let color = '#6b7280';

  // 용신과 대운의 관계 분석
  if (daewoonElement === yongsin) {
    // 대운이 용신과 같은 오행
    fortuneScore = 90;
    fortuneType = '대길';
    description = `${yongsin}의 기운이 최고조에 달하는 매우 좋은 시기입니다.`;
    advice = '적극적으로 활동하고 새로운 도전을 시작하기 좋은 때입니다.';
    color = '#10b981';
  } else if (daewoonElement === yongsinRelation.generatedBy) {
    // 대운이 용신을 생하는 오행
    fortuneScore = 80;
    fortuneType = '길';
    description = `${yongsin}을 돕는 ${daewoonElement}의 기운으로 순조로운 발전이 예상됩니다.`;
    advice = '꾸준한 노력으로 좋은 성과를 얻을 수 있는 시기입니다.';
    color = '#3b82f6';
  } else if (daewoonElement === yongsinRelation.generates) {
    // 용신이 대운을 생하는 관계 (용신 손실)
    fortuneScore = 35;
    fortuneType = '주의';
    description = `${yongsin}의 기운이 ${daewoonElement}로 빠져나가 에너지 손실이 있는 시기입니다.`;
    advice = '무리하지 말고 현 상태를 유지하며 기회를 기다리는 것이 좋습니다.';
    color = '#f59e0b';
  } else if (daewoonElement === yongsinRelation.destroyedBy) {
    // 대운이 용신을 극하는 오행
    fortuneScore = 25;
    fortuneType = '흉';
    description = `${daewoonElement}이 ${yongsin}을 극하여 어려움이 많은 시기입니다.`;
    advice = '신중하게 행동하고 변화보다는 안정을 추구하는 것이 좋습니다.';
    color = '#ef4444';
  } else if (daewoonElement === yongsinRelation.destroys) {
    // 용신이 대운을 극하는 관계
    fortuneScore = 65;
    fortuneType = '평길';
    description = `${yongsin}이 ${daewoonElement}을 극하여 통제력을 발휘할 수 있는 시기입니다.`;
    advice = '주도적으로 상황을 이끌어가면 좋은 결과를 얻을 수 있습니다.';
    color = '#8b5cf6';
  }

  // 일간과의 관계도 고려
  const birthRelation = elementRelations[birthElement];
  if (daewoonElement === birthElement) {
    fortuneScore += 10; // 비견 관계로 자립심 증가
  } else if (daewoonElement === birthRelation.generatedBy) {
    fortuneScore += 15; // 인성 관계로 도움 증가
  }

  // 점수 보정 (0-100 범위)
  fortuneScore = Math.max(0, Math.min(100, fortuneScore));

  return {
    type: fortuneType,
    score: fortuneScore,
    color: color,
    description: description,
    advice: advice,
    yongsinRelation: getYongsinRelationType(daewoonElement, yongsin)
  };
};

// 용신과의 관계 유형 분석
const getYongsinRelationType = (element, yongsin) => {
  const relations = {
    '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
    '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
    '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
    '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
    '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
  };

  const yongsinRelation = relations[yongsin];

  if (element === yongsin) {
    return { type: '용신왕', strength: 100, desc: '용신 자체로 최고의 기운' };
  } else if (element === yongsinRelation.generatedBy) {
    return { type: '생용신', strength: 85, desc: '용신을 생하여 매우 좋음' };
  } else if (element === yongsinRelation.generates) {
    return { type: '설용신', strength: 30, desc: '용신을 설기하여 주의 필요' };
  } else if (element === yongsinRelation.destroyedBy) {
    return { type: '극용신', strength: 20, desc: '용신을 극하여 매우 주의' };
  } else if (element === yongsinRelation.destroys) {
    return { type: '용신극', strength: 70, desc: '용신이 극하여 통제 가능' };
  }

  return { type: '중성', strength: 50, desc: '보통의 관계' };
};

// 년간 계산
const calculateYearStem = (year) => {
  const baseYear = 1984;
  const yearDiff = year - baseYear;
  return (yearDiff % 10 + 10) % 10;
};

const calculateYearBranch = (year) => {
  const baseYear = 1984;
  const yearDiff = year - baseYear;
  return (yearDiff % 12 + 12) % 12;
};

// 용신 기준 세운 분석 (개선된 버전)
export const analyzeSewoonWithYongsin = (daewoons, birthYear, dayStem, yongsin) => {
  const currentYear = new Date().getFullYear();
  
  return daewoons.map(daewoon => {
    const years = [];
    let bestWealthYear = null;
    let worstYear = null;
    let bestOverallYear = null;
    let maxWealthScore = 0;
    let minOverallScore = 100;
    let maxOverallScore = 0;
    
    // 대운 자체의 용신 관계 분석
    const daewoonYongsinAnalysis = analyzeDaewoonWithYongsin(daewoon.element, yongsin, getElement(dayStem));
    
    // 각 대운 기간의 년운 분석
    for (let age = daewoon.startAge; age <= daewoon.endAge; age++) {
      const year = parseInt(birthYear) + age - 1;
      const yearStemIdx = calculateYearStem(year);
      const yearBranchIdx = calculateYearBranch(year);
      const yearStem = heavenlyStems[yearStemIdx];
      const yearBranch = earthlyBranches[yearBranchIdx];
      const yearElement = getElement(yearStem);
      
      // 년운과 용신의 관계 분석
      const yearYongsinAnalysis = analyzeDaewoonWithYongsin(yearElement, yongsin, getElement(dayStem));
      
      // 대운과 년운의 종합 점수 계산
      const daewoonWeight = 0.7; // 대운이 70% 영향
      const yearWeight = 0.3;    // 년운이 30% 영향
      
      const overallScore = Math.round(
        daewoonYongsinAnalysis.score * daewoonWeight + 
        yearYongsinAnalysis.score * yearWeight
      );
      
      // 재물운 특별 계산 (재성년일 때 가산점)
      let wealthScore = overallScore;
      const dayElement = getElement(dayStem);
      const destroyedByDay = {
        '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
      }[dayElement];
      
      if (yearElement === destroyedByDay) {
        wealthScore += 20; // 재성년 가산점
      }
      
      // 용신과 년운이 일치하면 재물운도 상승
      if (yearElement === yongsin) {
        wealthScore += 15;
      }
      
      wealthScore = Math.min(100, wealthScore);
      
      // 십신 관계 분석
      const sipsin = analyzeSipsinRelation(dayElement, yearElement);
      
      // 최고/최악의 해 찾기
      if (wealthScore > maxWealthScore) {
        maxWealthScore = wealthScore;
        bestWealthYear = { 
          year, age, score: wealthScore, 
          reason: `${yearYongsinAnalysis.type} + ${sipsin.name}운으로 재물운 상승` 
        };
      }
      
      if (overallScore < minOverallScore) {
        minOverallScore = overallScore;
        worstYear = { 
          year, age, score: overallScore, 
          reason: `${yearYongsinAnalysis.description}` 
        };
      }
      
      if (overallScore > maxOverallScore) {
        maxOverallScore = overallScore;
        bestOverallYear = { 
          year, age, score: overallScore, 
          reason: `${yearYongsinAnalysis.type}운으로 전체적 상승` 
        };
      }
      
      years.push({
        year,
        age,
        yearStem,
        yearBranch,
        yearPillar: yearStem + yearBranch,
        yearElement,
        sipsin,
        yongsinAnalysis: yearYongsinAnalysis,
        overallScore,
        wealthScore,
        isCurrent: year === currentYear,
        // 기존 형식 유지를 위한 호환성
        interaction: {
          type: yearYongsinAnalysis.yongsinRelation.type,
          strength: yearYongsinAnalysis.score,
          desc: yearYongsinAnalysis.description
        }
      });
    }
    
    return {
      ...daewoon,
      years,
      bestWealthYear,
      worstYear,
      bestOverallYear,
      averageScore: years.reduce((sum, y) => sum + y.overallScore, 0) / years.length,
      yongsinAnalysis: daewoonYongsinAnalysis
    };
  });
};

// 십신 관계 분석 (간소화된 버전)
const analyzeSipsinRelation = (dayElement, targetElement) => {
  const relations = {
    '목': { '목': '비견', '화': '식신', '토': '재성', '금': '관성', '수': '인성' },
    '화': { '화': '비견', '토': '식신', '금': '재성', '수': '관성', '목': '인성' },
    '토': { '토': '비견', '금': '식신', '수': '재성', '목': '관성', '화': '인성' },
    '금': { '금': '비견', '수': '식신', '목': '재성', '화': '관성', '토': '인성' },
    '수': { '수': '비견', '목': '식신', '화': '재성', '토': '관성', '금': '인성' }
  };

  const sipsinName = relations[dayElement]?.[targetElement] || '기타';
  
  const colors = {
    '비견': '#8b5cf6', '식신': '#10b981', '재성': '#f59e0b', 
    '관성': '#ef4444', '인성': '#3b82f6', '기타': '#6b7280'
  };

  const descriptions = {
    '비견': '자립과 독립의 해',
    '식신': '창작과 표현의 해', 
    '재성': '재물과 투자의 해',
    '관성': '책임과 지위의 해',
    '인성': '학습과 성장의 해',
    '기타': '평범한 해'
  };

  return {
    name: sipsinName,
    color: colors[sipsinName],
    fortune: descriptions[sipsinName],
    desc: descriptions[sipsinName]
  };
};

// 특정 년도의 상세 분석 (용신 기준)
export const getYearDetailAnalysisWithYongsin = (yearData, daewoonElement, yongsin) => {
  const { yongsinAnalysis, overallScore, wealthScore, sipsin } = yearData;
  
  // 월별 세부 운세 (용신 기준으로 조정)
  const monthlyFortune = [
    { 
      month: '1-2월', 
      desc: yongsinAnalysis.score >= 70 ? '새해 목표 달성에 유리한 시작' : '신중한 계획 수립의 시기'
    },
    { 
      month: '3-4월', 
      desc: yongsinAnalysis.score >= 70 ? '새로운 프로젝트 시작에 좋음' : '기존 일에 집중하는 것이 좋음'
    },
    { 
      month: '5-6월', 
      desc: yongsinAnalysis.score >= 70 ? '활발한 활동과 성과 창출' : '변화보다는 현상 유지'
    },
    { 
      month: '7-8월', 
      desc: yongsinAnalysis.score >= 70 ? '도전과 발전의 기회' : '휴식과 재충전이 필요'
    },
    { 
      month: '9-10월', 
      desc: yongsinAnalysis.score >= 70 ? '수확과 결실의 계절' : '차분한 정리의 시간'
    },
    { 
      month: '11-12월', 
      desc: yongsinAnalysis.score >= 70 ? '성공적인 마무리와 내년 준비' : '안정적인 마무리에 집중'
    }
  ];
  
  // 용신 기준 종합 분석
  const getOverallAnalysis = (score) => {
    if (score >= 80) return '대길한 해';
    if (score >= 65) return '길한 해';
    if (score >= 50) return '보통 해';
    if (score >= 35) return '주의가 필요한 해';
    return '매우 조심해야 할 해';
  };
  
  const getWealthAnalysis = (score) => {
    if (score >= 75) return '재물운 대길';
    if (score >= 60) return '재물운 상승';
    if (score >= 45) return '재물운 보통';
    if (score >= 30) return '재물 관리 주의';
    return '재물 손실 주의';
  };
  
  const getHealthAnalysis = (score) => {
    if (score >= 70) return '건강 매우 양호';
    if (score >= 55) return '건강 양호';
    if (score >= 40) return '건강 관리 필요';
    return '건강 특별 관리 필요';
  };
  
  const getCareerAnalysis = (score) => {
    if (score >= 75) return '승진/발전 기회';
    if (score >= 60) return '직업운 상승';
    if (score >= 45) return '현상 유지';
    if (score >= 30) return '신중한 선택 필요';
    return '변화 자제 권장';
  };

  return {
    summary: {
      overall: getOverallAnalysis(overallScore),
      wealth: getWealthAnalysis(wealthScore),
      health: getHealthAnalysis(overallScore),
      career: getCareerAnalysis(overallScore)
    },
    advice: {
      positive: yongsinAnalysis.description,
      caution: yongsinAnalysis.score < 50 ? 
        `${yongsinAnalysis.type} 시기이므로 무리한 도전보다는 현상 유지가 좋습니다.` :
        `${yongsinAnalysis.type} 시기이므로 적극적인 활동이 좋은 결과를 가져올 것입니다.`,
      action: getYearActionAdviceWithYongsin(sipsin.name, yongsinAnalysis.type, yongsinAnalysis.score)
    },
    monthlyFortune,
    yongsinEffect: {
      type: yongsinAnalysis.type,
      score: yongsinAnalysis.score,
      relation: yongsinAnalysis.yongsinRelation,
      mainAdvice: yongsinAnalysis.advice
    }
  };
};

// 용신 기준 연간 행동 조언
const getYearActionAdviceWithYongsin = (sipsinName, yongsinType, yongsinScore) => {
  const baseAdvice = {
    '재성': {
      high: '투자와 사업 확장에 최적의 해입니다. 용신의 도움으로 재물운이 크게 상승합니다.',
      medium: '신중한 투자와 재정 관리로 안정적인 수익을 추구하세요.',
      low: '큰 투자나 사업 확장은 피하고 기존 자산 보호에 집중하세요.'
    },
    '관성': {
      high: '승진이나 이직, 새로운 책임을 맡기에 최적의 시기입니다.',
      medium: '현재 위치에서 실력을 인정받을 수 있는 해입니다.',
      low: '상급자와의 관계에 주의하고 겸손한 자세를 유지하세요.'
    },
    '인성': {
      high: '학습과 자기계발에 집중하면 큰 성과를 얻을 수 있습니다.',
      medium: '새로운 기술이나 지식 습득에 좋은 해입니다.',
      low: '과도한 학습보다는 기존 지식 활용에 집중하세요.'
    },
    '식신': {
      high: '창작 활동과 새로운 도전에 매우 좋은 해입니다.',
      medium: '아이디어를 현실로 만들기 좋은 시기입니다.',
      low: '성급한 표현보다는 차분한 준비가 필요합니다.'
    },
    '비견': {
      high: '독립이나 창업을 고려해볼 만한 해입니다.',
      medium: '동업이나 파트너십에 좋은 해입니다.',
      low: '경쟁이 치열할 수 있으니 협력을 우선하세요.'
    }
  };
  
  const level = yongsinScore >= 70 ? 'high' : yongsinScore >= 50 ? 'medium' : 'low';
  const advice = baseAdvice[sipsinName]?.[level] || '균형잡힌 마음으로 꾸준히 노력하세요.';
  
  // 용신 타입별 추가 조언
  const yongsinAdvice = {
    '대길': ' 용신의 기운이 최고조이므로 모든 일에 적극적으로 임하세요.',
    '길': ' 용신의 도움으로 순조로운 발전이 가능합니다.',
    '평길': ' 용신의 영향으로 안정적인 성과를 기대할 수 있습니다.',
    '보통': ' 용신의 기운이 보통이므로 꾸준한 노력이 중요합니다.',
    '주의': ' 용신이 약해지는 시기이므로 신중한 판단이 필요합니다.',
    '흉': ' 용신에 방해가 되는 시기이므로 안전 위주로 행동하세요.'
  };
  
  return advice + (yongsinAdvice[yongsinType] || '');
};

// 대운 전체를 용신 기준으로 재평가
export const evaluateOverallFortuneWithYongsin = (daewoons, yongsin) => {
  return daewoons.map(daewoon => {
    const yongsinAnalysis = analyzeDaewoonWithYongsin(daewoon.element, yongsin, daewoon.element);
    
    return {
      ...daewoon,
      yongsinScore: yongsinAnalysis.score,
      yongsinType: yongsinAnalysis.type,
      yongsinDescription: yongsinAnalysis.description,
      yongsinAdvice: yongsinAnalysis.advice,
      adjustedDescription: `${yongsinAnalysis.description} ${daewoon.description}`
    };
  });
};