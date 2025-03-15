import { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function MyCalendar({ events }: any) {
  // Set up moment.js localizer
  const localizer = momentLocalizer(moment);

  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.color || "#3174ad"; // Default blue if no color provided
    return {
      style: {
        backgroundColor,
        borderRadius: "5px",
        opacity: 0.9,
        color: "white",
        border: "0px",
        display: "block",
        padding: "5px",
      },
    };
  };

  const CustomEvent = ({ event }: any) => {
    const [open, setOpen] = useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="text-left w-full">
            <strong>{event.title}</strong>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-4 w-64 shadow-lg">
          <h3 className="font-bold text-lg">{event.title}</h3>
          <p className="text-sm text-gray-500">
            {event.desc || "No details provided"}
          </p>
          {event.location && <p className="text-sm">📍 {event.location}</p>}
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter} // Custom styling
        components={{
          event: CustomEvent, // Custom Event Display
        }}
        style={{ height: 500 }}
      />
    </>
  );
}

export default MyCalendar;
