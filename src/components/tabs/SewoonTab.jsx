import React from 'react';
import { Zap, AlertTriangle, Crown, Calendar, ChevronDown } from 'lucide-react';
import { getYearDetailAnalysisWithYongsin } from '../../utils/enhancedFortuneCalculator';

export const SewoonTab = ({ 
  currentAge, 
  selectedYongsin, 
  adjustedSewoonData, 
  selectedDaewoon, 
  setSelectedDaewoon, 
  expandedYear, 
  setExpandedYear 
}) => {
  return (
    <div className="space-y-6">
      {/* 주의사항 */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-300 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="text-amber-600" size={20} />
          <h4 className="font-bold text-amber-800">⚠️ 세운 분석 주의사항</h4>
        </div>
        <p className="text-amber-700 text-sm">
          세운 분석은 <strong>{selectedYongsin || '선택된'} 용신</strong> 기준으로 계산됩니다. 
          출생 시간이 정확할 때 가장 정밀하며, 용신 선택에 따라 운세 평가가 달라집니다.
        </p>
      </div>

      {/* 대운 선택 */}
      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <Zap className="text-purple-600" />
          🎯 대운별 세운 분석 {selectedYongsin && <span className="text-sm font-normal">({selectedYongsin} 용신 기준)</span>}
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {(adjustedSewoonData.length > 0 ? adjustedSewoonData : []).map((daewoon, index) => {
            const isCurrent = currentAge >= daewoon.startAge && currentAge <= daewoon.endAge;
            const isSelected = selectedDaewoon?.order === daewoon.order;
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDaewoon(daewoon)}
                className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                  isSelected
                    ? 'border-purple-400 bg-gradient-to-r from-purple-100 to-pink-100 shadow-lg'
                    : isCurrent
                    ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className="text-center">
                  <div className={`text-lg font-bold ${
                    isSelected ? 'text-purple-700' : isCurrent ? 'text-orange-700' : 'text-gray-700'
                  }`}>
                    {daewoon.pillar}
                  </div>
                  <div className={`text-xs ${
                    isSelected ? 'text-purple-600' : isCurrent ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {daewoon.startAge}-{daewoon.endAge}세
                  </div>
                  {/* 용신 기준 평가 표시 */}
                  {daewoon.yongsinAnalysis && (
                    <div className={`text-xs mt-1 px-2 py-1 rounded font-bold ${
                      daewoon.yongsinAnalysis.score >= 70 ? 'bg-green-100 text-green-800' :
                      daewoon.yongsinAnalysis.score >= 50 ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {daewoon.yongsinAnalysis.type}
                    </div>
                  )}
                  {isCurrent && (
                    <div className="text-xs text-orange-500 font-bold mt-1">현재</div>
                  )}
                  {isSelected && (
                    <div className="text-xs text-purple-500 font-bold mt-1">선택됨</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {!selectedDaewoon && adjustedSewoonData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Zap size={48} className="mx-auto mb-4 text-gray-300" />
            <p>용신을 선택하시면 정확한 세운 분석을 제공해드립니다.</p>
          </div>
        )}

        {!selectedDaewoon && adjustedSewoonData.length > 0 && (
          <div className="text-center py-8 text-gray-500">
            <Zap size={48} className="mx-auto mb-4 text-gray-300" />
            <p>대운을 선택하시면 해당 기간의 년운을 분석해드립니다.</p>
          </div>
        )}
      </div>

      {/* 선택된 대운의 년운 분석 */}
      {selectedDaewoon && (
        <div className="space-y-6">
          {/* 대운 요약 (용신 기준) */}
          <div className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
            <h4 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
              <Crown className="text-blue-600" />
              {selectedDaewoon.pillar} 대운 ({selectedDaewoon.startAge}-{selectedDaewoon.endAge}세) 종합 분석
            </h4>
            
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                <div className="text-green-700 font-medium text-sm">💰 최고 재물운</div>
                {selectedDaewoon.bestWealthYear ? (
                  <div>
                    <div className="text-green-800 font-bold">{selectedDaewoon.bestWealthYear.year}년 ({selectedDaewoon.bestWealthYear.age}세)</div>
                    <div className="text-green-600 text-xs mt-1">{selectedDaewoon.bestWealthYear.reason}</div>
                  </div>
                ) : (
                  <div className="text-green-600 text-sm">특별한 재물운 없음</div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
                <div className="text-blue-700 font-medium text-sm">🌟 최고 전체운</div>
                {selectedDaewoon.bestOverallYear ? (
                  <div>
                    <div className="text-blue-800 font-bold">{selectedDaewoon.bestOverallYear.year}년 ({selectedDaewoon.bestOverallYear.age}세)</div>
                    <div className="text-blue-600 text-xs mt-1">{selectedDaewoon.bestOverallYear.reason}</div>
                  </div>
                ) : (
                  <div className="text-blue-600 text-sm">평균적인 운세</div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-3 border border-red-200">
                <div className="text-red-700 font-medium text-sm">⚠️ 주의가 필요한 해</div>
                {selectedDaewoon.worstYear ? (
                  <div>
                    <div className="text-red-800 font-bold">{selectedDaewoon.worstYear.year}년 ({selectedDaewoon.worstYear.age}세)</div>
                    <div className="text-red-600 text-xs mt-1">{selectedDaewoon.worstYear.reason}</div>
                  </div>
                ) : (
                  <div className="text-red-600 text-sm">특별히 어려운 해 없음</div>
                )}
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                <div className="text-purple-700 font-medium text-sm">📊 평균 운세</div>
                <div className="text-purple-800 font-bold">
                  {selectedDaewoon.averageScore?.toFixed(1)}점
                  <span className="text-sm ml-1">
                    ({selectedDaewoon.averageScore >= 70 ? '길운' : selectedDaewoon.averageScore >= 50 ? '중운' : '흉운'})
                  </span>
                </div>
                {selectedDaewoon.yongsinAnalysis && (
                  <div className="text-xs text-purple-600 mt-1">
                    대운: {selectedDaewoon.yongsinAnalysis.type} ({selectedDaewoon.yongsinAnalysis.score}점)
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white/80 rounded-lg p-4 border border-blue-100">
              <p className="text-blue-700 text-sm">
                {selectedDaewoon.yongsinAnalysis ? 
                  selectedDaewoon.yongsinAnalysis.description : 
                  selectedDaewoon.description
                }
              </p>
            </div>
          </div>

          {/* 년운 목록 */}
          <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="text-gray-600" />
              📅 년운 상세 분석 (용신: {selectedYongsin})
            </h4>
            
            <div className="space-y-3">
              {selectedDaewoon.years?.map((year, index) => {
                const isExpanded = expandedYear === `${selectedDaewoon.order}-${year.year}`;
                const yearDetail = isExpanded ? getYearDetailAnalysisWithYongsin(year, selectedDaewoon.element, selectedYongsin) : null;
                
                return (
                  <div key={index} className={`rounded-lg border-2 transition-all duration-300 ${
                    year.isCurrent 
                      ? 'border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50' 
                      : year.overallScore >= 70
                      ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50'
                      : year.overallScore >= 50
                      ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50'
                      : year.overallScore >= 35
                      ? 'border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50'
                      : 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50'
                  }`}>
                    <button
                      onClick={() => setExpandedYear(isExpanded ? null : `${selectedDaewoon.order}-${year.year}`)}
                      className="w-full p-4 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className={`text-xl font-bold ${
                              year.isCurrent ? 'text-orange-700' : 
                              year.overallScore >= 70 ? 'text-green-700' :
                              year.overallScore >= 50 ? 'text-blue-700' :
                              year.overallScore >= 35 ? 'text-orange-700' : 'text-red-700'
                            }`}>
                              {year.year}년
                            </div>
                            <div className={`text-sm ${
                              year.isCurrent ? 'text-orange-600' : 'text-gray-600'
                            }`}>
                              {year.age}세
                              {year.isCurrent && <span className="ml-1 font-bold">(현재)</span>}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-lg font-bold text-gray-800">{year.yearPillar}</div>
                              <div className="text-xs text-gray-500">년주 ({year.yearElement})</div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <span 
                                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                style={{ backgroundColor: year.sipsin.color }}
                              >
                                {year.sipsin.name}
                              </span>
                              
                              {/* 용신 관계 표시 */}
                              {year.yongsinAnalysis && (
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  year.yongsinAnalysis.score >= 70 ? 'bg-green-100 text-green-700' :
                                  year.yongsinAnalysis.score >= 50 ? 'bg-blue-100 text-blue-700' :
                                  year.yongsinAnalysis.score >= 35 ? 'bg-orange-100 text-orange-700' :
                                  'bg-red-100 text-red-700'
                                }`}>
                                  {year.yongsinAnalysis.type}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className={`text-sm font-bold ${
                              year.overallScore >= 70 ? 'text-green-700' :
                              year.overallScore >= 50 ? 'text-blue-700' :
                              year.overallScore >= 35 ? 'text-orange-700' : 'text-red-700'
                            }`}>
                              {year.overallScore}점
                            </div>
                            <div className="text-xs text-gray-500">종합운</div>
                            {year.wealthScore > year.overallScore && (
                              <div className="text-xs text-green-600 font-bold">
                                재물운 {year.wealthScore}점
                              </div>
                            )}
                          </div>
                          
                          <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown size={20} className="text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </button>
                    
                    {/* 확장된 년운 상세 정보 */}
                    {isExpanded && yearDetail && (
                      <div className="px-4 pb-4 border-t border-gray-200 mt-3 pt-3">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <h6 className="font-bold text-gray-700 text-sm">📊 종합 분석</h6>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-white/80 rounded p-2">
                                <span className="text-blue-600 font-medium">전체운:</span>
                                <span className="ml-1">{yearDetail.summary.overall}</span>
                              </div>
                              <div className="bg-white/80 rounded p-2">
                                <span className="text-green-600 font-medium">재물운:</span>
                                <span className="ml-1">{yearDetail.summary.wealth}</span>
                              </div>
                              <div className="bg-white/80 rounded p-2">
                                <span className="text-red-600 font-medium">건강운:</span>
                                <span className="ml-1">{yearDetail.summary.health}</span>
                              </div>
                              <div className="bg-white/80 rounded p-2">
                                <span className="text-purple-600 font-medium">직업운:</span>
                                <span className="ml-1">{yearDetail.summary.career}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h6 className="font-bold text-gray-700 text-sm">💡 조언</h6>
                            <div className="space-y-2 text-xs">
                              <div className="bg-green-50 rounded p-2">
                                <span className="text-green-700 font-medium">👍 긍정 포인트:</span>
                                <p className="text-green-600 mt-1">{yearDetail.advice.positive}</p>
                              </div>
                              <div className="bg-yellow-50 rounded p-2">
                                <span className="text-yellow-700 font-medium">⚠️ 주의사항:</span>
                                <p className="text-yellow-600 mt-1">{yearDetail.advice.caution}</p>
                              </div>
                              <div className="bg-blue-50 rounded p-2">
                                <span className="text-blue-700 font-medium">🎯 실천 방안:</span>
                                <p className="text-blue-600 mt-1">{yearDetail.advice.action}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* 용신 효과 */}
                        {yearDetail.yongsinEffect && (
                          <div className="mb-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
                            <h6 className="font-bold text-purple-800 text-sm mb-2">🌟 용신 효과</h6>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div className="bg-white/80 rounded p-2">
                                <span className="text-purple-600 font-medium">용신 관계:</span>
                                <span className="ml-1">{yearDetail.yongsinEffect.relation?.type || '계산 중'}</span>
                              </div>
                              <div className="bg-white/80 rounded p-2">
                                <span className="text-purple-600 font-medium">영향도:</span>
                                <span className="ml-1">{yearDetail.yongsinEffect.score}점</span>
                              </div>
                            </div>
                            <p className="text-purple-700 text-xs mt-2">{yearDetail.yongsinEffect.mainAdvice}</p>
                          </div>
                        )}
                        
                        {/* 월별 운세 */}
                        <div className="mt-4">
                          <h6 className="font-bold text-gray-700 text-sm mb-2">📅 월별 운세 흐름</h6>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {yearDetail.monthlyFortune.map((month, monthIndex) => (
                              <div key={monthIndex} className="bg-white/80 rounded p-2 text-xs">
                                <div className="font-medium text-gray-600">{month.month}</div>
                                <div className="text-gray-500 mt-1">{month.desc}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};