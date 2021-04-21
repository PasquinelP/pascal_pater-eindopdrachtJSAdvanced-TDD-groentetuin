// Create the functions for the given tests getYieldForPlant, getYieldForCrop and getTotalYield

// get yield for specific plant
const getYieldForPlant = plant => plant.yield;

// calculate yield for entire crop of specific plant
const getYieldForCrop = crop => getYieldForPlant(crop.crop) * crop.numCrops;

// calculate total yield of crops of several plants
const getTotalYield = ({ crops }) => crops
  // go through crops and get yield for each crop
  .map((crop) => getYieldForCrop(crop))
  // add the yield for each crop to get total yield
  .reduce((acc, cValue) => acc + cValue);

// Step 1: calculate the cost for a crop
const getCostsForCrop = crop => crop.crop.costs * crop.numCrops;

// Step 2: calculate revenue for a crop (with no environment factors)
  // sale_price is per kg, so we need yield for crop * sale_price
const getRevenueForCrop = crop => getYieldForCrop(crop) * crop.crop.salePrice;

// Step 3: calculate the profit for a crop (with no environment factors)
  // profit for crop = revenue for crop - costs for crop
const getProfitForCrop = crop => getRevenueForCrop(crop) - getCostsForCrop(crop);

// Step 4: calculate the profit for multiple crops (with no environment factors)
const getTotalProfit = ({crops}) => {
  // go through crops and get profit for each crop
  const totalProfit = crops.map((crop) => {
      return getProfitForCrop(crop);
      // add the profit for each crop to get total profit
    }).reduce((acc, cValue) => {
      return acc + cValue;
    });
  return totalProfit;
}


module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
};
