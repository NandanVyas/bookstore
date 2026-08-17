import { model, models, Schema, type InferSchemaType } from "mongoose";

const profileSchema = new Schema(
  {
    phone: { type: String, default: "", trim: true },
    addressLine1: { type: String, default: "", trim: true },
    addressLine2: { type: String, default: "", trim: true },
    city: { type: String, default: "", trim: true },
    state: { type: String, default: "", trim: true },
    postalCode: { type: String, default: "", trim: true },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, select: false },
    // Retained only so legacy documents remain readable. It is never selected or verified.
    password: { type: String, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user", required: true },
    profile: { type: profileSchema, default: () => ({}) },
    sessionVersion: { type: Number, default: 0, required: true },
  },
  { timestamps: true },
);

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: Schema.Types.ObjectId };
const UserModel = models.User || model("User", userSchema);
export default UserModel;
