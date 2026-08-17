import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";

async function main() {
  const emailArgument = process.argv.find((value) => value.startsWith("--email="));
  const email = emailArgument?.slice("--email=".length).trim().toLowerCase();
  if (!email) throw new Error("Usage: npm run admin:promote -- --email=you@example.com");
  await connectDB();
  const result = await UserModel.updateOne({ email }, { role: "admin", $inc: { sessionVersion: 1 } });
  if (!result.matchedCount) throw new Error("No account exists for that email.");
  console.info(`Promoted ${email} to administrator. Existing sessions were invalidated.`);
  process.exit(0);
}

main().catch((error) => { console.error(error instanceof Error ? error.message : "Promotion failed."); process.exit(1); });
