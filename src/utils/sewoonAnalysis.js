import { getElement } from './characterAnalysis';
import { heavenlyStems, earthlyBranches } from '../constants/sajuData';

// 년간 계산 (60갑자 순환)
const calculateYearStem = (year) => {
  const baseYear = 1984; // 갑자년 기준
  const yearDiff = year - baseYear;
  return (yearDiff % 10 + 10) % 10;
};

const calculateYearBranch = (year) => {
  const baseYear = 1984; // 갑자년 기준  
  const yearDiff = year - baseYear;
  return (yearDiff % 12 + 12) % 12;
};

// 대운과 년운의 십신 관계 분석
const analyzeDaewoonYearRelation = (daewoonStem, yearStem, dayStem) => {
  const dayElement = getElement(heavenlyStems[dayStem]);
  const daewoonElement = getElement(heavenlyStems[daewoonStem]);
  const yearElement = getElement(heavenlyStems[yearStem]);
  
  // 대운과 년운의 상호작용
  const getDaewoonYearInteraction = (daewoonEl, yearEl) => {
    const relations = {
      '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
      '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
      '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
      '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
      '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
    };
    
    const relation = relations[daewoonEl];
    
    if (daewoonEl === yearEl) {
      return { type: '상합', strength: 90, desc: '대운과 년운이 같은 오행으로 매우 강한 에너지' };
    } else if (yearEl === relation.generates) {
      return { type: '상생', strength: 80, desc: '대운이 년운을 생하여 순조로운 흐름' };
    } else if (yearEl === relation.generatedBy) {
      return { type: '생입', strength: 70, desc: '년운이 대운을 생하여 도움을 받는 해' };
    } else if (yearEl === relation.destroys) {
      return { type: '상극', strength: 30, desc: '대운이 년운을 극하여 변화와 도전의 해' };
    } else if (yearEl === relation.destroyedBy) {
      return { type: '피극', strength: 20, desc: '년운이 대운을 극하여 어려움이 있는 해' };
    }
    
    return { type: '중성', strength: 50, desc: '평범한 운세의 해' };
  };
  
  return getDaewoonYearInteraction(daewoonElement, yearElement);
};

// 년운 십신 분석
const analyzeYearSipsin = (yearStem, dayStem) => {
  const dayElement = getElement(heavenlyStems[dayStem]);
  const yearElement = getElement(heavenlyStems[yearStem]);
  
  const sipsinRelations = {
    '목': {
      '목': { name: '비견', color: '#8b5cf6', fortune: '자립과 독립의 해', desc: '자신의 능력을 발휘하기 좋은 해' },
      '화': { name: '식상', color: '#10b981', fortune: '창작과 표현의 해', desc: '새로운 아이디어와 창의력이 빛나는 해' },
      '토': { name: '재성', color: '#f59e0b', fortune: '재물과 투자의 해', desc: '경제적 기회가 많고 재물운이 좋은 해' },
      '금': { name: '관성', color: '#ef4444', fortune: '책임과 지위의 해', desc: '승진이나 지위 상승의 기회가 있는 해' },
      '수': { name: '인성', color: '#3b82f6', fortune: '학습과 성장의 해', desc: '새로운 지식을 습득하고 발전하는 해' }
    },
    '화': {
      '화': { name: '비견', color: '#8b5cf6', fortune: '자립과 독립의 해', desc: '자신의 능력을 발휘하기 좋은 해' },
      '토': { name: '식상', color: '#10b981', fortune: '창작과 표현의 해', desc: '새로운 아이디어와 창의력이 빛나는 해' },
      '금': { name: '재성', color: '#f59e0b', fortune: '재물과 투자의 해', desc: '경제적 기회가 많고 재물운이 좋은 해' },
      '수': { name: '관성', color: '#ef4444', fortune: '책임과 지위의 해', desc: '승진이나 지위 상승의 기회가 있는 해' },
      '목': { name: '인성', color: '#3b82f6', fortune: '학습과 성장의 해', desc: '새로운 지식을 습득하고 발전하는 해' }
    },
    '토': {
      '토': { name: '비견', color: '#8b5cf6', fortune: '자립과 독립의 해', desc: '자신의 능력을 발휘하기 좋은 해' },
      '금': { name: '식상', color: '#10b981', fortune: '창작과 표현의 해', desc: '새로운 아이디어와 창의력이 빛나는 해' },
      '수': { name: '재성', color: '#f59e0b', fortune: '재물과 투자의 해', desc: '경제적 기회가 많고 재물운이 좋은 해' },
      '목': { name: '관성', color: '#ef4444', fortune: '책임과 지위의 해', desc: '승진이나 지위 상승의 기회가 있는 해' },
      '화': { name: '인성', color: '#3b82f6', fortune: '학습과 성장의 해', desc: '새로운 지식을 습득하고 발전하는 해' }
    },
    '금': {
      '금': { name: '비견', color: '#8b5cf6', fortune: '자립과 독립의 해', desc: '자신의 능력을 발휘하기 좋은 해' },
      '수': { name: '식상', color: '#10b981', fortune: '창작과 표현의 해', desc: '새로운 아이디어와 창의력이 빛나는 해' },
      '목': { name: '재성', color: '#f59e0b', fortune: '재물과 투자의 해', desc: '경제적 기회가 많고 재물운이 좋은 해' },
      '화': { name: '관성', color: '#ef4444', fortune: '책임과 지위의 해', desc: '승진이나 지위 상승의 기회가 있는 해' },
      '토': { name: '인성', color: '#3b82f6', fortune: '학습과 성장의 해', desc: '새로운 지식을 습득하고 발전하는 해' }
    },
    '수': {
      '수': { name: '비견', color: '#8b5cf6', fortune: '자립과 독립의 해', desc: '자신의 능력을 발휘하기 좋은 해' },
      '목': { name: '식상', color: '#10b981', fortune: '창작과 표현의 해', desc: '새로운 아이디어와 창의력이 빛나는 해' },
      '화': { name: '재성', color: '#f59e0b', fortune: '재물과 투자의 해', desc: '경제적 기회가 많고 재물운이 좋은 해' },
      '토': { name: '관성', color: '#ef4444', fortune: '책임과 지위의 해', desc: '승진이나 지위 상승의 기회가 있는 해' },
      '금': { name: '인성', color: '#3b82f6', fortune: '학습과 성장의 해', desc: '새로운 지식을 습득하고 발전하는 해' }
    }
  };
  
  return sipsinRelations[dayElement]?.[yearElement] || { 
    name: '중성', 
    color: '#6b7280', 
    fortune: '평범한 해', 
    desc: '특별한 변화 없이 평온한 해' 
  };
};

// 대운별 년운 분석
export const analyzeSewoon = (daewoons, birthYear, dayStem) => {
  const currentYear = new Date().getFullYear();
  
  return daewoons.map(daewoon => {
    const years = [];
    let bestWealthYear = null;
    let worstYear = null;
    let maxWealthScore = 0;
    let minOverallScore = 100;
    
    // 각 대운 기간의 년운 분석
    for (let age = daewoon.startAge; age <= daewoon.endAge; age++) {
      const year = parseInt(birthYear) + age - 1;
      const yearStemIdx = calculateYearStem(year);
      const yearBranchIdx = calculateYearBranch(year);
      const yearStem = heavenlyStems[yearStemIdx];
      const yearBranch = earthlyBranches[yearBranchIdx];
      
      // 대운과 년운의 상호작용 분석
      const daewoonStemIdx = heavenlyStems.indexOf(daewoon.stem);
      const interaction = analyzeDaewoonYearRelation(daewoonStemIdx, yearStemIdx, heavenlyStems.indexOf(heavenlyStems[dayStem]));
      
      // 년운 십신 분석
      const yearSipsin = analyzeYearSipsin(yearStemIdx, heavenlyStems.indexOf(heavenlyStems[dayStem]));
      
      // 종합 운세 점수 계산 (0-100)
      let overallScore = interaction.strength;
      
      // 재물운 점수 계산
      let wealthScore = 0;
      if (yearSipsin.name === '재성') {
        wealthScore = interaction.strength + 20;
        if (wealthScore > maxWealthScore) {
          maxWealthScore = wealthScore;
          bestWealthYear = { year, age, score: wealthScore, reason: `${yearSipsin.fortune} + ${interaction.desc}` };
        }
      }
      
      // 가장 힘든 해 찾기
      if (overallScore < minOverallScore) {
        minOverallScore = overallScore;
        worstYear = { year, age, score: overallScore, reason: `${yearSipsin.desc} + ${interaction.desc}` };
      }
      
      years.push({
        year,
        age,
        yearStem,
        yearBranch,
        yearPillar: yearStem + yearBranch,
        sipsin: yearSipsin,
        interaction,
        overallScore,
        wealthScore,
        isCurrent: year === currentYear
      });
    }
    
    return {
      ...daewoon,
      years,
      bestWealthYear,
      worstYear,
      averageScore: years.reduce((sum, y) => sum + y.overallScore, 0) / years.length
    };
  });
};

// 특정 년도의 상세 분석
export const getYearDetailAnalysis = (yearData, daewoonElement) => {
  const { sipsin, interaction, overallScore, wealthScore } = yearData;
  
  // 월별 세부 운세 (간략화)
  const monthlyFortune = [
    { month: '1-2월', desc: '새해 계획과 목표 설정의 시기' },
    { month: '3-4월', desc: '새로운 시작과 발전의 기운' },
    { month: '5-6월', desc: '활발한 활동과 성과의 시기' },
    { month: '7-8월', desc: '변화와 도전의 시기' },
    { month: '9-10월', desc: '수확과 결실의 시기' },
    { month: '11-12월', desc: '마무리와 정리의 시기' }
  ];
  
  return {
    summary: {
      overall: overallScore >= 70 ? '길한 해' : overallScore >= 40 ? '보통 해' : '주의가 필요한 해',
      wealth: wealthScore >= 70 ? '재물운 대길' : wealthScore >= 40 ? '재물운 보통' : '재물 관리 주의',
      health: overallScore >= 60 ? '건강 양호' : '건강 관리 필요',
      career: interaction.strength >= 60 ? '직업운 상승' : '신중한 판단 필요'
    },
    advice: {
      positive: sipsin.desc,
      caution: interaction.desc,
      action: getYearActionAdvice(sipsin.name, interaction.type)
    },
    monthlyFortune
  };
};

const getYearActionAdvice = (sipsinName, interactionType) => {
  const adviceMap = {
    '재성': {
      '상합': '투자와 사업 확장에 최적의 해입니다.',
      '상생': '새로운 수익원 개발에 좋은 해입니다.',
      '상극': '신중한 투자와 재정 관리가 필요합니다.',
      '중성': '꾸준한 저축과 안정적 투자를 권합니다.'
    },
    '관성': {
      '상합': '승진이나 이직에 최적의 시기입니다.',
      '상생': '새로운 책임을 맡기 좋은 해입니다.',
      '상극': '상급자와의 관계에 주의가 필요합니다.',
      '중성': '현재 위치에서 실력을 쌓는 것이 좋습니다.'
    },
    '인성': {
      '상합': '학습과 자기계발에 집중하세요.',
      '상생': '새로운 기술이나 지식 습득에 좋습니다.',
      '상극': '과도한 학습보다 실무에 집중하세요.',
      '중성': '꾸준한 자기계발을 유지하세요.'
    },
    '식상': {
      '상합': '창작 활동과 새로운 도전에 좋은 해입니다.',
      '상생': '아이디어를 현실로 만들기 좋은 시기입니다.',
      '상극': '너무 성급하게 진행하지 마세요.',
      '중성': '창의적 활동을 꾸준히 이어가세요.'
    },
    '비견': {
      '상합': '독립이나 창업을 고려해볼 만한 해입니다.',
      '상생': '동업이나 파트너십에 좋은 해입니다.',
      '상극': '경쟁이 치열할 수 있으니 신중하세요.',
      '중성': '자신의 영역을 차근차근 넓혀가세요.'
    }
  };
  
  return adviceMap[sipsinName]?.[interactionType] || '균형잡힌 마음으로 꾸준히 노력하세요.';
};