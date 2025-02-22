import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { Teacher } from "@/types/Teacher";
import { useNavigate } from "react-router";

export default function TeacherCard({ teacher }: { teacher: Teacher }) {
  const navigate = useNavigate();

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Card className="p-4 w-80 text-center shadow-lg border border-gray-200 rounded-2xl">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={teacher.avatar} alt={teacher.name} />
        </Avatar>
        <CardContent>
          <h2 className="text-xl font-bold text-gray-800">{teacher.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{teacher.qualifications}</p>
          <div className="mt-3 text-lg font-semibold text-blue-600">
            ${teacher.price} per session
          </div>
          <Button className="mt-4 w-full" onClick={() => navigate("/teacher")}>
            Enroll
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
