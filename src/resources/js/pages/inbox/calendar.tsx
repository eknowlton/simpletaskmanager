import {
    CalendarCurrentDate,
    CalendarDayView,
    CalendarMonthView,
    CalendarNextTrigger,
    CalendarPrevTrigger,
    CalendarTodayTrigger,
    CalendarViewTrigger,
    CalendarWeekView,
    Calendar as CCalendar,
} from '@/components/calendar';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inbox',
        href: route('inbox.index'),
    },
    {
        title: 'Calendar',
        href: '#',
    },
];

export default function Calendar({ tasks }: { tasks: CalendarEvent[] }) {
    console.log('Calendar tasks:', tasks);
    return (
        <AppLayout header={false}>
            <Head title="Tasks" />
            <CCalendar
                events={tasks.map((task) => ({
                    id: task.id,
                    title: task.title,
                    start: new Date(task.start),
                    end: new Date(task.end),
                    color: task.color,
                    allDay: true,
                }))}
            >
                <div className="flex h-dvh flex-col py-6">
                    <div className="mb-6 flex items-center gap-2 px-6">
                        <CalendarViewTrigger className="aria-[current=true]:bg-accent" view="day">
                            Day
                        </CalendarViewTrigger>
                        <CalendarViewTrigger className="aria-[current=true]:bg-accent" view="week">
                            Week
                        </CalendarViewTrigger>
                        <CalendarViewTrigger view="month" className="aria-[current=true]:bg-accent">
                            Month
                        </CalendarViewTrigger>

                        <span className="flex-1" />

                        <CalendarCurrentDate />

                        <CalendarPrevTrigger>
                            <ChevronLeft size={20} />
                            <span className="sr-only">Previous</span>
                        </CalendarPrevTrigger>

                        <CalendarTodayTrigger>Today</CalendarTodayTrigger>

                        <CalendarNextTrigger>
                            <ChevronRight size={20} />
                            <span className="sr-only">Next</span>
                        </CalendarNextTrigger>
                    </div>

                    <div className="relative flex-1 overflow-auto px-6">
                        <CalendarDayView />
                        <CalendarWeekView />
                        <CalendarMonthView />
                    </div>
                </div>
            </CCalendar>
        </AppLayout>
    );
}
