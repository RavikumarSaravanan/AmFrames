import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "db.json");
const UPLOADS_PATH = path.join(__dirname, "uploads");

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      await fs.mkdir(UPLOADS_PATH, { recursive: true });
      cb(null, UPLOADS_PATH);
    } catch (err) {
      cb(err as Error, UPLOADS_PATH);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

async function initDb() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initialData = {
      posts: [
        {
          id: "1",
          type: "photo",
          title: "Sunset Beach Wedding",
          category: "Wedding",
          description: "Captured at Tharangambadi beach side. Cinematic lighting style.",
          mediaUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
          createdAt: new Date().toISOString()
        },
        {
          id: "2",
          type: "photo",
          title: "Outdoor Maternity Shoot",
          category: "Maternity",
          description: "Natural light outdoors. Tharangambadi gardens.",
          mediaUrl: "https://images.unsplash.com/photo-1559734914-469b61d6706e?auto=format&fit=crop&q=80&w=1200",
          createdAt: new Date().toISOString()
        },
        {
          id: "3",
          type: "photo",
          title: "Traditional Reception",
          category: "Wedding",
          description: "Classical indoor reception shoot.",
          mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
          createdAt: new Date().toISOString()
        },
        {
          id: "4",
          type: "photo",
          title: "First Birthday Joy",
          category: "Baby",
          description: "Cute moment from a first birthday celebration.",
          mediaUrl: "https://images.unsplash.com/photo-1530652101053-8c0db4fbb5de?auto=format&fit=crop&q=80&w=1200",
          createdAt: new Date().toISOString()
        },
        {
          id: "5",
          type: "photo",
          title: "Custom Photo Frame - Classic",
          category: "Frames",
          description: "High quality wooden frame with matte finish.",
          mediaUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=1200",
          createdAt: new Date().toISOString()
        }
      ],
      admin: {
        username: "admin",
        password: "password123" // In a real app, this would be hashed and stored securely
      }
    };
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

async function startServer() {
  await initDb();
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Serve uploads statically
  app.use("/uploads", express.static(UPLOADS_PATH, {
    maxAge: "1d",
    etag: true
  }));

  // API Routes
  app.post("/api/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  });

  app.get("/api/posts", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    res.json(data.posts);
  });

  app.post("/api/posts", async (req, res) => {
    const { type, title, category, description, mediaUrl } = req.body;
    const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    const newPost = {
      id: Date.now().toString(),
      type,
      title,
      category,
      description,
      mediaUrl,
      createdAt: new Date().toISOString()
    };
    data.posts.push(newPost);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    res.status(201).json(newPost);
  });

  app.delete("/api/posts/:id", async (req, res) => {
    const { id } = req.params;
    const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    data.posts = data.posts.filter((p: any) => p.id !== id);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    res.status(204).send();
  });

  app.post("/api/bookings", async (req, res) => {
    const booking = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    if (!data.bookings) data.bookings = [];
    data.bookings.push(booking);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
    res.status(201).json({ success: true });
  });

  app.get("/api/admin/data", async (req, res) => {
    const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    res.json({
      posts: data.posts || [],
      bookings: data.bookings || []
    });
  });

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
    if (data.admin.username === username && data.admin.password === password) {
      res.json({ success: true, token: "dummy-token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Cache static assets in production
    app.use(express.static(distPath, {
      maxAge: "1y",
      immutable: true,
      index: false
    }));

    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
