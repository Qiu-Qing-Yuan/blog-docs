import { readdirSync, readFileSync, existsSync } from 'fs'
import { join, basename } from 'path'

const POSTS_DIR = 'docs/posts'
const CATEGORIES_DIR = join(POSTS_DIR, '_categories')
const TAGS_DIR = join(POSTS_DIR, '_tags')
const ARTICLE_DIRS = readdirSync(POSTS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory() && !d.name.startsWith('_'))
  .map(d => join(POSTS_DIR, d.name))

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return {}
  const fm = {}
  let currentKey = null
  let inList = false
  let indent = 0

  for (const line of match[1].split(/\r?\n/)) {
    const listMatch = line.match(/^  - (.+)/)
    const keyMatch = line.match(/^(\w+):\s*(.*)/)
    const nestedMatch = line.match(/^(\w+):$/)
    if (listMatch && currentKey && inList) {
      fm[currentKey].push(listMatch[1].replace(/^["']|["']$/g, ''))
    } else if (keyMatch) {
      currentKey = keyMatch[1]
      const val = keyMatch[2].replace(/^["']|["']$/g, '').trim()
      if (val === '' || val === undefined) {
        fm[currentKey] = []
        inList = true
      } else {
        fm[currentKey] = val
        inList = false
      }
    }
  }
  return fm
}

function collectArticleFieldValues(field) {
  const values = new Set()
  for (const dir of ARTICLE_DIRS) {
    if (!existsSync(dir)) continue
    const files = readdirSync(dir).filter(f => f.endsWith('.md'))
    for (const file of files) {
      const content = readFileSync(join(dir, file), 'utf-8')
      const fm = extractFrontmatter(content)
      const val = fm[field]
      if (Array.isArray(val)) val.forEach(v => values.add(v))
      else if (val) values.add(val)
    }
  }
  return values
}

function collectManagedNames(dir) {
  if (!existsSync(dir)) return new Set()
  return new Set(
    readdirSync(dir)
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const content = readFileSync(join(dir, f), 'utf-8')
        const fm = extractFrontmatter(content)
        return fm.name || basename(f, '.md')
      })
  )
}

let errors = 0

// 检查：文章中使用的分类是否都在 _categories 中有对应文件
const usedCategories = collectArticleFieldValues('category')
const managedCategories = collectManagedNames(CATEGORIES_DIR)
for (const cat of usedCategories) {
  if (!managedCategories.has(cat)) {
    console.warn(`⚠ 分类「${cat}」被文章引用但未在 _categories/ 中定义`)
  }
}

// 检查：文章中使用的标签是否都在 _tags 中有对应文件
const usedTags = collectArticleFieldValues('tag')
const managedTags = collectManagedNames(TAGS_DIR)
for (const tag of usedTags) {
  if (!managedTags.has(tag)) {
    console.warn(`⚠ 标签「${tag}」被文章引用但未在 _tags/ 中定义`)
  }
}

if (errors > 0) {
  console.error(`\n✗ 校验失败，发现 ${errors} 个问题`)
  process.exit(1)
} else {
  console.log('✓ 分类/标签校验通过')
}
