const FuelAllocation = require("../models/FuelAllocation");
const FuelOrder = require("../models/FuelOrder");

//get monthly data
const getMonthlyFuelConsumption = async (
  stationId,
  month,
  year,
  orderSummary
) => {
  let fuelTypes = [];
  let customerData;

  //filtering allocation data
  await FuelAllocation.aggregate([
    {
      $match: {
        stationId: { $regex: stationId, $options: "i" },
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: {
              $dateFromString: { dateString: "$startDate", format: "%Y-%m-%d" },
            },
          },
          year: {
            $year: {
              $dateFromString: { dateString: "$startDate", format: "%Y-%m-%d" },
            },
          },
        },
        totalAmount: { $sum: "$allocatedAmount" },
        totalCustomers: { $count: {} },
      },
    },
    {
      $match: {
        _id: { month: parseInt(month), year: parseInt(year) },
      },
    },
  ]).then((data) => {
    customerData = data;
  });

  orderSummary.percentages.map((data) => {
    fuelTypes.push(data.type);
  });

  let remainingFuelAmount =
    orderSummary.totalAmount - customerData[0].totalAmount;

  const consumeSummary = {
    types: fuelTypes,
    remainingFuelAmount,
    totalCustomers: customerData[0].totalCustomers,
  };

  return consumeSummary;
};

//get annual data
const getAnnualFuelConsumption = async (stationId, year, orderSummary) => {
  let fuelTypes = [];
  let customerData;

  //filtering allocation data
  await FuelAllocation.aggregate([
    {
      $match: {
        stationId: { $regex: stationId, $options: "i" },
      },
    },
    {
      $group: {
        _id: {
          year: {
            $year: {
              $dateFromString: { dateString: "$startDate", format: "%Y-%m-%d" },
            },
          },
        },
        totalAmount: { $sum: "$allocatedAmount" },
        totalCustomers: { $count: {} },
      },
    },
    {
      $match: {
        _id: { year: parseInt(year) },
      },
    },
  ]).then((data) => {
    customerData = data;
  });

  orderSummary.percentages.map((data) => {
    fuelTypes.push(data.type);
  });

  let remainingFuelAmount =
    orderSummary.totalAmount - customerData[0].totalAmount;

  const consumeSummary = {
    types: fuelTypes,
    remainingFuelAmount,
    totalCustomers: customerData[0].totalCustomers,
  };

  return consumeSummary;
};

module.exports = { getMonthlyFuelConsumption, getAnnualFuelConsumption };
