
import app from './app'
import { PORT } from './constants/constants'
import { errorHandler } from './middlewares/error-handler'

app.use(errorHandler)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

export default app
