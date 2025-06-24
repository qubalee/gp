import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { writeFileSync } from "fs";
import { Parser } from "json2csv";
import { config } from "dotenv";

config();

// Firebase config from .env
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY!,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.VITE_FIREBASE_APP_ID!,
};

console.log("📁 Running from:", process.cwd());
console.log("🔍 Loaded Firebase Config:");
console.log(JSON.stringify(firebaseConfig, null, 2));

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function exportRatingsToCSV() {
  console.log("⏳ Fetching ratings...");
  const snapshot = await getDocs(collection(db, "ratings"));
  console.log("📦 Documents found:", snapshot.size);

  const records: any[] = [];

  snapshot.forEach((doc) => {
    const data = doc.data();
    const ratings = data.ratings || {};
    records.push({
      imageId: data.imageId,
      source: data.source,
      Realism: ratings.Realism,
      Accuracy: ratings.Accuracy,
      Detail: ratings.Detail,
      Visual: ratings.Visual,
      timestamp: data.timestamp?.toDate().toISOString(),
    });
  });

  if (records.length === 0) {
    console.warn("⚠️ No ratings found in Firestore.");
    return;
  }

  const parser = new Parser();
  const csv = parser.parse(records);
  const outputPath = "./scripts/ratings_export.csv";
  writeFileSync(outputPath, csv);
  console.log(`✅ Export complete: ${outputPath}`);
}

exportRatingsToCSV().catch((err) => console.error("❌ Error exporting:", err));
