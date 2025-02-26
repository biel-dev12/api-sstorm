import express from 'express'
import userRoutes from './routes/userRoutes.js'
import deptRoutes from './routes/deptRoutes.js'
import segmentRoutes from './routes/segmentRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import cityRoutes from "./routes/cityRoutes.js"
import typeServiceRoutes from './routes/typeServiceRoutes.js'
import techRoutes from "./routes/techRoutes.js"
import pgrRoutes from "./routes/pgrRoutes.js";
import cors from 'cors'
import fs from 'fs'
import https from 'https'

const PORT = 3000
const app = express()

app.use(cors({
  origin: "https://sstorm-doctors.netlify.app",
  credentials: true
}));

app.use(express.json())


app.use("/", userRoutes)
app.use("/", deptRoutes)
app.use("/", segmentRoutes)
app.use("/", companyRoutes)
app.use("/", cityRoutes)
app.use("/", typeServiceRoutes)
app.use("/", techRoutes)
app.use("/api/pgr", pgrRoutes)

const cert = fs.readFileSync('./config/mkcert/192.168.1.55.pem')
const key = fs.readFileSync('./config/mkcert/192.168.1.55-key.pem')

// Criar o servidor HTTPS
https.createServer({ key, cert }, app).listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando com HTTPS na porta ${PORT}`);
  });
