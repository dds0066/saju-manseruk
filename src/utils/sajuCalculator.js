import { 
  heavenlyStems, 
  earthlyBranches, 
  zodiacAnimals, 
  solarTerms, 
  termsToMonthJiji, 
  solarTermsList 
} from '../constants/sajuData';
import { cityLongitudes } from '../constants/cityData';
import { getElement } from './characterAnalysis';
import { calculateDaewoonAccurate } from './accurateDaewoonCalculator';

// 진태양황경 계산 (Python 코드와 완전 동일)
const calculateTrueSolarLongitude = (date) => {
  // 2013년 1월 0일(2012년 12월 31일)를 기준으로 일수 차이 계산
  const baseDate = new Date(2012, 11, 31);
  const daysDiff = (date - baseDate) / (24 * 60 * 60 * 1000);
  
  // 태양의 평균경도 계산
  let L = 279.827287 + 0.98564736 * daysDiff;
  L = L % 360;
  
  // 태양의 근점이각 계산
  let M = 356.666444 + 0.98560028 * daysDiff;
  M = M % 360;
  
  // 라디안으로 변환
  const MRad = M * Math.PI / 180;
  
  // 이심율이각 계산
  const E = 1.919 * Math.sin(MRad) + 0.020 * Math.sin(2 * MRad) - 0.005 * Math.sin(MRad);
  
  // 진태양황경 계산
  let trueLongitude = L + E;
  trueLongitude = trueLongitude % 360;
  if (trueLongitude < 0) trueLongitude += 360;
  
  return trueLongitude;
};

// 이전 절기 찾기 - Python과 완전 동일
const findPreviousSolarTerm = (solarLongitude) => {
  const normalizedLongitude = solarLongitude % 360;
  let prevTermName = null;
  let prevTermAngle = -1;

  if (normalizedLongitude < 15) {
    for (const [termName, angle] of solarTermsList) {
      if (angle === 345) {
        prevTermName = termName;
        prevTermAngle = angle;
        break;
      }
    }
  } else {
    for (const [termName, angle] of solarTermsList) {
      if (angle <= normalizedLongitude && angle > prevTermAngle) {
        prevTermName = termName;
        prevTermAngle = angle;
      }
    }
  }

  if (!prevTermName) {
    const maxAngle = Math.max(...solarTermsList.map(([, angle]) => angle));
    for (const [termName, angle] of solarTermsList) {
      if (angle === maxAngle) {
        prevTermName = termName;
        break;
      }
    }
  }

  return [prevTermName, prevTermAngle];
};

// 년주 계산 (정확한 입춘 기준) - Python과 동일
const calculateYearPillar = (birthDate) => {
  let year = birthDate.getFullYear();
  
  // 입춘을 기준으로 연도 조정
  const solarLongitudeAtBirth = calculateTrueSolarLongitude(birthDate);
  
  // 입춘(315도) 이전이면 전년도로 계산
  if (solarLongitudeAtBirth < 315 && solarLongitudeAtBirth >= 270) {
    year -= 1;
  }
  
  // 60갑자 계산 (1864년 갑자년 기준) - Python과 동일
  const baseYearForGanji = 1864;
  const yearDiff = year - baseYearForGanji;
  const cheonganIdx = ((yearDiff % 10) + 10) % 10;
  const jijiIdx = ((yearDiff % 12) + 12) % 12;
  
  return [cheonganIdx, jijiIdx];
};

// 월주 계산 (정확한 절기 기준) - Python과 완전 동일
const calculateMonthPillarAccurate = (birthDate) => {
  const birthDateTime = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  // 출생일의 진태양황경 계산
  const birthSolarLongitude = calculateTrueSolarLongitude(birthDateTime);
  
  // 현재 절기 찾기
  const [currentTermName] = findPreviousSolarTerm(birthSolarLongitude);
  
  // 해당 절기에 맞는 지지 인덱스
  const monthJijiIdx = termsToMonthJiji[currentTermName] || 1;
  
  // 연간에 따른 월간 결정 - Python과 동일
  const [yearCheongan] = calculateYearPillar(birthDate);
  
  // 갑/기년 병인월, 을/경년 무인월, 병/신년 경인월, 정/임년 임인월, 무/계년 갑인월
  const firstMonthStems = [2, 4, 6, 8, 0]; // 병무경임갑
  const firstMonthStem = firstMonthStems[yearCheongan % 5];
  
  // 인월(2)부터의 오프셋 계산
  const offsetFromInMonth = (monthJijiIdx - 2 + 12) % 12;
  const monthCheongan = (firstMonthStem + offsetFromInMonth) % 10;
  
  return [monthCheongan, monthJijiIdx];
};

// 일주 계산 (1900년 1월 1일 갑술일 기준) - Python과 동일
const calculateDayPillar = (birthDate) => {
  const baseDate = new Date(1900, 0, 1);
  const baseDayCheongan = 0; // 갑
  const baseDayJiji = 10;    // 술
  
  const daysDiff = Math.floor((birthDate - baseDate) / (24 * 60 * 60 * 1000));
  
  const cheonganIdx = (baseDayCheongan + daysDiff) % 10;
  const jijiIdx = (baseDayJiji + daysDiff) % 12;
  
  return [cheonganIdx, jijiIdx];
};

// 시주 계산 (출생지 경도 보정 적용) - Python과 완전 동일
const calculateTimePillar = (birthDate, longitude = 126.9780) => {
  // 출생지 경도에 따른 시간 보정 - Python과 동일
  const standardLongitude = 135.0;
  const longitudeCorrectionMinutes = (standardLongitude - longitude) * 4;
  
  const totalMinutesOriginal = birthDate.getHours() * 60 + birthDate.getMinutes();
  const correctedMinutesLocalSolar = totalMinutesOriginal - longitudeCorrectionMinutes;
  
  // 보정된 날짜 및 시간 계산 - Python과 동일
  const baseOfDayDateTime = new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0);
  const correctedBirthDateTime = new Date(baseOfDayDateTime.getTime() + correctedMinutesLocalSolar * 60000);
  
  const correctedHour = correctedBirthDateTime.getHours();
  const correctedMinute = correctedBirthDateTime.getMinutes();
  const correctedDate = correctedBirthDateTime;
  
  // 시주 지지 계산 (30분 시차 보정) - Python과 동일
  const tempDtForJiji = new Date(correctedBirthDateTime.getTime() + 30 * 60000);
  const tempHour = tempDtForJiji.getHours();
  const timeJiji = Math.floor(tempHour / 2) % 12;
  
  // 시주 천간 계산: 일간에 따라 달라짐 (五鼠遁법) - Python과 동일
  const [actualDayPillarCheonganIdx] = calculateDayPillar(correctedBirthDateTime);
  
  let firstHourStem = -1;
  if ([0, 5].includes(actualDayPillarCheonganIdx)) { // 갑, 기
    firstHourStem = 0; // 甲子時
  } else if ([1, 6].includes(actualDayPillarCheonganIdx)) { // 을, 경
    firstHourStem = 2; // 丙子時
  } else if ([2, 7].includes(actualDayPillarCheonganIdx)) { // 병, 신
    firstHourStem = 4; // 戊子時
  } else if ([3, 8].includes(actualDayPillarCheonganIdx)) { // 정, 임
    firstHourStem = 6; // 庚子時
  } else if ([4, 9].includes(actualDayPillarCheonganIdx)) { // 무, 계
    firstHourStem = 8; // 壬子時
  }
  
  const timeCheongan = (firstHourStem + timeJiji) % 10;
  
  return {
    timeCheongan,
    timeJiji,
    correctedHour,
    correctedMinute,
    correctedDate
  };
};

// 메인 사주 계산 함수
export const calculateSaju = (year, month, day, hour, minute, cityKey, gender) => {
  const cityInfo = cityLongitudes[cityKey] || cityLongitudes.seoul;
  
  const birthDateTimeOriginal = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
  
  // 년주, 월주 계산
  const [yearCheonganIdx, yearJijiIdx] = calculateYearPillar(birthDateTimeOriginal);
  const [monthCheongan, monthJijiIdx] = calculateMonthPillarAccurate(birthDateTimeOriginal);
  
  // 시주 계산 (보정된 시간 및 날짜가 반환됨)
  const timeData = calculateTimePillar(birthDateTimeOriginal, cityInfo.longitude);
  
  // 일주 계산 (시주 계산에서 나온 보정된 날짜 기준)
  const [dayCheonganIdx, dayJijiIdx] = calculateDayPillar(timeData.correctedDate);

  // 진태양황경 정보
  const birthSolarLongitude = calculateTrueSolarLongitude(birthDateTimeOriginal);
  const [currentTerm] = findPreviousSolarTerm(birthSolarLongitude);
  
  // 사주년 계산 (입춘 기준)
  let sajuYear = parseInt(year);
  if (birthSolarLongitude < 315 && birthSolarLongitude >= 270) {
    sajuYear -= 1;
  }

  // 정확한 대운 계산 - Python과 완전 동일한 로직
  const daewoonData = calculateDaewoonAccurate(
    timeData.correctedDate, 
    gender, 
    timeData.correctedHour, 
    timeData.correctedMinute, 
    monthCheongan, 
    monthJijiIdx, 
    yearCheonganIdx
  );

  return {
    year: `${heavenlyStems[yearCheonganIdx]}${earthlyBranches[yearJijiIdx]}`,
    month: `${heavenlyStems[monthCheongan]}${earthlyBranches[monthJijiIdx]}`,
    day: `${heavenlyStems[dayCheonganIdx]}${earthlyBranches[dayJijiIdx]}`,
    hour: `${heavenlyStems[timeData.timeCheongan]}${earthlyBranches[timeData.timeJiji]}`,
    zodiac: zodiacAnimals[yearJijiIdx],
    mainElement: getElement(heavenlyStems[dayCheonganIdx]),
    yearElement: getElement(heavenlyStems[yearCheonganIdx]),
    monthElement: getElement(heavenlyStems[monthCheongan]),
    hourElement: getElement(heavenlyStems[timeData.timeCheongan]),
    yearStem: heavenlyStems[yearCheonganIdx],
    monthStem: heavenlyStems[monthCheongan],
    dayStem: heavenlyStems[dayCheonganIdx],
    hourStem: heavenlyStems[timeData.timeCheongan],
    yearBranch: earthlyBranches[yearJijiIdx],
    monthBranch: earthlyBranches[monthJijiIdx],
    dayBranch: earthlyBranches[dayJijiIdx],
    hourBranch: earthlyBranches[timeData.timeJiji],
    cityName: cityInfo.name,
    solarInfo: {
      birthSolarLongitude: Math.round(birthSolarLongitude * 100) / 100,
      currentTerm: currentTerm,
      sajuYear: sajuYear
    },
    correctionInfo: {
      cityName: cityInfo.name,
      longitude: cityInfo.longitude,
      correctionMinutes: Math.round(((135.0 - cityInfo.longitude) * 4) * 10) / 10,
      originalTime: `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
      correctedTime: `${timeData.correctedHour.toString().padStart(2, '0')}:${timeData.correctedMinute.toString().padStart(2, '0')}`,
      correctedDate: timeData.correctedDate.toLocaleDateString('ko-KR')
    },
    daewoon: daewoonData
  };
};