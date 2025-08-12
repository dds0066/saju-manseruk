import { heavenlyStems, earthlyBranches, solarTerms, termsToMonthJiji } from '../constants/sajuData';
import { getElement } from './characterAnalysis';

// 진태양황경 계산 (Python 코드와 완전 동일)
const calculateTrueSolarLongitude = (dt) => {
  // 2013년 1월 0일(2012년 12월 31일)를 기준으로 일수 차이 계산
  const baseDate = new Date(2012, 11, 31);
  const daysDiff = (dt - baseDate) / (24 * 60 * 60 * 1000);
  
  let L = 279.827287 + 0.98564736 * daysDiff;
  L = L % 360;
  
  let M = 356.666444 + 0.98560028 * daysDiff;
  M = M % 360;
  
  const MRad = M * Math.PI / 180;
  const E = 1.919 * Math.sin(MRad) + 0.020 * Math.sin(2 * MRad) - 0.005 * Math.sin(MRad);
  
  let trueLongitude = L + E;
  trueLongitude = trueLongitude % 360;
  if (trueLongitude < 0) trueLongitude += 360;
  
  return trueLongitude;
};

// 특정 년도의 절기 날짜 계산 (2진 검색)
const findSolarTermDate = (year, termName) => {
  const targetAngle = solarTerms[termName];
  if (!targetAngle) return null;
  
  // 절기 예상 월 계산
  const termsList = ['입춘', '우수', '경칩', '춘분', '청명', '곡우', '입하', '소만', '망종', '하지', '소서', '대서', '입추', '처서', '백로', '추분', '한로', '상강', '입동', '소설', '대설', '동지', '소한', '대한'];
  const termIndex = termsList.indexOf(termName);
  let monthEstimate = Math.floor(termIndex / 2) + 2; // 입춘=2월, 경칩=3월...
  if (monthEstimate > 12) monthEstimate -= 12;
  if (monthEstimate === 0) monthEstimate = 12;
  
  // 검색 범위 설정
  const startDate = new Date(year, monthEstimate - 1, 1);
  startDate.setDate(startDate.getDate() - 20);
  const endDate = new Date(year, monthEstimate - 1, 1);
  endDate.setDate(endDate.getDate() + 50);
  
  // 2진 검색
  let leftDate = startDate;
  let rightDate = endDate;
  
  for (let i = 0; i < 25; i++) {
    const midDate = new Date(leftDate.getTime() + (rightDate.getTime() - leftDate.getTime()) / 2);
    const midAngle = calculateTrueSolarLongitude(midDate);
    
    let angleDiff = Math.abs(midAngle - targetAngle);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;
    
    if (angleDiff < 0.001) return midDate;
    
    // 목표 각도가 더 크면 오른쪽, 작으면 왼쪽
    let needsLater = false;
    if (targetAngle > midAngle) {
      if (targetAngle - midAngle < 180) needsLater = true;
    } else {
      if (midAngle - targetAngle > 180) needsLater = true;
    }
    
    if (needsLater) {
      leftDate = midDate;
    } else {
      rightDate = midDate;
    }
  }
  
  return new Date(leftDate.getTime() + (rightDate.getTime() - leftDate.getTime()) / 2);
};

// 현재 월주 절기 찾기
const findPreviousSolarTerm = (birthSolarLongitude) => {
  const solarTermsList = [
    ['대한', 300], ['입춘', 315], ['우수', 330], ['경칩', 345],
    ['춘분', 0], ['청명', 15], ['곡우', 30], ['입하', 45],
    ['소만', 60], ['망종', 75], ['하지', 90], ['소서', 105],
    ['대서', 120], ['입추', 135], ['처서', 150], ['백로', 165],
    ['추분', 180], ['한로', 195], ['상강', 210], ['입동', 225],
    ['소설', 240], ['대설', 255], ['동지', 270], ['소한', 285]
  ];
  
  const normalizedLongitude = birthSolarLongitude % 360;
  let prevTermName = null;
  let prevTermAngle = -1;

  if (normalizedLongitude < 15) {
    // 춘분점 근처 특별 처리
    for (const [termName, angle] of solarTermsList) {
      if (angle === 345) { // 경칩
        prevTermName = termName;
        prevTermAngle = angle;
        break;
      }
    }
  } else {
    for (const [termName, angle] of solarTermsList) {
      if (angle <= normalizedLongitude && angle > prevTermAngle) {
        prevTermName = termName;
        prevTermAngle = angle;
      }
    }
  }

  if (!prevTermName) {
    const maxAngle = Math.max(...solarTermsList.map(([, angle]) => angle));
    for (const [termName, angle] of solarTermsList) {
      if (angle === maxAngle) {
        prevTermName = termName;
        break;
      }
    }
  }

  return [prevTermName, prevTermAngle];
};

// 정확한 대운 계산 함수 (파이썬 코드와 완전 동일) - 디버그 추가
export const calculateDaewoonAccurate = (birthDate, gender, birthHour, birthMinute, monthCheongan, monthJiji, yearCheongan) => {
  console.log('=== calculateDaewoonAccurate 디버그 시작 ===');
  
  // birthDate를 Date 객체로 변환
  let dateObj;
  if (birthDate instanceof Date) {
    dateObj = birthDate;
  } else if (typeof birthDate === 'string') {
    dateObj = new Date(birthDate);
  } else if (birthDate && typeof birthDate === 'object') {
    // birthDate가 객체인 경우 (year, month, day 속성 등)
    if (birthDate.year && birthDate.month && birthDate.day) {
      dateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
    } else {
      dateObj = new Date(birthDate);
    }
  } else {
    console.error('잘못된 birthDate 형식:', birthDate);
    dateObj = new Date(); // 기본값
  }
  
  console.log('입력 매개변수:', {
    birthDate: birthDate,
    birthDateType: typeof birthDate,
    convertedDate: dateObj.toLocaleDateString('ko-KR'),
    gender,
    birthHour,
    birthMinute,
    monthCheongan: `${monthCheongan} (${heavenlyStems[monthCheongan]})`,
    monthJiji: `${monthJiji} (${earthlyBranches[monthJiji]})`,
    yearCheongan: `${yearCheongan} (${heavenlyStems[yearCheongan]})`
  });

  // 대운 방향 결정 - 파이썬과 동일
  const isYangYear = yearCheongan % 2 === 0; // 甲丙戊庚壬은 양간 (인덱스 0,2,4,6,8)
  const isMale = gender === 'male';
  const direction = (isYangYear && isMale) || (!isYangYear && !isMale) ? '순행' : '역행';
  
  console.log('대운 방향 계산:', {
    isYangYear,
    isMale,
    direction
  });

  const birthDateTime = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), birthHour, birthMinute);
  console.log('출생일시:', birthDateTime.toLocaleString('ko-KR'));

  // 현재 월주 절기 찾기 - 파이썬과 동일
  const birthSol = calculateTrueSolarLongitude(birthDateTime);
  const [currentTerm] = findPreviousSolarTerm(birthSol);
  const currentMonthIdx = termsToMonthJiji[currentTerm];
  
  console.log('절기 정보:', {
    birthSolarLongitude: birthSol.toFixed(2),
    currentTerm,
    currentMonthIdx
  });

  // 다음 월주 경계 절기까지의 정확한 일수 계산 - 파이썬과 동일
  const candidates = [];
  for (const termName of Object.keys(solarTerms)) {
    // 파이썬: for year in (birth_date.year, birth_date.year + 1)
    for (const checkYear of [birthDate.getFullYear(), birthDate.getFullYear() + 1]) {
      const termDt = findSolarTermDate(checkYear, termName);
      if (termDt && termDt > birthDateTime) {
        const monthIdx = termsToMonthJiji[termName];
        candidates.push([termDt, monthIdx]);
      }
    }
  }
  
  // 파이썬: candidates.sort(key=lambda x: x[0])
  candidates.sort((a, b) => a[0] - b[0]);
  
  console.log('다음 절기 후보들 (처음 5개):', candidates.slice(0, 5).map(([dt, mi]) => ({
    date: dt.toLocaleDateString('ko-KR'),
    monthIdx: mi
  })));

  let nextBoundaryDt = null;
  // 파이썬: for dt, mi in candidates: if mi != current_month_idx:
  for (const [dt, mi] of candidates) {
    if (mi !== currentMonthIdx) {
      nextBoundaryDt = dt;
      console.log('다음 월주 경계 절기 찾음:', {
        date: dt.toLocaleDateString('ko-KR'),
        monthIdx: mi,
        currentMonthIdx
      });
      break;
    }
  }
  
  // 파이썬: if next_boundary_dt is None and candidates:
  if (!nextBoundaryDt && candidates.length > 0) {
    nextBoundaryDt = candidates[0][0];
    console.log('월주 경계 못찾아서 첫 번째 후보 사용:', nextBoundaryDt.toLocaleDateString('ko-KR'));
  }

  // 파이썬 코드와 완전 동일한 3일법 적용
  // 파이썬: days = (next_boundary_dt - birth_dt).total_seconds() / 86400.0
  let days;
  if (nextBoundaryDt) {
    days = (nextBoundaryDt - birthDateTime) / (24 * 60 * 60 * 1000);
  } else {
    days = 18.5; // 기본값
  }
  
  console.log('3일법 계산:', {
    nextBoundaryDate: nextBoundaryDt ? nextBoundaryDt.toLocaleDateString('ko-KR') : 'null',
    days: days.toFixed(2),
    birthDateTime: birthDateTime.toLocaleDateString('ko-KR')
  });
  
  // 파이썬: start_age = max(1, int(days / 3))
  // 주의: 파이썬에서 int()는 0에 가까운 방향으로 버림 (양수에서는 Math.floor와 같음)
  const startAge = Math.max(1, Math.floor(days / 3));
  
  console.log('대운 시작 연령 계산:', {
    daysDiv3: (days / 3).toFixed(2),
    floorResult: Math.floor(days / 3),
    startAge
  });

  // 첫 대운 간지 결정 - 파이썬과 동일
  let firstJiji, firstCheongan;
  if (direction === '순행') {
    // 파이썬: first_jiji = (month_jiji + 1) % 12
    firstJiji = (monthJiji + 1) % 12;
    // 파이썬: first_cheongan = (month_cheongan + 1) % 10
    firstCheongan = (monthCheongan + 1) % 10;
  } else {
    // 파이썬: first_jiji = (month_jiji - 1) % 12
    firstJiji = (monthJiji - 1 + 12) % 12;
    // 파이썬: first_cheongan = (month_cheongan - 1) % 10
    firstCheongan = (monthCheongan - 1 + 10) % 10;
  }
  
  console.log('첫 대운 간지:', {
    direction,
    firstCheongan: `${firstCheongan} (${heavenlyStems[firstCheongan]})`,
    firstJiji: `${firstJiji} (${earthlyBranches[firstJiji]})`,
    firstPillar: heavenlyStems[firstCheongan] + earthlyBranches[firstJiji]
  });

  // 8개 대운 생성 - 파이썬과 동일
  const daewoons = [];
  let cg = firstCheongan;
  let jg = firstJiji;
  
  for (let i = 0; i < 8; i++) {
    // 파이썬: age_s = start_age + i * 10
    const ageStart = startAge + i * 10;
    const ageEnd = ageStart + 9;
    // 파이썬: daewoon['시작년도'] = birth_date.year + age_s
    const yearStart = birthDate.getFullYear() + ageStart;
    const yearEnd = birthDate.getFullYear() + ageEnd;
    
    const stem = heavenlyStems[cg];
    const branch = earthlyBranches[jg];
    const pillar = stem + branch;
    const element = getElement(stem);
    
    // 한자 표기
    const hanjaCheongan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const hanjaJiji = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const hanja = hanjaCheongan[cg] + hanjaJiji[jg];
    
    // 대운의 특성 설명
    const getFortuneDescription = (element) => {
      const descriptions = {
        '목': `성장과 발전의 시기입니다. 새로운 도전과 창의적 활동에 유리하며, 학습과 계획 수립에 좋은 때입니다.`,
        '화': `활발하고 열정적인 시기입니다. 사회적 활동과 리더십 발휘에 좋으며, 적극적인 행동이 성과를 가져옵니다.`,
        '토': `안정과 축적의 시기입니다. 기반을 다지고 신뢰를 쌓는 데 유리하며, 꾸준한 노력이 결실을 맺습니다.`,
        '금': `정리와 완성의 시기입니다. 계획을 실행하고 성과를 거두기 좋으며, 결단력 있는 행동이 중요합니다.`,
        '수': `학습과 지혜의 시기입니다. 연구, 공부, 내적 성장에 유리하며, 신중한 판단력이 빛을 발합니다.`
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
      description: getFortuneDescription(element),
      hanja: hanja
    });
    
    // 다음 대운 계산 - 파이썬과 동일
    if (direction === '순행') {
      // 파이썬: cg = (cg + 1) % 10, jg = (jg + 1) % 12
      cg = (cg + 1) % 10;
      jg = (jg + 1) % 12;
    } else {
      // 파이썬: cg = (cg - 1) % 10, jg = (jg - 1) % 12
      cg = (cg - 1 + 10) % 10;
      jg = (jg - 1 + 12) % 12;
    }
  }
  
  console.log('생성된 대운들 (처음 3개):', daewoons.slice(0, 3).map(dw => ({
    order: dw.order,
    pillar: dw.pillar,
    startAge: dw.startAge,
    endAge: dw.endAge
  })));
  
  console.log('=== calculateDaewoonAccurate 디버그 완료 ===\n');

  // 성별에 따른 운의 흐름 특성
  let genderFortuneFlow = "";
  if (isMale) {
    genderFortuneFlow = isYangYear 
      ? "양간년 男命(남명): 양적 기운이 강하여 적극적인 운세 흐름을 보입니다. 대운 순행."
      : "음간년 男命(남명): 음적 기운이 강하여 내면적인 운세 흐름을 보입니다. 대운 역행.";
  } else {
    genderFortuneFlow = isYangYear
      ? "양간년 女命(여명): 양적 기운이 강하여 활동적인 운세 흐름을 보입니다. 대운 역행."
      : "음간년 女命(여명): 음적 기운이 강하여 부드러운 운세 흐름을 보입니다. 대운 순행.";
  }

  return {
    direction: direction,
    startAge: startAge,
    daysTillNextTerm: Math.round(days * 10) / 10,
    nextTermDate: nextBoundaryDt ? nextBoundaryDt.toLocaleDateString('ko-KR') : '계산중',
    genderFortuneFlow: genderFortuneFlow,
    daewoons: daewoons,
    debugInfo: {
      birthSolarLongitude: birthSol,
      currentTerm: currentTerm,
      currentMonthIdx: currentMonthIdx,
      nextBoundaryDate: nextBoundaryDt ? nextBoundaryDt.toISOString() : null,
      daysToNextTerm: days,
      isYangYear: isYangYear,
      isMale: isMale,
      monthCheongan: monthCheongan,
      monthJiji: monthJiji,
      firstCheongan: firstCheongan,
      firstJiji: firstJiji,
      calculatedDirection: direction
    }
  };
};

// 현재 대운 찾기
export const findCurrentDaewoon = (daewoons, currentAge) => {
  return daewoons.find(dw => currentAge >= dw.startAge && currentAge <= dw.endAge);
};

// 대운과 일간의 십신 관계 분석
export const analyzeDaewoonRelation = (daewoonElement, birthElement) => {
  const relations = {
    '목': { generates: '화', destroys: '토', generatedBy: '수', destroyedBy: '금' },
    '화': { generates: '토', destroys: '금', generatedBy: '목', destroyedBy: '수' },
    '토': { generates: '금', destroys: '수', generatedBy: '화', destroyedBy: '목' },
    '금': { generates: '수', destroys: '목', generatedBy: '토', destroyedBy: '화' },
    '수': { generates: '목', destroys: '화', generatedBy: '금', destroyedBy: '토' }
  };
  
  const relation = relations[birthElement];
  
  if (daewoonElement === birthElement) {
    return { 
      type: '비견', 
      color: '#8b5cf6', 
      desc: '자립과 독립, 경쟁의 시기',
      advice: '자신감을 가지고 독립적으로 행동하되, 과도한 경쟁은 피하는 것이 좋습니다.'
    };
  } else if (daewoonElement === relation.generates) {
    return { 
      type: '식상', 
      color: '#10b981', 
      desc: '창작과 표현, 자식운의 시기',
      advice: '창의적인 활동과 자기표현에 집중하면 좋은 성과를 얻을 수 있습니다.'
    };
  } else if (daewoonElement === relation.generatedBy) {
    return { 
      type: '인성', 
      color: '#3b82f6', 
      desc: '학습과 성장, 도움의 시기',
      advice: '새로운 지식을 습득하고 멘토나 스승의 가르침을 받기 좋은 시기입니다.'
    };
  } else if (daewoonElement === relation.destroys) {
    return { 
      type: '재성', 
      color: '#f59e0b', 
      desc: '재물과 물질, 배우자운의 시기',
      advice: '재정 관리에 신경쓰고 투자나 사업 기회를 잘 활용하면 좋습니다.'
    };
  } else if (daewoonElement === relation.destroyedBy) {
    return { 
      type: '관성', 
      color: '#ef4444', 
      desc: '지위와 명예, 책임의 시기',
      advice: '책임감을 가지고 성실히 임무를 수행하면 지위 상승의 기회가 있습니다.'
    };
  }
  
  return { 
    type: '기타', 
    color: '#6b7280', 
    desc: '중성적인 시기',
    advice: '균형잡힌 마음으로 꾸준히 노력하는 것이 중요합니다.'
  };
};