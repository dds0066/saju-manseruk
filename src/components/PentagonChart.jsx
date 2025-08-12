import React from 'react';

export const PentagonChart = ({ data, title = "오행 균형 분석" }) => {
  const size = 300;
  const center = size / 2;
  const radius = 100;
  
  // 오각형 꼭짓점 계산 (12시 방향부터 시계방향)
  const getPoint = (index, radiusMultiplier = 1) => {
    const angle = (index * 72 - 90) * (Math.PI / 180); // -90도로 12시 방향부터 시작
    const x = center + Math.cos(angle) * radius * radiusMultiplier;
    const y = center + Math.sin(angle) * radius * radiusMultiplier;
    return { x, y };
  };
  
  // 외곽 오각형 경로
  const outerPentagon = data.map((_, index) => getPoint(index));
  const outerPath = `M ${outerPentagon[0].x} ${outerPentagon[0].y} ` +
    outerPentagon.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';
  
  // 데이터 오각형 경로 (값에 따라 크기 조절)
  const maxValue = Math.max(...data.map(d => d.value));
  const dataPoints = data.map((item, index) => {
    const ratio = maxValue > 0 ? item.value / maxValue : 0;
    return getPoint(index, ratio);
  });
  const dataPath = `M ${dataPoints[0].x} ${dataPoints[0].y} ` +
    dataPoints.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';
  
  // 격자선 (동심원들)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];
  
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      
      <svg width={size} height={size} className="mb-4">
        {/* 격자선 */}
        {gridLevels.map((level, levelIndex) => {
          const gridPoints = data.map((_, index) => getPoint(index, level));
          const gridPath = `M ${gridPoints[0].x} ${gridPoints[0].y} ` +
            gridPoints.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';
          
          return (
            <path
              key={levelIndex}
              d={gridPath}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              opacity={0.5}
            />
          );
        })}
        
        {/* 중심에서 각 꼭짓점으로의 선 */}
        {outerPentagon.map((point, index) => (
          <line
            key={index}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}
        
        {/* 외곽 오각형 */}
        <path
          d={outerPath}
          fill="none"
          stroke="#9ca3af"
          strokeWidth="2"
        />
        
        {/* 데이터 오각형 */}
        <path
          d={dataPath}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* 데이터 포인트 */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            fill={data[index].color}
            stroke="white"
            strokeWidth="2"
          />
        ))}
        
        {/* 라벨 */}
        {data.map((item, index) => {
          const labelPoint = getPoint(index, 1.25);
          return (
            <g key={index}>
              <text
                x={labelPoint.x}
                y={labelPoint.y - 8}
                textAnchor="middle"
                className="text-sm font-semibold fill-gray-700"
              >
                {item.element}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 8}
                textAnchor="middle"
                className="text-xs fill-gray-500"
              >
                {item.value.toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>
      
      {/* 범례 */}
      <div className="grid grid-cols-5 gap-3 w-full max-w-md">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div 
              className="w-4 h-4 rounded-full mb-1"
              style={{ backgroundColor: item.color }}
            />
            <div className="text-xs font-medium text-gray-700">{item.element}</div>
            <div className="text-xs text-gray-500">{item.value.toFixed(1)}점</div>
            <div className="text-xs text-gray-400">{Math.round((item.value / maxValue) * 100)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
};