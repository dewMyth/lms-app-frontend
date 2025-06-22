import Navbar from "@/components/nav-bar";
import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

import { useSelector } from "react-redux";

function StudentHomePage() {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  const handleContactAdmin = () => {
    navigate("/student-chat");
  };

  return (
    <>
      <Navbar />
      <section>
        <div className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center min-h-screen flex flex-col">
          <div className="container mx-auto flex-1 flex items-center justify-center px-4">
            <HeroSection user={user} />
          </div>

          {/* <h3 className="mb-1 text-lg font-semibold text-black">Need Help?</h3> */}
        </div>
      </section>

      {/* <div>
        <img src={BgImg} alt="" style={{ backgroundSize: "cover" }} />
      </div> */}
    </>
  );
}

export default StudentHomePage;
