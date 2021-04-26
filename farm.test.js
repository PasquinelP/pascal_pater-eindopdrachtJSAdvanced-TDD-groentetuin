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

describe("getYieldForPlant", () => {
  const corn = {
    name: "corn",
    yield: 30,
  };

  test("Get yield for plant with no environment factors", () => {
    expect(getYieldForPlant(corn)).toBe(30);
  });
});

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
  })
});

// Step 2: calculate revenue for a crop (with no environment factors): getRevenueForCrop

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
});

// Step 3: calculate the profit for a crop (with no environment factors): getProfitForCrop

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
});

// Step 4: calculate the profit for multiple crops (with no environment factors): getTotalProfit

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
    expect(getTotalProfit({crops})).toBe(78);
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

  test("Get yield for plant with environment factors, wind low", () => {
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