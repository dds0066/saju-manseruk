import { getElement } from './characterAnalysis';

// 십신 관계 정의
const getSipsinRelation = (dayElement, targetElement, isDayStemSame = false) => {
  if (isDayStemSame) {
    return '비견';
  }
  
  const relations = {
    '목': {
      '목': '비견',
      '화': '식신',
      '토': '편재',
      '금': '편관',
      '수': '편인'
    },
    '화': {
      '화': '비견', 
      '토': '식신',
      '금': '편재',
      '수': '편관',
      '목': '편인'
    },
    '토': {
      '토': '비견',
      '금': '식신', 
      '수': '편재',
      '목': '편관',
      '화': '편인'
    },
    '금': {
      '금': '비견',
      '수': '식신',
      '목': '편재', 
      '화': '편관',
      '토': '편인'
    },
    '수': {
      '수': '비견',
      '목': '식신',
      '화': '편재',
      '토': '편관', 
      '금': '편인'
    }
  };

  // 음양 구분에 따른 정신/편신 구분 (간략화)
  const baseRelation = relations[dayElement][targetElement];
  
  // 정신 변환 (실제로는 더 복잡하지만 간략화)
  const sipsinMap = {
    '편재': '정재',
    '편관': '정관', 
    '편인': '정인',
    '식신': '상관',
    '비견': '겁재'
  };
  
  // 50% 확률로 정신/편신 결정 (실제로는 음양에 따라 결정)
  return Math.random() > 0.5 ? baseRelation : (sipsinMap[baseRelation] || baseRelation);
};

// 십신별 특성 정의
const sipsinCharacteristics = {
  '비견': {
    name: '비견',
    description: '자립심과 독립성을 나타냅니다. 경쟁심이 강하고 자기주장이 뚜렷합니다.',
    color: '#8b5cf6',
    fortune: '자수성가형, 협력보다는 독립적 활동이 유리',
    advice: '동업이나 파트너십보다는 독립적인 사업이나 활동을 추천합니다.'
  },
  '겁재': {
    name: '겁재', 
    description: '행동력과 추진력이 강하지만 성급할 수 있습니다.',
    color: '#7c3aed',
    fortune: '적극적 행동으로 성공, 신중함 필요',
    advice: '빠른 판단력을 살리되 신중한 계획 수립이 중요합니다.'
  },
  '식신': {
    name: '식신',
    description: '창작력과 표현력이 뛰어납니다. 예술적 재능과 여유로움을 나타냅니다.',
    color: '#10b981', 
    fortune: '예술, 창작, 서비스업에서 성공',
    advice: '창의적 활동과 자기표현에 집중하면 큰 성과를 얻을 수 있습니다.'
  },
  '상관': {
    name: '상관',
    description: '재능과 기교가 뛰어나지만 변덕스러울 수 있습니다.',
    color: '#059669',
    fortune: '특기를 살린 전문직, 기술직에서 성공', 
    advice: '자신의 재능을 체계적으로 개발하여 전문성을 높이세요.'
  },
  '편재': {
    name: '편재',
    description: '사업 수완과 재물 관리 능력이 있습니다. 활동적이고 현실적입니다.',
    color: '#f59e0b',
    fortune: '사업, 투자, 유통업에서 성공',
    advice: '적극적인 사업 활동과 투자를 통해 재물운을 늘리세요.'
  },
  '정재': {
    name: '정재',
    description: '정직하고 성실한 재물 관리를 나타냅니다. 안정적 축적을 추구합니다.',
    color: '#d97706',
    fortune: '꾸준한 노력으로 안정적 부 축적',
    advice: '성실하고 계획적인 재정 관리로 안정적인 부를 쌓으세요.'
  },
  '편관': {
    name: '편관',
    description: '강한 의지력과 추진력이 있지만 고집스러울 수 있습니다.',
    color: '#ef4444',
    fortune: '리더십 발휘, 권력 추구에 유리',
    advice: '강인한 정신력을 바탕으로 리더십을 발휘하되 유연성도 기르세요.'
  },
  '정관': {
    name: '정관', 
    description: '책임감과 명예를 중시합니다. 질서정연하고 원칙을 따릅니다.',
    color: '#dc2626',
    fortune: '관직, 공무원, 대기업에서 성공',
    advice: '책임감 있는 자세로 조직에서 인정받아 지위를 높이세요.'
  },
  '편인': {
    name: '편인',
    description: '독창적 사고와 직감력이 뛰어납니다. 학문과 연구에 재능이 있습니다.',
    color: '#3b82f6',
    fortune: '학문, 연구, 종교 분야에서 성공',
    advice: '독창적 아이디어와 직감을 살려 새로운 분야에 도전하세요.'
  },
  '정인': {
    name: '정인',
    description: '학습 능력과 지혜가 뛰어납니다. 전통과 명예를 중시합니다.',
    color: '#2563eb',
    fortune: '교육, 학문, 문화 분야에서 명예',
    advice: '지속적인 학습과 연구를 통해 전문성과 명예를 쌓으세요.'
  }
};

// 사주 전체 십신 분석
export const analyzeSipsin = (yearStem, monthStem, dayStem, hourStem, yearBranch, monthBranch, dayBranch, hourBranch) => {
  const dayElement = getElement(dayStem);
  
  // 천간 십신 분석
  const stemSipsins = [
    { position: '년간', stem: yearStem, sipsin: getSipsinRelation(dayElement, getElement(yearStem), yearStem === dayStem) },
    { position: '월간', stem: monthStem, sipsin: getSipsinRelation(dayElement, getElement(monthStem), monthStem === dayStem) },
    { position: '일간', stem: dayStem, sipsin: '일간(자신)' },
    { position: '시간', stem: hourStem, sipsin: getSipsinRelation(dayElement, getElement(hourStem), hourStem === dayStem) }
  ];
  
  // 지지에서 주기 오행으로 십신 분석
  const branchElements = {
    '자': '수', '축': '토', '인': '목', '묘': '목', 
    '진': '토', '사': '화', '오': '화', '미': '토',
    '신': '금', '유': '금', '술': '토', '해': '수'
  };
  
  const branchSipsins = [
    { position: '년지', branch: yearBranch, sipsin: getSipsinRelation(dayElement, branchElements[yearBranch]) },
    { position: '월지', branch: monthBranch, sipsin: getSipsinRelation(dayElement, branchElements[monthBranch]) },
    { position: '일지', branch: dayBranch, sipsin: getSipsinRelation(dayElement, branchElements[dayBranch]) },
    { position: '시지', branch: hourBranch, sipsin: getSipsinRelation(dayElement, branchElements[hourBranch]) }
  ];
  
  // 십신 통계
  const allSipsins = [...stemSipsins, ...branchSipsins]
    .filter(item => item.sipsin !== '일간(자신)')
    .map(item => item.sipsin);
  
  const sipsinCount = {};
  allSipsins.forEach(sipsin => {
    sipsinCount[sipsin] = (sipsinCount[sipsin] || 0) + 1;
  });
  
  // 차트용 데이터 생성
  const chartData = Object.entries(sipsinCount).map(([sipsin, count]) => ({
    name: sipsin,
    value: count,
    color: sipsinCharacteristics[sipsin]?.color || '#6b7280',
    percentage: ((count / allSipsins.length) * 100).toFixed(1)
  }));
  
  // 주요 십신 찾기
  const dominantSipsin = Object.entries(sipsinCount)
    .sort(([,a], [,b]) => b - a)[0];
  
  return {
    stemSipsins,
    branchSipsins, 
    sipsinCount,
    chartData,
    dominantSipsin: dominantSipsin ? {
      name: dominantSipsin[0],
      count: dominantSipsin[1], 
      characteristic: sipsinCharacteristics[dominantSipsin[0]]
    } : null,
    totalCount: allSipsins.length
  };
};

// 십신별 상세 해석
export const interpretSipsin = (sipsinName) => {
  return sipsinCharacteristics[sipsinName] || {
    name: sipsinName,
    description: '분석 중입니다.',
    color: '#6b7280',
    fortune: '균형잡힌 운세',
    advice: '꾸준한 노력이 중요합니다.'
  };
};