import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { pwaPlugin } from '@vuepress/plugin-pwa'
import { pwaPopupPlugin } from '@vuepress/plugin-pwa-popup'
import { readingTimePlugin } from "vuepress-plugin-reading-time2"
import { seoPlugin } from "vuepress-plugin-seo2";
import { sitemapPlugin } from "vuepress-plugin-sitemap2";
import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { copyrightPlugin } from "vuepress-plugin-copyright2";
import { dynamicTitle } from '@anyfork/vuepress-plugin-dynamic-title-next'
import { blogPlugin } from "vuepress-plugin-blog2";
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance";
import { commentPlugin } from "vuepress-plugin-comment2";
import { containerPlugin } from '@vuepress/plugin-container'
import { resolveContainerOptions } from './container'
import { loadingPage } from '@anyfork/vuepress-plugin-loading-page-next'
import path from 'path'

export const plugins = [
    // 注册全局插件
    registerComponentsPlugin({
        componentsDir: path.resolve(__dirname, '../theme/components/global'),
    }),
    //docsearch插件,https://v2.vuepress.vuejs.org/zh/reference/plugin/docsearch.html
    docsearchPlugin({
        apiKey: 'e3224f6a8f05632af9c14c9767650b54',
        indexName: 'anyfork',
        appId: '09V7PWK61N',
        placeholder: '搜索文档',
        locales: {
            '/': {
                placeholder: '搜索文档',
                translations: {
                    button: {
                        buttonText: '搜索文档',
                    },
                },
            }
        }
    }),
    //pwa插件,https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa.html#web-app-manifests
    pwaPlugin(),
    //pwa-popup弹框,https://v2.vuepress.vuejs.org/zh/reference/plugin/pwa-popup.html
    pwaPopupPlugin({
        locales: {
            '/': {
                message: '发现新内容可用',
                buttonText: '点我刷新',
            }
        },
    }),
    //预计阅读时间与字数统计插件，https://vuepress-theme-hope.github.io/v2/reading-time/zh/
    readingTimePlugin({}),
    // seo插件，https://vuepress-theme-hope.github.io/v2/seo/
    seoPlugin({
        hostname: 'https://anyfork.github.io/',
        author: {
            name: '沉潜',
            url: 'https://anyfork.github.io/blog-docs/'
        }
    }),
    // siteMap站点地图插件，https://vuepress-theme-hope.github.io/v2/sitemap/zh/config.html
    sitemapPlugin({
        hostname: 'https://anyfork.github.io/blog-docs/',
        extraUrls: ['https://anyfork.gitee.io/blog-docs/']
    }),
    //代码复制插件，https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCodePlugin({
        selector: '.theme-default-content div[class*="language-"] pre',
        locales: {
            '/': {
                copy: '复制成功!',
                hint: 'copy!'
            }
        }
    }),
    //复制加版权插件，https://vuepress-theme-hope.github.io/v2/copyright/zh/config.html
    copyrightPlugin({
        hostname: 'https://anyfork.github.io/blog-docs/',
        author: "沉潜",
        global: true
    }),
    //动态title特效插件
    dynamicTitle(),
    //博客插件,https://vuepress-theme-hope.github.io/v2/blog/zh/guide.html
    blogPlugin({
        // 页面过滤器，此函数用于鉴别页面是否作为文章。
        filter: ({ filePathRelative }) => filePathRelative ? filePathRelative?.startsWith("posts/") && !filePathRelative?.startsWith("posts/_") : false,
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
    //markdown 增强插件，https://vuepress-theme-hope.github.io/v2/md-enhance/zh/guide/
    mdEnhancePlugin({
        // 启用自定义容器
        container: true,
        // 启用导入支持
        include: true,
        // 启用代码演示
        demo: true,
    }),
    //Waline评论插件,https://vuepress-theme-hope.github.io/v2/comment/zh/config/giscus.html
    commentPlugin({
        provider: 'Waline',
        serverURL: 'https://blog-storage-six.vercel.app/',
        //是否开启访问量
        pageview: true
    }),
    //自定义容器cardList
    containerPlugin(resolveContainerOptions('cardList')),
    //自定义容器cardImgList
    containerPlugin(resolveContainerOptions('cardImgList')),
    //loading插件
    loadingPage()
]