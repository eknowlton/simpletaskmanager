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
import { TaskView } from '@/components/task-view';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import AppLayout from '@/layouts/app-layout';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export default function Calendar({ events }: { events: Shared.Data.CalendarEvent[] }) {
    const [task, setTask] = useState<Shared.Data.Task | null>(null);
    const [view, setView] = useState<'calendar' | 'edit'>('calendar');

    return (
        <AppLayout header={false}>
            <CCalendar
                events={events.map((event) => ({
                    ...event,
                    onClick: () => {
                        setTask(event.data);
                        setView('edit');
                    },
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
            <Sheet open={view === 'edit'} onOpenChange={(open) => !open && setView('calendar')}>
                <SheetContent className="w-1/2 overflow-y-auto xl:w-1/3">{task && <TaskView task={task as Shared.Data.Task} />}</SheetContent>
            </Sheet>
        </AppLayout>
    );
}
