import { heavenlyStems, earthlyBranches } from '../constants/sajuData';
import { getElement } from './characterAnalysis';

// 대운 계산 함수
export const calculateDaewoon = (birthYear, gender, dayStem, monthStem, monthBranch) => {
  const baseYear = parseInt(birthYear);
  const yearStemIdx = heavenlyStems.indexOf(dayStem);
  const isYangYear = yearStemIdx % 2 === 0;
  const isMale = gender === 'male';
  
  // 대운 순행/역행 결정
  const direction = (isYangYear && isMale) || (!isYangYear && !isMale) ? '순행' : '역행';
  
  // 대운 시작 나이 (간단 계산)
  const startAge = 7;
  
  // 첫 대운 간지 계산
  const monthStemIdx = heavenlyStems.indexOf(monthStem);
  const monthBranchIdx = earthlyBranches.indexOf(monthBranch);
  
  let firstStemIdx, firstBranchIdx;
  if (direction === '순행') {
    firstStemIdx = (monthStemIdx + 1) % 10;
    firstBranchIdx = (monthBranchIdx + 1) % 12;
  } else {
    firstStemIdx = (monthStemIdx - 1 + 10) % 10;
    firstBranchIdx = (monthBranchIdx - 1 + 12) % 12;
  }
  
  // 8개 대운 생성
  const daewoons = [];
  let currentStemIdx = firstStemIdx;
  let currentBranchIdx = firstBranchIdx;
  
  for (let i = 0; i < 8; i++) {
    const ageStart = startAge + i * 10;
    const ageEnd = ageStart + 9;
    const yearStart = baseYear + ageStart;
    const yearEnd = baseYear + ageEnd;
    
    const stem = heavenlyStems[currentStemIdx];
    const branch = earthlyBranches[currentBranchIdx];
    const pillar = stem + branch;
    const element = getElement(stem);
    
    // 대운의 특성 설명
    const getFortuneDescription = (element, order) => {
      const descriptions = {
        '목': `성장과 발전의 시기. 새로운 도전과 창의적 활동에 유리합니다.`,
        '화': `활발하고 열정적인 시기. 사회적 활동과 리더십 발휘에 좋습니다.`,
        '토': `안정과 축적의 시기. 기반을 다지고 신뢰를 쌓는 데 유리합니다.`,
        '금': `정리와 완성의 시기. 계획을 실행하고 성과를 거두기 좋습니다.`,
        '수': `학습과 지혜의 시기. 연구, 공부, 내적 성장에 유리합니다.`
      };
      return descriptions[element] || '균형잡힌 운세가 예상됩니다.';
    };
    
    daewoons.push({
      order: i + 1,
      pillar: pillar,
      stem: stem,
      branch: branch,
      element: element,
      startAge: ageStart,
      endAge: ageEnd,
      startYear: yearStart,
      endYear: yearEnd,
      description: getFortuneDescription(element, i + 1),
      isCurrentDaewoon: false // 나중에 현재 나이 계산해서 설정
    });
    
    // 다음 대운 계산
    if (direction === '순행') {
      currentStemIdx = (currentStemIdx + 1) % 10;
      currentBranchIdx = (currentBranchIdx + 1) % 12;
    } else {
      currentStemIdx = (currentStemIdx - 1 + 10) % 10;
      currentBranchIdx = (currentBranchIdx - 1 + 12) % 12;
    }
  }
  
  return {
    direction,
    startAge,
    daewoons
  };
};

// 현재 대운 찾기
export const findCurrentDaewoon = (daewoons, currentAge) => {
  return daewoons.find(dw => currentAge >= dw.startAge && currentAge <= dw.endAge);
};

// 대운 해석
export const interpretDaewoon = (daewoon, birthElement) => {
  const { element } = daewoon;
  
  // 상생/상극 관계
  const relationships = {
    '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
    '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
    '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
    '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
    '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
  };
  
  const relation = relationships[birthElement];
  let relationshipType = '보통';
  let advice = '';
  
  if (element === birthElement) {
    relationshipType = '비견';
    advice = '자신과 같은 오행으로 경쟁과 동시에 도움이 되는 시기입니다.';
  } else if (element === relation.generates) {
    relationshipType = '식상';
    advice = '자신의 에너지를 발산하는 시기로 창작과 표현에 유리합니다.';
  } else if (element === relation.generatedBy) {
    relationshipType = '인성';
    advice = '도움과 지원을 받기 쉬운 시기로 학습과 성장에 좋습니다.';
  } else if (element === relation.destroys) {
    relationshipType = '재성';
    advice = '재물과 관련된 기회가 많은 시기이지만 신중함이 필요합니다.';
  } else if (element === relation.destroyedBy) {
    relationshipType = '관성';
    advice = '규율과 책임이 따르는 시기로 자제력과 인내가 중요합니다.';
  }
  
  return {
    relationshipType,
    advice
  };
};