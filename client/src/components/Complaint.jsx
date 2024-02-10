import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Textarea,
  useToast,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import APIRequests from "../api";
import Upload from "./csi_hack_components/Upload";
import axios from "axios";
import { Progress } from "@chakra-ui/progress";
import ImageUpload from "./csi_hack_components/ImageUpload";
import { useNavigate } from "react-router-dom";

const ComplaintForm = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState({
    progress: 0,
    status: "not started",
  });
  const onFileCancel = () => {
    setFile(null);
  };

  // const onUpload = () => {

  //     const storageRef = ref(storage, `reports/$` + uuidv4())
  //     const uploadTask = uploadBytesResumable(storageRef, file)
  //     uploadTask.on('state_changed',
  //         (snapshot) => {
  //             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //             // console.log('Upload is ' + progress + '% done')
  //             switch (snapshot.state) {
  //                 case 'paused':
  //                     // console.log('Upload is paused')
  //                     setUploading({ progress, status: 'paused' })
  //                     break
  //                 case 'running':
  //                     // console.log('Upload is running')
  //                     setUploading({ progress, status: 'running' })
  //                     break
  //             }
  //         },
  //         (error) => {
  //             console.log(error)
  //             toast({
  //                 title: "Report upload failed.",
  //                 description: "We couldn't upload your report for analysis.",
  //                 status: "error",
  //                 duration: 3000,
  //                 isClosable: true,
  //             })
  //         },
  //         () => {
  //             toast({
  //                 title: "Report uploaded.",
  //                 description: "We've uploaded your report for analysis.",
  //                 status: "success",
  //                 duration: 3000,
  //                 isClosable: true,
  //             })
  //             onClose()
  //             onFileCancel()
  //         }
  //     )
  // }

  const initialValues = {
    complaint_title: "",
    complaint_description: "",
    complaint_type: "",
    // category: "",
    // dateTime: "",
    // suspectAccountType: "",
    // suspectAccountLink: "",
    // suspectWalletAddress: "",
    // transactionId: "",
    // otherDetails: "",
  };

  const validationSchema = Yup.object().shape({
    complaint_title: Yup.string().required("Required"),
    complaint_description: Yup.string().required("Required"),
    complaint_type: Yup.string().required("Required"),
    // category: Yup.string().required("Required"),
    // dateTime: Yup.string().required("Required"),
    // suspectAccountType: Yup.string().required("Required"),
    // suspectAccountLink: Yup.string().required("Required"),
    // suspectWalletAddress: Yup.string().required("Required"),
    // transactionId: Yup.string().required("Required"),
    // otherDetails: Yup.string().required("Required"),
  });

  const onSubmit = async (values) => {
    // console.log(values)
    const body = {
      complaint_title: values.complaint_title,
      complaint_description: values.complaint_description,
      complaint_type: values.complaint_type,
      // complaint_status: "pending",
      // complaint_category: "cybercrime",
      // status: values.status,
      // suspectAccountType: values.suspectAccountType,
    };


    const formData = new FormData();
    formData.append("complaint_title", values.complaint_title);
    formData.append("complaint_description", values.complaint_description);
    formData.append("complaint_type", values.complaint_type);
    // formData.append('file', file)
    // Append the file with a unique name ('file' in this case)
    // formData.append('complaint_documents', file);
    formData.append("file", file);
    // formData.append('complaint_status', 'pending')
    // formData.append('complaint_category', 'cybercrime')

    // formData.append('status', values.status)
    // formData.append('suspectAccountType', values.suspectAccountType)
    console.log(file);
    console.log(formData);
    const res = await APIRequests.createComplaint(formData).catch((err) => {
      console.log(err);
    });

    if (res && res.status === 200) {
      console.log(res.data);
      toast({
        title: "Form submitted successfully.",
        description: "We've uploaded your report for analysis.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      navigate(`/complaints`);
    } else {
      toast({
        title: "Form upload failed.",
        description: "We couldn't upload your report for analysis.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    // You can handle form submission logic here
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box p={8}>
        <Heading mb={4}>File a Complaint</Heading>
        <Formik
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* <FormControl
                id="category"
                mb={4}
                isInvalid={errors.category && touched.category}
              >
                <FormLabel>Category of Complaint</FormLabel>
                <Field
                  as={Select}
                  name="category"
                  placeholder="Select a category"
                >
                  <option value="sextortion">Sextortion</option>
                  <option value="ransomware">Ransomware</option>
                  <option value="other">Other</option>
                </Field>
              </FormControl> */}

              <FormControl
                id="complaint_title"
                // name="complaint_title"
                mb={4}
                isInvalid={errors.complaint_title && touched.complaint_title}
              >
                <FormLabel>Complaint Title</FormLabel>
                <Field as={Input} type="text" name="complaint_title" />
              </FormControl>

              <FormControl
                id="complaint_description"
                mb={4}
                isInvalid={
                  errors.complaint_description && touched.complaint_description
                }
              >
                <FormLabel>Complaint Description</FormLabel>
                {/* <Field   as={Input} name="complaint_description" type='text'></Field> */}
                <Textarea as={Input} name="complaint_description" />
              </FormControl>

              <FormControl
                id="complaint_type"
                mb={4}
                isInvalid={errors.complaint_type && touched.complaint_type}
              >
                <FormLabel>Complaint Type</FormLabel>
                <Field
                  as={Select}
                  name="complaint_type"
                  placeholder="Select a Complaint Type"
                >
                  <option value="Personal">Personal</option>
                  <option value="Petition ">Petition</option>
                  <option value="other">Other</option>
                </Field>
              </FormControl>

              {/* <Upload /> */}
              <FormLabel>Related Document</FormLabel>
              {file ? (
                <div class="rounded-md bg-[#F5F7FB] py-4 px-8">
                  <div class="flex items-center justify-between">
                    <span class="truncate pr-3 text-base font-medium text-[#07074D]">
                      {file.name}
                    </span>
                    <button
                      onClick={() => {
                        setFile(null);
                      }}
                      class="text-[#07074D]"
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                          fill="currentColor"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </div>
                  <div class="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                    <Progress value={uploading.progress} colorScheme="blue" />
                  </div>
                </div>
              ) : (
                <ImageUpload>
                  <input
                    id="dropzone-file"
                    type="file"
                    class="hidden"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </ImageUpload>
              )}
              {/* <FormControl
                id="dateTime"
                mb={4}
                isInvalid={errors.dateTime && touched.dateTime}
              >
                <FormLabel>Approximate Date and Time</FormLabel>
                <Field as={Input} type="datetime-local" name="dateTime" />
              </FormControl> */}

              {/* <FormControl
                id="suspectAccountType"
                mb={4}
                isInvalid={
                  errors.suspectAccountType && touched.suspectAccountType
                }
              >
                <FormLabel>Suspect Account Type</FormLabel>
                <Field
                  as={Select}
                  name="suspectAccountType"
                  placeholder="Select an account type"
                >
                  <option value="instagram">Instagram</option>
                  <option value="twitter">Twitter</option>
                  <option value="telegram">Telegram</option>
                  <option value="other">Other</option>
                </Field>
              </FormControl> */}
              {/* 
              <FormControl
                id="suspectAccountLink"
                mb={4}
                isInvalid={
                  errors.suspectAccountLink && touched.suspectAccountLink
                }
              >
                <FormLabel>Suspect Account Link</FormLabel>
                <Field as={Input} type="text" name="suspectAccountLink" />
              </FormControl> */}

              {/* <FormControl  
                id="suspectWalletAddress"
                mb={4}
                isInvalid={
                  errors.suspectWalletAddress && touched.suspectWalletAddress
                }
              >
                <FormLabel>Suspect Wallet Address</FormLabel>
                <Field as={Input} type="text" name="suspectWalletAddress" />
              </FormControl>

              <FormControl
                id="transactionId"
                mb={4}
                isInvalid={errors.transactionId && touched.transactionId}
              >
                <FormLabel>Transaction ID</FormLabel>
                <Field as={Input} type="text" name="transactionId" />
              </FormControl>

              <FormControl
                id="otherDetails"
                mb={4}
                isInvalid={errors.otherDetails && touched.otherDetails}
              >
                <FormLabel>Other Details</FormLabel>
                <Field as={Textarea} name="otherDetails" />
              </FormControl> */}

              <Button colorScheme="blue" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default ComplaintForm;
