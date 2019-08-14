import Airport from '../ariport/index';
import Graph from '../graph/index';
import Calendar from '../calendar/index';
import Treemap from '../treemap/index';
import Gauge from '../gauge/index';
import GCalendar from '../gcalendar/index';
import Lunar from '../lunar/index';
import Gl from '../gl/index';
import Sunburst from '../sunburst/index';
import SVG from '../svg/index';

export const routes = [
    {
        path: '/',
        name: 'Airport',
        component: Airport
    },
    {
        path: '/graph',
        name: 'Graph',
        component: Graph
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar
    },
    {
        path: '/treemap',
        name: 'Treemap',
        component: Treemap
    },
    {
        path: '/gauge',
        name: 'Gauge',
        component: Gauge
    },
    {
        path: '/gcalendar',
        name: 'GCalendar',
        component: GCalendar
    },
    {
        path: '/lunar',
        name: 'Lunar',
        component: Lunar
    },
    {
        path: '/gl',
        name: 'Gl',
        component: Gl
    },
    {
        path: '/sunburst',
        name: 'Sunburst',
        component: Sunburst
    },
    {
        path: '/svg',
        name: 'SVG',
        component: SVG
    }
];