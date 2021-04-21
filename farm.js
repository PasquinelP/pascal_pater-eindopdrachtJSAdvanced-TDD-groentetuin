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
const getCostsForCrop = (crop) => {
  const costsCrop = crop.crop.costs;
  const numCrops = crop.numCrops;
  const costsForCrop = costsCrop * numCrops;
  return costsForCrop;
}

// Step 2: calculate revenue for a crop (with no environment factors)
const getRevenueForCrop = (crop) => {
  // sale_price is per kg, so we need yield for crop * sale_price
  const yieldForCrop = getYieldForCrop(crop);
  const salePrice = crop.crop.salePrice;
  const revenueForCrop = yieldForCrop * salePrice;
  return revenueForCrop;
};

// Step 3: calculate the profit for a crop (with no environment factors)
const getProfitForCrop = (crop) => {
  // profit for crop = revenue for crop - costs for crop
  const revenueForCrop = getRevenueForCrop(crop);
  const costForCrop = getCostsForCrop(crop);
  const profitForCrop = revenueForCrop - costForCrop;
  return profitForCrop;
}

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
