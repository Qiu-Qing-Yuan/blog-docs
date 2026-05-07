import { pageviewCount } from '@waline/client/dist/pageview'
import { onMounted } from 'vue'
export const useCount = (updateFlag: boolean = true): void => {
    onMounted(() => {
        setTimeout(() => {
            pageviewCount({
                serverURL: 'https://blog-storage-ro4de7x4r-qiu-qing-yuans-projects.vercel.app/',
                update: updateFlag
            });
        }, 500);
    })
}