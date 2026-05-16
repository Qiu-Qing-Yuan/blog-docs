---
title: VuePress博客搭建文档
date: 2022-8-23 15:30:27
description: 从零开始搭建一个基于vuepress2.X版本的Markdown博客文档。
lang: zh-CN
tag:
  - 博客
category:
  - 运维
image: /blog-docs/images/placeholder.png
sidebar: 'auto'
sticky: 1
---

&emsp;经过一段时间的摸索，踩过了无数的坑，终于搭建好了一个属于自己的博客。在此记录一下踩坑过程，让以后的小伙伴们搭建自己博客的时候少走弯路。博客采用了`vuepress@2.x`版本进行构建，同时对默认主题进行了本地化继承修改，整个主题大的布局未改动，只是对首页和展示页面进行了布局调整，最终效果为当前博客显示效果。小伙伴们还等什么，赶快开始吧！👍

<!-- more -->

:::tip
1、博主以前也用`vuepress-theme-reco@1.x`主题搭建了一个博客，比较喜欢vuepress-theme-reco@1.x风格，由于`vuepress-theme-reco@1.x`采用的技术都相对目前比较落后，后来便用`vuepress 2.X`开发了现在的博客，整体页面风格和样式和原来的一模一样，但主题还是继承了`vuepress 2.X`默认主题，增加了博客,分类，标签功能和其他首页特效插件。

2、博客地址：<https://anyfork.github.io/blog-docs/>或<https://anyfork.gitee.io/blog-docs/>
:::

## 一 初始化项目

### 1 环境依赖

- [Node.js v14+](https://nodejs.org/)，最低使用`Node 14+`版本，建议使用`Node 14.16.0`版本

::: warning

- 使用 [pnpm](https://pnpm.io/zh/) 时，你可能需要安装 vue 和 @vuepress/client 作为 peer-dependencies ，即 pnpm add -D vue @vuepress/client@next 。
- 使用 [yarn 2](https://yarnpkg.com/) 时，你需要在 [.yarnrc.yml](https://yarnpkg.com/configuration/yarnrc#nodeLinker) 文件中设置 nodeLinker: 'node-modules'

:::

### 2 快速开始

- 创建项目目录

```sh
# 创建项目目录
mkdir blog-docs
# 进入项目目录
cd blog-docs
```

- 初始化项目

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
git init
yarn init
```

  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash:
git init
npm init
```

  </CodeGroupItem>
</CodeGroup>

- 依赖安装

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress@next
```

  </CodeGroupItem>

  <CodeGroupItem title="npm" active>

```bash:
npm install -D vuepress@next
```

  </CodeGroupItem>
</CodeGroup>

- 在`package.json`增加中添加一些 scripts

```sh
{
  "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
}
```

- 将默认的临时目录和缓存目录添加到`.gitignore`文件中

```sh
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
echo '.history' >> .gitignore
```

- 创建文档目录

```sh
mkdir docs
echo '# Hello VuePress' > docs/README.md
```

### 3 项目启动

用 vscode 打开项目，新建终端，执行启动脚本命令

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn dev
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm run docs:dev
```

  </CodeGroupItem>
</CodeGroup>

详细的创建过程请参考[vuepress 官网快速上手](https://v2.vuepress.vuejs.org/zh/guide/getting-started.html)，至此项目搭建基础就调整完了，小伙伴们就可以开开心心的写`markdown`文件了。

## 二 功能配置

&emsp;`vuepress 2.x`默认主题集成了大部分功能，基本能够满足我们编写`markdown`的需求，但官方主题主要以文档为主，对于博客功能的拓展需要自己开发。默认主题允许我们通过`继承的方式`来拓展默认主题，详情参考官网[主题拓展](https://v2.vuepress.vuejs.org/zh/reference/default-theme/extending.html)。

&emsp;博主采用了默认主题预设的`布局插槽`和`组件替换`2 种方式继承默认主题(即:本地主题开发)。`组件替换`主要体现在博客首页布局，分类，标签，时间轴布局等，`布局插槽`主要涉及详情页顶部分类和底部评论等。同时通过`vuepress-plugin-blog2`插件拓展了博客功能(文章分类，标签，时间轴)，`vuepress-plugin-blog2`<Badge type="tip" text="hope插件" vertical="top" />设计比较灵活，可以根据自身需求进行定制，不限于分类和标签等功能，可以自行拓展。

### 1 布局插槽

::: tip
1、默认主题内置 11 个布局插槽，分别为：`navbar`,`navbar-before`,`navbar-after`,`sidebar`,`sidebar-top`,`sidebar-bottom`,`page`,`page-top`,`page-bottom`,`page-content-top`,`page-content-bottom`,详情参考官网[布局插槽](https://v2.vuepress.vuejs.org/zh/reference/default-theme/extending.html#%E5%B8%83%E5%B1%80%E6%8F%92%E6%A7%BD)

2、博客中用到了 2 个插槽`page-top`和`page-bottom`。前者用于拓展文章页面标题下面文章作者，文章分类，文章标签，字数统计和预估阅读时间等信息，后者主要嵌套`giscus`评论组件`<CommentService />`,实现文章评论功能。
:::

- 配置方法

  1、创建自定义布局组件`.vuepress/theme/layouts/layout.vue`

  ::: normal-demo layout 配置

  ```js
  <template>
    <ParentLayout>
      <template #page-top>
        <div class="title w-[var(--content-width)] my-0 mx-auto">
          <div class="flex items-center justify-between">
            <h1>{{ page.title }}</h1>
            <Icon icon="RollbackOutlined" text="返回" @click="$router.go(-1)" class="cursor-pointer"></Icon>
          </div>
          <BlogItemInfo :page="page"></BlogItemInfo>
        </div>
      </template>
      <template #page-bottom>
        <CommentService />
      </template>
    </ParentLayout>
  </template>
  <script setup lang="ts">
  import ParentLayout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
  import BlogItemInfo from '../components/Blog/BlogItemInfo.vue'
  import { usePageData } from '@vuepress/client'
  const page = usePageData()
  </script>

  ```

  :::

  2、创建你的本地主题`.vuepress/theme/index.ts`，并覆盖默认主题布局。

  ::: normal-demo index.ts 配置

  ```ts
  import type { Theme } from '@vuepress/core'
  import { defaultTheme } from '@vuepress/theme-default'
  import { path } from '@vuepress/utils'
  import { AnyForkThemeOptions } from './types/theme'

  export const AnyForkTheme = (options: AnyForkThemeOptions): Theme => {
    return {
      name: 'vuepress-theme-AnyFork',
      extends: defaultTheme(options),
      alias: {
        '@theme/Home.vue': path.resolve(__dirname, './components/Home.vue'),
        '@theme/NavbarItems.vue': path.resolve(__dirname, './components/NavbarItems.vue'),
        '@theme/HomeFooter.vue': path.resolve(__dirname, './components/HomeFooter.vue')
      },
      layouts: {
        Layout: path.resolve(__dirname, './layouts/Layout.vue'),
        Category: path.resolve(__dirname, './layouts/Category.vue'),
        Tag: path.resolve(__dirname, './layouts/Tag.vue'),
        Timeline: path.resolve(__dirname, './layouts/Timeline.vue'),
        404: path.resolve(__dirname, './layouts/404.vue')
      }
    }
  }
  ```

  :::

### 2 组件替换

::: tip
1、布局插槽十分实用，但有时候你可能会觉得它不够灵活。默认主题同样提供了替换单个组件的能力。

2、默认主题将所有 非全局的组件 都注册了一个带 @theme 前缀的 alias 。例如，HomeFooter.vue 的别名是 @theme/HomeFooter.vue 。
:::

- 配置方法

  1、在自定义主题组件目录`.vuepress/theme/components`下创建自己需要覆盖的组件。

  2、在配置文件`.vuepress/theme/index.ts`中进行组件覆盖

  ::: normal-demo index.ts 配置

  ```ts
  import type { Theme } from '@vuepress/core'
  import { defaultTheme } from '@vuepress/theme-default'
  import { path } from '@vuepress/utils'
  import { AnyForkThemeOptions } from './types/theme'

  export const AnyForkTheme = (options: AnyForkThemeOptions): Theme => {
    return {
      name: 'vuepress-theme-AnyFork',
      extends: defaultTheme(options),
      alias: {
        '@theme/Home.vue': path.resolve(__dirname, './components/Home.vue'),
        '@theme/NavbarItems.vue': path.resolve(__dirname, './components/NavbarItems.vue'),
        '@theme/HomeFooter.vue': path.resolve(__dirname, './components/HomeFooter.vue')
      },
      layouts: {
        Layout: path.resolve(__dirname, './layouts/Layout.vue'),
        Category: path.resolve(__dirname, './layouts/Category.vue'),
        Tag: path.resolve(__dirname, './layouts/Tag.vue'),
        Timeline: path.resolve(__dirname, './layouts/Timeline.vue'),
        404: path.resolve(__dirname, './layouts/404.vue')
      }
    }
  }
  ```

  :::

### 3 博客插件

&emsp;博客插件使用的是第三方[vuepress-plugin-blog2](https://vuepress-theme-hope.github.io/v2/blog/zh/)<Badge type="tip" text="hope插件" vertical="top" />插件。此插件和普通插件使用方式一样，根据[官网配置](https://vuepress-theme-hope.github.io/v2/blog/zh/config.html)即可。

::: warning
`vuepress-plugin-blog2`博客插件主要用户扩展博客功能，未实现分页功能，需要自行实现分页功能。
:::

- 项目配置

  ```ts
   //博客插件,https://vuepress-theme-hope.github.io/v2/blog/zh/guide.html
    blogPlugin({
        // 页面过滤器，此函数用于鉴别页面是否作为文章。
        filter: ({ filePathRelative }) => filePathRelative ? filePathRelative?.startsWith("posts/") : false,
        // 获取文章信息的函数。
        getInfo: (page) => ({
            ...page
        }),
        category: [
            {
                key: "category",
                getter: (page) => <string[]>page.frontmatter.category || [],
                layout: "Category",
                itemLayout: "Category",
                frontmatter: () => ({ title: "Categories", sidebar: false }),
                itemFrontmatter: (name) => ({
                    title: `Category ${name}`,
                    sidebar: false,
                }),
            },
            {
                key: "tag",
                getter: (page) => <string[]>page.frontmatter.tag || [],
                layout: "Tag",
                itemLayout: "Tag",
                frontmatter: () => ({ title: "Tags", sidebar: false }),
                itemFrontmatter: (name) => ({
                    title: `Tag ${name}`,
                    sidebar: false,
                }),
            },
        ],

        type: [
            {
                key: "article",
                //需要过滤的条件
                filter: (page) => !page.frontmatter.archive,
                path: "/article/",
                layout: "Layout",
                frontmatter: () => ({ title: "Articles", sidebar: false }),
                // sort pages with time and sticky
                sorter: (pageA, pageB) => {
                    if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
                        return pageA.frontmatter.sticky as number - (pageB.frontmatter.sticky as number);
                    if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
                        return -1;
                    if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;
                    if (!pageB.frontmatter.date) return 1;
                    if (!pageA.frontmatter.date) return -1;
                    return (
                        new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime()
                    );
                },
            },
            {
                key: "timeline",
                // only article with date should be added to timeline
                filter: (page) => page.frontmatter.date ? true : false,
                // sort pages with time
                sorter: (pageA, pageB) => new Date(pageB.frontmatter.date as string).getTime() - new Date(pageA.frontmatter.date as string).getTime(),
                path: "/timeline/",
                layout: "Timeline",
                frontmatter: () => ({ title: "Timeline", sidebar: false }),
            },
        ],
        hotReload: true,
    }),
  ```

  **注意**：插件中有`category`和`type`区分，即类别和类型，可以简单理解为文章条件赛选为类别，比如：分类，标签等，类型为文章集合，时间轴等。

- 客户端组合 API
  1、客户端可以通过`useBlogCategory()` 和 `useBlogType()`获取当前路由绑定的类别或类型。

2、可以传递参数获取具体的类别信息，比如`useBlogCategory('category')`

### 4 自定义容器

::: tip
1、`vueprsss 2.x` 中内置了自定义容器，详情参考[自定义容器](https://v2.vuepress.vuejs.org/zh/reference/default-theme/markdown.html)。

2、自定义容器依赖默认主题内置插件`@vuepress/plugin-container`,相对于`vuepress-plugin-container`(vuepress 1.x)而言变动不大，只是插件使用方式采用函数式方式集成。
:::

&emsp;博客中内置了 2 个自定义容器`cardList`和`cardImgList`,分别用于展示文本列表和图片列表，具体效果看下图：

`cardList` 展示效果
::: cardList 3

```yaml
- name: 午后南杂
  avatar: https://www.recoluan.com/head.png
  desc: Enjoy when you can, and endure when you must.
  link: https://www.recoluan.com
  bgColor: 'rgb(165 216 243)'
  textColor: '#6854A1'
- name: 西瓜皮儿
  desc: enjoy your grow up!
  avatar: https://coderhdy.com/assets/img/snapshot.png
  link: https://coderhdy.com/
  bgColor: '#FCE5BF'
  textColor: '#7B2532'
- name: 游履平生
  desc: 不积跬步,无以至千里.不积小流,无以成江海
  avatar: https://qiu-qing-yuan.github.io/blog-docs/images/placeholder.png
  link: https://anyfork.gitee.io/blog-docs/
  bgColor: rgb(218 88 88 / 62%)
  textColor: rgb(5 41 14 / 75%)
```

:::

`cardImgList`展示效果
::: cardImgList 2

```yaml
- img: https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png
  link: https://vuepress-theme-reco.recoluan.com/views/other/theme-example.html
  name: vuepress-theme-reco官网案例
  desc: 官网更多优秀的博客案例
- img: https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png
  link: https://vuepress-theme-reco.recoluan.com/views/plugins/
  name: vuepress-theme-reco官方插件
  desc: 官网更多优秀的插件
- img: https://vuepress.vuejs.org/hero.png
  link: https://www.vuepress.cn/
  name: VuePress 中文官网
  desc: VuePress 中文官网地址
- img: https://vuepress.vuejs.org/hero.png
  link: https://vuepress-community.netlify.app/zh/
  name: VuePress 官方社区
  desc: 官网更多优秀的插件
```

:::

- 自定义容器实现方式

  1、在自定义主题配置文件目录`.vuepress/theme/config/container.ts`下创建自定义容器文件。

  ```ts
  import type { ContainerPluginOptions, MarkdownItContainerRenderFunction } from '@vuepress/plugin-container'
  const yaml = require('js-yaml')
  const CARD_LIST = 'cardList'
  const CARD_IMG_LIST = 'cardImgList'
  // 渲染md容器的卡片列表
  function renderCardList(tokens: any, idx: number) {
    const type = tokens[idx].type.split('_')[1]
    const END_TYPE = `container_${type}_close`,
      _tokens$idx = tokens[idx],
      nesting = _tokens$idx.nesting,
      info = _tokens$idx.info
    if (nesting === 1) {
      // 渲染开头的 ':::' 标记
      let yamlStr = ''
      for (let i = idx; i < tokens.length; i++) {
        let _tokens$i = tokens[i],
          type = _tokens$i.type,
          content = _tokens$i.content,
          _info = _tokens$i.info
        if (type === END_TYPE) break // 遇到结束的 ':::' 时
        if (!content) continue
        if (type === 'fence' && _info === 'yaml') {
          // 是代码块类型，并且是yaml代码
          yamlStr = content
        }
      }
      if (yamlStr) {
        // 正确解析出yaml字符串后
        const dataObj = yaml.load(yamlStr) // 将yaml字符串解析成js对象
        let dataList: Array<string> = []

        if (dataObj) {
          // 正确解析出数据对象
          dataList = Array.isArray(dataObj) ? dataObj : dataObj.list
        }

        if (dataList && dataList.length) {
          // 有列表数据

          // 每行显示几个
          let row = Number(info.split(' ').pop())
          if (!row || row > 4 || row < 1) {
            row = 3 // 默认 3
          }

          let listDOM = ''
          if (type === CARD_LIST) {
            // 普通卡片列表
            listDOM = getCardListDOM(dataList, row)
          } else if (type === CARD_IMG_LIST) {
            // 卡片图片列表
            listDOM = getCardImgListDOM(dataList, row)
          }

          return `<div class="${type}Container"><div class="card-list">${listDOM}</div>`
        }
      }
    } else {
      // 渲染':::' 结尾
      return '</div>'
    }
  }

  // 将数据解析成 DOM 结构 - 普通卡片列表
  function getCardListDOM(dataList: Array<string>, row: number) {
    let listDOM = ''
    dataList.forEach((item: any) => {
      listDOM += ` <${item.link ? 'a href="' + item.link + '" target="_blank"' : 'span'} class="card-item ${row ? 'row-' + row : ''}" style="${item.bgColor ? 'background-color:' + item.bgColor + ';' : ''}${item.textColor ? 'color:' + item.textColor + ';' : ''}" > ${
        item.avatar ? '<img src="' + item.avatar + '" class="no-zoom">' : ''
      } <div> <p class="name">${item.name}</p> <p class="desc">${item.desc}</p> </div> </${item.link ? 'a' : 'span'}> `
    })
    return listDOM
  }

  // 将数据解析成 DOM 结构 - 图文卡片列表
  function getCardImgListDOM(dataList: Array<string>, row: number) {
    let listDOM = ''
    dataList.forEach((item: any) => {
      listDOM += ` <div class="card-item ${row ? 'row-' + row : ''}" > <div class="box-img"> <a href="${item.link}" target="_blank"> <img src="${item.img}" class="no-zoom"> </a> </div> <div class="box-info"> <a href="${item.link}" target="_blank"> <p class="name">${item.name}</p> ${
        item.desc ? `<p class="desc">${item.desc}</p>` : ''
      }
    </a>
    </div>
   ${item.avatar || item.author ? `<div class="box-footer"><a href="${item.link}" target="_blank">${item.avatar ? `<img src="${item.avatar}" class="no-zoom">` : ''} ${item.author ? `<span>${item.author}</span>` : ''}</a></div>` : ''}</div> `
    })
    return listDOM
  }

  export const resolveContainerOptions = (type: string): ContainerPluginOptions => {
    const render: any = renderCardList
    return { type, render }
  }
  ```

  2、在插件配置文件`.vuepress/theme/plugins.ts`中进行插件配置

  ```ts
  import { containerPlugin } from '@vuepress/plugin-container'
  import { resolveContainerOptions } from './container'
  export const plugins = [
    //自定义容器cardList
    containerPlugin(resolveContainerOptions('cardList')),
    //自定义容器cardImgList
    containerPlugin(resolveContainerOptions('cardImgList'))
  ]
  ```

  3、`cardList`配置

  ````md
  ::: cardList 3

      ```yaml
      - name: 午后南杂
        avatar: https://www.recoluan.com/head.png
        desc: Enjoy when you can, and endure when you must.
        link: https://www.recoluan.com
        bgColor: 'rgb(165 216 243)'
        textColor: '#6854A1'
      - name: 西瓜皮儿
        desc: enjoy your grow up!
        avatar: https://coderhdy.com/assets/img/snapshot.png
        link: https://coderhdy.com/
        bgColor: '#FCE5BF'
        textColor: '#7B2532'
      - name: 游履平生
        desc: 不积跬步,无以至千里.不积小流,无以成江海
        avatar: https://qiu-qing-yuan.github.io/blog-docs/images/placeholder.png
        link: https://anyfork.gitee.io/blog-docs/
        bgColor: rgb(218 88 88 / 62%)
        textColor: rgb(5 41 14 / 75%)
      ```

  :::
  ````

  4、`cardImgList`配置方式

  ````md
  ::: cardImgList 2

      ```yaml
      - img: https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png
        link: https://vuepress-theme-reco.recoluan.com/views/other/theme-example.html
        name: vuepress-theme-reco官网案例
        desc: 官网更多优秀的博客案例
      - img: https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png
        link: https://vuepress-theme-reco.recoluan.com/views/plugins/
        name: vuepress-theme-reco官方插件
        desc: 官网更多优秀的插件
      - img: https://vuepress.vuejs.org/hero.png
        link: https://www.vuepress.cn/
        name: VuePress 中文官网
        desc: VuePress 中文官网地址
      - img: https://vuepress.vuejs.org/hero.png
        link: https://vuepress-community.netlify.app/zh/
        name: VuePress 官方社区
        desc: 官网更多优秀的插件
      ```

  :::
  ````

## 三 插件安装

&emsp;vuepress 允许我们通过扩展插件的方式来拓展功能，通过插件可以丰富我们博客功能，使页面效果更加`炫酷`，`增强`网站的`逼格`，详细情况参考[vuepress@2.x 插件配置方式](https://v2.vuepress.vuejs.org/zh/guide/plugin.html)和[vuepress@2.x 内置插件](https://v2.vuepress.vuejs.org/zh/reference/plugin/back-to-top.html)。`Vuepress 2.x`插件 API 变化比较大，使用方式也采用函数式调用，因此社区`Vuepress 1.x`插件不能使用。博主博客开发过程中针对`Vuepress 1.x`的部分插件进行了兼容`Vuepress 2.x`适配，以下是博客中用到的插件：

### 1 PWA 插件<Badge type="tip" text="官方插件" vertical="top" />

::: tip
1、[pwa](https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html)插件为`vuepress 2.x`官方开发的插件，使你的 VuePress 站点成为一个[渐进式 Web 应用 (PWA)](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)，该插件使用[workbox-build](https://developers.google.com/web/tools/workbox/modules/workbox-build?utm_source=devtools) 来生成 Service Worker 文件，并通过[register-service-worker](https://github.com/yyx990803/register-service-worker) 来注册 Service Worker

2、[pwa-popup](https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa-popup.html) 插件为`vuepress 2.x`官方开发的插件，提供一个弹窗组件，允许用户手动刷新 PWA Service Worker 。
该插件必须和 pwa 插件 一起使用，并且 skipWaiting 配置项不能设置为 true 。当新的 Service Worker 就绪时，会在页面右下角出现一个弹窗，询问用户是否需要激活处于 Waiting 状态的 Service Worker 。

3、`pwa`和`pwa-popup`为官方开发的插件，并未集成的默认主题中，因此需要自己安装依赖。
:::

- [pwa](https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html)插件依赖安装和插件配置：

  - 安装依赖

  ```sh
   npm i -D @vuepress/plugin-pwa@next
  ```

  - 插件配置

  ```js
  import { pwaPlugin } from '@vuepress/plugin-pwa'
  module.exports = {
    plugins: [pwaPlugin()]
  }
  ```

- [pwa-popup](https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa-popup.html)插件依赖安装和插件配置：

  - 安装依赖

  ```sh
   npm i -D @vuepress/plugin-pwa-popup@next
  ```

  - 插件配置

  ```js
   pwaPopupPlugin({
        locales: {
            '/': {
                message: '发现新内容可用',
                buttonText: '点我刷新',
            }
        },
    }),
  ```

- 更多详细配置，请参考`pwa`官网配置：<https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html>

### 2 DocSearch 插件<Badge type="tip" text="官方插件" vertical="top" />

::: info
1、将 Algolia DocSearch 集成到 VuePress 中，为你的文档网站提供搜索功能。

2、当你正确配置该插件后，默认主题会把 DocSearch 按钮添加到导航栏。

3、`DocSearch`为官方开发的插件，并未集成的默认主题中，因此需要自己安装依赖。
:::

- [DocSearch](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)插件依赖安装和插件配置：

- 安装依赖

  ```sh
   npm i -D @vuepress/plugin-docsearch@next
  ```

- 插件配置

  ```js
  import { docsearchPlugin } from '@vuepress/plugin-docsearch'
  module.exports = {
    plugins: [
      //docsearch插件,https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html
      docsearchPlugin({
        apiKey: 'e3224f6a8f05632af9c14c97******b54',
        indexName: 'anyfork',
        appId: '09V****WK61N',
        placeholder: '搜索文档',
        locales: {
          '/': {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档'
              }
            }
          }
        }
      })
    ]
  }
  ```

- 更多详细配置，请参考[DocSearch](https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)官网配置，`Algolia`配置请参考：[VuePress 博客优化之开启 Algolia 全文搜索](./algoliaSearch.md)

### 3 ReadingTime 插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`ReadingTime插件`统计文章字数和预估阅读时间，详情参考：<https://vuepress-theme-hope.github.io/v2/reading-time/zh/>
:::

- [ReadingTime](https://vuepress-theme-hope.github.io/v2/reading-time/zh/)插件依赖安装和插件配置：

- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-reading-time2@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-reading-time2@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-reading-time2@next@next
```

  </CodeGroupItem>

</CodeGroup>

- 插件配置

```js
import { readingTimePlugin } from 'vuepress-plugin-reading-time2'
module.exports = {
  plugins: [readingTimePlugin({})]
}
```

- 更多详细配置，请参考[readingTime](https://vuepress-theme-hope.github.io/v2/reading-time/zh/)官网配置。

### 4 SEO 插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`SEO插件`本插件会通过向网站`<head>` 注入标签，让你的网站完全支持 开放内容协议 OGP 和 JSON-LD 1.1，以全面增强站点的搜索引擎优化性，详情参考：<https://vuepress-theme-hope.github.io/v2/seo/zh/guide.html>
:::

- [SEO](https://vuepress-theme-hope.github.io/v2/seo/zh/)插件依赖安装和插件配置：

- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-seo2@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-seo2@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-seo2@next
```

  </CodeGroupItem>

</CodeGroup>

- 插件配置

```js
import { seoPlugin } from 'vuepress-plugin-seo2'
module.exports = {
  plugins: [
    // seo插件，https://vuepress-theme-hope.github.io/v2/seo/
    seoPlugin({
      hostname: 'https://anyfork.github.io/',
      author: {
        name: '游履平生',
        url: 'https://anyfork.github.io/blog-docs/'
      }
    })
  ]
}
```

- 更多详细配置，请参考[SEO](https://vuepress-theme-hope.github.io/v2/seo/zh/config.html)官网配置。

### 5 SiteMap 插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`siteMap插件`本插件会为你的网站自动生成 Sitemap。为了使插件正常工作，你需要将部署的域名传递给插件的 hostname 选项。插件会自动根据页面的 Git 的时间戳生成页面的最后更新时间，同时会根据站点的多语言配置声明页面的其他语言版本替代地址。，详情参考：<https://vuepress-theme-hope.github.io/v2/sitemap/zh/>
:::

- [SEO](https://vuepress-theme-hope.github.io/v2/seo/zh/)插件依赖安装和插件配置：

- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-sitemap2@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-sitemap2@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-sitemap2@next
```

  </CodeGroupItem>

</CodeGroup>
- 插件配置

```js
import { sitemapPlugin } from 'vuepress-plugin-sitemap2'
module.exports = {
  plugins: [
    // siteMap站点地图插件，https://vuepress-theme-hope.github.io/v2/sitemap/zh/config.html
    sitemapPlugin({
      hostname: 'https://anyfork.github.io/blog-docs/',
      extraUrls: ['https://anyfork.gitee.io/blog-docs/']
    })
  ]
}
```

- 更多详细配置，请参考[siteMap](https://vuepress-theme-hope.github.io/v2/sitemap/zh/config.html)官网配置。

### 6 Copyright 插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`copyright插件`此插件可以在访问者从你的站点复制内容时，自动追加版权信息，也可以禁止站点的复制或者选择。详情参考：<https://vuepress-theme-hope.github.io/v2/copyright/zh/>
:::

- [copyright](https://vuepress-theme-hope.github.io/v2/copyright/zh/)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-copyright2@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-copyright2@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-copyright2@next
```

  </CodeGroupItem>

</CodeGroup>

- 插件配置

```js
import { copyrightPlugin } from 'vuepress-plugin-copyright2'
module.exports = {
  plugins: [
    //复制加版权插件，https://vuepress-theme-hope.github.io/v2/copyright/zh/config.html
    copyrightPlugin({
      hostname: 'https://anyfork.github.io/blog-docs/',
      author: '游履平生',
      global: true
    })
  ]
}
```

- 更多详细配置，请参考[copyright](https://vuepress-theme-hope.github.io/v2/copyright/zh/config.html)官网配置。

### 7 CopyCode 插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`copyCode插件`此插件会自动添加复制按钮到每个代码块的右下角。默认情况下，按钮仅在桌面模式显示，如果你需要在移动端展示这个按钮，请将 showInMobile 设置为 true。在用户点击复制按钮后，屏幕上会显示一个复制成功的提示。默认的提示时长为 2000ms，如果你需要更改这个时长，请设置 duration(单位 ms)，如果你不需要这个提示，请将 duration 设置为 0。详情参考：<https://vuepress-theme-hope.github.io/v2/copy-code/zh/>
:::

- [CopyCode](https://vuepress-theme-hope.github.io/v2/copy-code/zh/)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-copy-code2@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-copy-code2@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-copy-code2@next
```

  </CodeGroupItem>

</CodeGroup>

- 插件配置

```js
import { copyCodePlugin } from 'vuepress-plugin-copy-code2'
module.exports = {
  plugins: [
    //代码复制插件，https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCodePlugin({
      selector: '.theme-default-content div[class*="language-"] pre',
      locales: {
        '/': {
          copy: '复制成功!',
          hint: 'copy!'
        }
      }
    })
  ]
}
```

- 更多详细配置，请参考[copyCode](https://vuepress-theme-hope.github.io/v2/copy-code/zh/config.html)官网配置。

### 8 Waline 评论插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`Giscus插件`Giscus 是一个基于 GitHub Discussion 的评论系统，启用简便。详情参考：<https://vuepress-theme-hope.github.io/v2/comment/zh/guide/giscus.html>,原本博主采用的是`Giscus`作为评论插件，但发现其没有浏览量统计功能，后采用`Waline`插件，不仅具有评论功能，还能进行浏览量统计。

4、`Waline插件`是对`valine插件`的封装，增加了服务端功能，解决了`valine`数据不安全问题，同时也具备`valine`一切功能。可以使用 hope 插件用法，单页面集成好了浏览量功能，通过寻找默认类选择器`waline-pageview-count`进行数据自动填充，但对于首页列表未实现浏览量功能，如果需要，自行实现即可。插件配置地址：<https://vuepress-theme-hope.github.io/v2/comment/zh/config/waline.html>,亦可单独使用，详见[waline 官网](https://waline.js.org/guide/get-started.html)。
:::

- [Waline](https://vuepress-theme-hope.github.io/v2/comment/zh/config/waline.html)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-comment2@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-comment2@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-comment2@next
```

  </CodeGroupItem>

</CodeGroup>

- 插件配置

:::tip
1、可以按照`hope`插件配置流程进行配置，采用`waline`官方默认的`LeanCloud `数据库和`Vercel`服务端部署方式。博主尝试过国内效果不太好，不开梯子情况下`Vercel`服务端地址无法访问，于是便放弃了。

2、按照[waline 官网](https://waline.js.org/guide/get-started.html#leancloud-%E8%AE%BE%E7%BD%AE-%E6%95%B0%E6%8D%AE%E5%BA%93)服务端部署方式进行服务端部署。各种方式都尝试了一下,结果如下：1 腾讯云云函数计算今年 8 月开始收费，最低每月 19.9，放弃了。2 百度云按照官网流程部署，程序报错，依赖版本问题，便放弃了。3 阿里云部署成功了，云函数计算每月 100 万免费次数，可以尝试，但服务 url 需要自定义域名进行映射，不然没法直接使用，会直接下载 html，需要有阿里云域名或者说阿里云服务器，博主没有阿里云服务器便放弃了。上面的方式阿里云最合适，有条件的小伙伴可以尝试。

3、博主推荐通过自己部署`waline`服务器的方式，主要原因是：部署简单，灵活，访问速度更快，还能自定义数据库，前提是自己要有云服务器和域名。详细部署方式参考官网[独立部署](https://waline.js.org/guide/server/vps-deploy.html)或者[Waline 服务端独立部署解决方案](./walineServer.md)。按照上述操作即可，只需要配置好数据库环境变量，上线部署即可。
:::

```js
import { commentPlugin } from 'vuepress-plugin-comment2'
module.exports = {
  plugins: [
    commentPlugin({
      provider: 'Waline',
      //独立部署的waline服务器访问地址
      serverURL: 'XXXX',
      //是否开启访问量
      pageview: true
    })
  ]
}
```

- 更多详细配置，请参考[Waline](https://waline.js.org/guide/get-started.html#leancloud-%E8%AE%BE%E7%BD%AE-%E6%95%B0%E6%8D%AE%E5%BA%93)官网配置。

### 9 Markdown 语法扩展插件<Badge type="tip" text="Hope插件" vertical="top" />

::: tip
1、`Hope插件`指`vuepress-theme-hope`主题作者开发的插件库。

2、`Hope插件`官网地址：<https://vuepress-theme-hope.github.io/v2/zh/config/plugins/intro.html>

3、`Markdown语法扩展插件`通过安装并启用此插件，你可以在 Markdown 中使用更多的语法。详情参考：<https://vuepress-theme-hope.github.io/v2/md-enhance/zh/>
:::

- [Markdown 语法扩展](https://vuepress-theme-hope.github.io/v2/md-enhance/zh/)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D vuepress-plugin-md-enhance@next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D vuepress-plugin-md-enhance@next
```

  </CodeGroupItem>
    <CodeGroupItem title="pnpm">

```bash:
pnpm add -D vuepress-plugin-md-enhance@next
```

  </CodeGroupItem>

</CodeGroup>

- 插件配置

```js
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance'
module.exports = {
  plugins: [
    //markdown 增强插件，https://vuepress-theme-hope.github.io/v2/md-enhance/zh/guide/
    mdEnhancePlugin({
      // 启用自定义容器
      container: true
    })
  ]
}
```

你可以在选项中 enableAll 设置为 true 来启用插件的所有功能,不建议开启全部扩展功能，可以根据实际情况进行开启

- 更多详细配置，请参考[Markdown 语法扩展](https://vuepress-theme-hope.github.io/v2/md-enhance/zh/guide/)官网配置。

### 10 音乐播放器插件<Badge type="tip" text="AnyFork插件" vertical="top" />

::: tip
1、`AnyFork插件`指博主自己开发适配的插件。

2、`AnyFork插件`官网地址：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork>

3、`音乐播放器插件`可以在网站全局注册音乐播放器组件，可以配置本地或线上音乐，实现音乐在线播放。
:::

- [音乐播放器插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-bgm-player-next)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D @anyfork/vuepress-plugin-bgm-player-next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D @anyfork/vuepress-plugin-bgm-player-next
```

  </CodeGroupItem>
</CodeGroup>

- 插件配置

```js
import { bgmMusicPlayer } from '@anyfork/vuepress-plugin-bgm-player-next'
module.exports = {
  plugins: [
    //音乐播放器插件。
    bgmMusicPlayer({
      audios: [
        {
          name: '卡农',
          artist: '卡农钢琴版',
          url: '/blog-docs/music/canon/canon.mp3',
          cover: '/blog-docs/music/canon/canon.jpg'
        },
        {
          name: '风居住的街道',
          artist: '风居住的街道 钢琴版 - 钢琴曲',
          url: '/blog-docs/music/wind/wind.mp3',
          cover: '/blog-docs/music/wind/wind.jpg'
        },
        {
          name: '夜的钢琴曲',
          artist: '夜的钢琴曲五 - 石进',
          url: '/blog-docs/music/night/night.mp3',
          cover: '/blog-docs/music/night/night.jpg'
        }
      ],
      autoShrink: true,
      floatStyle: { bottom: '100px', 'z-index': '999999' }
    })
  ]
}
```

- 更多详细配置，请参考[音乐播放器插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-bgm-player-next)官网配置。

### 11 鼠标点击特效插件<Badge type="tip" text="AnyFork插件" vertical="top" />

::: tip
1、`AnyFork插件`指博主自己开发适配的插件。

2、`AnyFork插件`官网地址：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork>

3、`鼠标点击特效插件`鼠标点击时触发点击特效。详情参考：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-cursor-effects-next>
:::

- [鼠标点击特效插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-cursor-effects-next)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D  @anyfork/vuepress-plugin-cursor-effects-next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D @anyfork/vuepress-plugin-cursor-effects-next
```

  </CodeGroupItem>
</CodeGroup>

- 插件配置

```js
import { cursorEffects } from '@anyfork/vuepress-plugin-cursor-effects-next'
module.exports = {
  plugins: [
    //鼠标点击特效插件
    cursorEffects({
      size: 4,
      shape: 'star'
    })
  ]
}
```

- 更多详细配置，请参考[鼠标点击特效插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-cursor-effects-next)官网配置。

### 12 动态标题特效插件<Badge type="tip" text="AnyFork插件" vertical="top" />

::: tip
1、`AnyFork插件`指博主自己开发适配的插件。

2、`AnyFork插件`官网地址：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork>

3、`动态标题特效插件`当今日或离开页面 tabs 时 title 发生变化。详情参考：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-dynamic-title-next>
:::

- [动态标题特效插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-dynamic-title-next)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D  @anyfork/vuepress-plugin-dynamic-title-next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D @anyfork/vuepress-plugin-dynamic-title-next
```

  </CodeGroupItem>
</CodeGroup>

- 插件配置

```js
import { dynamicTitle } from '@anyfork/vuepress-plugin-dynamic-title-next'
module.exports = {
  plugins: [dynamicTitle()]
}
```

- 更多详细配置，请参考[动态标题特效插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-dynamic-title-next)官网配置。

### 13 看板娘插件<Badge type="tip" text="AnyFork插件" vertical="top" />

::: tip
1、`AnyFork插件`指博主自己开发适配的插件。

2、`AnyFork插件`官网地址：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork>

3、`看板娘插件`当今日或离开页面 tabs 时 title 发生变化。详情参考：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-kan-ban-niang-next>
:::

- [看板娘插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-kan-ban-niang-next)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D  @anyfork/vuepress-plugin-kan-ban-niang-next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D @anyfork/vuepress-plugin-kan-ban-niang-next
```

  </CodeGroupItem>
</CodeGroup>

- 插件配置

```js
import { kanBanNiang } from '@anyfork/vuepress-plugin-kan-ban-niang-next'
module.exports = {
  plugins: [kanBanNiang()]
}
```

- 更多详细配置，请参考[看板娘插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-kan-ban-niang-next)官网配置。

### 14 背景彩带插件<Badge type="tip" text="AnyFork插件" vertical="top" />

::: tip
1、`AnyFork插件`指博主自己开发适配的插件。

2、`AnyFork插件`官网地址：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork>

3、`背景彩带插件`背景彩带。详情参考：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-ribbon-next>
:::

- [背景彩带插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-ribbon-next)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D  @anyfork/vuepress-plugin-ribbon-next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D @anyfork/vuepress-plugin-ribbon-next
```

  </CodeGroupItem>
</CodeGroup>

- 插件配置

```js
import { ribbon } from '@anyfork/vuepress-plugin-ribbon-next'
module.exports = {
  plugins: [
    //彩带
    ribbon({
      size: 120, // 默认数据
      opacity: 0.3, //  透明度
      zIndex: -1, //  层级
      option: {
        // 色带HSL饱和度
        colorSaturation: '80%',
        // 色带HSL亮度量
        colorBrightness: '60%',
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: 'max',
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 3,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      //  点击彩带  true显示  false为不显示
      ribbonShow: false,
      // 滑动彩带
      ribbonAnimationShow: true
    })
  ]
}
```

- 更多详细配置，请参考[背景彩带插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-ribbon-next)官网配置。

### 15 樱花特效插件<Badge type="tip" text="AnyFork插件" vertical="top" />

::: tip
1、`AnyFork插件`指博主自己开发适配的插件。

2、`AnyFork插件`官网地址：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork>

3、`樱花特效插件`背景彩带。详情参考：<https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-sakura-next>
:::

- [樱花特效插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-sakura-next)插件依赖安装和插件配置：
- 安装依赖

<CodeGroup>
  <CodeGroupItem title="yarn">

```bash:
yarn add -D  @anyfork/vuepress-plugin-sakura-next
```

  </CodeGroupItem>
  <CodeGroupItem title="npm" active>

```bash:
npm i -D @anyfork/vuepress-plugin-sakura-next
```

  </CodeGroupItem>
</CodeGroup>

- 插件配置

```js
import { sakura } from '@anyfork/vuepress-plugin-sakura-next'
module.exports = {
  plugins: [
    //樱花特效
    sakura({
      sakura_zindex: 1,
      sakura_img: '/blog-docs/images/blue.png'
    })
  ]
}
```

- 更多详细配置，请参考[樱花特效插件](https://github.com/AnyFork/vuepress-pulgins/tree/2.X/packages/%40anyfork/vuepress-plugin-sakura-next)官网配置。

## 四 项目部署

`vuepress`项目和普通 vue 都属于单页面应用，项目打包部署方式也一致，可以采用本地部署，也可以采用云服务器进行部署。下面总结 2 种部署方式：

- 1 本地 nginx 部署静态文件 。
- 2 通过`Gitee Actions`实现自动部署到`Github Pages`和`Gitee Pages`。

::: warning
1、如果项目设置了`base`,不可直接在本地开启一个服务器(eg:http-server)进行部署，需要通过 nginx 服务器进行反向代理。

2、如果项目没有设置`base`,可以通过本地静态服务器或 nginx 服务器进行代理。

3、`base`类型: string,默认值: /,部署站点的基础路径，如果你想让你的网站部署到一个子路径下，你将需要设置它。如 Github pages，如果你想将你的网站部署到 https://foo.github.io/bar/，那么 base 应该被设置成 “/bar/”，它的值应当总是以斜杠开始，并以斜杠结束。base 将会自动地作为前缀插入到所有以 / 开始的其他选项的链接中，所以你只需要指定一次。
:::

### 1 nginx 服务器部署

- `base`为`/`时，相应的 nginx 配置十分简单，直接指定端口如下面示例的 8080，并指定 root 路径（即 build 后放在服务器的路径）nginx.conf 配置如下：

  ```conf
  server {
    listen 8080;
    location / {
        root /root/doc/dist;
        try_files $uri $uri/ /index.html;
        index index.html index.htm;
      }
  }
  ```

- `base`为`/blog-docs`时，比如本站，配置的为/blog-docs，配置也很简单，只需要上面的 location 由/改为/blog-docs/，注意最后一个斜杠。nginx.conf 配置如下：
  ```conf
  server {
    listen 80;
    server_name localhost;
    client_max_body_size 20m;
    charset utf-8;
      #配置了转发
    location /blog-docs/ {
      proxy_pass http://localhost:8081/;
    }
  }
  #在8081上起了vuepress
  server {
    listen 8081;
    location / {
        root /root/doc/dist;
        try_files $uri $uri/ /index.html;
        index index.html index.htm;
    }
  }
  ```

### 2 部署在`Github Pages`和`Gitee Pages`

&emsp;项目采用`Github Pages`和`Gitee Pages`方式进行代理部署，依靠`Github`强大的工作流机制实现自动编译打包部署。大致部署流程：本地通过 git 提交源代码，`Github Actions`触发工作流`workflows`实现分支代码检出，依赖安装，打包编译，创建`gh-pages`分支，上传`dist`编译后代码到`gh-pages`，`gh-pages`分支部署到``Github Pages`，同步`Github`仓库代码至`Giee`,`Gitee Pages`部署。上述流程实现了自动编译部署和`github`代码同步部署至`gitee`。

具体实现方式，请参考：[GitHub Actions 自动部署 GitHub Pages 并同步 Gitee Pages](./githubPages.md)
