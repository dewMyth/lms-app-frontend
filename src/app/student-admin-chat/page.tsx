import NavBar from "@/components/nav-bar";
import StudentChat from "@/components/student-admin-chat/admin-chat";

function StudentAdminChatPage() {
  return (
    <>
      <NavBar />
      <div className="container mx-auto">
        <StudentChat />
      </div>
    </>
  );
}

export default StudentAdminChatPage;
