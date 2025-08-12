import React, { useState, useEffect } from 'react';
import { 
  Calendar, Star, Sparkles, Moon, Sun, Heart, TrendingUp, 
  Shield, Zap, Book, RotateCcw, User, Compass, BarChart3, 
  Crown, Target, Flame, Award, ChevronDown, ChevronUp, AlertTriangle
} from 'lucide-react';
import { BasicSajuTab } from './tabs/BasicSajuTab';
import { PersonalityTab } from './tabs/PersonalityTab';
import { ElementsTab } from './tabs/ElementsTab';
import { FortuneTab } from './tabs/FortuneTab';
import { SewoonTab } from './tabs/SewoonTab';
import { FortuneGraphTab } from './tabs/FortuneGraphTab';
import { analyzeElementsWithHidden } from '../utils/elementAnalysis';
import { analyzeSipsin } from '../utils/sipsinAnalysis';
import { 
  analyzeSewoonWithYongsin, 
  evaluateOverallFortuneWithYongsin 
} from '../utils/enhancedFortuneCalculator';

export const ResultDisplay = ({ result, birthInfo, onReset }) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [selectedDaewoon, setSelectedDaewoon] = useState(null);
  const [expandedYear, setExpandedYear] = useState(null);
  const [selectedYongsin, setSelectedYongsin] = useState(null);
  const [adjustedDaewoons, setAdjustedDaewoons] = useState([]);
  const [adjustedSewoonData, setAdjustedSewoonData] = useState([]);
  
  const { saju, personality, elements, specialStars, luckyInfo } = result;
  
  // 현재 나이 계산
  const currentYear = new Date().getFullYear();
  const currentAge = currentYear - parseInt(birthInfo.year) + 1; // 한국식 나이
  
  // 오행 분석 데이터 생성
  const elementAnalysis = analyzeElementsWithHidden(
    saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem,
    saju.yearBranch, saju.monthBranch, saju.dayBranch, saju.hourBranch
  );
  
  // 십신 분석 데이터 생성
  const sipsinAnalysis = analyzeSipsin(
    saju.yearStem, saju.monthStem, saju.dayStem, saju.hourStem,
    saju.yearBranch, saju.monthBranch, saju.dayBranch, saju.hourBranch
  );

  // 초기 용신 설정 (AI 추천)
  useEffect(() => {
    if (!selectedYongsin && elementAnalysis.analysis) {
      const { dayElementStrength, weakestElement } = elementAnalysis.analysis;
      let recommendedYongsin;
      
      if (dayElementStrength <= 1.5) {
        const relations = {
          '목': '수', '화': '목', '토': '화', '금': '토', '수': '금'
        };
        recommendedYongsin = relations[saju.mainElement];
      } else if (dayElementStrength >= 3) {
        const relations = {
          '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
        };
        recommendedYongsin = relations[saju.mainElement];
      } else {
        recommendedYongsin = weakestElement.element;
      }
      
      setSelectedYongsin(recommendedYongsin);
    }
  }, [elementAnalysis, saju.mainElement, selectedYongsin]);

  // 용신 변경 시 대운과 세운 재계산
  useEffect(() => {
    if (selectedYongsin && saju.daewoon?.daewoons) {
      const newAdjustedDaewoons = evaluateOverallFortuneWithYongsin(
        saju.daewoon.daewoons, 
        selectedYongsin
      );
      setAdjustedDaewoons(newAdjustedDaewoons);
      
      const newSewoonData = analyzeSewoonWithYongsin(
        newAdjustedDaewoons,
        birthInfo.year,
        saju.dayStem,
        selectedYongsin
      );
      setAdjustedSewoonData(newSewoonData);
    }
  }, [selectedYongsin, saju.daewoon, birthInfo.year, saju.dayStem]);
  
  // 현재 대운 찾기
  const currentDaewoon = adjustedDaewoons.find(dw => 
    currentAge >= dw.startAge && currentAge <= dw.endAge
  ) || saju.daewoon?.daewoons?.find(dw => 
    currentAge >= dw.startAge && currentAge <= dw.endAge
  );

  const handleYongsinChange = (newYongsin) => {
    setSelectedYongsin(newYongsin);
    setSelectedDaewoon(null);
    setExpandedYear(null);
  };
  
  const tabs = [
    { id: 'basic', label: '기본 사주', icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { id: 'personality', label: '십신 분석', icon: User, color: 'from-green-500 to-emerald-500' },
    { id: 'elements', label: '오행/용신', icon: BarChart3, color: 'from-purple-500 to-violet-500' },
    { id: 'fortune', label: '대운 분석', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
    { id: 'graph', label: '운세 그래프', icon: BarChart3, color: 'from-indigo-500 to-purple-500' },
    { id: 'sewoon', label: '세운 분석', icon: Zap, color: 'from-pink-500 to-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-200 opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`
            }}
          >
            <Star size={4 + Math.random() * 12} className="animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-4">
        {/* 헤더 */}
        <div className="text-center mb-8 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse">
              <Crown className="text-white" size={32} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
              🔮 사주만세력 📜
            </h1>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse">
              <Star className="text-white" size={32} />
            </div>
          </div>
          <div className="text-white/90 text-lg space-y-1">
            <p className="font-semibold">
              {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일 {birthInfo.hour}시 {birthInfo.minute}분 출생
            </p>
            <p className="text-sm">
              📍 {saju.cityName} • ⏰ {saju.correctionInfo.originalTime} → {saju.correctionInfo.correctedTime} (보정시간)
            </p>
            <p className="text-sm text-yellow-300">
              현재 {currentAge}세 • {currentDaewoon ? `${currentDaewoon.pillar} 대운` : '대운 계산 중'}
            </p>
          </div>
          <div className="h-1 w-64 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-full mx-auto mt-4"></div>
        </div>

        {/* 탭 네비게이션 */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
            <div className="flex gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg shadow-black/20 scale-105`
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 탭 콘텐츠 */}
        <div className="space-y-6">
          {activeTab === 'basic' && (
            <BasicSajuTab 
              saju={saju}
              personality={personality}
              specialStars={specialStars}
              luckyInfo={luckyInfo}
            />
          )}

          {activeTab === 'personality' && (
            <PersonalityTab 
              saju={saju}
              sipsinAnalysis={sipsinAnalysis}
            />
          )}

          {activeTab === 'elements' && (
            <ElementsTab
              saju={saju}
              elementAnalysis={elementAnalysis}
              selectedYongsin={selectedYongsin}
              setSelectedYongsin={setSelectedYongsin}
              onYongsinChange={handleYongsinChange}
            />
          )}

          {activeTab === 'fortune' && (
            <FortuneTab
              saju={saju}
              currentAge={currentAge}
              selectedYongsin={selectedYongsin}
              adjustedDaewoons={adjustedDaewoons}
            />
          )}

          {activeTab === 'graph' && (
            <FortuneGraphTab
              birthInfo={birthInfo}
              selectedYongsin={selectedYongsin}
              adjustedDaewoons={adjustedDaewoons}
              currentAge={currentAge}
            />
          )}

          {activeTab === 'sewoon' && (
            <SewoonTab
              currentAge={currentAge}
              selectedYongsin={selectedYongsin}
              adjustedSewoonData={adjustedSewoonData}
              selectedDaewoon={selectedDaewoon}
              setSelectedDaewoon={setSelectedDaewoon}
              expandedYear={expandedYear}
              setExpandedYear={setExpandedYear}
            />
          )}
        </div>

        {/* 하단 리셋 버튼 */}
        <div className="text-center mt-12">
          <button
            onClick={onReset}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-xl hover:shadow-gray-400/50 transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
          >
            <RotateCcw size={24} />
            🔄 새로운 사주 분석하기
          </button>
        </div>
      </div>
    </div>
  );
};