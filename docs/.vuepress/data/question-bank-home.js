const rows = [
  ['select-question','选择题',894,0,'A'],['17e3426e61e51b6b0701b1200015231d','每日一题',156,2,'日'],
  ['54ad1eea61e0e0fe06be92eb496c94c7','HTML',127,0,'H5'],['17e3426e61e0e120061561ba2962953e','CSS',186,0,'CSS'],
  ['5b049cc861e0e143057ce63148bc1713','Javascript',545,0,'JS'],['54ad1eea61e0e17206beddbb3feab9a3','ES6',104,0,'ES6'],
  ['17e3426e61e0e191061597f4308258fd','Typescript',136,0,'TS'],['bf4a0bf261e0e1db060fcb886746ee04','Vue',261,12,'V'],
  ['bf4a0bf261e0e1fc060fe5531198493b','React',190,4,'R'],['bf4a0bf261e0e27706109ff9617971e4','Node',90,0,'N'],
  ['bf4a0bf261e0e2d60611488e0549bfb1','小程序',171,0,'小'],['54ad1eea61e0e2ff06c1855a5a957068','性能优化',328,12,'⚡'],
  ['bf4a0bf261e0e31e0611a2951e38cd5f','前端工程化',116,0,'工'],['617ef50c6229f1280ac76df466389b86','浏览器',112,0,'浏'],
  ['5b049cc861e0e33d057f365d225400ef','前端安全',169,0,'安'],['bf4a0bf261e0e3640611cd3125ba4e60','计算机基础',127,0,'计'],
  ['17e3426e61e0e3c5061961311dcbfb4e','计算机网络',181,0,'网'],['bf4a0bf261e0e47c06130d813f6e6037','设计模式',149,0,'模'],
  ['17e3426e61e0e49a061a3a3d6b7b1fef','算法数据结构',155,0,'算'],['17e3426e61e0e4da061a4773512fdd1f','编程题',164,0,'码'],
  ['bf4a0bf261e0e50006132b5921df8558','LeetCode',173,0,'LC'],['54ad1eea61e0e53506c399433d5521b4','工具',158,0,'具'],
  ['17e3426e61e0e55a061a640b582ee559','综合',163,0,'综'],['bf4a0bf261ecc2e808f675e16bc1c0d4','HR面',174,45,'HR']
]
module.exports = {
  totalQuestion: 4137, finishCount: 75, totalFavoriteCount: 0, totalErrorQuestionCount: 0, totalExamCount: 1,
  categories: rows.map(([id, name, total, exercised, icon]) => ({ id, name, total, exercised, icon }))
}
