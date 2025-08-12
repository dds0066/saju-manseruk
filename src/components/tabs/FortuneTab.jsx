import React from 'react';
import { TrendingUp, Crown, Book } from 'lucide-react';

export const FortuneTab = ({ saju, currentAge, selectedYongsin, adjustedDaewoons }) => {
  return (
    <div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
        <TrendingUp className="text-purple-600" />
        대운 분석 {selectedYongsin && <span className="text-sm font-normal">({selectedYongsin} 용신 기준)</span>}
      </h2>
      
      {saju.daewoon && (
        <div className="space-y-6">
          {/* 대운 기본 정보 */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
              <Crown className="text-purple-600" />
              🎯 대운 기본 정보
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
              {[
                { label: '대운 방향', value: saju.daewoon.direction, icon: '🧭' },
                { label: '시작 연령', value: `${saju.daewoon.startAge}세`, icon: '📅' },
                { label: '다음 절기까지', value: `${saju.daewoon.daysTillNextTerm}일`, icon: '⏰' },
                { label: '다음 절기', value: saju.daewoon.nextTermDate, icon: '🌸' },
                { label: '선택된 용신', value: selectedYongsin || '선택 중', icon: '⭐' }
              ].map((item, index) => (
                <div key={index} className="bg-white/80 rounded-lg p-3 text-center">
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-purple-600 font-medium text-xs">{item.label}</div>
                  <div className="text-purple-800 font-bold">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-white/80 rounded-lg p-4 border border-purple-100">
              <p className="text-purple-700 text-sm leading-relaxed">{saju.daewoon.genderFortuneFlow}</p>
            </div>
          </div>

          {/* 용신 조정된 대운 목록 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Book className="text-gray-600" />
              📊 대운 순서 (용신 기준 조정)
            </h3>
            <div className="grid gap-3">
              {(adjustedDaewoons.length > 0 ? adjustedDaewoons : saju.daewoon.daewoons).map((daewoon, index) => {
                const isCurrent = currentAge >= daewoon.startAge && currentAge <= daewoon.endAge;
                
                return (
                  <div 
                    key={index} 
                    className={`rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-lg ${
                      isCurrent 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-400 shadow-lg shadow-yellow-200/50' 
                        : 'bg-gradient-to-r from-gray-50 to-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-4">
                        {isCurrent && (
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                            <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold rounded-full">
                              현재 대운
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${isCurrent ? 'text-orange-700' : 'text-gray-800'}`}>
                            {daewoon.pillar}
                          </span>
                          <span className={`text-sm ${isCurrent ? 'text-orange-600' : 'text-gray-500'}`}>
                            {daewoon.hanja || ''}
                          </span>
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            isCurrent 
                              ? 'bg-orange-100 text-orange-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {daewoon.element}
                          </span>
                          
                          {/* 용신 기준 평가 표시 */}
                          {selectedYongsin && daewoon.yongsinType && (
                            <span className={`px-3 py-1 text-xs rounded-full font-bold text-white ${
                              daewoon.yongsinScore >= 80 ? 'bg-green-500' :
                              daewoon.yongsinScore >= 65 ? 'bg-blue-500' :
                              daewoon.yongsinScore >= 50 ? 'bg-yellow-500' :
                              daewoon.yongsinScore >= 35 ? 'bg-orange-500' : 'bg-red-500'
                            }`}>
                              {daewoon.yongsinType}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`text-right text-sm ${isCurrent ? 'text-orange-700' : 'text-gray-600'}`}>
                        <div className="font-bold">
                          {daewoon.startAge}세 ~ {daewoon.endAge}세
                          {isCurrent && <span className="ml-2 text-orange-500">({currentAge}세)</span>}
                        </div>
                        <div className="text-xs mt-1">
                          {daewoon.startYear}년 ~ {daewoon.endYear}년
                        </div>
                        {selectedYongsin && daewoon.yongsinScore && (
                          <div className="text-xs mt-1 font-bold">
                            용신점수: {daewoon.yongsinScore}점
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className={`text-sm leading-relaxed ${
                        isCurrent ? 'text-orange-800 font-medium' : 'text-gray-700'
                      }`}>
                        {daewoon.adjustedDescription || daewoon.description}
                      </p>
                      
                      {selectedYongsin && daewoon.yongsinAdvice && (
                        <div className="bg-white/80 rounded-lg p-3 border border-blue-100">
                          <span className="text-blue-700 font-medium text-sm">💡 용신 조언:</span>
                          <p className="text-blue-600 text-sm mt-1">{daewoon.yongsinAdvice}</p>
                        </div>
                      )}
                    </div>
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