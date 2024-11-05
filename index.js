import express from 'express'
import userRoutes from './routes/userRoutes.js'

const PORT = 3000
const app = express()
app.use(express.json())


app.use("/api", userRoutes)

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
