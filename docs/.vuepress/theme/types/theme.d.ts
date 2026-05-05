import type { DefaultThemeOptions } from "@vuepress/theme-default";

interface SocialLink {
  icon: string;
  link: string;
}

interface FriendLink {
  title: string;
  link: string;
}

declare interface AnyForkThemeOptions extends DefaultThemeOptions {
    author?: string;
    authorAvatar?: string;
    socialLinks?: SocialLink[];
    friendLink?: FriendLink[];
}
