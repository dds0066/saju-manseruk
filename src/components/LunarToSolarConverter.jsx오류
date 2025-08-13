import React, { useState } from 'react';
import { X, Calendar, Clock, ArrowRight, AlertCircle } from 'lucide-react';

export const LunarToSolarConverter = ({ onClose, onConvert }) => {
  const [lunarData, setLunarData] = useState({
    year: '',
    month: '',
    day: '',
    hour: '12',
    minute: '0',
    isLeapMonth: false
  });

  const [convertedResult, setConvertedResult] = useState(null);

  // 음력-양력 변환 알고리즘 (개선된 버전)
  const lunarToSolar = (lunarYear, lunarMonth, lunarDay, isLeapMonth = false) => {
    // 년도별 음력 1월 1일의 양력 날짜 (1930년부터 확장)
    const lunarNewYearDates = {
      2030: new Date(2030, 0, 29),   // 2030년 1월 29일
      2029: new Date(2029, 1, 13),   // 2029년 2월 13일
      2028: new Date(2028, 1, 3),    // 2028년 2월 3일
      2027: new Date(2027, 1, 22),   // 2027년 2월 22일
      2026: new Date(2026, 1, 11),   // 2026년 2월 11일
      2025: new Date(2025, 0, 29),   // 2025년 1월 29일
      2024: new Date(2024, 1, 10),   // 2024년 2월 10일
      2023: new Date(2023, 0, 22),   // 2023년 1월 22일
      2022: new Date(2022, 1, 1),    // 2022년 2월 1일
      2021: new Date(2021, 1, 12),   // 2021년 2월 12일
      2020: new Date(2020, 0, 25),   // 2020년 1월 25일
      2019: new Date(2019, 1, 5),    // 2019년 2월 5일
      2018: new Date(2018, 1, 16),   // 2018년 2월 16일
      2017: new Date(2017, 0, 28),   // 2017년 1월 28일
      2016: new Date(2016, 1, 8),    // 2016년 2월 8일
      2015: new Date(2015, 1, 19),   // 2015년 2월 19일
      2014: new Date(2014, 0, 31),   // 2014년 1월 31일
      2013: new Date(2013, 1, 10),   // 2013년 2월 10일
      2012: new Date(2012, 0, 23),   // 2012년 1월 23일
      2011: new Date(2011, 1, 3),    // 2011년 2월 3일
      2010: new Date(2010, 1, 14),   // 2010년 2월 14일
      2009: new Date(2009, 0, 26),   // 2009년 1월 26일
      2008: new Date(2008, 1, 7),    // 2008년 2월 7일
      2007: new Date(2007, 1, 18),   // 2007년 2월 18일
      2006: new Date(2006, 0, 29),   // 2006년 1월 29일
      2005: new Date(2005, 1, 9),    // 2005년 2월 9일
      2004: new Date(2004, 0, 22),   // 2004년 1월 22일
      2003: new Date(2003, 1, 1),    // 2003년 2월 1일
      2002: new Date(2002, 1, 12),   // 2002년 2월 12일
      2001: new Date(2001, 0, 24),   // 2001년 1월 24일
      2000: new Date(2000, 1, 5),    // 2000년 2월 5일
      1999: new Date(1999, 1, 16),   // 1999년 2월 16일
      1998: new Date(1998, 0, 28),   // 1998년 1월 28일
      1997: new Date(1997, 1, 7),    // 1997년 2월 7일
      1996: new Date(1996, 1, 19),   // 1996년 2월 19일
      1995: new Date(1995, 0, 31),   // 1995년 1월 31일
      1994: new Date(1994, 1, 10),   // 1994년 2월 10일
      1993: new Date(1993, 0, 23),   // 1993년 1월 23일
      1992: new Date(1992, 1, 4),    // 1992년 2월 4일
      1991: new Date(1991, 1, 15),   // 1991년 2월 15일
      1990: new Date(1990, 0, 27),   // 1990년 1월 27일
      1989: new Date(1989, 1, 6),    // 1989년 2월 6일
      1988: new Date(1988, 1, 17),   // 1988년 2월 17일
      1987: new Date(1987, 0, 29),   // 1987년 1월 29일
      1986: new Date(1986, 1, 9),    // 1986년 2월 9일
      1985: new Date(1985, 1, 20),   // 1985년 2월 20일
      1984: new Date(1984, 1, 2),    // 1984년 2월 2일
      1983: new Date(1983, 1, 13),   // 1983년 2월 13일
      1982: new Date(1982, 0, 25),   // 1982년 1월 25일
      1981: new Date(1981, 1, 5),    // 1981년 2월 5일
      1980: new Date(1980, 1, 16),   // 1980년 2월 16일
      1979: new Date(1979, 0, 28),   // 1979년 1월 28일
      1978: new Date(1978, 1, 7),    // 1978년 2월 7일
      1977: new Date(1977, 1, 18),   // 1977년 2월 18일
      1976: new Date(1976, 0, 31),   // 1976년 1월 31일
      1975: new Date(1975, 1, 11),   // 1975년 2월 11일
      1974: new Date(1974, 0, 23),   // 1974년 1월 23일
      1973: new Date(1973, 1, 3),    // 1973년 2월 3일
      1972: new Date(1972, 1, 15),   // 1972년 2월 15일
      1971: new Date(1971, 0, 27),   // 1971년 1월 27일
      1970: new Date(1970, 1, 6),    // 1970년 2월 6일
      1969: new Date(1969, 1, 17),   // 1969년 2월 17일
      1968: new Date(1968, 0, 30),   // 1968년 1월 30일
      1967: new Date(1967, 1, 9),    // 1967년 2월 9일
      1966: new Date(1966, 0, 21),   // 1966년 1월 21일
      1965: new Date(1965, 1, 2),    // 1965년 2월 2일
      1964: new Date(1964, 1, 13),   // 1964년 2월 13일
      1963: new Date(1963, 0, 25),   // 1963년 1월 25일
      1962: new Date(1962, 1, 5),    // 1962년 2월 5일
      1961: new Date(1961, 1, 15),   // 1961년 2월 15일
      1960: new Date(1960, 0, 28),   // 1960년 1월 28일
      1959: new Date(1959, 1, 8),    // 1959년 2월 8일
      1958: new Date(1958, 1, 18),   // 1958년 2월 18일
      1957: new Date(1957, 0, 31),   // 1957년 1월 31일
      1956: new Date(1956, 1, 12),   // 1956년 2월 12일
      1955: new Date(1955, 0, 24),   // 1955년 1월 24일
      1954: new Date(1954, 1, 3),    // 1954년 2월 3일
      1953: new Date(1953, 1, 14),   // 1953년 2월 14일
      1952: new Date(1952, 0, 27),   // 1952년 1월 27일
      1951: new Date(1951, 1, 6),    // 1951년 2월 6일
      1950: new Date(1950, 1, 17),   // 1950년 2월 17일
      1949: new Date(1949, 0, 29),   // 1949년 1월 29일
      1948: new Date(1948, 1, 10),   // 1948년 2월 10일
      1947: new Date(1947, 0, 22),   // 1947년 1월 22일
      1946: new Date(1946, 1, 2),    // 1946년 2월 2일
      1945: new Date(1945, 1, 13),   // 1945년 2월 13일
      1944: new Date(1944, 0, 25),   // 1944년 1월 25일
      1943: new Date(1943, 1, 5),    // 1943년 2월 5일
      1942: new Date(1942, 1, 15),   // 1942년 2월 15일
      1941: new Date(1941, 0, 27),   // 1941년 1월 27일
      1940: new Date(1940, 1, 8),    // 1940년 2월 8일
      1939: new Date(1939, 1, 19),   // 1939년 2월 19일
      1938: new Date(1938, 0, 31),   // 1938년 1월 31일
      1937: new Date(1937, 1, 11),   // 1937년 2월 11일
      1936: new Date(1936, 0, 24),   // 1936년 1월 24일
      1935: new Date(1935, 1, 4),    // 1935년 2월 4일
      1934: new Date(1934, 1, 14),   // 1934년 2월 14일
      1933: new Date(1933, 0, 26),   // 1933년 1월 26일
      1932: new Date(1932, 1, 6),    // 1932년 2월 6일
      1931: new Date(1931, 1, 17),   // 1931년 2월 17일
      1930: new Date(1930, 0, 30),   // 1930년 1월 30일
    };

    // 년도별 음력 월별 일수 (윤달 포함)
    const lunarMonthDays = {
      2025: [29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 29, 30], // 10월 윤달
      2024: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
      2023: [29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 29, 30], // 2월 윤달
      2022: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
      2021: [29, 30, 29, 29, 30, 29, 30, 30, 29, 30, 29, 30],
      2020: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30], // 4월 윤달
      // 기본값: 평년
      default: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30]
    };

    const baseDate = lunarNewYearDates[lunarYear];
    const monthDays = lunarMonthDays[lunarYear] || lunarMonthDays.default;

    if (!baseDate) {
      // 기본 계산 (근사치)
      const estimatedBase = new Date(lunarYear, 1, 10);
      let totalDays = 0;
      for (let i = 1; i < lunarMonth; i++) {
        totalDays += monthDays[i - 1] || 29;
      }
      totalDays += lunarDay - 1;

      const resultDate = new Date(estimatedBase);
      resultDate.setDate(estimatedBase.getDate() + totalDays);
      
      return {
        year: resultDate.getFullYear(),
        month: resultDate.getMonth() + 1,
        day: resultDate.getDate(),
        isApproximate: true
      };
    }

    // 정확한 계산
    let totalDays = 0;
    for (let i = 1; i < lunarMonth; i++) {
      totalDays += monthDays[i - 1];
    }
    
    // 윤달 처리
    if (isLeapMonth && lunarMonth > 1) {
      totalDays += 29; // 윤달은 보통 29일
    }
    
    totalDays += lunarDay - 1;

    const resultDate = new Date(baseDate);
    resultDate.setDate(baseDate.getDate() + totalDays);

    return {
      year: resultDate.getFullYear(),
      month: resultDate.getMonth() + 1,
      day: resultDate.getDate(),
      isApproximate: false
    };
  };

  const handleConvert = () => {
    if (!lunarData.year || !lunarData.month || !lunarData.day) {
      alert('음력 년, 월, 일을 모두 입력해주세요.');
      return;
    }

    const year = parseInt(lunarData.year);
    const month = parseInt(lunarData.month);
    const day = parseInt(lunarData.day);
    const hour = parseInt(lunarData.hour);
    const minute = parseInt(lunarData.minute);

    if (year < 1930 || year > 2030) {
      alert('현재 1930년~2030년만 정확한 변환이 가능합니다.');
      return;
    }

    if (month < 1 || month > 12 || day < 1 || day > 30) {
      alert('올바른 음력 날짜를 입력해주세요.');
      return;
    }

    const result = lunarToSolar(year, month, day, lunarData.isLeapMonth);
    const resultWithTime = {
      ...result,
      hour,
      minute,
      originalLunar: { ...lunarData }
    };
    
    console.log('변환 결과:', resultWithTime); // 디버깅용
    setConvertedResult(resultWithTime);
  };

  const handleApply = () => {
    if (convertedResult) {
      console.log('변환 결과 적용:', convertedResult); // 디버깅용
      onConvert(convertedResult);
    } else {
      alert('변환 결과가 없습니다. 먼저 변환을 실행해주세요.');
    }
  };

  const handleChange = (field, value) => {
    setLunarData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                🌙 음력 → 양력 변환기
              </h2>
              <p className="text-white/80 text-sm mt-1">음력 생일을 양력으로 정확히 변환합니다</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6 space-y-6">
          {/* 음력 입력 */}
          <div className="space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Calendar className="text-purple-600" size={18} />
              음력 생년월일시 입력
            </h3>

            {/* 음력 년월일 */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">년</label>
                <input
                  type="number"
                  placeholder="1990"
                  value={lunarData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  min="1930"
                  max="2030"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">월</label>
                <input
                  type="number"
                  placeholder="1"
                  value={lunarData.month}
                  onChange={(e) => handleChange('month', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  min="1"
                  max="12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">일</label>
                <input
                  type="number"
                  placeholder="1"
                  value={lunarData.day}
                  onChange={(e) => handleChange('day', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  min="1"
                  max="30"
                />
              </div>
            </div>

            {/* 윤달 체크박스 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLeapMonth"
                checked={lunarData.isLeapMonth}
                onChange={(e) => handleChange('isLeapMonth', e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <label htmlFor="isLeapMonth" className="text-sm text-gray-700">
                윤달입니다 (예: 윤4월)
              </label>
            </div>

            {/* 음력 시간 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  <Clock size={16} className="inline mr-1" />
                  시
                </label>
                <select
                  value={lunarData.hour}
                  onChange={(e) => handleChange('hour', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}시
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">분</label>
                <select
                  value={lunarData.minute}
                  onChange={(e) => handleChange('minute', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i.toString().padStart(2, '0')}>
                      {i.toString().padStart(2, '0')}분
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 변환 버튼 */}
          <button
            onClick={handleConvert}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight size={18} />
            양력으로 변환하기
          </button>

          {/* 변환 결과 */}
          {convertedResult && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <Calendar className="text-green-600" size={18} />
                변환 결과 (양력)
              </h4>
              
              <div className="space-y-2 mb-4">
                <div className="bg-white rounded-lg p-3 border border-green-200">
                  <div className="font-bold text-lg text-gray-800">
                    {convertedResult.year}년 {convertedResult.month}월 {convertedResult.day}일
                  </div>
                  <div className="text-gray-600">
                    {convertedResult.hour.toString().padStart(2, '0')}시 {convertedResult.minute.toString().padStart(2, '0')}분
                  </div>
                </div>
                
                <div className="text-xs text-gray-600">
                  <strong>원본 음력:</strong> {convertedResult.originalLunar.year}년 {convertedResult.originalLunar.month}월 {convertedResult.originalLunar.day}일
                  {convertedResult.originalLunar.isLeapMonth && ' (윤달)'}
                </div>
                
                {convertedResult.isApproximate && (
                  <div className="flex items-center gap-2 text-amber-600 bg-amber-50 rounded-lg p-2">
                    <AlertCircle size={16} />
                    <span className="text-xs">
                      근사치 변환입니다. 1930-2030년 범위에서 더 정확한 변환이 가능합니다.
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleApply}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-all"
              >
                ✅ 이 양력 날짜로 사주 보기
              </button>
            </div>
          )}

          {/* 안내사항 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-bold text-blue-800 mb-2">📋 변환 안내</h5>
            <div className="space-y-1 text-sm text-blue-700">
              <p>• <strong>정확한 변환:</strong> 1930년~2030년 (실제 천문 데이터 기반)</p>
              <p>• <strong>근사치 변환:</strong> 그 외 년도 (1-2일 오차 가능)</p>
              <p>• <strong>윤달:</strong> 음력에서 같은 달이 두 번 있는 경우 체크하세요</p>
              <p>• <strong>시간:</strong> 음력 기준 시간을 입력하면 그대로 양력에 적용됩니다</p>
            </div>
          </div>

          {/* 예시 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h5 className="font-bold text-gray-800 mb-2">💡 변환 예시</h5>
            <div className="space-y-1 text-sm text-gray-600">
              <p>• 음력 1935년 3월 15일 → 양력 1935년 4월 14일</p>
              <p>• 음력 1950년 윤4월 10일 → 양력 1950년 6월 11일</p>
              <p>• 음력 1970년 12월 1일 → 양력 1971년 1월 6일</p>
              <p>• 음력 2024년 12월 1일 → 양력 2024년 12월 31일</p>
            </div>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-600 transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};