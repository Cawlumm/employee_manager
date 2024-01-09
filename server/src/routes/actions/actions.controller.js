const Employee = require('../../models/employee.mongo')

// Function to add employee to db
async function httpAddEmployee(req, res) {
  try {
    const {
      userId,
      firstName,
      lastName,
      mi,
      suffix,
      status,
      jobClass,
      title,
      summaryJobClass,
      position,
      payType,
      payTypeSummary,
      effectiveDate,
      primaryPosition,
      positionStart,
      location,
      group,
      riskCode,
      riskCodeSummary,
      payStart,
      payFreq,
      calcCode,
      numPays,
      daysYear,
      schHours,
      payBasis,
      hoursDay,
      factor,
      remain,
      payStatus,
      FTE,
      hourlyRate,
      dailyRate,
      periodPay,
      anualPay,
      remaining,
      reference,
    } = req.body;
    const newEmployee = await Employee.create({
      userId,
      firstName,
      lastName,
      mi,
      suffix,
      status,
      jobClass,
      title,
      summaryJobClass,
      position,
      payType,
      payTypeSummary,
      effectiveDate,
      primaryPosition,
      positionStart,
      location,
      group,
      riskCode,
      riskCodeSummary,
      payStart,
      payFreq,
      calcCode,
      numPays,
      daysYear,
      schHours,
      payBasis,
      hoursDay,
      factor,
      remain,
      payStatus,
      FTE,
      hourlyRate,
      dailyRate,
      periodPay,
      anualPay,
      remaining,
      reference,
    });

    console.log("Employee added successfully:", newEmployee);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error adding employee:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Function to get employees 
async function httpGetEmployees(req, res) {
    try {
      const { id, ssn, lastName, firstName, mi, suffix } = req.query;
      let query = {};
  
      if (id) {
        query.userId = id;
      }
      if (ssn) {
        query.ssn = ssn;
      }
      if (lastName) {
        query.lastName = new RegExp(lastName, 'i'); // Case-insensitive search
      }
      if (firstName) {
        query.firstName = new RegExp(firstName, 'i');
      }
      if (mi) {
        query.mi = mi;
      }
      if (suffix) {
        query.suffix = suffix;
      }
  
      const employees = await Employee.find(query);
  
      res.status(200).json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
    httpAddEmployee,
    httpGetEmployees
  };