// Eindopdracht Pascal Pater
// Javascript Testing - TDD groentetuin


// Create the functions for the given tests getYieldForPlant, getYieldForCrop and getTotalYield

// get yield for specific plant
// use optional parameters to account for calling function without second parameter
const getYieldForPlant = (plant, environmentFactors = 0) => {
  if (!environmentFactors) {
    return plant.yield;
  }

  // how to get keys-values from object
  // https://dmitripavlutin.com/access-object-keys-values-entries/#3-objectentries-returns-entries
  for (const [factor, impact] of Object.entries(environmentFactors)) {
    const evFactor = plant.factors[factor];
    const evFactorPercentage = evFactor[impact];
    const calculatedYield = (plant.yield * (100 + evFactorPercentage)) / 100;
    if (evFactor === "sun" && evFactor === "wind") {
      plant.yield = calculatedYield * calculatedYield;
    } else {
      plant.yield = calculatedYield;
    }
  }
  return plant.yield;
};

// calculate yield for entire crop of specific plant
const getYieldForCrop = (crop, environmentFactors) => {
  if (!environmentFactors) {
    return crop.crop.yield * crop.numCrops;
  } else {
    return getYieldForPlant(crop.crop, environmentFactors) * crop.numCrops;
  }
};

// calculate total yield of crops of several plants
  // go through crops and get yield for each crop (map)
  // add the yield for each crop to get total yield (reduce)
const getTotalYield = ({ crops }, environmentFactors) => crops.map((crop) => getYieldForCrop(crop, environmentFactors)).reduce((acc, cValue) => acc + cValue);

// Step 1: calculate the cost for a crop
const getCostsForCrop = (crop) => crop.crop.costs * crop.numCrops;

// Step 2: calculate revenue for a crop
// sale_price is per kg, so we need yield for crop * sale_price
const getRevenueForCrop = (crop, environmentFactors) =>
  getYieldForCrop(crop, environmentFactors) * crop.crop.salePrice;

// Step 3: calculate the profit for a crop
// profit for crop = revenue for crop - costs for crop
const getProfitForCrop = (crop, environmentFactors) =>
  getRevenueForCrop(crop, environmentFactors) - getCostsForCrop(crop);

// Step 4: calculate the profit for multiple crops
  // go through crops and get profit for each crop
  // add the profit for each crop to get total profit
const getTotalProfit = ({ crops }, environmentFactors) => crops.map((crop) => getProfitForCrop(crop, environmentFactors)).reduce((acc, cValue) => acc + cValue);


module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
