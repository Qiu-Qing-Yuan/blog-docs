import { execSync } from 'child_process'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'

const OUTPUT_DIR = 'docs/.vuepress/public/_temp'
const OUTPUT_FILE = join(OUTPUT_DIR, 'timeline.json')
const MAX_ENTRIES = 100

function getGitLog() {
  try {
    const log = execSync(
      'git log --pretty=format:"%H|%aI|%s" --no-merges -n 500',
      { encoding: 'utf-8', maxBuffer: 1024 * 1024 * 10 }
    )
    return log.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

function getChangedFiles(hash) {
  try {
    const files = execSync(`git diff-tree --no-commit-id --name-only -r ${hash}`, {
      encoding: 'utf-8'
    })
    return files.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

function classifyCommit(message, files) {
  // 分类/标签变更
  const isTaxonomy = files.some(f =>
    f.startsWith('docs/posts/_categories/') ||
    f.startsWith('docs/posts/_tags/')
  )
  // 站点设置变更（个人资料、首页配置）
  const isSettings = files.some(f =>
    f === 'docs/profile.yml' ||
    (f === 'docs/README.md' && files.every(ff => ff === 'docs/README.md' || !ff.endsWith('.md')))
  )
  // 文章内容变更
  const isPost = files.some(f =>
    f.startsWith('docs/posts/') &&
    f.endsWith('.md') &&
    !f.startsWith('docs/posts/_categories/') &&
    !f.startsWith('docs/posts/_tags/')
  )
  // 基础设施变更
  const isSite = files.some(f =>
    f.startsWith('docs/.vuepress/') ||
    f.startsWith('scripts/') ||
    f === 'package.json' ||
    f === 'tailwind.config.js' ||
    f.startsWith('.github/')
  )

  // 优先级：分类标签 > 站点设置 > 站点基础设施 > 文章
  if (isTaxonomy) return 'taxonomy'
  if (isSettings && !isPost && !isSite) return 'settings'
  if (isSite && !isPost) return 'site'
  if (isPost && !isSite) return 'post'
  if (isSite && isPost) return 'site'
  return 'other'
}

function generateIcon(type, files) {
  if (type === 'site') {
    if (files.some(f => f.includes('theme') || f.includes('styles'))) return 'BgColorsOutlined'
    if (files.some(f => f.includes('plugin') || f.includes('config'))) return 'SettingOutlined'
    if (files.some(f => f.includes('admin') || f.includes('cms'))) return 'FileTextOutlined'
    if (files.some(f => f.includes('.github'))) return 'RocketOutlined'
    if (files.some(f => f.includes('scripts'))) return 'CodeOutlined'
    return 'ToolOutlined'
  }
  if (type === 'post') {
    if (files.some(f => f.includes('/ai/'))) return 'RobotOutlined'
    if (files.some(f => f.includes('/devops/'))) return 'CloudServerOutlined'
    if (files.some(f => f.includes('/linux/'))) return 'DesktopOutlined'
    if (files.some(f => f.includes('/node/'))) return 'ApiOutlined'
    if (files.some(f => f.includes('/mysql/'))) return 'DatabaseOutlined'
    return 'FileTextOutlined'
  }
  if (type === 'taxonomy') {
    if (files.some(f => f.includes('_categories'))) return 'FolderOpenOutlined'
    return 'BookOutlined'
  }
  if (type === 'settings') return 'SettingOutlined'
  return 'InfoCircleOutlined'
}

function generateDescription(message, type, files) {
  // 清理 commit message（去掉 Co-Authored-By 等尾部信息）
  const clean = message.replace(/\n\nCo-Authored-By:.*/s, '').trim()
  return clean
}

function generateTimeline() {
  const entries = getGitLog()
  const timeline = { site: [], post: [], taxonomy: [], settings: [] }

  for (const entry of entries) {
    const [hash, date, ...msgParts] = entry.split('|')
    const message = msgParts.join('|')
    const files = getChangedFiles(hash)
    const type = classifyCommit(message, files)

    if (type === 'other') continue

    const icon = generateIcon(type, files)
    const description = generateDescription(message, type, files)

    // 提取标题和描述
    const colonIdx = description.indexOf('：')
    const colonIdx2 = description.indexOf(':')
    const idx = colonIdx >= 0 ? colonIdx : colonIdx2
    let title = idx > 0 ? description.slice(idx + 1).trim() : description
    let desc = description
    // 去掉 Co-Authored-By 等尾部
    title = title.replace(/\n.*/s, '').trim()
    desc = desc.replace(/\n.*/s, '').trim()

    const item = {
      hash: hash.slice(0, 7),
      date: date.split('T')[0],
      time: date.split('T')[1]?.slice(0, 5) || '',
      icon,
      title: title || description,
      description: desc,
      files: files.slice(0, 5).map(f => f.replace('docs/posts/', '').replace('docs/.vuepress/', '')),
    }

    timeline[type].push(item)

    if (timeline.site.length >= MAX_ENTRIES && timeline.post.length >= MAX_ENTRIES &&
        timeline.taxonomy.length >= MAX_ENTRIES && timeline.settings.length >= MAX_ENTRIES) break
  }

  return timeline
}

// 执行
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true })
}

const timeline = generateTimeline()
writeFileSync(OUTPUT_FILE, JSON.stringify(timeline, null, 2), 'utf-8')
console.log(`✓ 时间轴数据已生成：${timeline.site.length} 站点，${timeline.post.length} 文章，${timeline.taxonomy.length} 分类标签，${timeline.settings.length} 设置`)
