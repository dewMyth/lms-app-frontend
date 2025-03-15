import MyCalendar from "@/components/calendar";
import Navbar from "@/components/nav-bar";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Card, CardContent } from "@/components/ui/card";
import { fetchData } from "@/apiService";

function MyCalendarEvents() {
  let { userId } = useParams();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAllEventsForUser = async () => {
      try {
        const data = await fetchData(`events/get-all-events/${userId}`);
        setEvents(data?.allEvents);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchAllEventsForUser();
  }, []);

  // Define events
  // const [events, setEvents] = useState([
  //   {
  //     title: "Math Assignment Due",
  //     start: new Date(2025, 2, 20, 10, 0),
  //     end: new Date(2025, 2, 20, 12, 0),
  //     allDay: false,
  //     desc: "Submit your Math assignment on the LMS portal.",
  //     location: "Online Submission",
  //     type: "Assignment",
  //     color: "#FF5733", // Custom color
  //     url: "https://lms.example.com/assignments/math",
  //   },
  //   {
  //     title: "Science Project Meeting",
  //     start: new Date(2025, 2, 21, 14, 0),
  //     end: new Date(2025, 2, 21, 15, 30),
  //     allDay: false,
  //     desc: "Team discussion on Science project.",
  //     type: "Meeting",
  //     color: "#33A1FF",
  //     url: "https://meet.google.com/science-meeting",
  //   },
  // ]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto ">
        <div className="flex min-h-screen">
          <div className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-4">My Calendar Events</h1>
            <Card className="p-4">
              <CardContent className="p-0">
                <div style={{ height: 600 }}>
                  <MyCalendar events={events} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCalendarEvents;
