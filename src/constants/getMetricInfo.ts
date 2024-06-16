export default function getMetricInfo(metric: string) {
    if (metric == 'holderCount') {
        const prevURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/gradientEnd?from=holderCount`;
        const nextURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=totalSupply&from=holderCount`;
        const title = 'display holder count';
        const subtitle = 'choose yes or no';
        return { prevURL, nextURL, title, subtitle };
        // } else if (metric == 'dailyVolume') {
        //     const prevURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=holderCount&from=dailyVolume`;
        //     const nextURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=monthlyVolume&from=dailyVolume`;
        //     const title = 'display daily volume';
        //     const subtitle = 'choose yes or no';
        //     return { prevURL, nextURL, title, subtitle };
        // } else if (metric == 'monthlyVolume') {
        //     const prevURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=dailyVolume&from=monthlyVolume`;
        //     const nextURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=totalSupply&from=monthlyVolume`;
        //     const title = 'display monthly volume';
        //     const subtitle = 'choose yes or no';
        //     return { prevURL, nextURL, title, subtitle };
    } else if (metric == 'totalSupply') {
        const prevURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=holderCount&from=totalSupply`;
        const nextURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=centralization&from=totalSupply`;
        const title = 'display total supply';
        const subtitle = 'choose yes or no';
        return { prevURL, nextURL, title, subtitle };
    } else if (metric == 'centralization') {
        const prevURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/dataSelect?metric=totalSupply&from=centralization`;
        const nextURL = `${process.env.NEXT_PUBLIC_SITE_URL}/api/preview?from=centralization`;
        const title = 'display centralization';
        const subtitle = 'choose yes or no';
        return { prevURL, nextURL, title, subtitle };
    } else {
        return {
            prevURL: '',
            nextURL: '',
            title: '',
            subtitle: '',
        };
    }
}
