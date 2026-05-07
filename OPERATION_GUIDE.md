# 博客系统操作说明

本博客基于 VuePress 2.X 构建，使用自定义 AnyForkTheme 主题，支持 SSR、分类、标签、时间轴、评论、搜索等功能。本文档详细介绍日常运维操作方法。

---

## 目录

- [一、环境准备](#一环境准备)
- [二、本地开发](#二本地开发)
- [三、文章管理](#三文章管理)
- [四、分类与标签](#四分类与标签)
- [五、导航栏配置](#五导航栏配置)
- [六、侧边栏配置](#六侧边栏配置)
- [七、首页配置](#七首页配置)
- [八、友情链接](#八友情链接)
- [九、站点基础配置](#九站点基础配置)
- [十、插件配置](#十插件配置)
- [十一、部署发布](#十一部署发布)
- [十二、常见问题](#十二常见问题)

---

## 一、环境准备

### 1.1 安装 Node.js

项目要求 Node.js 版本 >= 12，推荐 18。

```bash
# 查看当前版本
node -v

# 推荐使用 nvm 管理版本
nvm install 18
nvm use 18
```

### 1.2 安装依赖

```bash
# 克隆仓库
git clone https://github.com/Qiu-Qing-Yuan/blog-docs.git
cd blog-docs

# 安装依赖（必须加 --legacy-peer-deps）
npm install --legacy-peer-deps
```

> **注意：** 本项目依赖版本经过严格锁定，安装时必须使用 `--legacy-peer-deps` 参数，否则会出现 ESM 兼容性错误。

### 1.3 目录结构

```
blog-docs/
├── docs/                          # 文档根目录
│   ├── .vuepress/                 # VuePress 配置目录
│   │   ├── config.ts              # 主配置文件
│   │   ├── client.ts              # 客户端增强（加载动画）
│   │   ├── config/                # 模块化配置
│   │   │   ├── index.ts           # 配置统一导出
│   │   │   ├── navbar.ts          # 导航栏配置
│   │   │   ├── sidebar.ts         # 侧边栏配置
│   │   │   ├── plugins.ts         # 插件配置
│   │   │   ├── firendLink.ts      # 友情链接配置
│   │   │   └── container.ts       # 自定义容器
│   │   ├── theme/                 # 自定义主题
│   │   │   ├── components/        # Vue 组件
│   │   │   ├── composables/       # 组合式 API
│   │   │   ├── layouts/           # 布局组件
│   │   │   ├── utils/             # 工具函数
│   │   │   └── types/             # TypeScript 类型
│   │   └── styles/                # 全局样式
│   │       ├── index.scss         # 主样式入口
│   │       ├── tailwind.css       # Tailwind 样式
│   │       └── container.css      # 容器样式
│   ├── posts/                     # 博客文章目录
│   │   ├── design-pattern/        # 设计模式
│   │   ├── devops/                # 运维（Docker/Nginx/Redis/GitLab）
│   │   ├── linux/                 # Linux
│   │   ├── mysql/                 # MySQL
│   │   ├── node/                  # Node.js
│   │   ├── nuxt/                  # Nuxt.js
│   │   └── other/                 # 其他
│   ├── images/                    # 图片资源
│   ├── music/                     # 音乐资源
│   └── README.md                  # 首页 frontmatter 配置
├── public/                        # 静态资源（直接复制到 dist）
├── .github/workflows/deploy.yml   # CI/CD 部署配置
├── tailwind.config.js             # Tailwind 配置
├── package.json                   # 项目依赖
└── CLAUDE.md                      # Claude Code 开发指南
```

---

## 二、本地开发

### 2.1 启动开发服务器

```bash
npm run dev
```

启动后访问 `http://localhost:9527/blog-docs/`，修改文件后会自动热更新。

### 2.2 构建生产版本

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

### 2.3 调试构建

```bash
npm run debug
```

---

## 三、文章管理

### 3.1 新增文章

在 `docs/posts/` 对应分类目录下创建 `.md` 文件即可。

**文件路径规则：**
- 路径以 `posts/` 开头的 `.md` 文件会被自动识别为博客文章
- 文件路径即为文章 URL 路径
- 支持多级子目录

**示例：** 创建一篇 Docker 文章

```
docs/posts/devops/docker/my-new-article.md
```

访问路径为：`/blog-docs/posts/devops/docker/my-new-article.html`

### 3.2 文章 Frontmatter

文件头部的 YAML 配置区域，用于定义文章元数据：

```yaml
---
# 【必填】文章标题
title: 文章标题

# 【必填】发布日期
date: 2026-05-05 12:00:00

# 【推荐】分类（数组，支持多个）
category:
  - 运维
  - docker

# 【推荐】标签（数组，支持多个）
tag:
  - docker
  - linux
  - 容器

# 【推荐】封面图片（用于文章列表展示）
image: https://example.com/cover.jpg

# 【可选】页面语言
lang: zh-CN

# 【可选】是否归档（归档后不出现在文章列表）
archive: false

# 【可选】置顶权重（数字越小越靠前）
sticky: 1

# 【可选】文章作者（不填则使用站点默认作者）
author: 作者名

# 【可选】自定义摘要（不填则自动截取正文）
# 在正文中使用 <!-- more --> 标记截断位置
---
```

### 3.3 文章正文

```markdown
---
title: 示例文章
date: 2026-05-05 12:00:00
category:
  - 示例
tag:
  - demo
---

这是文章摘要部分，在列表页会显示。

<!-- more -->

这是文章详情页才会展开的内容。

## 二级标题

正文内容...
```

**说明：**
- `<!-- more -->` 标记之前的文字作为摘要显示在文章列表中
- 如果不使用 `<!-- more -->`，系统会自动截取前几行

### 3.4 文章排序

文章列表默认按 `date` 降序排列（最新在前）。可通过 `sticky` 字段置顶：

```yaml
---
title: 置顶文章
date: 2026-05-05 12:00:00
sticky: 1
---
```

`sticky` 数字越小越靠前，没有 `sticky` 字段的文章按日期排序。

### 3.5 修改文章

直接编辑对应的 `.md` 文件，提交推送后会自动重新部署。

### 3.6 删除文章

删除对应的 `.md` 文件，提交推送后该文章页面将不再可访问。

---

## 四、分类与标签

### 4.1 机制说明

**分类和标签完全由文章 frontmatter 自动生成，无需手动配置。**

系统通过 `vuepress-plugin-blog2` 插件自动读取每篇文章的 `category` 和 `tag` 字段，生成：

- 侧边栏分类/标签列表及数量统计
- `/category/` 分类总览页
- `/category/xxx/` 单个分类页
- `/tag/` 标签总览页
- `/tag/xxx/` 单个标签页

### 4.2 新增分类

在文章 frontmatter 中使用新的分类名即可：

```yaml
---
title: 新文章
category:
  - 新分类名
---
```

发布后，"新分类名" 会自动出现在分类页和侧边栏中。

### 4.3 删除分类

1. **方法一：** 将该分类下的所有文章的 `category` 字段修改为其他分类
2. **方法二：** 删除该分类下的所有文章

当没有任何文章属于该分类时，它会自动消失。

### 4.4 新增标签

同理，在 frontmatter 中添加即可：

```yaml
---
tag:
  - 新标签
  - 已有标签
---
```

### 4.5 多分类/标签

一篇文章可以属于多个分类和标签：

```yaml
---
category:
  - 运维
  - docker
  - 容器化
tag:
  - docker
  - linux
  - 入门教程
  - 2026
---
```

---

## 五、导航栏配置

编辑文件：`docs/.vuepress/config/navbar.ts`

### 5.1 当前配置

```typescript
import { NavbarGroup, NavbarItem } from "vuepress";

interface NavbarItems extends NavbarItem {
    icon?: any
}

export const navbar: (NavbarItems | NavbarGroup | string)[] = [
    {
        text: '首页',
        link: '/',
        icon: 'HomeOutlined'
    },
    {
        text: '分类',
        link: '/category/',
        icon: 'AppstoreOutlined'
    },
    {
        text: '标签',
        link: '/tag/',
        icon: 'TagsOutlined'
    },
    {
        text: '时间轴',
        link: '/timeline/',
        icon: 'ClockCircleTwotone'
    },
    // 下拉菜单示例
    {
        text: 'Java文档',
        children: [
            {
                text: 'Java设计模式',
                link: '/posts/design-pattern/',
                activeMatch: '/posts/design-pattern/',
            }
        ],
    },
]
```

### 5.2 添加菜单项

**普通菜单：**

```typescript
{
    text: '菜单名称',
    link: '/posts/xxx/',
    icon: 'IconName'  // 使用 @vicons/antd 图标名
}
```

**下拉菜单：**

```typescript
{
    text: '菜单组名',
    children: [
        {
            text: '子菜单1',
            link: '/posts/xxx/',
            activeMatch: '/posts/xxx/',
        },
        {
            text: '子菜单2',
            link: '/posts/yyy/',
            activeMatch: '/posts/yyy/',
        }
    ],
}
```

### 5.3 删除菜单项

直接删除对应的配置对象即可。

### 5.4 可用图标

图标来自 `@vicons/antd`，常用图标名：

| 图标名 | 用途 |
|--------|------|
| `HomeOutlined` | 首页 |
| `AppstoreOutlined` | 分类 |
| `TagsOutlined` | 标签 |
| `ClockCircleTwotone` | 时间 |
| `BookOutlined` | 文档 |
| `SettingOutlined` | 设置 |
| `GithubOutlined` | GitHub |
| `MailOutlined` | 邮件 |

完整图标列表参考：[xicons.org](https://www.xicons.org/#/antd)

---

## 六、侧边栏配置

编辑文件：`docs/.vuepress/config/sidebar.ts`

当前为空配置（自动生成），可手动指定：

```typescript
import { SidebarConfig } from "vuepress";

export const sidebar: SidebarConfig = {
    // 按路径配置侧边栏
    '/posts/design-pattern/': [
        {
            text: '设计模式',
            children: [
                '/posts/design-pattern/',
                '/posts/design-pattern/creational.md',
                '/posts/design-pattern/structural.md',
            ]
        }
    ],
    '/posts/devops/': [
        {
            text: '运维',
            children: [
                '/posts/devops/docker/',
                '/posts/devops/nginx/',
            ]
        }
    ],
}
```

> **提示：** 留空 `sidebar: {}` 时，系统会根据文章的标题层级（h2-h4）自动生成侧边栏目录。

---

## 七、首页配置

编辑文件：`docs/README.md`

```yaml
---
home: true

# 主标题（数组时使用打字机效果）
heroText:
  - 第一行文字^1000        # ^1000 表示打字完成后暂停1秒
  - 第二行文字
  - 第三行文字

# 副标题
tagline: 副标题文字

# 背景图片（支持多张轮播）
bgImage:
  - /blog-docs/images/index/bg1.jpg
  - /blog-docs/images/index/bg2.jpg

# 背景图片切换间隔（毫秒）
bgImageSec: 10000

# 是否开启动态切换（false 则每次刷新随机显示一张）
isBgImagetrigger: true

# 是否使用系统默认背景图（与自定义图片混合使用）
needDefaultImages: true

# 背景图片样式
bgImageStyle: { height: '400px', color: '#fff' }

# 是否显示向下箭头
showArrow: true

# 个人摘要（显示在侧边栏）
summary: 这里是个人简介

# 兴趣爱好（显示在侧边栏）
hobby:
  - 编程
  - 阅读
  - 旅行

# 是否显示首页气泡动画
bubbles: true
---
```

### 7.1 修改背景图片

将图片放入 `docs/images/index/` 目录，然后在 `bgImage` 中引用：

```yaml
bgImage:
  - /blog-docs/images/index/my-image.jpg
```

也支持远程图片：

```yaml
bgImage:
  - https://example.com/image.jpg
```

### 7.2 修改打字机文字

将 `heroText` 改为数组即可启用打字机效果：

```yaml
heroText:
  - 第一行文字^1000
  - 第二行文字^500
  - 第三行文字
```

`^数字` 表示打完该行后暂停的毫秒数。

改为普通字符串则显示静态文本：

```yaml
heroText: 我的博客
```

---

## 八、友情链接

编辑文件：`docs/.vuepress/config/firendLink.ts`

```typescript
export const firendLink = [
    {
        title: '链接名称',
        link: 'https://example.com'
    },
    {
        title: 'Vue.js',
        link: 'https://cn.vuejs.org/'
    },
    // 添加更多...
]
```

### 8.1 添加友链

在数组中追加对象：

```typescript
{
    title: '新朋友的博客',
    link: 'https://friend-blog.com'
}
```

### 8.2 删除友链

删除对应的对象即可。

---

## 九、站点基础配置

编辑文件：`docs/.vuepress/config.ts`

### 9.1 站点基本信息

```typescript
export default defineUserConfig({
    // 站点根路径（GitHub Pages 部署时需要）
    base: "/blog-docs/",

    // 站点语言
    lang: "zh-CN",

    // 站点标题
    title: "技术经验总结",

    // 站点描述（SEO）
    description: "技术经验总结，资料文档汇集网站",

    // 构建输出目录
    dest: "dist",
})
```

### 9.2 主题配置

```typescript
theme: AnyForkTheme({
    // 站点 Logo
    logo: "/images/logo.png",

    // 作者名
    author: "游履平生",

    // 作者头像
    authorAvatar: "/images/logo.png",

    // GitHub 仓库地址
    repo: 'https://github.com/Qiu-Qing-Yuan/blog-docs',

    // 文档目录
    docsDir: 'docs',

    // 是否显示编辑链接
    editLinks: true,

    // 编辑链接文字
    editLinkText: '在 GitHub 上编辑此页！',

    // 文档所在分支
    docsBranch: 'main',

    // 是否显示最后更新时间
    lastUpdated: true,

    // 最后更新时间前缀
    lastUpdatedText: '上次更新',

    // 是否显示贡献者
    contributors: true,

    // 贡献者前缀
    contributorsText: '贡献者',

    // 社交链接（显示在侧边栏和页脚）
    socialLinks: [
        { icon: 'GithubOutlined', link: 'https://xxx.github.io/blog-docs/' },
        { icon: 'GoogleCircleFilled', link: 'https://xxx.gitee.io/blog-docs/' },
        { icon: 'CloudOutlined', link: 'https://github.com/xxx' }
    ],

    // 友情链接
    friendLink: firendLink,

    // 颜色模式：auto | dark | light
    colorMode: "auto",

    // 侧边栏标题深度（1-6）
    sidebarDepth: 3,

    // 导航栏
    navbar: navbar,

    // 侧边栏
    sidebar: sidebar
})
```

### 9.3 修改 Logo 和头像

1. 将图片放入 `docs/images/` 目录
2. 修改配置中的路径：

```typescript
logo: "/images/my-logo.png",
authorAvatar: "/images/my-avatar.png",
```

### 9.4 修改社交链接

```typescript
socialLinks: [
    { icon: 'GithubOutlined', link: 'https://你的GitHub' },
    { icon: 'GoogleCircleFilled', link: 'https://你的Gitee' },
    { icon: 'MailOutlined', link: 'mailto:your@email.com' }
],
```

---

## 十、插件配置

编辑文件：`docs/.vuepress/config/plugins.ts`

### 10.1 当前已启用插件

| 插件 | 功能 | 配置文件 |
|------|------|----------|
| `@vuepress/plugin-docsearch` | Algolia 搜索 | `plugins.ts` |
| `@vuepress/plugin-pwa` | PWA 支持 | `plugins.ts` |
| `@vuepress/plugin-pwa-popup` | PWA 更新提示 | `plugins.ts` |
| `vuepress-plugin-blog2` | 博客功能（分类/标签/时间轴） | `plugins.ts` |
| `vuepress-plugin-comment2` | Waline 评论系统 | `plugins.ts` |
| `vuepress-plugin-copy-code2` | 代码复制按钮 | `plugins.ts` |
| `vuepress-plugin-copyright2` | 复制时自动添加版权 | `plugins.ts` |
| `vuepress-plugin-md-enhance` | Markdown 增强 | `plugins.ts` |
| `vuepress-plugin-reading-time2` | 阅读时间统计 | `plugins.ts` |
| `vuepress-plugin-seo2` | SEO 优化 | `plugins.ts` |
| `vuepress-plugin-sitemap2` | 站点地图 | `plugins.ts` |
| `@anyfork/vuepress-plugin-bgm-player-next` | 音乐播放器 | `plugins.ts` |
| `@anyfork/vuepress-plugin-cursor-effects-next` | 鼠标点击特效 | `plugins.ts` |
| `@anyfork/vuepress-plugin-dynamic-title-next` | 动态标题 | `plugins.ts` |
| `@anyfork/vuepress-plugin-kan-ban-niang-next` | 看板娘 | `plugins.ts` |
| `@anyfork/vuepress-plugin-ribbon-next` | 彩带特效 | `plugins.ts` |
| `@anyfork/vuepress-plugin-sakura-next` | 樱花特效 | `plugins.ts` |
| `@anyfork/vuepress-plugin-loading-page-next` | 加载动画 | `plugins.ts` |

### 10.2 评论系统（Waline）

```typescript
commentPlugin({
    provider: 'Waline',
    serverURL: 'https://blog-storage-ro4de7x4r-qiu-qing-yuans-projects.vercel.app/',  // Waline 服务端地址
    pageview: true  // 是否开启访问量统计
})
```

如需更换评论服务端，修改 `serverURL` 即可。

### 10.3 音乐播放器

```typescript
bgmMusicPlayer({
    audios: [
        {
            name: '歌曲名',
            artist: '艺术家',
            url: '/blog-docs/music/xxx.mp3',    // 音乐文件路径
            cover: '/blog-docs/music/xxx.jpg'    // 封面图片路径
        },
    ],
    autoShrink: true,  // 自动收缩
    floatStyle: { bottom: '100px', 'z-index': '999999' },
})
```

添加新歌曲：将 mp3 和封面图放入 `docs/music/` 目录，然后在 `audios` 数组中添加配置。

### 10.4 搜索（DocSearch）

```typescript
docsearchPlugin({
    apiKey: 'xxx',
    indexName: 'anyfork',
    appId: 'xxx',
    placeholder: '搜索文档',
})
```

需要先在 [Algolia DocSearch](https://docsearch.algolia.com/) 申请索引。

### 10.5 特效开关

在 `plugins.ts` 中注释或删除对应插件即可关闭特效：

```typescript
// 关闭樱花特效：注释掉以下代码
// sakura({ ... }),

// 关闭彩带特效
// ribbon({ ... }),

// 关闭看板娘
// kanBanNiang(),

// 关闭鼠标点击特效
// cursorEffects({ ... }),
```

---

## 十一、部署发布

### 11.1 自动部署（推荐）

项目使用 GitHub Actions 实现自动部署，推送到 `main` 分支后自动触发：

```
git push origin main
```

部署流程：
1. 安装 Node.js 18
2. 安装依赖（`npm install --legacy-peer-deps`）
3. 构建项目（`npm run build`）
4. 部署 `dist/` 到 GitHub Pages（`gh-pages` 分支）
5. 同步代码到 Gitee
6. 触发 Gitee Pages 部署

部署配置文件：`.github/workflows/deploy.yml`

### 11.2 GitHub Pages 地址

```
https://qiu-qing-yuan.github.io/blog-docs/
```

### 11.3 Gitee Pages 地址

```
https://qiu-qing-yuan.gitee.io/blog-docs/
```

### 11.4 手动部署

如果需要手动部署到其他服务器：

```bash
# 构建
npm run build

# dist/ 目录即为完整的静态站点
# 上传到任意静态服务器即可
```

### 11.5 GitHub Secrets 配置

在仓库 Settings -> Secrets and variables -> Actions 中配置：

| Secret 名称 | 说明 |
|-------------|------|
| `ACCESS_TOKEN` | GitHub Personal Access Token（用于推送 gh-pages） |
| `GITEE_RSA_PRIVATE_KEY` | Gitee SSH 私钥（用于代码同步） |
| `GITEE_PASSWORD` | Gitee 账号密码（用于触发 Gitee Pages） |

---

## 十二、常见问题

### 12.1 安装依赖报错 ERESOLVE

**问题：** `npm install` 时报依赖冲突错误

**解决：** 必须使用 `--legacy-peer-deps` 参数

```bash
npm install --legacy-peer-deps
```

### 12.2 构建报错 ERR_REQUIRE_ESM

**问题：** 出现 `ERR_REQUIRE_ESM` 错误

**原因：** npm 解析到了 ESM-only 的新版本包

**解决：** 检查 `package.json` 中所有 `@vuepress/*` 和 `vuepress-plugin-*` 依赖是否锁定为精确版本（无 `^` 前缀）

### 12.3 构建报错 Rollup failed to resolve import

**问题：** 路径中出现反斜杠或 `#` 号

**原因：** Markdown 文件中的 URL 格式错误，或 Windows 路径反斜杠问题

**解决：**
- 检查 Markdown 文件中是否有 `https:#` 应为 `https://`
- 确保 `config.ts` 中使用 `path.resolve().replace(/\\/g, '/')`

### 12.4 图片不显示

**问题：** 文章中的图片无法加载

**解决：**
- 本地图片：放在 `docs/images/` 目录，使用 `/blog-docs/images/xxx.jpg` 路径
- 远程图片：确保 URL 可访问，配置中已关闭 referrer 检查

### 12.5 分类/标签不显示

**问题：** 新增的分类或标签没有出现在页面上

**解决：**
- 检查 frontmatter 中字段名是否正确：`category`（不是 `categories`）、`tag`（不是 `tags`）
- 确保文件路径在 `docs/posts/` 下
- 重新构建部署

### 12.6 部署后页面空白

**问题：** GitHub Pages 显示空白页面

**解决：**
- 检查 `config.ts` 中的 `base` 配置是否与仓库名一致
- GitHub Pages 设置中确认 Source 分支为 `gh-pages`

### 12.7 本地开发端口被占用

**问题：** `npm run dev` 报端口占用

**解决：** 修改 `config.ts` 中的 `port` 配置：

```typescript
port: 9528,  // 改为其他端口
```

### 12.8 暗黑模式样式异常

**问题：** 切换暗黑模式后部分元素颜色不对

**解决：** 在 `docs/.vuepress/styles/index.scss` 中添加对应的 `.dark` 选择器样式。

---

## 附录：快速操作清单

| 操作 | 文件 | 说明 |
|------|------|------|
| 发布新文章 | `docs/posts/xxx/yyy.md` | 创建 md 文件，写好 frontmatter |
| 新增分类 | 文章 frontmatter | 写入 `category: [新分类]` |
| 删除分类 | 文章 frontmatter | 移除或修改所有文章的 category |
| 新增标签 | 文章 frontmatter | 写入 `tag: [新标签]` |
| 添加导航菜单 | `config/navbar.ts` | 添加菜单对象 |
| 添加友链 | `config/firendLink.ts` | 添加链接对象 |
| 修改首页 | `docs/README.md` | 修改 frontmatter |
| 修改站点信息 | `config.ts` | 修改 title/description/author 等 |
| 关闭特效 | `config/plugins.ts` | 注释掉对应插件 |
| 发布上线 | `git push origin main` | 自动构建部署 |
