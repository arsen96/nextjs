import { Schema, model, models } from 'mongoose';

const ApartmentsSchema = new Schema({
  title: String,
  city: String,
  lat: Number,
  long: Number,
  price: Number,
  description: String,
  date:Date
});

const APARTMENTS = models.APARTMENTS || model('APARTMENTS', ApartmentsSchema);

export default APARTMENTS;