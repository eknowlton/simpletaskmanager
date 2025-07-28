'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import {
    Locale,
    addDays,
    addMonths,
    addWeeks,
    addYears,
    format,
    getMonth,
    isSameDay,
    isSameHour,
    isSameMonth,
    isToday,
    setHours,
    setMonth,
    startOfMonth,
    startOfWeek,
    subDays,
    subMonths,
    subWeeks,
    subYears,
} from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import { ReactNode, createContext, forwardRef, useCallback, useContext, useMemo, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export type CalendarEvent = Shared.Data.CalendarEvent & {
    onClick?: () => void;
};

const monthEventVariants = cva('size-2 rounded-full', {
    variants: {
        variant: {
            default: 'bg-primary',
            blue: 'bg-blue-500',
            green: 'bg-green-500',
            pink: 'bg-pink-500',
            purple: 'bg-purple-500',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

type variantType = 'default' | 'blue' | 'green' | 'pink' | 'purple';

const dayEventVariants = cva('font-bold border-l-4 rounded p-2 text-xs', {
    variants: {
        variant: {
            default: 'bg-muted/30 text-muted-foreground border-muted',
            blue: 'bg-blue-500/30 text-blue-600 border-blue-500',
            green: 'bg-green-500/30 text-green-600 border-green-500',
            pink: 'bg-pink-500/30 text-pink-600 border-pink-500',
            purple: 'bg-purple-500/30 text-purple-600 border-purple-500',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

type View = 'day' | 'week' | 'month' | 'year';

type ContextType = {
    view: View;
    setView: (view: View) => void;
    date: Date;
    setDate: (date: Date) => void;
    events: CalendarEvent[];
    locale: Locale;
    setEvents: (date: CalendarEvent[]) => void;
    onChangeView?: (view: View) => void;
    onEventClick?: (event: CalendarEvent) => void;
    enableHotkeys?: boolean;
    today: Date;
};

const Context = createContext<ContextType>({} as ContextType);

type CalendarProps = {
    children: ReactNode;
    defaultDate?: Date;
    events?: CalendarEvent[];
    view?: View;
    locale?: Locale;
    enableHotkeys?: boolean;
    onChangeView?: (view: View) => void;
    onEventClick?: (event: CalendarEvent) => void;
};

const Calendar = ({
    children,
    defaultDate = new Date(),
    locale = enUS,
    enableHotkeys = true,
    view: _defaultMode = 'month',
    onEventClick,
    events: defaultEvents = [],
    onChangeView,
}: CalendarProps) => {
    const [view, setView] = useState<View>(_defaultMode);
    const [date, setDate] = useState(defaultDate);
    const [events, setEvents] = useState<CalendarEvent[]>(defaultEvents);

    const changeView = (view: View) => {
        setView(view);
        onChangeView?.(view);
    };

    useHotkeys('m', () => changeView('month'), {
        enabled: enableHotkeys,
    });

    useHotkeys('w', () => changeView('week'), {
        enabled: enableHotkeys,
    });

    useHotkeys('y', () => changeView('year'), {
        enabled: enableHotkeys,
    });

    useHotkeys('d', () => changeView('day'), {
        enabled: enableHotkeys,
    });

    return (
        <Context.Provider
            value={{
                view,
                setView,
                date,
                setDate,
                events,
                setEvents,
                locale,
                enableHotkeys,
                onEventClick,
                onChangeView,
                today: new Date(),
            }}
        >
            {children}
        </Context.Provider>
    );
};

export const useCalendar = () => useContext(Context);

const CalendarViewTrigger = forwardRef<
    HTMLButtonElement,
    React.HTMLAttributes<HTMLButtonElement> & {
        view: View;
    }
>(({ children, view, ...props }) => {
    const { view: currentView, setView, onChangeView } = useCalendar();

    return (
        <Button
            aria-current={currentView === view}
            size="sm"
            variant="ghost"
            {...props}
            onClick={() => {
                setView(view);
                onChangeView?.(view);
            }}
        >
            {children}
        </Button>
    );
});
CalendarViewTrigger.displayName = 'CalendarViewTrigger';

const EventGroup = ({ events, hour }: { events: CalendarEvent[]; hour: Date }) => {
    return (
        <div className="h-20 border-t last:border-b">
            {events
                .filter((event) => isSameHour(event.start, hour))
                .map((event) => {
                    const start = new Date(event.start);
                    const startPosition = start.getMinutes() / 60;

                    return (
                        <button
                            onClick={event.onClick}
                            key={event.id}
                            className={cn(
                                'relative w-full truncate bg-gray-100 text-left dark:bg-gray-900',
                                dayEventVariants({ variant: event.color as variantType }),
                            )}
                            style={{
                                top: `${startPosition * 100}%`,
                            }}
                        >
                            {event.title}
                        </button>
                    );
                })}
        </div>
    );
};

const CalendarDayView = () => {
    const { view, events, date } = useCalendar();

    if (view !== 'day') return null;

    const hours = [...Array(24)].map((_, i) => setHours(date, i));

    return (
        <div className="scrollbar-hide relative flex h-full overflow-x-hidden overflow-y-auto pt-2">
            <TimeTable />
            <div className="flex-1">
                {hours.map((hour) => (
                    <EventGroup key={hour.toString()} hour={hour} events={events} />
                ))}
            </div>
        </div>
    );
};

const CalendarWeekView = () => {
    const { view, date, locale, events } = useCalendar();

    const weekDates = useMemo(() => {
        const start = startOfWeek(date, { weekStartsOn: 0 });
        const weekDates = [];

        for (let i = 0; i < 7; i++) {
            const day = addDays(start, i);
            const hours = [...Array(24)].map((_, i) => setHours(day, i));
            weekDates.push(hours);
        }

        return weekDates;
    }, [date]);

    const headerDays = useMemo(() => {
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const result = addDays(startOfWeek(date, { weekStartsOn: 0 }), i);
            daysOfWeek.push(result);
        }
        return daysOfWeek;
    }, [date]);

    if (view !== 'week') return null;

    return (
        <div className="scrollbar-hide relative flex h-full flex-col overflow-x-hidden overflow-y-auto">
            <div className="sticky top-0 z-10 mb-3 flex border-b bg-card">
                <div className="w-12"></div>
                {headerDays.map((date, i) => (
                    <div
                        key={date.toString()}
                        className={cn(
                            'flex flex-1 items-center justify-center gap-1 pb-2 text-center text-sm text-muted-foreground',
                            [0, 6].includes(i) && 'text-muted-foreground/50',
                        )}
                    >
                        {format(date, 'E', { locale })}
                        <span
                            className={cn('grid h-6 place-content-center', isToday(date) && 'size-6 rounded-full bg-primary text-primary-foreground')}
                        >
                            {format(date, 'd')}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex flex-1">
                <div className="w-fit">
                    <TimeTable />
                </div>
                <div className="grid flex-1 grid-cols-7">
                    {weekDates.map((hours, i) => {
                        return (
                            <div
                                className={cn('h-full border-l text-sm text-muted-foreground first:border-l-0', [0, 6].includes(i) && 'bg-muted/50')}
                                key={hours[0].toString()}
                            >
                                {hours.map((hour) => (
                                    <EventGroup key={hour.toString()} hour={hour} events={events} />
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const CalendarMonthView = () => {
    const { date, view, events, locale, setDate, setView } = useCalendar();

    const monthDates = useMemo(() => getDaysInMonth(date), [date]);
    const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

    if (view !== 'month') return null;

    return (
        <div className="flex h-full flex-col">
            <div className="sticky top-0 grid grid-cols-7 gap-px border-b bg-background">
                {weekDays.map((day, i) => (
                    <div
                        key={day}
                        className={cn('mb-2 pr-2 text-right text-sm text-muted-foreground', [0, 6].includes(i) && 'text-muted-foreground/50')}
                    >
                        {day}
                    </div>
                ))}
            </div>
            <div className="-mt-px grid flex-1 auto-rows-fr grid-cols-7 gap-px overflow-hidden p-px">
                {monthDates.map((_date) => {
                    const currentEvents = events.filter((event) => isSameDay(event.start, _date));

                    const longerThanThree = currentEvents.length > 3;
                    const displayedEvents = longerThanThree ? currentEvents.slice(0, 3) : currentEvents;

                    return (
                        <div
                            className={cn(
                                'overflow-hide p-2 text-sm text-muted-foreground ring-1 ring-border',
                                !isSameMonth(date, _date) && 'text-muted-foreground/50',
                            )}
                            key={_date.toString()}
                        >
                            <span
                                className={cn(
                                    'sticky top-0 mb-1 grid size-6 place-items-center rounded-full',
                                    isToday(_date) && 'bg-primary text-primary-foreground',
                                )}
                            >
                                {format(_date, 'd')}
                            </span>

                            {displayedEvents.map((event) => {
                                return (
                                    <button
                                        onClick={event.onClick}
                                        key={event.id}
                                        className="flex w-full flex-row items-center justify-between gap-1 rounded px-1 text-left text-sm hover:text-gray-100"
                                    >
                                        <div className={cn('shrink-0', monthEventVariants({ variant: event.color as variantType }))}></div>
                                        <span className="flex-1 truncate" title={event.title}>
                                            {event.title}
                                        </span>
                                        <time className="text-xs text-muted-foreground/50 tabular-nums">{format(event.start, 'HH:mm')}</time>
                                    </button>
                                );
                            })}
                            {longerThanThree && (
                                <button
                                    className="flex items-center gap-1 rounded px-3 text-xs"
                                    onClick={() => {
                                        setDate(_date);
                                        setView('day');
                                    }}
                                >
                                    <span className="flex-1 truncate">+{currentEvents.length - 3} more</span>
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const CalendarYearView = () => {
    const { view, date, today, locale } = useCalendar();

    const months = useMemo(() => {
        if (!view) {
            return [];
        }

        return Array.from({ length: 12 }).map((_, i) => {
            return getDaysInMonth(setMonth(date, i));
        });
    }, [date, view]);

    const weekDays = useMemo(() => generateWeekdays(locale), [locale]);

    if (view !== 'year') return null;

    return (
        <div className="grid h-full grid-cols-4 gap-10 overflow-auto">
            {months.map((days, i) => (
                <div key={days[0].toString()}>
                    <span className="text-xl">{i + 1}</span>

                    <div className="my-5 grid grid-cols-7 gap-2">
                        {weekDays.map((day) => (
                            <div key={day} className="text-center text-xs text-muted-foreground">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-x-2 text-center text-xs tabular-nums">
                        {days.map((_date) => {
                            return (
                                <div key={_date.toString()} className={cn(getMonth(_date) !== i && 'text-muted-foreground')}>
                                    <div
                                        className={cn(
                                            'grid aspect-square size-full place-content-center tabular-nums',
                                            isSameDay(today, _date) && getMonth(_date) === i && 'rounded-full bg-primary text-primary-foreground',
                                        )}
                                    >
                                        {format(_date, 'd')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

const CalendarNextTrigger = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ children, onClick, ...props }, ref) => {
    const { date, setDate, view, enableHotkeys } = useCalendar();

    const next = useCallback(() => {
        if (view === 'day') {
            setDate(addDays(date, 1));
        } else if (view === 'week') {
            setDate(addWeeks(date, 1));
        } else if (view === 'month') {
            setDate(addMonths(date, 1));
        } else if (view === 'year') {
            setDate(addYears(date, 1));
        }
    }, [date, view, setDate]);

    useHotkeys('ArrowRight', () => next(), {
        enabled: enableHotkeys,
    });

    return (
        <Button
            size="icon"
            variant="outline"
            ref={ref}
            {...props}
            onClick={(e) => {
                next();
                onClick?.(e);
            }}
        >
            {children}
        </Button>
    );
});
CalendarNextTrigger.displayName = 'CalendarNextTrigger';

const CalendarPrevTrigger = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ children, onClick, ...props }, ref) => {
    const { date, setDate, view, enableHotkeys } = useCalendar();

    useHotkeys('ArrowLeft', () => prev(), {
        enabled: enableHotkeys,
    });

    const prev = useCallback(() => {
        if (view === 'day') {
            setDate(subDays(date, 1));
        } else if (view === 'week') {
            setDate(subWeeks(date, 1));
        } else if (view === 'month') {
            setDate(subMonths(date, 1));
        } else if (view === 'year') {
            setDate(subYears(date, 1));
        }
    }, [date, view, setDate]);

    return (
        <Button
            size="icon"
            variant="outline"
            ref={ref}
            {...props}
            onClick={(e) => {
                prev();
                onClick?.(e);
            }}
        >
            {children}
        </Button>
    );
});
CalendarPrevTrigger.displayName = 'CalendarPrevTrigger';

const CalendarTodayTrigger = forwardRef<HTMLButtonElement, React.HTMLAttributes<HTMLButtonElement>>(({ children, onClick, ...props }, ref) => {
    const { setDate, enableHotkeys, today } = useCalendar();

    useHotkeys('t', () => jumpToToday(), {
        enabled: enableHotkeys,
    });

    const jumpToToday = useCallback(() => {
        setDate(today);
    }, [today, setDate]);

    return (
        <Button
            variant="outline"
            ref={ref}
            {...props}
            onClick={(e) => {
                jumpToToday();
                onClick?.(e);
            }}
        >
            {children}
        </Button>
    );
});
CalendarTodayTrigger.displayName = 'CalendarTodayTrigger';

const CalendarCurrentDate = () => {
    const { date, view } = useCalendar();

    return (
        <time dateTime={date.toISOString()} className="mr-4 text-2xl tabular-nums">
            {format(date, view === 'day' ? 'dd MMMM yyyy' : 'MMMM yyyy')}
        </time>
    );
};

const TimeTable = () => {
    const now = new Date();

    return (
        <div className="w-12 pr-2">
            {Array.from(Array(25).keys()).map((hour) => {
                return (
                    <div className="relative h-20 text-right text-xs text-muted-foreground/50 last:h-0" key={hour}>
                        {now.getHours() === hour && (
                            <div
                                className="z- absolute left-full h-[2px] w-dvw translate-x-2 bg-red-500"
                                style={{
                                    top: `${(now.getMinutes() / 60) * 100}%`,
                                }}
                            >
                                <div className="absolute top-1/2 left-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500"></div>
                            </div>
                        )}
                        <p className="top-0 -translate-y-1/2">{hour === 24 ? 0 : hour}:00</p>
                    </div>
                );
            })}
        </div>
    );
};

const getDaysInMonth = (date: Date) => {
    const startOfMonthDate = startOfMonth(date);
    const startOfWeekForMonth = startOfWeek(startOfMonthDate, {
        weekStartsOn: 0,
    });

    let currentDate = startOfWeekForMonth;
    const calendar = [];

    while (calendar.length < 42) {
        calendar.push(new Date(currentDate));
        currentDate = addDays(currentDate, 1);
    }

    return calendar;
};

const generateWeekdays = (locale: Locale) => {
    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
        const date = addDays(startOfWeek(new Date(), { weekStartsOn: 0 }), i);
        daysOfWeek.push(format(date, 'EEEEEE', { locale }));
    }
    return daysOfWeek;
};

export {
    Calendar,
    CalendarCurrentDate,
    CalendarDayView,
    CalendarMonthView,
    CalendarNextTrigger,
    CalendarPrevTrigger,
    CalendarTodayTrigger,
    CalendarViewTrigger,
    CalendarWeekView,
    CalendarYearView,
};
