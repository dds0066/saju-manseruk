import React, { useState } from 'react';
import { Star, Target, Info, Lightbulb, Crown, Shield } from 'lucide-react';

export const YongsinSelector = ({ 
  birthElement, 
  elementAnalysis, 
  selectedYongsin, 
  setSelectedYongsin,
  onYongsinChange 
}) => {
  const [showExplanation, setShowExplanation] = useState(false);

  // 용신 후보들 생성
  const yongsinCandidates = [
    {
      element: '목',
      name: '목(木)',
      description: '성장과 발전의 기운. 창의성과 유연성을 상징합니다.',
      color: '#10b981',
      bgColor: '#ecfdf5',
      when: '일간이 약하거나 화가 많을 때, 토가 많을 때 사용',
      effect: '창의력 증진, 성장 발전, 학습 능력 향상'
    },
    {
      element: '화',
      name: '화(火)', 
      description: '열정과 활력의 기운. 적극성과 리더십을 상징합니다.',
      color: '#ef4444',
      bgColor: '#fef2f2',
      when: '일간이 약하거나 금이 많을 때, 수가 많을 때 사용',
      effect: '열정 증대, 리더십 발휘, 사회적 활동 활발'
    },
    {
      element: '토',
      name: '토(土)',
      description: '안정과 포용의 기운. 신뢰성과 지속성을 상징합니다.',
      color: '#f59e0b',
      bgColor: '#fffbeb',
      when: '일간이 약하거나 수가 많을 때, 목이 많을 때 사용',
      effect: '안정성 확보, 신뢰 구축, 기반 강화'
    },
    {
      element: '금',
      name: '금(金)',
      description: '결단과 완성의 기운. 정확성과 완벽성을 상징합니다.',
      color: '#6b7280',
      bgColor: '#f9fafb',
      when: '일간이 약하거나 목이 많을 때, 화가 많을 때 사용',
      effect: '결단력 향상, 완성도 증대, 정확성 개선'
    },
    {
      element: '수',
      name: '수(水)',
      description: '지혜와 유연성의 기운. 적응력과 직관력을 상징합니다.',
      color: '#3b82f6',
      bgColor: '#eff6ff',
      when: '일간이 약하거나 토가 많을 때, 화가 많을 때 사용',
      effect: '지혜 증진, 적응력 향상, 직감력 개발'
    }
  ];

  // 현재 사주의 오행 분포 기반 추천 용신 계산
  const getRecommendedYongsin = () => {
    if (!elementAnalysis?.analysis) return '목'; // 기본값
    
    const { dayElementStrength, strongestElement, weakestElement } = elementAnalysis.analysis;
    
    if (dayElementStrength <= 1.5) {
      // 일간이 약한 경우: 일간을 돕는 오행이 용신
      const relations = {
        '목': '수', // 목을 돕는 것은 수
        '화': '목', // 화를 돕는 것은 목
        '토': '화', // 토를 돕는 것은 화
        '금': '토', // 금을 돕는 것은 토
        '수': '금'  // 수를 돕는 것은 금
      };
      return relations[birthElement] || '목';
    } else if (dayElementStrength >= 3) {
      // 일간이 강한 경우: 일간을 설기하는 오행이 용신
      const relations = {
        '목': '화', // 목이 생하는 것은 화
        '화': '토', // 화가 생하는 것은 토
        '토': '금', // 토가 생하는 것은 금
        '금': '수', // 금이 생하는 것은 수
        '수': '목'  // 수가 생하는 것은 목
      };
      return relations[birthElement] || '목';
    } else {
      // 중화인 경우: 부족한 오행을 보충
      return weakestElement?.element || '목';
    }
  };

  const recommendedYongsin = getRecommendedYongsin();

  const handleYongsinChange = (element) => {
    setSelectedYongsin(element);
    if (onYongsinChange) {
      onYongsinChange(element);
    }
  };

  // 신강약 판단 텍스트 가져오기
  const getBodyStrengthText = () => {
    if (!elementAnalysis?.analysis) return '분석 중...';
    return elementAnalysis.analysis.bodyStrength;
  };

  // 일간 강도 점수 가져오기
  const getDayElementStrength = () => {
    if (!elementAnalysis?.analysis) return 0;
    return elementAnalysis.analysis.dayElementStrength || 0;
  };

  // 최강/최약 오행 정보 가져오기
  const getStrongestElement = () => {
    if (!elementAnalysis?.analysis?.strongestElement) return { element: '계산 중', count: 0 };
    return elementAnalysis.analysis.strongestElement;
  };

  const getWeakestElement = () => {
    if (!elementAnalysis?.analysis?.weakestElement) return { element: '계산 중', count: 0 };
    return elementAnalysis.analysis.weakestElement;
  };

  return (
    <div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
          <Target className="text-purple-600" />
          🎯 용신(用神) 선택
        </h3>
        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors"
        >
          <Info size={16} />
          용신이란?
        </button>
      </div>

      {/* 용신 설명 */}
      {showExplanation && (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
            <Lightbulb className="text-blue-600" size={16} />
            용신(用神)이란?
          </h4>
          <div className="text-blue-700 text-sm space-y-2">
            <p>• <strong>용신</strong>은 사주에서 가장 필요한 오행으로, 명조의 균형을 맞춰주는 핵심 요소입니다.</p>
            <p>• 일간이 약하면 일간을 돕는 오행이, 일간이 강하면 일간을 제어하는 오행이 용신이 됩니다.</p>
            <p>• 용신에 해당하는 오행의 기운이 강한 시기에는 운이 좋고, 약한 시기에는 조심해야 합니다.</p>
            <p>• 용신을 직접 선택하시면 그에 맞춰 대운과 년운 분석이 조정됩니다.</p>
          </div>
        </div>
      )}

      {/* 현재 분석 결과 */}
      <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
        <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          <Crown className="text-green-600" size={16} />
          📊 현재 사주 분석
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white/80 rounded-lg p-3">
            <span className="text-green-600 font-medium">일간 강도:</span>
            <span className="ml-2 font-bold">{getBodyStrengthText()}</span>
          </div>
          <div className="bg-white/80 rounded-lg p-3">
            <span className="text-green-600 font-medium">일간 오행:</span>
            <span className="ml-2 font-bold">{birthElement} ({getDayElementStrength().toFixed(1)}점)</span>
          </div>
          <div className="bg-white/80 rounded-lg p-3">
            <span className="text-green-600 font-medium">최강 오행:</span>
            <span className="ml-2 font-bold">{getStrongestElement().element} ({getStrongestElement().count.toFixed(1)}점)</span>
          </div>
          <div className="bg-white/80 rounded-lg p-3">
            <span className="text-green-600 font-medium">최약 오행:</span>
            <span className="ml-2 font-bold">{getWeakestElement().element} ({getWeakestElement().count.toFixed(1)}점)</span>
          </div>
        </div>
      </div>

      {/* 추천 용신 */}
      <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300">
        <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
          <Shield className="text-orange-600" size={16} />
          🏆 AI 추천 용신
        </h4>
        <div className="flex items-center gap-3">
          <div 
            className="px-4 py-2 rounded-lg font-bold text-white"
            style={{ 
              backgroundColor: yongsinCandidates.find(y => y.element === recommendedYongsin)?.color 
            }}
          >
            {yongsinCandidates.find(y => y.element === recommendedYongsin)?.name}
          </div>
          <p className="text-orange-700 text-sm">
            현재 사주 상태를 고려했을 때 가장 적합한 용신입니다.
          </p>
        </div>
      </div>

      {/* 용신 선택 버튼들 */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-700">🎨 용신 선택 (클릭하여 변경)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {yongsinCandidates.map((yongsin) => {
            const isSelected = selectedYongsin === yongsin.element;
            const isRecommended = recommendedYongsin === yongsin.element;
            
            return (
              <button
                key={yongsin.element}
                onClick={() => handleYongsinChange(yongsin.element)}
                className={`p-4 rounded-xl border-2 text-left transition-all duration-300 hover:shadow-lg ${
                  isSelected 
                    ? 'border-purple-400 shadow-lg transform scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor: isSelected ? yongsin.bgColor : 'white'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: yongsin.color }}
                    />
                    <span className="font-bold text-gray-800">{yongsin.name}</span>
                    {isRecommended && (
                      <span className="px-2 py-1 bg-yellow-400 text-yellow-800 text-xs rounded-full font-bold">
                        추천
                      </span>
                    )}
                    {isSelected && (
                      <span className="px-2 py-1 bg-purple-400 text-white text-xs rounded-full font-bold">
                        선택됨
                      </span>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-700 text-sm mb-3">{yongsin.description}</p>
                
                <div className="space-y-2 text-xs">
                  <div className="bg-white/80 rounded p-2">
                    <span className="text-blue-600 font-medium">🎯 적용 시기:</span>
                    <p className="text-blue-700 mt-1">{yongsin.when}</p>
                  </div>
                  <div className="bg-white/80 rounded p-2">
                    <span className="text-green-600 font-medium">✨ 기대 효과:</span>
                    <p className="text-green-700 mt-1">{yongsin.effect}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 선택된 용신 효과 */}
      {selectedYongsin && (
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-bold text-purple-800 mb-2">
            🌟 선택된 용신: {yongsinCandidates.find(y => y.element === selectedYongsin)?.name}
          </h4>
          <p className="text-purple-700 text-sm">
            이제 대운과 년운 분석이 <strong>{yongsinCandidates.find(y => y.element === selectedYongsin)?.name}</strong> 기준으로 조정됩니다. 
            {selectedYongsin}의 기운이 강한 시기는 길운으로, 약한 시기는 주의가 필요한 시기로 분석됩니다.
          </p>
        </div>
      )}
    </div>
  );
};