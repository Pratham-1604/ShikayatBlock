// import { exec } from "child_process";
const { exec } = require("child_process");

const getAuthorityFromComplaint = async (complaintDescription) => {
  try {
    const url = await new Promise((resolve, reject) => {
      try {
        exec(
          `py scripts/prompt.py "${complaintDescription}"`,
          async (error, stdout, stderr) => {
            if (error || stderr) {
              console.error(`Error: ${error || stderr}`);
              resolve(null);
              return;
            }

            const authorityName = stdout.trim();
            console.log("Authority Name: ", authorityName);

            resolve(authorityName);
          }
        );
      } catch (error) {
        console.error("Error occurred while generating certificate", error);
        resolve(null);
      }
    });

    return url;
  } catch (error) {
    console.log("Error occurred while generating certificate", error);
    return null;
  }
};

exports.getAuthorityFromComplaint = getAuthorityFromComplaint;
