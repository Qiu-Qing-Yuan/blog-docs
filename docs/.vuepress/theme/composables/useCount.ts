import { pageviewCount } from '@waline/client/dist/pageview'
import { onMounted } from 'vue'
export const useCount = (updateFlag: boolean = true): void => {
    onMounted(() => {
        setTimeout(() => {
            pageviewCount({
                serverURL: 'https://blog-storage-six.vercel.app/',
                update: updateFlag
            });
        }, 500);
    })
}