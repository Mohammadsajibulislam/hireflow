import "dotenv/config";
import { auth } from "../src/lib/auth";
import mongoClient from "../src/lib/mongodb";

async function seedAdmin() {
  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: "Admin User",
        email: "admin@hireflow.demo",
        password: "demo1234",
      },
    });

    console.log("Admin account created:", result.user.email);

    const db = mongoClient.db();
    await db.collection("user").updateOne(
      { email: "admin@hireflow.demo" },
      { $set: { role: "admin" } }
    );

    console.log("Role updated to admin ✅");
  } catch (error) {
    console.error("Seeding failed:", error);
  } finally {
    await mongoClient.close();
    process.exit(0);
  }
}

seedAdmin();