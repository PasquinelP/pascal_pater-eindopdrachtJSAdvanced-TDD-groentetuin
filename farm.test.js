// Eindopdracht Pascal Pater
// Javascript Testing - TDD groentetuin


const {
  getYieldForPlant,
  getYieldForCrop,
  getTotalYield,
  getCostsForCrop,
  getRevenueForCrop,
  getProfitForCrop,
  getTotalProfit,
} = require("./farm");

// Create the functions for the following given tests getYieldForPlant, getYieldForCrop and getTotalYield

// getYieldForPlant
describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

// getYieldForCrop
describe("getYieldForCrop", () => {
  test("Get yield for crop, simple", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getYieldForCrop(input)).toBe(30);
  });
});

// getTotalYield
describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalYield({ crops })).toBe(23);
  });

  test("Calculate total yield with 0 amount", () => {
    const corn = {
      name: "corn",
      yield: 3,
    };
    const crops = [{ crop: corn, numCrops: 0 }];
    expect(getTotalYield({ crops })).toBe(0);
  });
});

// Step 1: calculate the cost for a crop: getCostsForCrop

describe("getCostsForCrop", () => {
  test("Calculate costs for crop, simple", () => {
    const corn = {
      name: "corn",
      costs: 1,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getCostsForCrop(input)).toBe(10);
  });
});

// Step 2: calculate revenue for a crop: getRevenueForCrop

describe("getRevenueForCrop", () => {
  test("Calculate revenue for a crop, no environment factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getRevenueForCrop(input)).toBe(60);
  });

  test("Calculate revenue for a crop with environment factors, sun low", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "low",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(30);
  });

  test("Calculate revenue for a crop with environment factors, sun low, wind medium", () => {
    const corn = {
      name: "corn",
      yield: 3,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getRevenueForCrop(input, environmentFactors)).toBe(21);
  });
});

// Step 3: calculate the profit for a crop: getProfitForCrop

describe("getProfitForCrop", () => {
  test("Calculate the profit for a crop, no environment factors ", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    expect(getProfitForCrop(input)).toBe(50);
  });

  test("Calculate the profit for a crop with environment factors, sun high ", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(80);
  });

  test("Calculate the profit for a crop with environment factors, sun high, wind high ", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "high",
      wind: "high",
    };
    expect(getProfitForCrop(input, environmentFactors)).toBe(26);
  });
});

// Step 4: calculate the profit for multiple crops: getTotalProfit

describe("getTotalProfit", () => {
  test("Calculate the profit for multiple crops (no environment factors)", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 2 },
    ];
    expect(getTotalProfit({ crops })).toBe(78);
  });

  test("Calculate the profit for multiple crops with environment factors, sun low", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(32);
  });

  test("Calculate the profit for multiple crops with environment factors, Crop A sun low, Crop B no factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(48);
  });

  test("Calculate the profit for multiple crops with environment factors, Crop A sun low, Crop B no sun but has wind but wind is not env factor", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
      factors: {
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(48);
  });

  test("Calculate the profit for multiple crops with environment factors, Crop A sun low, Crop B wind medium but no sun", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
      factors: {
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(38.4);
  });

  test("Calculate the profit for multiple crops with environment factors, sun low, wind medium", () => {
    const corn = {
      name: "corn",
      yield: 3,
      costs: 1,
      salePrice: 2,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      costs: 2,
      salePrice: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 10 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getTotalProfit({ crops }, environmentFactors)).toBe(18.2);
  });
});

// Create tests including environmental factors

describe("getYieldForPlant", () => {
  test("Get yield for plant with environment factors, sun low", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const environmentFactors = {
      sun: "low",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
  });

  test("Get yield for plant with environment factors, sun high", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const environmentFactors = {
      sun: "high",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(45);
  });

  test("Get yield for plant with environment factors, wind medium but crop has also factor sun but sun is no env factor", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environmentFactors = {
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(21);
  });

  test("Get yield for plant with environment factors, wind medium and sun low", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getYieldForPlant(corn, environmentFactors)).toBe(10.5);
  });
});

describe("getYieldForCrop", () => {
  test("Get yield for crop with environment factors, sun low", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "low",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(150);
  });

  test("Get yield for crop with environment factors, sun low and wind medium", () => {
    const corn = {
      name: "corn",
      yield: 30,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const input = {
      crop: corn,
      numCrops: 10,
    };
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getYieldForCrop(input, environmentFactors)).toBe(105);
  });
});

describe("getTotalYield", () => {
  test("Calculate total yield with multiple crops and environmental factors, sun low", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(11.5);
  });

  test("Calculate total yield with multiple crops and environmental factors, Crop A has sun low, Crop B has no factors", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(15.5);
  });

  test("Calculate total yield with multiple crops and environmental factors, Crop A sun low wind medium, Crop B sun low, no wind", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(9.25);
  });

  test("Calculate total yield with multiple crops and environmental factors, sun low wind medium", () => {
    const corn = {
      name: "corn",
      yield: 3,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const pumpkin = {
      name: "pumpkin",
      yield: 4,
      factors: {
        sun: {
          low: -50,
          medium: 0,
          high: 50,
        },
        wind: {
          low: 0,
          medium: -30,
          high: -60,
        },
      },
    };
    const crops = [
      { crop: corn, numCrops: 5 },
      { crop: pumpkin, numCrops: 2 },
    ];
    const environmentFactors = {
      sun: "low",
      wind: "medium",
    };
    expect(getTotalYield({ crops }, environmentFactors)).toBe(8.05);
  });
});
