// 本地异步 Mock API。未来可将这三个方法替换为真实 HTTP 请求。
const data = require('../data/questions.json')
const delay = value => new Promise(resolve => setTimeout(() => resolve(value), 180))
function matched ({ keyword = '', category = '' } = {}) {
  const word = keyword.trim().toLowerCase()
  return data.questions.filter(q => (!category || q.category === category) &&
    (!word || `${q.title} ${q.description} ${q.categoryName}`.toLowerCase().includes(word)))
}
async function getQuestions (query = {}) {
  const rows = matched(query)
  const pageSize = [10, 20, 50].includes(Number(query.pageSize)) ? Number(query.pageSize) : 20
  const pages = Math.max(1, Math.ceil(rows.length / pageSize))
  const page = Math.min(pages, Math.max(1, Math.floor(Number(query.page) || 1)))
  // 列表响应不包含答案，详情仅在用户进入题目后获取。
  const list = rows.slice((page - 1) * pageSize, page * pageSize).map(q => ({
    id: q.id, title: q.title, type: q.type, difficulty: q.difficulty, categoryName: q.categoryName
  }))
  return delay({ list, page, pageSize, total: rows.length, importedTotal: data.questions.length, sourceTotal: data.sourceTotal })
}
async function getQuestion (id) {
  const q = data.questions.find(item => item.id === id)
  if (!q) throw new Error('题目不存在，请返回列表重试')
  return delay(JSON.parse(JSON.stringify(q)))
}
async function getCategories () {
  return delay([...new Map(data.questions.map(q => [q.category, { id: q.category, name: q.categoryName }])).values()])
}
module.exports = { getQuestions, getQuestion, getCategories }
