import Navbar from "@/components/nav-bar";
import TeacherCard from "@/components/teacher-card";
import { Teacher } from "@/types/Teacher";
import TeacherImage from "../../assets/teacher.jpg";
import { motion } from "framer-motion";

const teachers: Teacher[] = [
  {
    avatar: TeacherImage,
    name: "John Doe",
    qualifications: "PhD in Mathematics, 10+ years xp",
    price: "50",
  },
  {
    avatar: TeacherImage,
    name: "Jane Smith",
    qualifications: "MSc in Physics, 8+ years experience",
    price: "45",
  },
  {
    avatar: TeacherImage,
    name: "Michael Brown",
    qualifications: "M.Ed in English, 12+ years experience",
    price: "55",
  },
  {
    avatar: TeacherImage,
    name: "Emily Johnson",
    qualifications: "BSc in Chemistry, 5+ years experience",
    price: "40",
  },
  {
    avatar: TeacherImage,
    name: "John Doe",
    qualifications: "PhD in Mathematics, 10+ years xp",
    price: "50",
  },
  {
    avatar: TeacherImage,
    name: "Jane Smith",
    qualifications: "MSc in Physics, 8+ years experience",
    price: "45",
  },
  {
    avatar: TeacherImage,
    name: "Michael Brown",
    qualifications: "M.Ed in English, 12+ years experience",
    price: "55",
  },
  {
    avatar: TeacherImage,
    name: "Emily Johnson",
    qualifications: "BSc in Chemistry, 5+ years experience",
    price: "40",
  },
  {
    avatar: TeacherImage,
    name: "John Doe",
    qualifications: "PhD in Mathematics, 10+ years xp",
    price: "50",
  },
  {
    avatar: TeacherImage,
    name: "Jane Smith",
    qualifications: "MSc in Physics, 8+ years experience",
    price: "45",
  },
  {
    avatar: TeacherImage,
    name: "Michael Brown",
    qualifications: "M.Ed in English, 12+ years experience",
    price: "55",
  },
  {
    avatar: TeacherImage,
    name: "Emily Johnson",
    qualifications: "BSc in Chemistry, 5+ years experience",
    price: "40",
  },
];

function Subject() {
  return (
    <>
      <Navbar />

      <div className=" bg-maths-bg">
        <div className="container mx-auto p-5">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
          >
            <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center underline p-5">
              Let's find your new Maths teacher
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {teachers.map((teacher, index) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <TeacherCard teacher={teacher} key={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Subject;
