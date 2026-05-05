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
        text: '研究领域',
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
]
