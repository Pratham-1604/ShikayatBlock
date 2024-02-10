import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CopyIcon, CheckIcon, WarningIcon, CloseIcon } from "@chakra-ui/icons";
import { Box, Heading } from "@chakra-ui/react";

const status = {
  warn: {
    icon: <WarningIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    iconBackground: "bg-yellow-400",
  },
  success: {
    icon: <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    iconBackground: "bg-green-400",
  },
  fail: {
    icon: <CloseIcon className="h-5 w-5 text-white" aria-hidden="true" />,
    iconBackground: "bg-red-400",
  },
};

const timeline = [
  {
    status: "Applied to",
    date: "Sep 20",
    status_type: "success",
  },
  {
    status: "Advanced to phone screening by",
    date: "Sep 22",
    status_type: "warn",
  },
  {
    status: "Completed phone screening with",
    date: "Sep 28",
    status_type: "fail",
  },
  {
    status: "Advanced to interview by",
    date: "Sep 30",
    status_type: "warn",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AdminInnerComplaint = () => {
  const [data, setData] = useState([]);
  const { complaint_id } = useParams();

  return (
    <Box className="flex flex-row-reverse" p={8}>
      <div className="w-[80%] bg-white shadow overflow-hidden sm:rounded-lg ml-3 p-2    ">
        <Heading mb={4}>Remarks</Heading>
        <div className="flow-root">
          <ul role="list" className="mb-4 mx-10 mt-4">
            {timeline.map((event, eventIdx) => (
              <li key={event.id}>
                <div className="relative pb-8">
                  {eventIdx !== timeline.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div className="text-white">
                      <span
                        className={`${
                          status[`${event.status_type}`].iconBackground
                        } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}
                      >
                        {status[`${event.status_type}`].icon}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">{event.status} </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time dateTime={event.datetime}>{event.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full">
          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Add your Remark
            </label>

            <div className="mt-1">
              <textarea
                rows={4}
                name="comment"
                id="comment"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-500 rounded-md"
                defaultValue={""}
              />
            </div>
          </div>
          <div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="location"
                name="location"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                defaultValue="Canada"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex space-x-2">
          <Heading mb={4}>Complaint Title</Heading>
          {/* <Heading mb={4}>-</Heading> */}
          {/* <p>-</p> */}
          <Heading mb={4}>{"(" + complaint_id + ")"}</Heading>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className=" border-gray-200 px-4 py-5 sm:px-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-md font-medium text-[#0262AF]">
                  Name of Complainant
                </dt>
                <dd className="mt-1 text-md text-gray-900">Margot Foster</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-md font-medium text-[#0262AF]">
                  Complaint Type
                </dt>
                <dd className="mt-1 text-md text-gray-900">
                  Backend Developer
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-md font-medium text-[#0262AF]">
                  Authority Name
                </dt>
                <dd className="mt-1 text-md text-gray-900">
                  margotfoster@example.com
                </dd>
              </div>

              <div className="sm:col-span-2">
                <dt className="text-md font-medium text-[#0262AF]">
                  Complaint Description
                </dt>
                <dd className="mt-1 text-md text-gray-900">
                  Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                  incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                  consequat sint. Sit id mollit nulla mollit nostrud in ea
                  officia proident. Irure nostrud pariatur mollit ad adipisicing
                  reprehenderit deserunt qui eu.
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-md font-medium text-[#0262AF]">Document</dt>
                <dd className="mt-1 text-md text-gray-900">
                  <ul
                    role="list"
                    className="border border-gray-200 rounded-md divide-y divide-gray-200"
                  >
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-md">
                      <div className="w-0 flex-1 flex items-center">
                        <CopyIcon
                          className="flex-shrink-0 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2 flex-1 w-0 truncate">
                          resume_back_end_developer.pdf
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          View
                        </a>
                      </div>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AdminInnerComplaint;
