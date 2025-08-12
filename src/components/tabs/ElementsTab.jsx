import React from 'react';
import { Shield, Compass, Flame } from 'lucide-react';
import { PentagonChart } from '../PentagonChart';
import { YongsinSelector } from '../YongsinSelector';
import { generatePentagonChartData } from '../../utils/elementAnalysis';

export const ElementsTab = ({ 
  saju, 
  elementAnalysis, 
  selectedYongsin, 
  setSelectedYongsin, 
  onYongsinChange 
}) => {
  const pentagonData = generatePentagonChartData(elementAnalysis.elementCount);

  // 용신의 반대 오행 계산
  const getOppositeElement = (element) => {
    const opposites = {
      '목': '금', '화': '수', '토': '목', '금': '화', '수': '토'
    };
    return opposites[element] || '계산 중...';
  };

  // 용신 설명 가져오기
  const getYongsinDescription = (element) => {
    const descriptions = {
      '목': '성장과 발전의 기운이 강할 때 좋은 운세를 보입니다. 창의적 활동과 새로운 도전에 유리합니다.',
      '화': '열정과 활력의 기운이 강할 때 좋은 운세를 보입니다. 리더십과 사회적 활동에 유리합니다.',
      '토': '안정과 포용의 기운이 강할 때 좋은 운세를 보입니다. 신뢰 구축과 기반 다지기에 유리합니다.',
      '금': '결단과 완성의 기운이 강할 때 좋은 운세를 보입니다. 목표 달성과 성과 창출에 유리합니다.',
      '수': '지혜와 유연성의 기운이 강할 때 좋은 운세를 보입니다. 학습과 적응력 발휘에 유리합니다.'
    };
    return descriptions[element] || '균형잡힌 운세가 예상됩니다.';
  };

  return (
    <div className="space-y-6">
      {/* 용신 선택기 */}
      <YongsinSelector
        birthElement={saju.mainElement}
        elementAnalysis={elementAnalysis}
        selectedYongsin={selectedYongsin}
        setSelectedYongsin={setSelectedYongsin}
        onYongsinChange={onYongsinChange}
      />

      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30">
        <PentagonChart 
          data={pentagonData} 
          title="🌟 오행 균형 분석 (용신론 & 격국론)"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
            <Shield className="text-blue-600" />
            오행 분석 결과
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-2">🎯 신강약 판단</h4>
              <p className="text-blue-700 text-sm">{elementAnalysis.analysis.bodyStrength}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-200">
                <h5 className="font-bold text-green-800 mb-1">✅ 선택된 용신</h5>
                <p className="text-green-700 text-sm font-bold">{selectedYongsin || '선택 중...'}</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-3 border border-red-200">
                <h5 className="font-bold text-red-800 mb-1">❌ 기신</h5>
                <p className="text-red-700 text-sm">{selectedYongsin ? getOppositeElement(selectedYongsin) : '계산 중...'}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-2">👑 {elementAnalysis.analysis.pattern.name}</h4>
              <p className="text-purple-700 text-sm mb-2">{elementAnalysis.analysis.pattern.description}</p>
              <p className="text-purple-600 text-xs">{elementAnalysis.analysis.pattern.fortune}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white/95 to-orange-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
          <h3 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4 flex items-center gap-2">
            <Compass className="text-orange-600" />
            용신 기준 운세 조언
          </h3>
          
          <div className="space-y-4">
            {selectedYongsin && (
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border border-orange-200">
                <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
                  <Flame className="text-orange-600" size={16} />
                  {selectedYongsin} 용신 특성
                </h4>
                <p className="text-orange-700 text-sm">{getYongsinDescription(selectedYongsin)}</p>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">🎨 오행별 분포</h4>
              {Object.entries(elementAnalysis.elementCount).map(([element, count]) => {
                const isYongsin = element === selectedYongsin;
                return (
                  <div key={element} className={`flex items-center justify-between rounded-lg p-3 border ${
                    isYongsin 
                      ? 'bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-400' 
                      : 'bg-gradient-to-r from-gray-50 to-white border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${isYongsin ? 'text-orange-800' : 'text-gray-700'}`}>
                        {element}
                        {isYongsin && <span className="ml-2 px-2 py-1 bg-yellow-500 text-white text-xs rounded-full">용신</span>}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            isYongsin 
                              ? 'bg-gradient-to-r from-yellow-500 to-orange-500' 
                              : 'bg-gradient-to-r from-orange-500 to-red-500'
                          }`}
                          style={{ width: `${(count / elementAnalysis.totalPoints) * 100}%` }}
                        />
                      </div>
                      <span className={`text-sm w-12 text-right ${isYongsin ? 'font-bold text-orange-700' : 'text-gray-600'}`}>
                        {count.toFixed(1)}점
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                <span className="font-bold text-blue-800">💪 최강 오행:</span>
                <div className="text-blue-700 mt-1">
                  {elementAnalysis.analysis.strongestElement.element} ({elementAnalysis.analysis.strongestElement.count.toFixed(1)}점)
                </div>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-3 border border-red-200">
                <span className="font-bold text-red-800">📉 최약 오행:</span>
                <div className="text-red-700 mt-1">
                  {elementAnalysis.analysis.weakestElement.element} ({elementAnalysis.analysis.weakestElement.count.toFixed(1)}점)
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};