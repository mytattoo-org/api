import cors from 'cors'
import express from 'express'
import 'express-async-errors'
import swagger from 'swagger-ui-express'

import { authRoutes } from './auth.routes'
import { commentsRoutes } from './comments.routes'
import { likesRoutes } from './likes.routes'
import { postsRoutes } from './posts.routes'
import { usersRoutes } from './users.routes'

import { ThrowAppErrorController } from '@modules/Error/useCases/throwError/ThrowAppErrorController'

import { swaggerDocument } from '@docs/swaggerDocument'

const app = express()

const errorHandler = new ThrowAppErrorController().handle

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use('/docs', swagger.serve, swagger.setup(swaggerDocument))

app.use(usersRoutes)
app.use('/auth', authRoutes)
app.use(postsRoutes)
app.use(likesRoutes)
app.use(commentsRoutes)

app.use(errorHandler)

export { app }
