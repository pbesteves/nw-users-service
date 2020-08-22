import express from 'express'
import dotenv from 'dotenv'

// DB
import makeConnection from '@/db/makeConnection'
import User from '@/db/models/userModel'
import Token from '@/db/models/tokenModel'
import Role from '@/db/models/roleModel'

// Handlers
import addUserHandler from '@/handlers/addUserHandler'
import confirmationHandler from '@/handlers/confirmationHandler'
import resendTokenHandler from '@/handlers/resendTokenHandler'
import deleteUserHandler from '@/handlers/deleteUserHandler'
import editUserHandler from '@/handlers/editUserHandler'
import createRoleHandler from '@/handlers/createRoleHandler'

// Middlewares
import bodyParser from 'body-parser'
import createToken from '@/middlewares/createToken'
import dispatchMail from '@/middlewares/dispatchMail'
import encryptPassword from '@/middlewares/encryptPassword'
import comparePasswords from '@/middlewares/comparePasswords'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(encryptPassword)
app.use(createToken)
app.use(dispatchMail)
app.use(comparePasswords)

app.route('/api/v1/users').get((req, res) => res.send('Get users route'))

app.post('/api/v1/users/signup', async (req, res) => {
  res.json(
    await addUserHandler(
      req.body,
      makeConnection,
      User,
      req.encryptComponent,
      req.tokenComponent,
      req.emailComponent
    )
  )
})

app.post('/api/v1/users/confirmation', async (req, res) => {
  res.json(await confirmationHandler(req.body, makeConnection, User, Token))
})

app.post('/api/v1/users/resend', async (req, res) => {
  res.json(
    await resendTokenHandler(
      req.body,
      makeConnection,
      User,
      req.tokenComponent,
      req.emailComponent
    )
  )
})

app.put('/api/v1/users/edit', async (req, res) => {
  res.json(
    await editUserHandler(
      req.body,
      makeConnection,
      User,
      req.encryptComponent,
      req.tokenComponent,
      req.emailComponent,
      req.checkPasswordsComponent
    )
  )
})

app.delete('/api/v1/users/delete', async (req, res) => {
  res.json(
    await deleteUserHandler(req.body, makeConnection, User, req.emailComponent)
  )
})

app.post('/api/v1/roles/create', async (req, res) => {
  res.json(await createRoleHandler(req.body, makeConnection, User, Role))
})

app.listen(process.env.PORT, () => {
  console.log(`Running on http://localhost:${process.env.PORT}`)
})
