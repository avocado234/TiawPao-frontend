require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5001;

// ✅ เปิด CORS ให้ทุกโดเมนเข้าถึง API ได้
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Middleware รองรับ JSON
app.use(express.json());

// ✅ เชื่อมต่อ MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/travelDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ สร้าง Schema และ Model
const tripSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  mainImage: String,
  description: String,
  places: [
    {
      name: String,
      image: String,
      detail: String,
    },
  ],
});

const Trip = mongoose.model("Trip", tripSchema);

// 📌 **[GET] ดึงข้อมูลทริปตาม ID**
app.get("/trips/:id", async (req, res) => {
  const { id } = req.params;
  console.log("🔍 Fetching trip with ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return res.status(400).json({ error: "Invalid trip ID format" });
  }

  try {
    const mongoose = require("mongoose");
    const trip = await Trip.findById(new mongoose.Types.ObjectId(req.params.id));

    if (!trip) {
      console.warn("⚠️ Trip not found:", id);
      return res.status(404).json({ error: "Trip not found" });
    }
    console.log("✅ Trip found:", trip);
    res.json(trip);
  } catch (error) {
    console.error("❌ Error fetching trip:", error);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
});

// ✅ **[POST] เพิ่มทริปใหม่**
app.post("/trips", async (req, res) => {
  console.log("Request body:", req.body);
  const { title, subtitle, mainImage, description, places } = req.body;

  // ตรวจสอบว่าได้ส่งข้อมูลครบถ้วนหรือไม่
  if (!title || !subtitle || !mainImage || !description || !places) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // สร้างทริปใหม่ด้วยข้อมูลที่ได้รับ
    const newTrip = new Trip({
      title,
      subtitle,
      mainImage,
      description,
      places,
    });

    // บันทึกทริปใหม่ในฐานข้อมูล
    await newTrip.save();

    // ส่งกลับข้อมูลทริปที่สร้างใหม่
    res.status(201).json({ message: "Trip created successfully", trip: newTrip });
  } catch (error) {
    // หากเกิดข้อผิดพลาด
    console.error("❌ Error creating trip:", error);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

// ✅ **เริ่มเซิร์ฟเวอร์**
app.listen(5001, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:5001`);
});

