import React from 'react';
import { getElementColors } from '../utils/elementAnalysis';

export const RadialChart = ({ elementData, size = 300 }) => {
  const { elementPercentage, elementCount } = elementData;
  const colors = getElementColors();
  const center = size / 2;
  const maxRadius = center - 40;
  const elements = ['목', '화', '토', '금', '수'];
  
  // 방사형 그래프를 위한 좌표 계산
  const getCoordinates = (angle, radius) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(radian),
      y: center + radius * Math.sin(radian)
    };
  };
  
  // 각 오행의 각도 (72도씩)
  const getAngle = (index) => index * 72;
  
  // 반지름 계산 (최대값을 기준으로 정규화)
  const maxCount = Math.max(...Object.values(elementCount));
  const getRadius = (count) => (count / maxCount) * maxRadius * 0.8;
  
  // 폴리곤 포인트들 생성
  const polygonPoints = elements.map((element, index) => {
    const angle = getAngle(index);
    const radius = getRadius(elementCount[element]);
    return getCoordinates(angle, radius);
  }).map(coord => `${coord.x},${coord.y}`).join(' ');
  
  // 격자선 원들 (20%, 40%, 60%, 80%, 100%)
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0].map(ratio => ({
    radius: maxRadius * 0.8 * ratio,
    opacity: ratio === 1.0 ? 0.3 : 0.1
  }));
  
  // 격자선 (각 오행 방향)
  const gridLines = elements.map((element, index) => {
    const angle = getAngle(index);
    const startCoord = getCoordinates(angle, 0);
    const endCoord = getCoordinates(angle, maxRadius * 0.8);
    return { start: startCoord, end: endCoord };
  });
  
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {/* 배경 원 */}
        <circle
          cx={center}
          cy={center}
          r={maxRadius * 0.8}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        
        {/* 격자선 원들 */}
        {gridCircles.map((circle, index) => (
          <circle
            key={index}
            cx={center}
            cy={center}
            r={circle.radius}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="1"
            opacity={circle.opacity}
          />
        ))}
        
        {/* 격자선 */}
        {gridLines.map((line, index) => (
          <line
            key={index}
            x1={line.start.x}
            y1={line.start.y}
            x2={line.end.x}
            y2={line.end.y}
            stroke="#d1d5db"
            strokeWidth="1"
            opacity="0.3"
          />
        ))}
        
        {/* 오행 데이터 폴리곤 */}
        <polygon
          points={polygonPoints}
          fill="rgba(99, 102, 241, 0.2)"
          stroke="#6366f1"
          strokeWidth="2"
        />
        
        {/* 각 오행 포인트 */}
        {elements.map((element, index) => {
          const angle = getAngle(index);
          const radius = getRadius(elementCount[element]);
          const coord = getCoordinates(angle, radius);
          
          return (
            <g key={element}>
              <circle
                cx={coord.x}
                cy={coord.y}
                r="6"
                fill={colors[element]}
                stroke="white"
                strokeWidth="2"
              />
            </g>
          );
        })}
        
        {/* 오행 라벨 */}
        {elements.map((element, index) => {
          const angle = getAngle(index);
          const labelRadius = maxRadius * 0.9;
          const coord = getCoordinates(angle, labelRadius);
          
          return (
            <g key={`label-${element}`}>
              <text
                x={coord.x}
                y={coord.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="bold"
                fill={colors[element]}
              >
                {element}
              </text>
              <text
                x={coord.x}
                y={coord.y + 16}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill="#6b7280"
              >
                {elementPercentage[element]}%
              </text>
            </g>
          );
        })}
        
        {/* 중앙 라벨 */}
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="bold"
          fill="#374151"
        >
          오행 분포
        </text>
        <text
          x={center}
          y={center + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="#6b7280"
        >
          (지장간 포함)
        </text>
      </svg>
      
      {/* 범례 */}
      <div className="grid grid-cols-5 gap-2 text-sm">
        {elements.map(element => (
          <div key={element} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: colors[element] }}
            ></div>
            <span className="text-xs">
              {element}: {elementCount[element].toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};