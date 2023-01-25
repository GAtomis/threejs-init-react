

import {useEffect} from 'react'


// 自定义hook
export default function useAsyncEffect(effect: () => Promise<void | (() => void)>, dependencies?: any[]) {
    return useEffect(() => {
        const cleanupPromise = effect()
        return () => { cleanupPromise.then(cleanup => cleanup && cleanup()) }
    }, dependencies)
}
// // 使用
// useAsyncEffect(async () => {
//     const count = await fetchData()
//     setCount(count)
// }, [fetchData])