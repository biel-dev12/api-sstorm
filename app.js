import express from 'express'
import userRoutes from './routes/userRoutes.js'
import deptRoutes from './routes/deptRoutes.js'
import segmentRoutes from './routes/segmentRoutes.js'
import cors from 'cors'

const PORT = 3000
const app = express()

app.use(cors());

app.use(express.json())


app.use("/", userRoutes)
app.use("/", deptRoutes)
app.use("/", segmentRoutes)

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
