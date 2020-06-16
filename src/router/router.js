import Home from '../pages/home';
import Urls from '../pages/url/index/index';
import Security from '../pages/webSecurity/index/index';
import SecurityFont from '../pages/webSecurity/webFont/index';
import About from '../pages/about/index';
import Echarts from '../pages/echarts/index/index';
import CssLoading from '../pages/css/loading/index';
import CssBook from '../pages/css/book/index';
import CssShadowText from '../pages/css/shadowText/index';
import CssAnimateText from '../pages/css/animateText/index';
import CssGradientText from '../pages/css/gradientText';
import GetAxios from '../pages/axios/index';
import Table from '../pages/table/list/index';
import EditTable from '../pages/table/edit/index';
import ReList from '../pages/react/index/index';
import ReDetail from '../pages/react/detail/index';
import ReAdd from '../pages/react/add/index';
import ReEdit from '../pages/react/edit';
import goodsList from '../pages/goods/index';
import goodsAdd from '../pages/goods/add/index';
import goodsEdit from '../pages/goods/edit/index';


export const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
        render: false
    },
    {
        path: '/urls',
        component: Urls,
        exact: true,
        render: false
    },
    {
        path: '/webSecurity',
        component: Security,
        exact: true,
        render: false
    },
    {
        path: '/webSecurityFont',
        component: SecurityFont,
        exact: true,
        render: false
    },
    {
        path: '/about',
        component: About,
        exact: true,
        render: false
    },
    {
        path: '/echarts',
        component: Echarts,
        exact: false,
        render: true
    },
    {
        path: '/cssLoading',
        component: CssLoading,
        exact: true,
        render: false
    },
    {
        path: '/cssBook',
        component: CssBook,
        exact: true,
        render: false
    },
    {
        path: '/cssShadowText',
        component: CssShadowText,
        exact: true,
        render: false
    },
    {
        path: '/cssAnimateText',
        component: CssAnimateText,
        exact: true,
        render: false
    },
    {
        path: '/cssGradientText',
        component: CssGradientText,
        exact: true,
        render: false
    },
    {
        path: '/getAxios',
        component: GetAxios,
        exact: true,
        render: false
    },
    {
        path: '/table',
        component: Table,
        exact: true,
        render: false
    },
    {
        path: '/editTable',
        component: EditTable,
        exact: true,
        render: false
    },
    {
        path: '/react',
        component: ReList,
        exact: true,
        render: false
    },
    {
        path: '/reactDetail/:id',
        component: ReDetail,
        exact: true,
        render: false
    },
    {
        path: '/reactAdd',
        component: ReAdd,
        exact: true,
        render: false
    },
    {
        path: '/reactEdit/:id',
        component: ReEdit,
        exact: true,
        render: false
    },
    {
        path: '/goods',
        component: goodsList,
        exact: true,
        render: false
    },
    {
        path: '/goodsAdd',
        component: goodsAdd,
        exact: true,
        render: false
    },
    {
        path: '/goodsEdit/:id',
        component: goodsEdit,
        exact: true,
        render: false
    }
]