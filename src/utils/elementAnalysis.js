import { getElement } from './characterAnalysis';

// 지장간 정보
const branchElements = {
  '자': { main: '수', hidden: ['계'] },
  '축': { main: '토', hidden: ['계', '신', '기'] },
  '인': { main: '목', hidden: ['갑', '병', '무'] },
  '묘': { main: '목', hidden: ['을'] },
  '진': { main: '토', hidden: ['을', '계', '기'] },
  '사': { main: '화', hidden: ['병', '무', '경'] },
  '오': { main: '화', hidden: ['정', '기'] },
  '미': { main: '토', hidden: ['정', '을', '기'] },
  '신': { main: '금', hidden: ['경', '임', '무'] },
  '유': { main: '금', hidden: ['신'] },
  '술': { main: '토', hidden: ['신', '정', '무'] },
  '해': { main: '수', hidden: ['임', '갑'] }
};

// 지장간을 포함한 오행 분석
export const analyzeElementsWithHidden = (yearStem, monthStem, dayStem, hourStem, yearBranch, monthBranch, dayBranch, hourBranch) => {
  const elementCount = {
    '목': 0,
    '화': 0,
    '토': 0,
    '금': 0,
    '수': 0
  };
  
  // 천간 오행 (각각 1점)
  const stems = [yearStem, monthStem, dayStem, hourStem];
  stems.forEach(stem => {
    const element = getElement(stem);
    elementCount[element] += 1;
  });
  
  // 지지 오행 (본기 1점, 지장간 0.5점씩)
  const branches = [yearBranch, monthBranch, dayBranch, hourBranch];
  branches.forEach(branch => {
    const branchInfo = branchElements[branch];
    if (branchInfo) {
      // 본기 (주요 오행)
      elementCount[branchInfo.main] += 1;
      
      // 지장간 (숨은 오행들)
      branchInfo.hidden.forEach(hiddenStem => {
        const hiddenElement = getElement(hiddenStem);
        elementCount[hiddenElement] += 0.5;
      });
    }
  });
  
  // 총점 계산
  const totalPoints = Object.values(elementCount).reduce((sum, count) => sum + count, 0);
  
  // 백분율 계산
  const elementPercentage = {};
  Object.keys(elementCount).forEach(element => {
    elementPercentage[element] = Math.round((elementCount[element] / totalPoints) * 100);
  });
  
  return {
    elementCount,
    elementPercentage,
    totalPoints,
    analysis: analyzeBalanceWithTheory(elementCount, dayStem, monthBranch)
  };
};

// 용신론과 격국론을 접목한 고급 분석
const analyzeBalanceWithTheory = (elementCount, dayStem, monthBranch) => {
  const dayElement = getElement(dayStem);
  const dayElementCount = elementCount[dayElement];
  const monthElement = branchElements[monthBranch]?.main || '토';
  
  // 신강/신약 판단
  let bodyStrength = '';
  let usefulGod = ''; // 용신
  let avoidGod = '';  // 기신
  let recommendation = '';
  
  if (dayElementCount >= 3) {
    bodyStrength = '身旺 (신왕) - 일간이 강함';
    
    // 신왕일 때는 설기하는 오행이 용신
    const relations = getElementRelations();
    usefulGod = relations.상생[dayElement]; // 일간이 생하는 오행 (식상)
    avoidGod = relations.상극역방향[dayElement]; // 일간을 생하는 오행 (인성)
    
    recommendation = `일간이 강하므로 ${usefulGod}(식상)이나 ${getCounterElement(dayElement)}(재성), ${relations.상극[dayElement]}(관성)이 유리합니다. 적극적인 활동과 창작, 사업에 집중하세요.`;
    
  } else if (dayElementCount <= 1.5) {
    bodyStrength = '身弱 (신약) - 일간이 약함';
    
    // 신약일 때는 부조하는 오행이 용신
    const relations = getElementRelations();
    usefulGod = relations.상극역방향[dayElement]; // 일간을 생하는 오행 (인성)
    avoidGod = relations.상생[dayElement]; // 일간이 생하는 오행 (식상)
    
    recommendation = `일간이 약하므로 ${usefulGod}(인성)이나 ${dayElement}(비견)이 유리합니다. 학습과 도움을 받는 것에 집중하고, 무리한 도전은 피하세요.`;
    
  } else {
    bodyStrength = '中和 (중화) - 균형이 잡힌 상태';
    usefulGod = '균형 유지';
    avoidGod = '극단적 편중';
    recommendation = '오행이 적절히 균형잡혀 있어 안정적입니다. 현 상태를 유지하며 꾸준한 노력을 하세요.';
  }
  
  // 격국 분석 (월지 기준)
  const pattern = analyzePattern(dayElement, monthElement, elementCount);
  
  // 부족한 오행과 과한 오행 찾기
  const sortedElements = Object.entries(elementCount).sort((a, b) => b[1] - a[1]);
  const strongestElement = sortedElements[0];
  const weakestElement = sortedElements[4];
  
  return {
    bodyStrength,
    usefulGod,
    avoidGod,
    recommendation,
    pattern,
    strongestElement: {
      element: strongestElement[0],
      count: strongestElement[1]
    },
    weakestElement: {
      element: weakestElement[0],
      count: weakestElement[1]
    },
    dayElementStrength: dayElementCount,
    monthElement
  };
};

// 격국 분석
const analyzePattern = (dayElement, monthElement, elementCount) => {
  const relations = getElementRelations();
  
  if (monthElement === dayElement) {
    return {
      name: '建祿格 (건록격)',
      description: '월지와 일간이 같은 오행으로 자립심이 강하고 독립적인 성향',
      fortune: '자수성가형, 꾸준한 노력으로 성공'
    };
  }
  
  if (monthElement === relations.상극역방향[dayElement]) {
    return {
      name: '正印格 (정인격)', 
      description: '월지가 일간을 생하는 관계로 학문과 지혜를 중시',
      fortune: '학자형, 정신적 성취와 명예'
    };
  }
  
  if (monthElement === relations.상생[dayElement]) {
    return {
      name: '食神格 (식신격)',
      description: '일간이 월지를 생하는 관계로 창작과 표현력이 뛰어남',
      fortune: '예술가형, 창의적 활동으로 성공'
    };
  }
  
  if (monthElement === getCounterElement(dayElement)) {
    return {
      name: '正財格 (정재격)',
      description: '일간이 월지를 극하는 관계로 재물운이 좋음',
      fortune: '사업가형, 실용적 능력으로 부를 축적'
    };
  }
  
  if (monthElement === relations.상극[dayElement]) {
    return {
      name: '正官格 (정관격)',
      description: '월지가 일간을 극하는 관계로 리더십과 책임감이 강함',
      fortune: '관료형, 조직에서의 성공과 명예'
    };
  }
  
  return {
    name: '雜格 (잡격)',
    description: '특별한 격국을 이루지 않는 일반적인 명조',
    fortune: '다방면의 재능을 고루 발휘하는 타입'
  };
};

// 오행 상생상극 관계
const getElementRelations = () => {
  return {
    상생: {
      '목': '화',
      '화': '토', 
      '토': '금',
      '금': '수',
      '수': '목'
    },
    상극: {
      '목': '토',
      '화': '금',
      '토': '수',
      '금': '목',
      '수': '화'
    },
    상극역방향: {
      '목': '수',
      '화': '목',
      '토': '화',
      '금': '토',
      '수': '금'
    }
  };
};

// 대응 오행 (재성 관계)
const getCounterElement = (element) => {
  const counter = {
    '목': '토',
    '화': '금',
    '토': '수',
    '금': '목',
    '수': '화'
  };
  return counter[element];
};

// 오행별 색상 (오각형 그래프용)
export const getElementColors = () => {
  return {
    '목': '#10b981', // 초록
    '화': '#ef4444', // 빨강
    '토': '#f59e0b', // 노랑
    '금': '#6b7280', // 회색 (실제로는 흰색/은색 느낌)
    '수': '#3b82f6'  // 파랑
  };
};

// 오각형 그래프 데이터 생성
export const generatePentagonChartData = (elementCount) => {
  const maxValue = Math.max(...Object.values(elementCount));
  const normalizedData = [];
  
  // 오각형 순서: 목(동) → 화(남) → 토(중앙) → 금(서) → 수(북)
  const elementOrder = ['목', '화', '토', '금', '수'];
  
  elementOrder.forEach(element => {
    normalizedData.push({
      element,
      value: elementCount[element] || 0,
      percentage: Math.round((elementCount[element] / (maxValue || 1)) * 100),
      color: getElementColors()[element]
    });
  });
  
  return normalizedData;
};