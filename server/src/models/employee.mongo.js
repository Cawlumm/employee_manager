const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: String,
  ssn: String,
  firstName: String,
  lastName: String,
  mi: String,
  suffix: String,
  status: String,
  jobClass: String,
  title: String,
  summaryJobClass: String,
  position: String,
  payType: String,
  payTypeSummary: String,
  effectiveDate: String,
  primaryPosition: Boolean,
  positionStart: String,
  location: String,
  group: String,
  riskCode: String,
  riskCodeSummary: String,
  payStart: String,
  payFreq: String,
  calcCode: String,
  numPays: String,
  daysYear: String,
  schHours: String,
  payBasis: String,
  hoursDay: String,
  factor: String,
  remain: String,
  payStatus: String,
  FTE: String,
  hourlyRate: String,
  dailyRate: String,
  periodPay: String,
  anualPay: String,
  remaining: String,
  reference: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
