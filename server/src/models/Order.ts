import { Schema, model } from 'mongoose'

const orderSchema = new Schema({
  id: Number,
  user: String,
  phone: String,
  from: String,
  to: String,
  date: Date,
  status: String,
  acceptedBy: String,
  completedBy: String
})

module.exports = model('Order', orderSchema)
