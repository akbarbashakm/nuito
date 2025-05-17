export type NavLink = {
    id: string;
    label: string;
    path: string;
};

export const HOME_NAV_LINKS: NavLink[] = [
    {
        id: 'story-section',
        label: 'Story',
        path: '/#story-section'
    },
    {
        id: 'drop-1',
        label: 'Drop 1',
        path: '/#drop-1'
    }
];

export const SHOP_NAV_LINKS: NavLink[] = [
    {
        id: 'story-section',
        label: 'Story',
        path: '/shop#story-section'
    },
    {
        id: 'fabric-section',
        label: 'Fabric',
        path: '/shop#fabric-section'
    },
    {
        id: 'fit-section',
        label: 'Fit',
        path: '/shop#fit-section'
    },
    {
        id: 'design-section',
        label: 'Design',
        path: '/shop#design-section'
    },
    {
        id: 'style-section',
        label: 'Style',
        path: '/shop#style-section'
    }
]; 