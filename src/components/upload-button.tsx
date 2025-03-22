import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UploadIcon } from "lucide-react";
import { fetchData, postData } from "@/apiService";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function UploadButton({ assignmentId }: any) {
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const user = useSelector((state: any) => state.auth.user);

  // Handle file selection
  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Save the selected file in state
    }
    console.log(file);
  };

  // Handle file upload when button is clicked
  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await postData(
        `users/submission/${assignmentId}/${user._id}`,
        formData
      );

      const data = await response.json();
      console.log("File uploaded successfully:", data.fileUrl);
      if (data) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <Input
        id="submission"
        type="file"
        className="w-[150px]"
        onChange={handleFileChange}
        accept=".pdf,.docx" // Save file when selected
      />
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            disabled={!file} // Disable the button if no file is selected
          >
            <UploadIcon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to submit your answers for the assignment. This
              action cannot be undone. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFileUpload}>
              Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
