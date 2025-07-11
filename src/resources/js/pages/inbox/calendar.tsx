import {
    CalendarCurrentDate,
    CalendarDayView,
    CalendarMonthView,
    CalendarNextTrigger,
    CalendarPrevTrigger,
    CalendarTodayTrigger,
    CalendarViewTrigger,
    CalendarWeekView,
    CalendarYearView,
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

export default function Calendar({ tasks }: { tasks: PaginatedCollection<Task> }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tasks" />
            <CCalendar
                events={[
                    {
                        id: '1',
                        start: new Date('2024-08-26T09:30:00Z'),
                        end: new Date('2024-08-26T14:30:00Z'),
                        title: 'event A',
                        color: 'pink',
                    },
                    {
                        id: '2',
                        start: new Date('2024-08-26T10:00:00Z'),
                        end: new Date('2024-08-26T10:30:00Z'),
                        title: 'event B',
                        color: 'blue',
                    },
                ]}
            >
                <div className="flex h-dvh flex-col py-6">
                    <div className="mb-6 flex items-center gap-2 px-6">
                        <CalendarViewTrigger className="aria-[current=true]:bg-accent" view="day">
                            Day
                        </CalendarViewTrigger>
                        <CalendarViewTrigger view="week" className="aria-[current=true]:bg-accent">
                            Week
                        </CalendarViewTrigger>
                        <CalendarViewTrigger view="month" className="aria-[current=true]:bg-accent">
                            Month
                        </CalendarViewTrigger>
                        <CalendarViewTrigger view="year" className="aria-[current=true]:bg-accent">
                            Year
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
                        <CalendarYearView />
                    </div>
                </div>
            </CCalendar>
        </AppLayout>
    );
}
