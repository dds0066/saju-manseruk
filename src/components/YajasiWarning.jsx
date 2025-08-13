import React, { useState } from 'react';
import { AlertTriangle, Clock, Calendar, ArrowRight, X } from 'lucide-react';

export const YajasiWarning = ({ yajasiInfo, onRecalculate, onDismiss }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!yajasiInfo || !yajasiInfo.hasYajasi) {
    return null;
  }

  const handleRecalculate = () => {
    if (onRecalculate && yajasiInfo.recommendedDate) {
      onRecalculate(yajasiInfo.recommendedDate);
    }
  };

  return (
    <div className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-2xl p-5 shadow-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex-shrink-0 mt-1">
            <AlertTriangle className="text-amber-600 animate-pulse" size={24} />
          </div>
          
          <div className="flex-1">
            <h4 className="font-bold text-amber-800 text-lg mb-3 flex items-center gap-2">
              ⏰ 야자시(夜子時) 안내
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-sm px-2 py-1 bg-amber-200 text-amber-800 rounded-full hover:bg-amber-300 transition-colors"
              >
                {showDetails ? '간단히' : '자세히'}
              </button>
            </h4>
            
            <div className="space-y-3">
              <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                <p className="text-amber-800 font-medium mb-2">
                  🌙 현재 보정된 시간이 <strong>23시대</strong>입니다.
                </p>
                <p className="text-amber-700 text-sm leading-relaxed">
                  야자시(23:00~23:59)는 전통 사주학에서 <strong>다음날 조자시(00:00~01:00)</strong>로 
                  바꾸어서 해석하는 것을 권장합니다.
                </p>
              </div>

              {showDetails && (
                <div className="bg-white/80 rounded-lg p-4 border border-amber-200">
                  <h5 className="font-semibold text-amber-800 mb-2">📚 야자시란?</h5>
                  <div className="space-y-2 text-sm text-amber-700">
                    <p>• <strong>야자시(夜子時):</strong> 밤 11시~12시 (23:00~23:59)</p>
                    <p>• <strong>조자시(朝子時):</strong> 새벽 12시~1시 (00:00~00:59)</p>
                    <p>• <strong>전통 해석:</strong> 야자시는 다음날의 조자시로 계산하여 사주를 봅니다.</p>
                    <p>• <strong>이유:</strong> 하루의 기운 변화가 자시(23시)부터 시작된다고 보기 때문입니다.</p>
                  </div>
                </div>
              )}

              {yajasiInfo.recommendedDate && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-300">
                  <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    🔄 권장 설정
                  </h5>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-green-700">
                      <div className="font-medium">
                        {yajasiInfo.recommendedDate.year}년 {yajasiInfo.recommendedDate.month}월 {yajasiInfo.recommendedDate.day}일
                      </div>
                      <div>
                        {yajasiInfo.recommendedDate.hour}시 {yajasiInfo.recommendedDate.minute.toString().padStart(2, '0')}분
                      </div>
                    </div>
                    <button
                      onClick={handleRecalculate}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                    >
                      <ArrowRight size={16} />
                      이 설정으로 다시 계산
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 text-xs text-amber-600">
                <span>💡</span>
                <span>
                  이는 전통 사주학의 관례이며, 현재 설정으로도 분석은 가능합니다. 
                  더 정확한 해석을 원하시면 권장 설정을 사용해보세요.
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 text-amber-600 hover:text-amber-800 hover:bg-amber-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};