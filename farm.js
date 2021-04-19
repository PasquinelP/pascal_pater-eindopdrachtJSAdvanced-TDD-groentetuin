
const getYieldForPlant = (plant) => {
  const yieldForPlant = plant.yield;
  return yieldForPlant;
};


const getYieldForCrop = (crop) => {
  const plantYield = getYieldForPlant(crop.crop);
  const numCrops = crop.numCrops;
  const yieldForCrop = plantYield * numCrops;
  return yieldForCrop;
};


const getTotalYield = ({crops}) => {
  const totalYield = crops.map((crop) => {
    return getYieldForCrop(crop);
  }).reduce((acc, cValue) => {
    return acc + cValue;
  });
  return totalYield;
};



module.exports = { getYieldForPlant, getYieldForCrop, getTotalYield };
