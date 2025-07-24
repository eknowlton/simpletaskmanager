import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

export function DateTimeInput({ value, onChange }: { value: Date | undefined; onChange?: (date: Date | undefined) => void }) {
    const [open, setOpen] = React.useState(false);
    const [time, setTime] = React.useState<Date>(new Date());
    const [date, setDate] = React.useState<Date>(value || new Date());

    React.useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            let newDate = new Date(date);
            console.log(time);
            newDate.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
            // check if new date is valid
            if (isNaN(newDate.getTime())) {
                newDate = new Date();
            }

            setDate(newDate);
            onChange?.(newDate);
        }, 750);

        return () => clearTimeout(delayInputTimeoutId);
    }, [time, 500]);

    return (
        <div className="flex w-full gap-4 py-2">
            <div className="flex flex-grow flex-col gap-3">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" id="date-picker" className="w-full justify-between font-normal">
                            {date ? date.toLocaleDateString() : 'Select date'}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full overflow-hidden p-0" align="start">
                        <Calendar
                            className="w-full"
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                if (date) {
                                    const newDate = new Date(date);
                                    newDate.setDate(date.getDate()); // Adjust to next day for all-day events
                                    newDate.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
                                    setDate(newDate);
                                    onChange?.(newDate);
                                }
                                setOpen(false);
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-grow flex-col gap-3">
                <Input
                    onChange={(e) => {
                        if (!e.target.value) {
                            return;
                        }
                        const newTime = new Date(time);
                        const [hours, minutes, seconds] = e.target.value.split(':').map(Number);
                        newTime.setHours(hours, minutes, seconds, 0);
                        setTime(newTime);
                    }}
                    type="time"
                    id="time-picker"
                    step="1"
                    value={time ? time.toTimeString().slice(0, 5) : ''}
                    className="w-full appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    );
}
