import React from 'react';
import { Crown, Award, Book } from 'lucide-react';
import { PieChart } from '../PieChart';

export const PersonalityTab = ({ saju, sipsinAnalysis }) => {
  const getSipsinCharacteristics = () => {
    return {
      '비견': {
        name: '비견(比肩)',
        description: '자립심과 독립성을 나타냅니다. 경쟁심이 강하고 자기주장이 뚜렷하며, 형제자매와의 인연이 깊습니다.',
        color: '#8b5cf6',
        traits: '독립적, 자립심, 경쟁심, 고집',
        fortune: '자수성가형, 독립적 활동에서 성공',
        advice: '협력보다는 독립적인 사업이나 활동을 추천합니다. 과도한 경쟁은 피하고 자신만의 영역을 구축하세요.'
      },
      '겁재': {
        name: '겁재(劫財)',
        description: '행동력과 추진력이 강하지만 성급할 수 있습니다. 친구나 동료와의 관계에서 주의가 필요합니다.',
        color: '#7c3aed',
        traits: '추진력, 행동력, 성급함, 변화',
        fortune: '적극적 행동으로 성공하나 신중함 필요',
        advice: '빠른 판단력을 살리되 신중한 계획 수립이 중요합니다. 재물 관리에 특별히 주의하세요.'
      },
      '식신': {
        name: '식신(食神)',
        description: '창작력과 표현력이 뛰어납니다. 예술적 재능과 여유로움을 나타내며, 자식운이 좋습니다.',
        color: '#10b981',
        traits: '창의성, 표현력, 여유로움, 예술성',
        fortune: '예술, 창작, 서비스업에서 성공',
        advice: '창의적 활동과 자기표현에 집중하면 큰 성과를 얻을 수 있습니다. 여유를 갖고 꾸준히 노력하세요.'
      },
      '상관': {
        name: '상관(傷官)',
        description: '재능과 기교가 뛰어나지만 변덕스러울 수 있습니다. 기술이나 전문 분야에서 두각을 나타냅니다.',
        color: '#059669',
        traits: '재능, 기교, 변덕, 비판적',
        fortune: '특기를 살린 전문직, 기술직에서 성공',
        advice: '자신의 재능을 체계적으로 개발하여 전문성을 높이세요. 감정 조절과 인내심이 중요합니다.'
      },
      '편재': {
        name: '편재(偏財)',
        description: '사업 수완과 재물 관리 능력이 있습니다. 활동적이고 현실적이며, 인맥이 넓습니다.',
        color: '#f59e0b',
        traits: '사업수완, 활동성, 현실적, 인맥',
        fortune: '사업, 투자, 유통업에서 성공',
        advice: '적극적인 사업 활동과 투자를 통해 재물운을 늘리세요. 인맥을 잘 활용하는 것이 중요합니다.'
      },
      '정재': {
        name: '정재(正財)',
        description: '정직하고 성실한 재물 관리를 나타냅니다. 안정적 축적을 추구하며, 배우자운이 좋습니다.',
        color: '#d97706',
        traits: '성실함, 정직, 안정성, 계획성',
        fortune: '꾸준한 노력으로 안정적 부 축적',
        advice: '성실하고 계획적인 재정 관리로 안정적인 부를 쌓으세요. 장기적 관점에서 투자하는 것이 좋습니다.'
      },
      '편관': {
        name: '편관(偏官)',
        description: '강한 의지력과 추진력이 있지만 고집스러울 수 있습니다. 권위나 권력과 인연이 있습니다.',
        color: '#ef4444',
        traits: '의지력, 추진력, 권위, 고집',
        fortune: '리더십 발휘, 권력 추구에 유리',
        advice: '강인한 정신력을 바탕으로 리더십을 발휘하되, 유연성도 기르는 것이 중요합니다.'
      },
      '정관': {
        name: '정관(正官)',
        description: '책임감과 명예를 중시합니다. 질서정연하고 원칙을 따르며, 사회적 지위가 높습니다.',
        color: '#dc2626',
        traits: '책임감, 명예, 질서, 원칙',
        fortune: '관직, 공무원, 대기업에서 성공',
        advice: '책임감 있는 자세로 조직에서 인정받아 지위를 높이세요. 원칙과 도덕성을 지키는 것이 중요합니다.'
      },
      '편인': {
        name: '편인(偏印)',
        description: '독창적 사고와 직감력이 뛰어납니다. 학문과 연구에 재능이 있으며, 신비로운 것에 관심이 많습니다.',
        color: '#3b82f6',
        traits: '독창성, 직감력, 학구열, 신비성',
        fortune: '학문, 연구, 종교 분야에서 성공',
        advice: '독창적 아이디어와 직감을 살려 새로운 분야에 도전하세요. 꾸준한 연구와 학습이 중요합니다.'
      },
      '정인': {
        name: '정인(正印)',
        description: '학습 능력과 지혜가 뛰어납니다. 전통과 명예를 중시하며, 어머니나 스승과의 인연이 깊습니다.',
        color: '#2563eb',
        traits: '학습능력, 지혜, 전통, 명예',
        fortune: '교육, 학문, 문화 분야에서 명예',
        advice: '지속적인 학습과 연구를 통해 전문성과 명예를 쌓으세요. 전통적 가치를 존중하는 것이 좋습니다.'
      }
    };
  };

  const characteristics = getSipsinCharacteristics();

  return (
    <div className="space-y-6">
      {/* 사주 표 */}
      <div className="bg-gradient-to-br from-white/95 to-blue-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">
          🎯 사주 정보표
        </h3>
        
        <div className="max-w-lg mx-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                <th className="border border-gray-300 px-3 py-2 text-sm font-bold text-gray-700">시</th>
                <th className="border border-gray-300 px-3 py-2 text-sm font-bold text-gray-700">일</th>
                <th className="border border-gray-300 px-3 py-2 text-sm font-bold text-gray-700">월</th>
                <th className="border border-gray-300 px-3 py-2 text-sm font-bold text-gray-700">년</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-2 py-3 text-center bg-orange-100">
                  <div className="text-lg font-bold text-orange-800">{saju.hourStem}</div>
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center bg-green-100">
                  <div className="text-lg font-bold text-green-800">{saju.dayStem}</div>
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center bg-blue-100">
                  <div className="text-lg font-bold text-blue-800">{saju.monthStem}</div>
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center bg-purple-100">
                  <div className="text-lg font-bold text-purple-800">{saju.yearStem}</div>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-3 text-center bg-orange-50">
                  <div className="text-lg font-bold text-orange-700">{saju.hourBranch}</div>
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center bg-green-50">
                  <div className="text-lg font-bold text-green-700">{saju.dayBranch}</div>
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center bg-blue-50">
                  <div className="text-lg font-bold text-blue-700">{saju.monthBranch}</div>
                </td>
                <td className="border border-gray-300 px-2 py-3 text-center bg-purple-50">
                  <div className="text-lg font-bold text-purple-700">{saju.yearBranch}</div>
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.stemSipsins.find(s => s.position === '시간')?.sipsin || '-'}
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs font-bold text-red-600">일간(자신)</div>
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.stemSipsins.find(s => s.position === '월간')?.sipsin || '-'}
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.stemSipsins.find(s => s.position === '년간')?.sipsin || '-'}
                  </div>
                </td>
              </tr>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.branchSipsins.find(s => s.position === '시지')?.sipsin || '-'}
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.branchSipsins.find(s => s.position === '일지')?.sipsin || '-'}
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.branchSipsins.find(s => s.position === '월지')?.sipsin || '-'}
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-2 text-center">
                  <div className="text-xs text-gray-600">
                    {sipsinAnalysis.branchSipsins.find(s => s.position === '년지')?.sipsin || '-'}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>⬆️ 천간(하늘) / ⬇️ 지지(땅) / 십신 관계 분석</p>
          </div>
        </div>
      </div>

      {/* 십신 차트 */}
      <div className="bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30">
        <PieChart 
          data={sipsinAnalysis.chartData} 
          title="🎭 십신 분포 분석"
        />
      </div>

      {/* 주요 십신 분석 */}
      <div className="bg-gradient-to-br from-white/95 to-purple-50/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/30">
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6 flex items-center gap-2">
          <Crown className="text-purple-600" />
          십신별 상세 분석
        </h3>
        
        {sipsinAnalysis.dominantSipsin && (
          <div className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-300">
            <h4 className="font-bold text-orange-800 mb-2 flex items-center gap-2">
              <Award className="text-orange-600" size={16} />
              🏆 가장 많은 십신: {sipsinAnalysis.dominantSipsin.characteristic.name} 
              <span className="text-sm">({sipsinAnalysis.dominantSipsin.count}개, {((sipsinAnalysis.dominantSipsin.count / sipsinAnalysis.totalCount) * 100).toFixed(1)}%)</span>
            </h4>
            <p className="text-orange-700 text-sm mb-3">{sipsinAnalysis.dominantSipsin.characteristic.description}</p>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white/80 rounded-lg p-3">
                <span className="text-orange-600 font-medium">🎯 운세 특징:</span>
                <p className="text-orange-700 mt-1">{sipsinAnalysis.dominantSipsin.characteristic.fortune}</p>
              </div>
              <div className="bg-white/80 rounded-lg p-3">
                <span className="text-blue-600 font-medium">💡 인생 조언:</span>
                <p className="text-blue-700 mt-1">{sipsinAnalysis.dominantSipsin.characteristic.advice}</p>
              </div>
            </div>
          </div>
        )}

        {/* 전체 십신 상세 설명 */}
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 flex items-center gap-2">
            <Book className="text-gray-600" size={16} />
            📚 십신별 의미와 특성
          </h4>
          
          <div className="grid gap-4">
            {Object.entries(sipsinAnalysis.sipsinCount).map(([sipsinName, count]) => {
              const characteristic = characteristics[sipsinName];

              if (!characteristic) return null;

              return (
                <div key={sipsinName} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-gray-800 flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: characteristic.color }}
                      />
                      {characteristic.name}
                    </h5>
                    <div className="text-sm font-medium text-gray-600">
                      {count}개 ({((count / sipsinAnalysis.totalCount) * 100).toFixed(1)}%)
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{characteristic.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-blue-50 rounded p-2">
                      <span className="font-medium text-blue-700">🎭 성격 특성:</span>
                      <p className="text-blue-600 mt-1">{characteristic.traits}</p>
                    </div>
                    <div className="bg-green-50 rounded p-2">
                      <span className="font-medium text-green-700">🍀 운세:</span>
                      <p className="text-green-600 mt-1">{characteristic.fortune}</p>
                    </div>
                    <div className="bg-purple-50 rounded p-2">
                      <span className="font-medium text-purple-700">💡 조언:</span>
                      <p className="text-purple-600 mt-1">{characteristic.advice}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};