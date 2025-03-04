import { fetchData } from "@/apiService";
import { DataTable } from "@/components/data-table";
import Navbar from "@/components/nav-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function MyActivities() {
  const user = useSelector((state: any) => state.auth.user);
  const [myAssignments, setMyAssignments] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    const fetchMyActivities = async () => {
      try {
        const data = await fetchData(`users/view-all-assignments/${user._id}`);
        setMyAssignments(data);
        setAllCount(data.length);
        // setCompletedCount(
        //   data.filter((assignment: any) => assignment.submitted == true)
        // );
        setPendingCount(allCount - completedCount);
      } catch (error) {
        console.error("Error fetching video lessons:", error);
      }
    };
    fetchMyActivities();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-primary bg-hero-pattern bg-fixed bg-cover bg-center bg-fixed h-screen">
        <div className="container mx-auto">
          <section className="title mt-10">
            <div className="grid grid-cols-[9fr_1fr_1fr_1fr]">
              <div>
                <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  My Activities
                </h2>
              </div>
              <div>
                <b>All ({allCount})</b>
              </div>
              <div>
                <b>Pending ({pendingCount})</b>
              </div>
              <div>
                <b>Completed ({completedCount != 0 ? completedCount : "0"})</b>
              </div>
            </div>
          </section>
          <DataTable assignments={myAssignments} />
        </div>
      </div>
    </>
  );
}

export default MyActivities;
