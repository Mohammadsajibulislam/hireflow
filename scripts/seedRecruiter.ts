import "dotenv/config";
import { auth } from "../src/lib/auth";
import mongoClient from "../src/lib/mongodb";

async function seedRecruiter() {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: "Demo Recruiter",
        email: "recruiter@hireflow.demo",
        password: "demo1234",
        role: "recruiter", // additionalFields এ input: true দেওয়া ছিল বলে সরাসরি এভাবে দেওয়া যাচ্ছে
      },
    });

    console.log("Recruiter account created:", result.user.email);
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoClient.close();
    process.exit(0);
  }
}

seedRecruiter();