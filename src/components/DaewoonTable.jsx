import React from 'react';
import { TrendingUp, Clock, Star, Calendar, Target } from 'lucide-react';
import { analyzeDaewoonRelation } from '../utils/accurateDaewoonCalculator';

export const DaewoonTable = ({ daewoonData, birthElement, currentAge = 30 }) => {
  const { direction, startAge, genderFortuneFlow, daewoons, daysTillNextTerm, nextTermDate } = daewoonData;
  
  const getElementColor = (element) => {
    const colors = {
      '목': '#10b981',
      '화': '#ef4444', 
      '토': '#f59e0b',
      '금': '#6b7280',
      '수': '#3b82f6'
    };
    return colors[element] || '#6b7280';
  };
  
  const getElementBg = (element) => {
    const colors = {
      '목': '#ecfdf5',
      '화': '#fef2f2',
      '토': '#fffbeb', 
      '금': '#f9fafb',
      '수': '#eff6ff'
    };
    return colors[element] || '#f9fafb';
  };
  
  // 현재 대운 찾기
  const getCurrentDaewoon = () => {
    return daewoons.find(dw => currentAge >= dw.startAge && currentAge <= dw.endAge);
  };
  
  const currentDaewoon = getCurrentDaewoon();
  
  return (
    <div className="space-y-6">
      {/* 대운 정보 헤더 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-800">평생 대운표 (정확한 절기 계산)</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-blue-700">대운 방향</span>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {direction}
            </span>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Star className="w-4 h-4 text-purple-600" />
              <span className="font-semibold text-purple-700">일간 오행</span>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: getElementBg(birthElement),
                    color: getElementColor(birthElement)
                  }}>
              {birthElement}행
            </span>
          </div>
          
          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-700">대운 시작</span>
            </div>
            <span className="font-bold text-green-800">{startAge}세</span>
          </div>
        </div>
        
        {/* 절기 계산 정보 */}
        <div className="bg-white rounded-lg p-4 border-l-4 border-blue-400">
          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-600" />
            정확한 절기 계산 정보
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
            <div>
              <span className="font-medium">다음 월주 경계까지:</span> 
              <span className="ml-1 font-bold text-blue-700">{daysTillNextTerm}일</span>
            </div>
            <div>
              <span className="font-medium">다음 절기 예상일:</span> 
              <span className="ml-1 font-bold text-blue-700">{nextTermDate}</span>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            ※ 3일법 적용: 절기까지의 일수 ÷ 3 = 대운 시작 연수
          </div>
        </div>
        
        {/* 성별에 따른 운의 흐름 */}
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
          <div className="text-sm">
            <span className="font-semibold text-purple-800">운세 흐름 특성:</span>
            <p className="text-purple-700 mt-1">{genderFortuneFlow}</p>
          </div>
        </div>
        
        {/* 현재 대운 강조 */}
        {currentDaewoon && (
          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-yellow-300 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-gray-800">현재 대운</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-600">대운:</span> 
                <span className="font-bold ml-2" style={{ color: getElementColor(currentDaewoon.element) }}>
                  제{currentDaewoon.order}대운 {currentDaewoon.pillar} ({currentDaewoon.hanja})
                </span>
              </div>
              <div>
                <span className="text-gray-600">기간:</span> 
                <span className="font-bold ml-2 text-blue-700">
                  {currentDaewoon.startAge}-{currentDaewoon.endAge}세 ({currentAge}세)
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 8개 대운표 */}
      <div className="grid gap-4">
        {daewoons.map((daewoon, index) => {
          const relation = analyzeDaewoonRelation(daewoon.element, birthElement);
          const isCurrent = currentAge >= daewoon.startAge && currentAge <= daewoon.endAge;
          
          return (
            <div
              key={index}
              className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                isCurrent 
                  ? 'border-yellow-400 bg-yellow-50 shadow-lg transform scale-[1.02]' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between">
                {/* 대운 정보 */}
                <div className="flex items-center gap-6">
                  {/* 대운 기둥 */}
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">제{daewoon.order}대운</div>
                    <div 
                      className="text-3xl font-bold px-4 py-3 rounded-lg shadow-sm"
                      style={{
                        backgroundColor: getElementBg(daewoon.element),
                        color: getElementColor(daewoon.element)
                      }}
                    >
                      {daewoon.pillar}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <div>{daewoon.hanja}</div>
                      <div>{daewoon.stem}({daewoon.element}) {daewoon.branch}</div>
                    </div>
                  </div>
                  
                  {/* 나이/년도 정보 */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-700">
                        {daewoon.startAge}세 - {daewoon.endAge}세
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {daewoon.startYear}년 - {daewoon.endYear}년
                    </div>
                    
                    {/* 십신 관계 */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: relation.color }}
                      >
                        {relation.type}
                      </span>
                      <span className="text-xs text-gray-600">{relation.desc}</span>
                    </div>
                  </div>
                </div>
                
                {/* 대운 설명 */}
                <div className="flex-1 max-w-md ml-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-semibold text-gray-800 mb-2">운세 특징</h5>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {daewoon.description}
                    </p>
                    <div className="text-xs text-gray-500 bg-white rounded p-2">
                      <strong>조언:</strong> {relation.advice}
                    </div>
                  </div>
                </div>
                
                {/* 상태 표시 */}
                <div className="text-right">
                  {isCurrent && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-bold shadow-md">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      진행중
                    </div>
                  )}
                </div>
              </div>
              
              {/* 진행 바 (현재 대운인 경우) */}
              {isCurrent && (
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>{daewoon.startAge}세</span>
                    <span className="font-bold text-yellow-600">현재: {currentAge}세</span>
                    <span>{daewoon.endAge}세</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500"
                      style={{
                        width: `${((currentAge - daewoon.startAge) / (daewoon.endAge - daewoon.startAge)) * 100}%`
                      }}
                    ></div>
                  </div>
                  <div className="text-center mt-2 text-xs text-yellow-600 font-medium">
                    {Math.round(((currentAge - daewoon.startAge) / (daewoon.endAge - daewoon.startAge)) * 100)}% 진행
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* 십신 해석 가이드 */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
        <h4 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5" />
          십신(十神) 해석 가이드
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-6 bg-purple-500 rounded text-white text-xs text-center leading-6 font-bold">비견</span>
              <span className="text-gray-700">자립, 독립, 동업, 경쟁의 시기</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-6 bg-green-500 rounded text-white text-xs text-center leading-6 font-bold">식상</span>
              <span className="text-gray-700">창작, 표현, 자식운, 재능 발휘의 시기</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-6 bg-yellow-500 rounded text-white text-xs text-center leading-6 font-bold">재성</span>
              <span className="text-gray-700">재물, 물질, 배우자운, 투자의 시기</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-6 bg-red-500 rounded text-white text-xs text-center leading-6 font-bold">관성</span>
              <span className="text-gray-700">지위, 명예, 책임, 권위의 시기</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-6 bg-blue-500 rounded text-white text-xs text-center leading-6 font-bold">인성</span>
              <span className="text-gray-700">학습, 성장, 도움, 정신력의 시기</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block w-12 h-6 bg-gray-500 rounded text-white text-xs text-center leading-6 font-bold">기타</span>
              <span className="text-gray-700">중성적이고 균형잡힌 시기</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded-lg border border-purple-100">
          <p className="text-xs text-purple-700 leading-relaxed">
            <strong>💡 활용 팁:</strong> 각 대운의 십신 성격을 파악하여 그 시기에 맞는 계획과 목표를 세우면 더 좋은 결과를 얻을 수 있습니다. 
            현재 대운의 특성을 잘 활용하고, 미래 대운을 미리 준비하는 것이 중요합니다.
          </p>
        </div>
      </div>
    </div>
  );
};