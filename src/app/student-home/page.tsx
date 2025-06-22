import Navbar from "@/components/nav-bar";
import HeroSection from "@/components/hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import { useSelector } from "react-redux";

function StudentHomePage() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <>
      <Navbar />
      <section>
        <div
          className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center"
          style={{
            height: "100vh",
          }}
        >
          <div className="container mx-auto">
            <HeroSection user={user} />
          </div>

          {/* Minimal Contact Section */}
          <div className="absolute bottom-8 mb-12 left-0 right-0 bg-gradient-to-t from-background/95 to-transparent">
            <div className="container mx-auto px-4">
              <Card className="mx-auto max-w-md border-0 bg-transparent shadow-none">
                <CardContent className="p-3 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <h3 className="mb-1 text-lg font-semibold text-black">
                    Need Help?
                  </h3>
                  <p className="mb-3 text-sm text-black">
                    Chat directly with our admin team for quick assistance
                  </p>

                  <Link to="/student-admin-chat">
                    <Button className="group w-full rounded-full bg-white/20 backdrop-blur-sm px-6 font-medium text-black shadow-md hover:bg-white/30 border border-white/20">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Chat with Admin
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* <div>
        <img src={BgImg} alt="" style={{ backgroundSize: "cover" }} />
      </div> */}
    </>
  );
}

export default StudentHomePage;
