const api = require('./question-bank')
const home = require('../data/question-bank-home')
// 使用内置依赖的浏览器包，避免 VuePress 1 将 entities 解析到不兼容的根目录版本。
const markdown = require('markdown-it/dist/markdown-it.js')({ html: false, breaks: true })

export default {
  name: 'QuestionBank',
  data: () => ({ view: 'home', categories: home.categories, totalQuestion: home.totalQuestion,
    questions: [], availableCategories: [], keyword: '', category: '', page: 1, pageSize: 20,
    total: 0, importedTotal: 0, sourceTotal: 0, current: null, localIndex: 0,
    selected: [], submitted: false, revealed: false, studyMode: false, loading: false, error: '', requestId: 0, searchTimer: null }),
  computed: {
    showAnswer () { return this.submitted || this.revealed || this.studyMode },
    filtered () { return this.questions },
    position () { return (this.page - 1) * this.pageSize + this.localIndex },
    pageCount () { return Math.max(1, Math.ceil(this.total / this.pageSize)) },
    isCorrect () { return this.current && this.selected.slice().sort().join(',') === this.current.answer.slice().sort().join(',') },
    analysisHtml () { return markdown.render(this.current ? this.current.explanation || '该题暂无详细解析。' : '') }
  },
  watch: {
    keyword () { clearTimeout(this.searchTimer); if (this.view === 'list') this.searchTimer = setTimeout(() => this.loadPage(1), 250) },
    category () { if (this.view === 'list') this.loadPage(1) }
  },
  beforeDestroy () { clearTimeout(this.searchTimer); this.requestId++ },
  methods: {
    async loadPage (page = 1) {
      const id = ++this.requestId
      this.loading = true; this.error = ''
      try {
        const [result, categories] = await Promise.all([api.getQuestions({ page, pageSize: this.pageSize, keyword: this.keyword, category: this.category }), api.getCategories()])
        if (id !== this.requestId) return false
        this.questions = result.list; this.page = result.page; this.total = result.total
        this.importedTotal = result.importedTotal; this.sourceTotal = result.sourceTotal
        this.availableCategories = categories
        return true
      } catch (error) { if (id === this.requestId) this.error = error.message; return false }
      finally { if (id === this.requestId) this.loading = false }
    },
    goHome () { this.requestId++; this.loading = false; this.view = 'home'; this.keyword = ''; this.category = ''; this.error = '' },
    openList () { this.category = ''; this.view = 'list'; this.loadPage(1) },
    openCategory (item) { this.keyword = ''; this.category = item.id === 'select-question' ? '' : item.id; this.view = 'list'; this.loadPage(1) },
    async start (index) {
      if (this.loading) return
      if (this.view === 'home') { this.keyword = ''; this.category = ''; if (!await this.loadPage(1)) return }
      const row = this.questions[index]
      if (!row) return
      const id = ++this.requestId; this.loading = true; this.error = ''
      try {
        const question = await api.getQuestion(row.id)
        if (id !== this.requestId) return
        this.current = question; this.localIndex = index; this.selected = []; this.submitted = false; this.revealed = false; this.view = 'practice'
      } catch (error) { this.error = error.message }
      finally { if (id === this.requestId) this.loading = false }
    },
    async startRandom () {
      this.keyword = ''; this.category = ''
      if (!await this.loadPage(1) || !this.total) return
      const index = Math.floor(Math.random() * this.total)
      if (!await this.loadPage(Math.floor(index / this.pageSize) + 1)) return
      this.view = 'list'; await this.start(index % this.pageSize)
    },
    revealAnswer () { if (!this.loading) this.revealed = true },
    toggleStudyMode () {
      if (this.loading) return
      this.studyMode = !this.studyMode
      this.selected = []; this.submitted = false; this.revealed = false
    },
    toggle (key) { if (this.showAnswer || this.loading) return; this.selected = this.current.type === 'single' ? [key] : this.selected.includes(key) ? this.selected.filter(v => v !== key) : this.selected.concat(key) },
    optionClass (key) { return { selected: !this.studyMode && this.selected.includes(key), correct: this.showAnswer && this.current.answer.includes(key), 'study-correct': this.studyMode && this.current.answer.includes(key), wrong: this.submitted && this.selected.includes(key) && !this.current.answer.includes(key) } },
    async move (step) {
      if (this.loading) return
      const index = this.position + step
      if (index < 0 || index >= this.total) return
      const page = Math.floor(index / this.pageSize) + 1
      if (page !== this.page && !await this.loadPage(page)) return
      await this.start(index % this.pageSize)
    }
  }
}
