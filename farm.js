// Create the functions for the given tests getYieldForPlant, getYieldForCrop and getTotalYield

// get yield for specific plant
const getYieldForPlant = (plant) => {
  const yieldForPlant = plant.yield;
  return yieldForPlant;
};

// calculate yield for entire crop of specific plant
const getYieldForCrop = (crop) => {
  const plantYield = getYieldForPlant(crop.crop);
  const numCrops = crop.numCrops;
  const yieldForCrop = plantYield * numCrops;
  return yieldForCrop;
};

// calculate total yield of crops of several plants
const getTotalYield = ({crops}) => {
  // go through crops and get yield for each crop
  const totalYield = crops.map((crop) => {
    return getYieldForCrop(crop);
    // add the yield for each crop to get total yield
  }).reduce((acc, cValue) => {
    return acc + cValue;
  });
  return totalYield;
};

// Step 1: calculate the cost for a crop: getCostsForCrop
const getCostsForCrop = (crop) => {
  const costsCrop = crop.crop.costs;
  const numCrops = crop.numCrops;
  const costsForCrop = costsCrop * numCrops;
  return costsForCrop;
}


module.exports = {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
};
