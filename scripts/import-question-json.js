const fs = require('fs')
const path = require('path')
const source = process.argv[2]
const output = process.argv[3] || path.resolve(__dirname, '../docs/.vuepress/data/questions.json')
if (!source) throw new Error('用法: node scripts/import-question-json.js <源 JSON> [输出文件]')
const payload = JSON.parse(fs.readFileSync(source, 'utf8'))
if (!Array.isArray(payload.list)) throw new Error('JSON 中缺少 list 数组')
const records = payload.list.map(item => ({
  id: item._id, category: item.categoryId, categoryName: item.categoryName,
  type: item.type === '3' || (item.answerArr || []).length > 1 ? 'multiple' : 'single',
  typeName: item.typeName, title: item.title, description: item.questionDesc || '',
  options: (item.items || []).map(option => ({ key: option.name, text: option.title })),
  answer: item.answerArr && item.answerArr.length ? item.answerArr : String(item.answer || '').split(',').filter(Boolean),
  explanation: item.questionAnswerRemark || '', difficulty: item.gradeName || ''
}))
fs.mkdirSync(path.dirname(output), { recursive: true })
const unique = new Map()
for (const q of records) {
  const old = unique.get(q.id)
  if (old && (old.title !== q.title || old.answer.slice().sort().join(',') !== q.answer.slice().sort().join(','))) throw new Error(`重复 ID 内容冲突：${q.id}`)
  unique.set(q.id, { ...q, explanation: q.explanation || (old && old.explanation) || '' })
}
const questions = [...unique.values()]
for (const q of questions) {
  if (!q.id || !q.title || !q.answer.length || !q.options.length || q.answer.some(a => !q.options.some(o => o.key === a))) throw new Error(`题目数据无效：${q.id}`)
}
fs.writeFileSync(output, JSON.stringify({ total: questions.length, sourceTotal: payload.totalNum || questions.length, questions }, null, 2) + '\n')
console.log(`已导入 ${questions.length} 题（数据源总数 ${payload.total || payload.totalNum || questions.length}）`)
