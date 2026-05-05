import Typed from 'typed.js'
import { usePageFrontmatter, PageFrontmatterRef } from "@vuepress/client";
import { nextTick, onMounted, onUnmounted, ref } from 'vue';

export const useTyped = (domRemark?: string) => {
  const frontmatter = usePageFrontmatter() as PageFrontmatterRef<Blog.Home>;
  const dom: string = domRemark ?? '.typed'
  let typedObject: Typed | null = null;
  let observer: MutationObserver | null = null;

  const initTyped = () => {
    if (typedObject) return;
    const el = document.querySelector(dom);
    if (el) {
      typedObject = new Typed(dom, {
        strings: frontmatter.value.heroText as Array<string>,
        typeSpeed: 300,
        startDelay: 300,
        backSpeed: 500,
        loop: true,
        smartBackspace: true
      });
    }
  };

  onMounted(() => {
    if (frontmatter.value.heroText && frontmatter.value.heroText instanceof Array) {
      nextTick(() => {
        const el = document.querySelector(dom);
        if (el) {
          initTyped();
        } else {
          // Use MutationObserver to wait for DOM element
          observer = new MutationObserver(() => {
            const el = document.querySelector(dom);
            if (el) {
              observer?.disconnect();
              observer = null;
              initTyped();
            }
          });
          observer.observe(document.body, { childList: true, subtree: true });
        }
      });
    }
  });

  onUnmounted(() => {
    if (typedObject) {
      typedObject.destroy();
      typedObject = null;
    }
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
};
