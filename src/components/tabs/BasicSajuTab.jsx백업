import React from 'react';
import { Calendar, User, Target, Heart, Star, Sparkles } from 'lucide-react';

export const BasicSajuTab = ({ saju, personality, specialStars, luckyInfo }) => {
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
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300">
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