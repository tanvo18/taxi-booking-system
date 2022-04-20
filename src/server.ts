
import app from './app'
import { PORT } from './constants/constants'
import { errorHandler } from './middlewares/error-handler'
import logger from './lib/logger'

app.use(errorHandler)

app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))

export default app
