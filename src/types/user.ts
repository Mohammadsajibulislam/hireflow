// Literal Type Union দিয়ে ৩টা নির্দিষ্ট role — ts_documentation.md সেকশন ১৩
export type UserRole = "candidate" | "recruiter" | "admin";

// ডেটাবেজে যেভাবে ইউজার সংরক্ষিত থাকবে (Better-Auth নিজে থেকেই এই কালেকশন ম্যানেজ করে)
export interface UserDocument {
  _id?: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
}

// রেজিস্ট্রেশন ফর্ম থেকে যা আসবে
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}