import React, { useState } from 'react';
import { Calendar, MapPin, Clock, User, Sparkles, Star, Moon, Sun } from 'lucide-react';

export const InputForm = ({ birthInfo, setBirthInfo, onSubmit, cityLongitudes }) => {
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field, value) => {
    setBirthInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-yellow-300 opacity-30">
          <Star size={24} className="animate-pulse" />
        </div>
        <div className="absolute top-20 right-20 text-blue-300 opacity-30">
          <Moon size={32} className="animate-bounce" />
        </div>
        <div className="absolute bottom-20 left-20 text-pink-300 opacity-30">
          <Sparkles size={28} className="animate-pulse" />
        </div>
        <div className="absolute bottom-10 right-10 text-orange-300 opacity-30">
          <Sun size={36} className="animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        
        {/* 떠다니는 별들 */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-200 opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Star size={8 + Math.random() * 16} className="animate-pulse" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-3">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 w-full max-w-2xl border border-white/20">
          {/* 헤더 */}
          <div className="text-center mb-6">
            <div className="flex justify-center items-center gap-2 mb-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Sparkles className="text-white" size={24} />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                사주만세력
              </h1>
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                <Star className="text-white" size={24} />
              </div>
            </div>
            <p className="text-gray-600 text-base">✨ 당신의 운명을 정확하게 분석해드립니다 ✨</p>
            <div className="h-1 w-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-2"></div>
          </div>

          {/* 입력 폼 */}
          <div className="space-y-4">
            {/* 출생 년월일 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-2xl border border-blue-200">
              <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Calendar className="text-blue-600" size={18} />
                출생 년월일
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">년도</label>
                  <input
                    type="number"
                    value={birthInfo.year}
                    onChange={(e) => handleChange('year', e.target.value)}
                    onFocus={() => setFocusedField('year')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="1990"
                    min="1900"
                    max="2100"
                    className={`w-full px-3 py-2 border-2 rounded-xl transition-all duration-300 ${
                      focusedField === 'year' 
                        ? 'border-purple-500 shadow-lg shadow-purple-200 bg-white' 
                        : 'border-gray-200 bg-white/80'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">월</label>
                  <select
                    value={birthInfo.month}
                    onChange={(e) => handleChange('month', e.target.value)}
                    onFocus={() => setFocusedField('month')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-2 border-2 rounded-xl transition-all duration-300 ${
                      focusedField === 'month' 
                        ? 'border-purple-500 shadow-lg shadow-purple-200 bg-white' 
                        : 'border-gray-200 bg-white/80'
                    }`}
                  >
                    <option value="">월 선택</option>
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}월</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">일</label>
                  <select
                    value={birthInfo.day}
                    onChange={(e) => handleChange('day', e.target.value)}
                    onFocus={() => setFocusedField('day')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-3 py-2 border-2 rounded-xl transition-all duration-300 ${
                      focusedField === 'day' 
                        ? 'border-purple-500 shadow-lg shadow-purple-200 bg-white' 
                        : 'border-gray-200 bg-white/80'
                    }`}
                  >
                    <option value="">일 선택</option>
                    {Array.from({length: 31}, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}일</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 출생 시간 & 성별 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-2xl border border-green-200">
                <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Clock className="text-green-600" size={18} />
                  출생 시간
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">시</label>
                    <select
                      value={birthInfo.hour}
                      onChange={(e) => handleChange('hour', e.target.value)}
                      onFocus={() => setFocusedField('hour')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3 py-2 border-2 rounded-xl transition-all duration-300 ${
                        focusedField === 'hour' 
                          ? 'border-green-500 shadow-lg shadow-green-200 bg-white' 
                          : 'border-gray-200 bg-white/80'
                      }`}
                    >
                      <option value="">시 선택</option>
                      {Array.from({length: 24}, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}시</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">분</label>
                    <select
                      value={birthInfo.minute}
                      onChange={(e) => handleChange('minute', e.target.value)}
                      onFocus={() => setFocusedField('minute')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-3 py-2 border-2 rounded-xl transition-all duration-300 ${
                        focusedField === 'minute' 
                          ? 'border-green-500 shadow-lg shadow-green-200 bg-white' 
                          : 'border-gray-200 bg-white/80'
                      }`}
                    >
                      <option value="0">00분</option>
                      {Array.from({length: 60}, (_, i) => (
                        <option key={i} value={i}>{i.toString().padStart(2, '0')}분</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-2xl border border-pink-200">
                <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <User className="text-pink-600" size={18} />
                  성별
                </h3>
                <div className="flex gap-4 justify-center mt-4">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={birthInfo.gender === 'male'}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-300 ${
                      birthInfo.gender === 'male' 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-300 group-hover:border-blue-400'
                    }`}>
                      {birthInfo.gender === 'male' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`font-medium transition-colors ${
                      birthInfo.gender === 'male' ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      남성 👨
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={birthInfo.gender === 'female'}
                      onChange={(e) => handleChange('gender', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center transition-all duration-300 ${
                      birthInfo.gender === 'female' 
                        ? 'border-pink-500 bg-pink-500' 
                        : 'border-gray-300 group-hover:border-pink-400'
                    }`}>
                      {birthInfo.gender === 'female' && (
                        <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className={`font-medium transition-colors ${
                      birthInfo.gender === 'female' ? 'text-pink-600' : 'text-gray-700'
                    }`}>
                      여성 👩
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* 출생지 */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-2xl border border-orange-200">
              <h3 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
                <MapPin className="text-orange-600" size={18} />
                출생지
                <span className="text-sm text-gray-500 font-normal">(정확한 시간 보정)</span>
              </h3>
              <select
                value={birthInfo.city}
                onChange={(e) => handleChange('city', e.target.value)}
                onFocus={() => setFocusedField('city')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-3 py-2 border-2 rounded-xl transition-all duration-300 ${
                  focusedField === 'city' 
                    ? 'border-orange-500 shadow-lg shadow-orange-200 bg-white' 
                    : 'border-gray-200 bg-white/80'
                }`}
              >
                {Object.entries(cityLongitudes).map(([key, city]) => (
                  <option key={key} value={key}>{city.name}</option>
                ))}
              </select>
            </div>

            {/* 주의사항 */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-4 shadow-lg">
              <h4 className="font-bold text-amber-800 mb-2 flex items-center gap-2">
                <Sparkles className="text-amber-600" size={16} />
                🌟 정확한 분석을 위한 안내사항
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-amber-700">
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">✨</span>
                  <span>출생 시간은 24시간 기준</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">🌍</span>
                  <span>출생지별 시간 자동 보정</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">🎯</span>
                  <span>1분 단위 정밀 분석</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-500">📅</span>
                  <span>절기 기준 정확한 사주</span>
                </div>
              </div>
            </div>

            {/* 제출 버튼 */}
            <div className="relative">
              <button
                onClick={onSubmit}
                className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-400/50 transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="animate-pulse" size={20} />
                  🔮 사주 운명 분석하기 🌟
                  <Star className="animate-spin" size={20} style={{ animationDuration: '3s' }} />
                </div>
              </button>
              
              {/* 버튼 주변 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-2xl blur-md opacity-30 -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* 하단 정보 */}
          <div className="mt-4 text-center">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3 border border-indigo-200">
              <p className="text-indigo-800 font-medium text-sm">🎌 정밀 절기 계산 • 🌏 출생지 경도 보정 • 🔬 과학적 사주 분석</p>
              <div className="flex justify-center items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};