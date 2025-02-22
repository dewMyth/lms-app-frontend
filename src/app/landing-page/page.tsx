import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Logo from "../../assets/logo-main.png";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="relative z-0 bg-primary bg-hero-pattern bg-cover bg-no-repeat bg-center"
        style={{
          height: "100vh",
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="logo m-10">
            <img src={Logo} alt="Little Genius Hub" className="h-60" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome to Little Genius Hub
            </h1>
          </motion.div>

          <div className="mt-8 flex flex-col md:flex-row gap-6">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                className="p-6 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <CardContent className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    I am a Teacher
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Create and manage courses effortlessly.
                  </p>
                  <Button className="mt-4">Get Started</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Card
                className="p-6 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                <CardContent className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    I am a Student
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Access and explore courses easily.
                  </p>
                  <Button className="mt-4">Start Learning</Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
