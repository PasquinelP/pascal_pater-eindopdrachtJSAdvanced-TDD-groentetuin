
const getYieldForPlant = (plant) => {
  const yieldForPlant = plant.yield;
  return yieldForPlant;
};


const getYieldForCrop = (crop) => {
  const plantYield = getYieldForPlant(crop.crop);
  const numCrops = crop.numCrops;
  const yieldForCrop = plantYield * numCrops;
  return yieldForCrop;
}




module.exports = { getYieldForPlant, getYieldForCrop };