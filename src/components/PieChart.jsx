import React from 'react';

export const PieChart = ({ data, title = "십신 분석" }) => {
  // 데이터 검증 및 기본값 설정
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl border border-purple-200 shadow-lg">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          {title}
        </h3>
        <div className="text-gray-500">데이터를 불러오는 중...</div>
      </div>
    );
  }

  const chartSize = 240;
  const radius = 70;
  const center = chartSize / 2;
  const labelRadius = radius + 50;
  
  // 총합 계산
  const total = data.reduce((sum, item) => sum + (item.value || 0), 0);
  
  if (total === 0) {
    return (
      <div className="flex flex-col items-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl border border-purple-200 shadow-lg">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          {title}
        </h3>
        <div className="text-gray-500">분석할 데이터가 없습니다.</div>
      </div>
    );
  }
  
  // 각도 계산 및 세그먼트 생성
  let currentAngle = -90; // 12시 방향부터 시작
  const segments = data.map((item, index) => {
    const value = item.value || 0;
    const percentage = (value / total) * 100;
    const angle = (value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle += angle;
    
    return {
      ...item,
      percentage: percentage.toFixed(1),
      startAngle,
      endAngle,
      angle,
      index
    };
  });

  // SVG 경로 생성
  const createPath = (centerX, centerY, radius, startAngle, endAngle) => {
    if (endAngle - startAngle < 1) {
      endAngle = startAngle + 1;
    }
    
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    
    return [
      "M", centerX, centerY,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // 라벨 충돌 방지 로직
  const calculateLabelPositions = () => {
    const positions = segments.map(segment => {
      const midAngle = (segment.startAngle + segment.endAngle) / 2;
      const pos = polarToCartesian(center, center, labelRadius, midAngle);
      return {
        ...segment,
        x: pos.x,
        y: pos.y,
        midAngle
      };
    });

    // Y 좌표로 정렬하여 충돌 방지
    positions.sort((a, b) => a.y - b.y);
    
    // 최소 간격 설정
    const minSpacing = 25;
    for (let i = 1; i < positions.length; i++) {
      if (positions[i].y - positions[i-1].y < minSpacing) {
        positions[i].y = positions[i-1].y + minSpacing;
      }
    }
    
    return positions;
  };

  const labelPositions = calculateLabelPositions();

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl border border-purple-200 shadow-lg p-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 text-center">
          {title}
        </h3>
        
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8">
          {/* 차트 영역 */}
          <div className="flex-shrink-0">
            <svg 
              width={chartSize + 200} 
              height={chartSize + 120}
              viewBox={`0 0 ${chartSize + 200} ${chartSize + 120}`}
              className="drop-shadow-lg"
            >
              <defs>
                <filter id="chart-shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
                </filter>
                {segments.map((segment, index) => (
                  <linearGradient key={`grad-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={segment.color || '#6b7280'} stopOpacity="1" />
                    <stop offset="100%" stopColor={segment.color || '#6b7280'} stopOpacity="0.8" />
                  </linearGradient>
                ))}
              </defs>

              {/* 차트 중심 위치 조정 */}
              <g transform={`translate(100, 60)`}>
                {/* 차트 세그먼트 */}
                {segments.map((segment, index) => (
                  segment.angle > 1 && (
                    <path
                      key={`segment-${index}`}
                      d={createPath(center, center, radius, segment.startAngle, segment.endAngle)}
                      fill={`url(#gradient-${index})`}
                      stroke="white"
                      strokeWidth="2"
                      filter="url(#chart-shadow)"
                      className="hover:opacity-80 transition-all duration-300 cursor-pointer"
                    />
                  )
                ))}

                {/* 중앙 원 */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius * 0.4}
                  fill="white"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                  filter="url(#chart-shadow)"
                />

                {/* 라벨과 연결선 */}
                {labelPositions.map((label, index) => {
                  if (label.angle < 3) return null;
                  
                  const edgePoint = polarToCartesian(center, center, radius, label.midAngle);
                  const isRightSide = label.x > center;
                  
                  // 라벨 박스 위치 계산
                  const boxX = isRightSide ? label.x + 5 : label.x - 55;
                  const boxY = label.y - 12;
                  
                  return (
                    <g key={`label-${index}`}>
                      {/* 연결선 */}
                      <polyline
                        points={`${edgePoint.x},${edgePoint.y} ${label.x},${label.y}`}
                        stroke="#9ca3af"
                        strokeWidth="1.5"
                        fill="none"
                      />
                      
                      {/* 라벨 배경 */}
                      <rect
                        x={boxX}
                        y={boxY}
                        width="50"
                        height="24"
                        fill="white"
                        stroke={label.color || '#6b7280'}
                        strokeWidth="1.5"
                        rx="4"
                        filter="url(#chart-shadow)"
                      />
                      
                      {/* 라벨 텍스트 */}
                      <text
                        x={boxX + 25}
                        y={boxY + 8}
                        textAnchor="middle"
                        className="text-xs font-bold fill-gray-700"
                      >
                        {label.name}
                      </text>
                      <text
                        x={boxX + 25}
                        y={boxY + 18}
                        textAnchor="middle"
                        className="text-xs fill-gray-500"
                      >
                        {label.percentage}%
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* 범례 영역 */}
          <div className="flex-1 min-w-0 max-w-md">
            <h4 className="font-semibold text-gray-700 mb-4 text-center">십신별 상세</h4>
            <div className="space-y-2">
              {segments.map((segment, index) => (
                <div key={`legend-${index}`} className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center min-w-0 flex-1">
                    <div 
                      className="w-4 h-4 rounded-full mr-3 flex-shrink-0 shadow-sm"
                      style={{ backgroundColor: segment.color || '#6b7280' }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-gray-700 truncate">{segment.name}</div>
                      <div className="text-xs text-gray-500">총 {segment.value}개</div>
                    </div>
                  </div>
                  <div className="text-right ml-2">
                    <div className="text-sm font-bold text-gray-800">{segment.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 총계 */}
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
              <div className="text-center">
                <div className="text-sm text-purple-700">전체 십신</div>
                <div className="text-lg font-bold text-purple-800">{total}개</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};