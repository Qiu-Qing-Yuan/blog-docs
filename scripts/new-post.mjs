#!/usr/bin/env node

import { createInterface } from 'readline'
import { readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const POSTS_DIR = resolve(__dirname, '../docs/posts')
const TEMPLATES_DIR = resolve(__dirname, 'templates')
const isPaper = process.argv.includes('--paper')

// ── 递归获取所有子目录 ──
function getSubDirs(dir, prefix = '') {
  const results = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      const relPath = prefix ? `${prefix}/${entry.name}` : entry.name
      results.push(relPath)
      results.push(...getSubDirs(join(dir, entry.name), relPath))
    }
  }
  return results
}

// ── 交互式提问 ──
function ask(rl, question, defaultVal = '') {
  return new Promise((resolve) => {
    const suffix = defaultVal ? ` (${defaultVal})` : ''
    rl.question(`  ${question}${suffix}: `, (answer) => {
      resolve(answer.trim() || defaultVal)
    })
  })
}

// ── 生成文件名 ──
function toFilename(title) {
  // 中文标题用日期+序号，英文标题用 slug
  const hasChinese = /[一-鿿]/.test(title)
  const date = new Date().toISOString().slice(0, 10)
  if (hasChinese) {
    const random = Math.random().toString(36).slice(2, 6)
    return `${date}-${random}`
  }
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
}

async function main() {
  console.log('')
  console.log(isPaper ? '  📄 新建论文笔记' : '  📝 新建文章')
  console.log('  ──────────────────────────')
  console.log('')

  const rl = createInterface({ input: process.stdin, output: process.stdout })

  // 列出可用目录
  const dirs = getSubDirs(POSTS_DIR)
  console.log('  可用分类目录:')
  dirs.forEach((d, i) => console.log(`    ${i + 1}. ${d}`))
  console.log('')

  const dirChoice = await ask(rl, '选择分类目录 (输入序号或路径)', '1')
  let categoryDir
  const num = parseInt(dirChoice)
  if (!isNaN(num) && num >= 1 && num <= dirs.length) {
    categoryDir = dirs[num - 1]
  } else {
    categoryDir = dirChoice
  }

  const title = await ask(rl, '文章标题', isPaper ? '论文阅读笔记' : '新文章')
  const categories = await ask(rl, '分类 (逗号分隔)', isPaper ? 'AI' : categoryDir.split('/')[0])
  const tags = await ask(rl, '标签 (逗号分隔)', '')

  let paperInfo = {}
  if (isPaper) {
    console.log('')
    console.log('  📋 论文信息')
    paperInfo.paperTitle = await ask(rl, '论文标题', title)
    paperInfo.authors = await ask(rl, '作者', '')
    paperInfo.venue = await ask(rl, '会议/期刊', '')
    paperInfo.year = await ask(rl, '年份', new Date().getFullYear().toString())
    paperInfo.pdf = await ask(rl, 'PDF 链接', '')
    paperInfo.code = await ask(rl, '代码链接', '')
    paperInfo.difficulty = await ask(rl, '难度 (1-5)', '3')
    paperInfo.rating = await ask(rl, '推荐度 (1-5)', '5')
  }

  const image = await ask(rl, '封面图片URL (可选，回车跳过)', '')
  const sticky = isPaper ? '' : await ask(rl, '置顶优先级 (0=不置顶)', '0')

  rl.close()

  // ── 生成 frontmatter ──
  const date = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const categoryList = categories.split(/[,，]/).map((c) => `  - ${c.trim()}`).join('\n')
  const tagList = tags
    .split(/[,，]/)
    .filter(Boolean)
    .map((t) => `  - ${t.trim()}`)
    .join('\n')
  const imageField = image ? `image: ${image}` : ''
  const stickyField = sticky && sticky !== '0' ? `sticky: ${sticky}` : ''

  let content
  if (isPaper) {
    const codeLink = paperInfo.code ? `| [Code](${paperInfo.code})` : ''
    content = `---
title: ${title}
date: ${date}
paper:
  title: "${paperInfo.paperTitle}"
  authors: "${paperInfo.authors}"
  venue: ${paperInfo.venue}
  year: ${paperInfo.year}
  pdf: ${paperInfo.pdf}
  code: ${paperInfo.code}
difficulty: ${paperInfo.difficulty}
rating: ${paperInfo.rating}
category:
${categoryList}
tag:
${tagList}
${imageField}
---

# ${paperInfo.paperTitle}

## 论文信息

- **作者**: ${paperInfo.authors}
- **发表**: ${paperInfo.venue} ${paperInfo.year}
- **链接**: [PDF](${paperInfo.pdf}) ${codeLink}

## 核心贡献



## 方法概述



## 关键结果



## 个人思考

`
  } else {
    content = `---
title: ${title}
date: ${date}
category:
${categoryList}
tag:
${tagList}
${imageField}
${stickyField}
---

# ${title}

在这里开始写作...
`
  }

  // ── 写入文件 ──
  const targetDir = join(POSTS_DIR, categoryDir)
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true })
  }

  const filename = toFilename(isPaper ? paperInfo.paperTitle : title) + '.md'
  const filepath = join(targetDir, filename)

  if (existsSync(filepath)) {
    console.log(`\n  ⚠️  文件已存在: ${filepath}`)
    console.log('  请手动修改文件名后重试。\n')
    process.exit(1)
  }

  writeFileSync(filepath, content, 'utf-8')

  console.log('')
  console.log('  ✅ 文章已创建!')
  console.log(`  📁 ${filepath}`)
  console.log('')
  console.log('  运行 npm run dev 预览效果')
  console.log('')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
