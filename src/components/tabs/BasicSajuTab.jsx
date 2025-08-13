import React from 'react';
import { Calendar, User, Target, Heart, Star, Sparkles, AlertTriangle, Shield } from 'lucide-react';

// 형충파해 분석 함수
const analyzeChungHapHyungPa = (yearBranch, monthBranch, dayBranch, hourBranch) => {
  const branches = [yearBranch, monthBranch, dayBranch, hourBranch];
  const results = [];

  // 지지 충(沖) - 정면 대립
  const chungPairs = [
    { pair: ['자', '오'], name: '자오충', desc: '물과 불의 대립으로 감정의 기복이 심함. 남북 방향의 이동이 많음.' },
    { pair: ['축', '미'], name: '축미충', desc: '토끼리의 충돌로 고집과 완고함. 변화에 저항하는 성향.' },
    { pair: ['인', '신'], name: '인신충', desc: '목과 금의 대립으로 결단력 부족. 우유부단한 면이 있음.' },
    { pair: ['묘', '유'], name: '묘유충', desc: '목과 금의 충돌로 예민함. 신경질적이고 까다로운 성격.' },
    { pair: ['진', '술'], name: '진술충', desc: '토끼리의 대립으로 내적 갈등. 자기 확신 부족.' },
    { pair: ['사', '해'], name: '사해충', desc: '화와 수의 대립으로 극단적 성향. 냉정과 열정 사이.' }
  ];

  // 지지 합(合) - 조화와 협력
  const hapPairs = [
    { pair: ['자', '축'], name: '자축합', desc: '토의 합으로 안정과 신뢰. 꾸준한 발전과 축적.' },
    { pair: ['인', '해'], name: '인해합', desc: '목의 합으로 성장과 발전. 학습과 창조력 증진.' },
    { pair: ['묘', '술'], name: '묘술합', desc: '화의 합으로 활발함과 열정. 사회적 활동 증가.' },
    { pair: ['진', '유'], name: '진유합', desc: '금의 합으로 완성과 결실. 목적 달성과 성과.' },
    { pair: ['사', '신'], name: '사신합', desc: '수의 합으로 지혜와 적응. 유연성과 변화 적응력.' },
    { pair: ['오', '미'], name: '오미합', desc: '토의 합으로 포용과 배려. 인간관계의 조화.' }
  ];

  // 삼합(三合) - 세 지지의 조화
  const samhapGroups = [
    { group: ['인', '오', '술'], name: '인오술 화국', desc: '화의 삼합으로 열정과 창의력. 예술적 재능과 리더십.' },
    { group: ['사', '유', '축'], name: '사유축 금국', desc: '금의 삼합으로 완벽주의와 정확성. 기술적 능력과 완성도.' },
    { group: ['신', '자', '진'], name: '신자진 수국', desc: '수의 삼합으로 지혜와 직관력. 학문적 성취와 통찰력.' },
    { group: ['해', '묘', '미'], name: '해묘미 목국', desc: '목의 삼합으로 성장과 발전. 창조력과 확장성.' }
  ];

  // 형(刑) - 서로 해치는 관계
  const hyungGroups = [
    { group: ['인', '사', '신'], name: '인사신 삼형', desc: '은혜를 원수로 갚는 형. 배신과 실망을 경험하기 쉬움.' },
    { group: ['축', '미', '술'], name: '축미술 삼형', desc: '무례한 형으로 예의없음. 인간관계에서 마찰이 많음.' },
    { group: ['자', '묘'], name: '자묘형', desc: '무례한 형으로 버릇없음. 예의와 도덕성 부족.' },
    { group: ['진', '진'], name: '진진 자형', desc: '자기 자신을 해치는 형. 자책과 자기 파괴적 성향.' },
    { group: ['오', '오'], name: '오오 자형', desc: '자기 자신을 해치는 형. 과도한 자신감으로 인한 실패.' },
    { group: ['유', '유'], name: '유유 자형', desc: '자기 자신을 해치는 형. 완벽주의로 인한 스트레스.' },
    { group: ['해', '해'], name: '해해 자형', desc: '자기 자신을 해치는 형. 우유부단함으로 인한 기회 상실.' }
  ];

  // 파(破) - 파괴하는 관계
  const paPairs = [
    { pair: ['자', '유'], name: '자유파', desc: '금수 상극으로 감정적 상처. 실망과 좌절을 경험.' },
    { pair: ['오', '묘'], name: '오묘파', desc: '화목 상극으로 성급함. 조급한 성격으로 실수 많음.' },
    { pair: ['축', '진'], name: '축진파', desc: '토토 충돌로 고집 부림. 완고함으로 인한 대인관계 문제.' },
    { pair: ['미', '술'], name: '미술파', desc: '토토 충돌로 우울함. 내적 갈등과 스트레스.' },
    { pair: ['인', '해'], name: '인해파', desc: '목수 부조화로 계획 변경. 일관성 부족.' },
    { pair: ['사', '신'], name: '사신파', desc: '화금 상극으로 급성질. 감정 조절의 어려움.' }
  ];

  // 해(害) - 해치는 관계
  const haePairs = [
    { pair: ['자', '미'], name: '자미해', desc: '수토 상극으로 소심함. 자신감 부족과 위축.' },
    { pair: ['축', '오'], name: '축오해', desc: '토화 부조화로 급함. 성급한 판단으로 인한 실수.' },
    { pair: ['인', '사'], name: '인사해', desc: '목화 과다로 조급함. 과도한 열정으로 인한 소진.' },
    { pair: ['묘', '진'], name: '묘진해', desc: '목토 상극으로 완고함. 융통성 부족.' },
    { pair: ['신', '해'], name: '신해해', desc: '금수 부조화로 냉정함. 감정 표현의 어려움.' },
    { pair: ['유', '술'], name: '유술해', desc: '금토 과다로 고집. 타인의 의견 수용 곤란.' }
  ];

  // 충 분석
  chungPairs.forEach(chung => {
    const hasChung = chung.pair.every(branch => branches.includes(branch));
    if (hasChung) {
      results.push({
        type: '충(沖)',
        name: chung.name,
        description: chung.desc,
        severity: '높음',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-300',
        icon: '⚔️'
      });
    }
  });

  // 합 분석
  hapPairs.forEach(hap => {
    const hasHap = hap.pair.every(branch => branches.includes(branch));
    if (hasHap) {
      results.push({
        type: '합(合)',
        name: hap.name,
        description: hap.desc,
        severity: '길함',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-300',
        icon: '🤝'
      });
    }
  });

  // 삼합 분석
  samhapGroups.forEach(samhap => {
    const hasAllThree = samhap.group.every(branch => branches.includes(branch));
    if (hasAllThree) {
      results.push({
        type: '삼합(三合)',
        name: samhap.name,
        description: samhap.desc,
        severity: '대길',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-300',
        icon: '🌟'
      });
    }
  });

  // 형 분석
  hyungGroups.forEach(hyung => {
    let hasHyung = false;
    
    if (hyung.group.length === 3) {
      // 삼형의 경우 3개가 모두 있어야 함
      hasHyung = hyung.group.every(branch => branches.includes(branch));
    } else if (hyung.group.length === 2) {
      // 이형의 경우 2개가 모두 있어야 함
      hasHyung = hyung.group.every(branch => branches.includes(branch));
    } else if (hyung.group.length === 1) {
      // 자형의 경우 같은 지지가 2개 이상 있어야 함
      const branchCount = branches.filter(branch => branch === hyung.group[0]).length;
      hasHyung = branchCount >= 2;
    }
    
    if (hasHyung) {
      results.push({
        type: '형(刑)',
        name: hyung.name,
        description: hyung.desc,
        severity: '주의',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-300',
        icon: '⚠️'
      });
    }
  });

  // 파 분석
  paPairs.forEach(pa => {
    const hasPa = pa.pair.every(branch => branches.includes(branch));
    if (hasPa) {
      results.push({
        type: '파(破)',
        name: pa.name,
        description: pa.desc,
        severity: '주의',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-300',
        icon: '💥'
      });
    }
  });

  // 해 분석
  haePairs.forEach(hae => {
    const hasHae = hae.pair.every(branch => branches.includes(branch));
    if (hasHae) {
      results.push({
        type: '해(害)',
        name: hae.name,
        description: hae.desc,
        severity: '경계',
        color: 'text-gray-600',
        bgColor: 'bg-gray-50',
        borderColor: 'border-gray-300',
        icon: '⚡'
      });
    }
  });

  return results;
};

export const BasicSajuTab = ({ saju, personality, specialStars, luckyInfo }) => {
  // 형충파해 분석
  const chungHapAnalysis = analyzeChungHapHyungPa(
    saju.yearBranch, 
    saju.monthBranch, 
    saju.dayBranch, 
    saju.hourBranch
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* 사주 정보 */}
      <div className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          사주 정보
        </h2>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          {[
            { label: '년주', value: saju.year, element: saju.yearElement, color: 'text-purple-600' },
            { label: '월주', value: saju.month, element: saju.monthElement, color: 'text-blue-600' },
            { label: '일주', value: saju.day, element: saju.mainElement, color: 'text-green-600' },
            { label: '시주', value: saju.hour, element: saju.hourElement, color: 'text-orange-600' }
          ].map((pillar, index) => (
            <div key={index} className="text-center bg-white/80 rounded-xl p-3 border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">{pillar.label}</div>
              <div className={`text-2xl font-bold ${pillar.color}`}>{pillar.value}</div>
              <div className="text-xs text-gray-400">{pillar.element}</div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200 mb-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-purple-500">🐉</span>
              <span className="text-gray-600">띠:</span>
              <span className="font-medium">{saju.zodiac}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500">⚡</span>
              <span className="text-gray-600">주오행:</span>
              <span className="font-medium">{saju.mainElement}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">🌸</span>
              <span className="text-gray-600">절기:</span>
              <span className="font-medium">{saju.solarInfo.currentTerm}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-orange-500">📅</span>
              <span className="text-gray-600">사주년:</span>
              <span className="font-medium">{saju.solarInfo.sajuYear}년</span>
            </div>
          </div>
        </div>

        {/* 특수 별 */}
        {specialStars && specialStars.length > 0 && (
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300 mb-4">
            <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
              <Star size={16} className="text-yellow-600" />
              ⭐ 특수 신살
            </h4>
            <div className="space-y-2">
              {specialStars.map((star, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Sparkles size={12} className="text-yellow-500" />
                  <span className="text-yellow-800">{star}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 형충파해 분석 */}
        {chungHapAnalysis.length > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200">
            <h4 className="font-bold text-indigo-800 mb-3 flex items-center gap-2">
              <Shield size={16} className="text-indigo-600" />
              🔮 형충파해 분석
            </h4>
            <div className="space-y-3">
              {chungHapAnalysis.map((analysis, index) => (
                <div 
                  key={index} 
                  className={`${analysis.bgColor} ${analysis.borderColor} border rounded-lg p-3`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{analysis.icon}</span>
                      <span className={`font-bold text-sm ${analysis.color}`}>
                        {analysis.name}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${analysis.color} ${analysis.bgColor} border ${analysis.borderColor}`}>
                        {analysis.severity}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm ${analysis.color} leading-relaxed`}>
                    {analysis.description}
                  </p>
                </div>
              ))}
            </div>
            
            {/* 형충파해 설명 */}
            <div className="mt-4 bg-white/80 rounded-lg p-3 border border-indigo-100">
              <h5 className="font-semibold text-indigo-800 text-sm mb-2">📚 형충파해란?</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-indigo-700">
                <div><strong>충(沖):</strong> 정면 대립, 변화와 이동</div>
                <div><strong>합(合):</strong> 조화와 협력, 안정</div>
                <div><strong>형(刑):</strong> 서로 해치는 관계, 갈등</div>
                <div><strong>파(破):</strong> 파괴하는 관계, 변동</div>
                <div><strong>해(害):</strong> 해치는 관계, 방해</div>
                <div><strong>삼합:</strong> 삼자 조화, 대길</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 기본 성격 분석 */}
      <div className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <User className="text-green-600" />
          성격 분석
        </h2>

        {/* 일간 성격 */}
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
            <Target className="text-green-600" size={16} />
            {personality.dayStem.nature} ({saju.dayStem})
          </h3>
          <p className="text-green-700 text-sm mb-3">{personality.dayStem.character}</p>
          <div className="grid grid-cols-1 gap-3 text-xs">
            <div className="bg-white/80 rounded-lg p-2">
              <span className="text-green-600 font-medium">💪 장점:</span>
              <span className="text-green-700 ml-1">{personality.dayStem.strength}</span>
            </div>
            <div className="bg-white/80 rounded-lg p-2">
              <span className="text-red-600 font-medium">⚠️ 주의:</span>
              <span className="text-red-700 ml-1">{personality.dayStem.weakness}</span>
            </div>
          </div>
        </div>

        {/* 지지 특성 */}
        <div className="space-y-3 mb-6">
          <h4 className="font-semibold text-gray-700">🐲 십이지 특성</h4>
          {[
            { name: '년지', data: personality.yearBranch, branch: saju.yearBranch },
            { name: '월지', data: personality.monthBranch, branch: saju.monthBranch },
            { name: '일지', data: personality.dayBranch, branch: saju.dayBranch },
            { name: '시지', data: personality.hourBranch, branch: saju.hourBranch }
          ].map((item, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-2 border border-gray-200">
              <span className="font-medium text-gray-600 text-xs">{item.name} ({item.branch}):</span>
              <span className="text-gray-700 ml-1 text-xs">{item.data.animal} - {item.data.character}</span>
            </div>
          ))}
        </div>

        {/* 행운 정보 */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
          <h4 className="font-bold text-pink-800 mb-3 flex items-center gap-2">
            <Heart size={16} className="text-pink-600" />
            🍀 행운 정보
          </h4>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-center justify-between bg-white/80 rounded-lg p-2">
              <span className="text-pink-600 font-medium">🎨 행운색:</span>
              <span className="font-semibold">{luckyInfo.color}</span>
            </div>
            <div className="flex items-center justify-between bg-white/80 rounded-lg p-2">
              <span className="text-pink-600 font-medium">🔢 행운숫자:</span>
              <span className="font-semibold">{luckyInfo.number.join(', ')}</span>
            </div>
            <div className="flex items-center justify-between bg-white/80 rounded-lg p-2">
              <span className="text-pink-600 font-medium">🧭 행운방향:</span>
              <span className="font-semibold">{luckyInfo.direction}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};