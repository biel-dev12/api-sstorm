import express from 'express'
import userRoutes from './routes/userRoutes.js'
import deptRoutes from './routes/deptRoutes.js'
import segmentRoutes from './routes/segmentRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import cityRoutes from "./routes/cityRoutes.js"
import cors from 'cors'

const PORT = 3000
const app = express()

app.use(cors());

app.use(express.json())


app.use("/", userRoutes)
app.use("/", deptRoutes)
app.use("/", segmentRoutes)
app.use("/", companyRoutes)
app.use("/", cityRoutes)

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
