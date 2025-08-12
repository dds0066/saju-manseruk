// 오행 분석
export const getElement = (stem) => {
  const elementMap = {
    '갑': '목', '을': '목', '병': '화', '정': '화',
    '무': '토', '기': '토', '경': '금', '신': '금',
    '임': '수', '계': '수'
  };
  return elementMap[stem] || '토';
};

// 천간 성격 분석
export const getStemCharacter = (stem) => {
  const stemData = {
    '갑': { 
      nature: '양목', 
      character: '큰 나무처럼 곧고 의로운 성격. 리더십이 강하고 정의감이 투철합니다.', 
      strength: '추진력, 정의감, 리더십', 
      weakness: '고집, 융통성 부족' 
    },
    '을': { 
      nature: '음목', 
      character: '꽃이나 풀처럼 유연하고 아름다운 성격. 예술적 감각이 뛰어납니다.', 
      strength: '유연성, 예술성, 감수성', 
      weakness: '우유부단, 의존성' 
    },
    '병': { 
      nature: '양화', 
      character: '태양처럼 밝고 활발한 성격. 열정적이고 사교성이 좋습니다.', 
      strength: '열정, 사교성, 창의성', 
      weakness: '성급함, 변덕' 
    },
    '정': { 
      nature: '음화', 
      character: '촛불처럼 따뜻하고 섬세한 성격. 배려심이 깊고 예의바릅니다.', 
      strength: '배려심, 예의, 섬세함', 
      weakness: '소심함, 걱정 많음' 
    },
    '무': { 
      nature: '양토', 
      character: '산처럼 웅장하고 포용력이 큰 성격. 믿음직하고 안정적입니다.', 
      strength: '포용력, 신뢰성, 인내력', 
      weakness: '고집, 변화 거부' 
    },
    '기': { 
      nature: '음토', 
      character: '밭처럼 너그럽고 포용하는 성격. 봉사정신이 강습니다.', 
      strength: '봉사정신, 인정, 포용력', 
      weakness: '걱정 많음, 우울감' 
    },
    '경': { 
      nature: '양금', 
      character: '도끼나 칼처럼 예리하고 결단력이 있는 성격. 정의감이 강습니다.', 
      strength: '결단력, 정의감, 분석력', 
      weakness: '날카로움, 비판적' 
    },
    '신': { 
      nature: '음금', 
      character: '보석처럼 세련되고 우아한 성격. 완벽주의 성향이 있습니다.', 
      strength: '세련됨, 완벽주의, 품격', 
      weakness: '까다로움, 신경질' 
    },
    '임': { 
      nature: '양수', 
      character: '바다처럼 깊고 포용력이 큰 성격. 지혜롭고 직관력이 뛰어납니다.', 
      strength: '지혜, 포용력, 직관력', 
      weakness: '게으름, 우유부단' 
    },
    '계': { 
      nature: '음수', 
      character: '이슬이나 비처럼 조용하고 신비로운 성격. 감수성이 풍부합니다.', 
      strength: '감수성, 신중함, 신비로움', 
      weakness: '소극적, 우울감' 
    }
  };
  return stemData[stem] || { nature: '중성', character: '균형잡힌 성격', strength: '조화', weakness: '특징 없음' };
};

// 지지 성격 분석
export const getBranchCharacter = (branch) => {
  const branchData = {
    '자': { animal: '쥐', season: '한겨울', character: '지혜롭고 영리하며 적응력이 뛰어남' },
    '축': { animal: '소', season: '겨울 끝', character: '성실하고 근면하며 인내력이 강함' },
    '인': { animal: '호랑이', season: '이른 봄', character: '용감하고 활동적이며 리더십이 있음' },
    '묘': { animal: '토끼', season: '봄', character: '온순하고 예의바르며 조화를 추구함' },
    '진': { animal: '용', season: '늦은 봄', character: '웅장하고 변화를 좋아하며 꿈이 큼' },
    '사': { animal: '뱀', season: '초여름', character: '신중하고 지혜로우며 직감이 뛰어남' },
    '오': { animal: '말', season: '한여름', character: '활발하고 자유롭며 열정적임' },
    '미': { animal: '양', season: '늦은 여름', character: '온화하고 평화롭며 예술성이 있음' },
    '신': { animal: '원숭이', season: '초가을', character: '똑똑하고 재치있으며 변화에 민감함' },
    '유': { animal: '닭', season: '가을', character: '부지런하고 시간 관념이 정확함' },
    '술': { animal: '개', season: '늦은 가을', character: '충실하고 정의감이 강하며 보수적임' },
    '해': { animal: '돼지', season: '겨울', character: '후덕하고 관대하며 복이 많음' }
  };
  return branchData[branch] || { animal: '동물', season: '계절', character: '일반적 성격' };
};

// 오행별 성격 분석
export const getPersonality = (element) => {
  const personalities = {
    '목': '성장과 발전을 추구하며 창의적이고 유연한 성격입니다.',
    '화': '열정적이고 활발하며 리더십이 강한 성격입니다.',
    '토': '안정적이고 신뢰할 수 있으며 포용력이 큰 성격입니다.',
    '금': '의지가 강하고 결단력이 있으며 완벽주의적 성격입니다.',
    '수': '지혜롭고 적응력이 뛰어나며 직관력이 좋은 성격입니다.'
  };
  return personalities[element] || '균형잡힌 성격을 가지고 있습니다.';
};

// 행운 정보
export const getLuckyInfo = (element) => {
  const luckyData = {
    '목': { color: '초록색', number: [3, 8], direction: '동쪽' },
    '화': { color: '빨간색', number: [2, 7], direction: '남쪽' },
    '토': { color: '노란색', number: [5, 10], direction: '중앙' },
    '금': { color: '흰색', number: [4, 9], direction: '서쪽' },
    '수': { color: '검은색', number: [1, 6], direction: '북쪽' }
  };
  return luckyData[element] || { color: '무지개색', number: [7], direction: '모든 방향' };
};