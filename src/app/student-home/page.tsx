import Navbar from "@/components/nav-bar";
import { NavigationMenuDemo } from "@/components/nav-bar-menu-item";
import React from "react";
import BgImg from "../../assets/bg-img.jpg";
import HeroSection from "@/components/hero";

function StudentHomePage() {
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
            <HeroSection />
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
