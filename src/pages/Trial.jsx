import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar
} from 'recharts';

/**
 * Minimal "Card" for layout.
 */
function Card({ children, className }) {
  return (
    <div
      className={`border rounded-md shadow-sm p-4 bg-white ${className || ''}`}
    >
      {children}
    </div>
  );
}

/**
 * Minimal "Label" component.
 */
function Label({ children, htmlFor }) {
  return (
    <label htmlFor={htmlFor} className="block font-semibold mb-1">
      {children}
    </label>
  );
}

/**
 * Minimal "Input" component.
 */
function Input({ name, id, value, onChange, placeholder }) {
  return (
    <input
      className="border rounded w-full p-2"
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

/**
 * Minimal "Button" component.
 */
function Button({ children, onClick, type = 'button', className }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white rounded p-2 ${
        className || ''
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Minimal "Alert" component.
 */
function Alert({ title, description }) {
  return (
    <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 flex items-center gap-2 mt-4">
      <AlertCircle className="text-yellow-600" />
      <div>
        <div className="font-semibold text-yellow-700">{title}</div>
        <div className="text-sm text-yellow-700">{description}</div>
      </div>
    </div>
  );
}

/**
 * HeatMapRegion sub-component
 */
function HeatMapRegion({ region, data, isSelected, onSelect }) {
  return (
    <div
      className={`p-4 rounded border cursor-pointer transition ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'
      }`}
      onClick={() => onSelect(region)}
    >
      <h4 className="font-medium">{region}</h4>
      <p>Average Price: £{data.avgPrice.toLocaleString()}</p>
      <p>Inventory: {data.inventory}</p>
      <p>Avg. Days to Sell: {data.avgDaysToSell}</p>
    </div>
  );
}

/**
 * RegionalExamples sub-component
 */
function RegionalExamples({ region }) {
  // Mock data keyed by region
  const regionExamplesData = {
    London: [
      {
        make: 'BMW',
        model: '3 Series',
        year: 2021,
        mileage: 12000,
        price: 28500,
        features: ['Sunroof', 'Leather Seats', 'Heated Steering']
      },
      {
        make: 'Audi',
        model: 'A4',
        year: 2022,
        mileage: 8000,
        price: 32000,
        features: ['Navigation', 'LED Headlights']
      }
    ],
    Manchester: [
      {
        make: 'BMW',
        model: '3 Series',
        year: 2022,
        mileage: 15000,
        price: 31000,
        features: ['Android Auto', 'Sport Package']
      }
    ],
    Birmingham: [
      {
        make: 'BMW',
        model: '3 Series',
        year: 2020,
        mileage: 20000,
        price: 25000,
        features: ['Heated Seats']
      }
    ],
    Edinburgh: [
      {
        make: 'BMW',
        model: '3 Series',
        year: 2023,
        mileage: 10000,
        price: 34500,
        features: ['Navigation', 'Wireless Charging']
      }
    ],
    Cardiff: [
      {
        make: 'BMW',
        model: '3 Series',
        year: 2021,
        mileage: 17000,
        price: 27000,
        features: ['Parking Sensors', 'LED Headlights']
      }
    ]
  };

  const examples = regionExamplesData[region] || [];

  return (
    <div className="mt-4">
      <h3 className="font-semibold text-lg">Example Listings in {region}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {examples.map((ex, idx) => (
          <Card key={idx} className="p-4">
            <p className="font-medium">
              {ex.year} {ex.make} {ex.model}
            </p>
            <p>Price: £{ex.price.toLocaleString()}</p>
            <p>Mileage: {ex.mileage.toLocaleString()} miles</p>
            <div className="mt-2">
              <strong>Features:</strong>
              <ul className="list-disc list-inside ml-4">
                {ex.features.map((feature, fIdx) => (
                  <li key={fIdx}>{feature}</li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * Main Dashboard Component
 */
function Trial() {
  // State for form inputs
  const [carDetails, setCarDetails] = useState({
    numberPlate: '',
    make: '',
    model: '',
    subModel: '',
    mileage: '',
    engineSize: '',
    doors: '',
    year: ''
  });
  const similarCars = [
    {
      make: 'BMW',
      model: '3 Series',
      year: 2022,
      mileage: 15000,
      price: 32500,
      location: 'London'
    },
    {
      make: 'BMW',
      model: '3 Series',
      year: 2022,
      mileage: 18000,
      price: 31000,
      location: 'Manchester'
    }
  ];
  // Mock historical price data
  const historicalPrices = [
    { year: 2024, value: 45000 },
    { year: 2023, value: 38000 },
    { year: 2022, value: 32000 },
    { year: 2021, value: 28000 },
    { year: 2020, value: 24000 }
  ];

  // Mock regional price data (simple list)
  const regionalPrices = [
    { region: 'London', avgPrice: 35000, inventory: 25, daysToSell: 15 },
    { region: 'Manchester', avgPrice: 32000, inventory: 18, daysToSell: 20 },
    { region: 'Birmingham', avgPrice: 31500, inventory: 15, daysToSell: 18 },
    { region: 'Edinburgh', avgPrice: 33000, inventory: 12, daysToSell: 22 },
    { region: 'Cardiff', avgPrice: 30500, inventory: 8, daysToSell: 25 }
  ];

  // Mock market data for supply/demand chart
  const marketData = [
    { month: 'Jan', supply: 120, avgDaysToSell: 25, demand: 85 },
    { month: 'Feb', supply: 135, avgDaysToSell: 22, demand: 90 },
    { month: 'Mar', supply: 150, avgDaysToSell: 20, demand: 95 },
    { month: 'Apr', supply: 142, avgDaysToSell: 18, demand: 100 },
    { month: 'May', supply: 128, avgDaysToSell: 21, demand: 88 },
    { month: 'Jun', supply: 115, avgDaysToSell: 24, demand: 82 }
  ];

  // For the monthly details expansion
  const [selectedMonth, setSelectedMonth] = useState(null);

  // The shape here matches what the UI is expecting
  const monthlyDetailsData = {
    Jan: {
      marketMetrics: {
        newListings: 40,
        totalInventory: 120,
        averagePrice: 31000,
        priceChange: '+2.1%'
      },
      demandMetrics: {
        searchVolume: 5000,
        leadGeneration: 'High',
        averageTimeOnMarket: 25
      },
      competitiveContext: {
        similarModelsAvailable: 12,
        pricePositioning: 'Mid-range',
        marketShare: '10%'
      }
    },
    Feb: {
      marketMetrics: {
        newListings: 38,
        totalInventory: 135,
        averagePrice: 31500,
        priceChange: '+1.8%'
      },
      demandMetrics: {
        searchVolume: 5200,
        leadGeneration: 'Moderate',
        averageTimeOnMarket: 22
      },
      competitiveContext: {
        similarModelsAvailable: 10,
        pricePositioning: 'Slightly Above Average',
        marketShare: '9%'
      }
    },
    Mar: {
      marketMetrics: {
        newListings: 45,
        totalInventory: 150,
        averagePrice: 32000,
        priceChange: '+2.4%'
      },
      demandMetrics: {
        searchVolume: 6000,
        leadGeneration: 'High',
        averageTimeOnMarket: 20
      },
      competitiveContext: {
        similarModelsAvailable: 14,
        pricePositioning: 'Average',
        marketShare: '11%'
      }
    },
    Apr: {
      marketMetrics: {
        newListings: 50,
        totalInventory: 142,
        averagePrice: 32500,
        priceChange: '+1.2%'
      },
      demandMetrics: {
        searchVolume: 6400,
        leadGeneration: 'High',
        averageTimeOnMarket: 18
      },
      competitiveContext: {
        similarModelsAvailable: 16,
        pricePositioning: 'Above Average',
        marketShare: '12%'
      }
    },
    May: {
      marketMetrics: {
        newListings: 35,
        totalInventory: 128,
        averagePrice: 31000,
        priceChange: '-0.5%'
      },
      demandMetrics: {
        searchVolume: 5800,
        leadGeneration: 'Moderate',
        averageTimeOnMarket: 21
      },
      competitiveContext: {
        similarModelsAvailable: 13,
        pricePositioning: 'Average',
        marketShare: '10%'
      }
    },
    Jun: {
      marketMetrics: {
        newListings: 30,
        totalInventory: 115,
        averagePrice: 30500,
        priceChange: '-1%'
      },
      demandMetrics: {
        searchVolume: 5600,
        leadGeneration: 'Moderate',
        averageTimeOnMarket: 24
      },
      competitiveContext: {
        similarModelsAvailable: 10,
        pricePositioning: 'Slightly Below Average',
        marketShare: '8%'
      }
    }
  };

  // (2) For the "Regional Price Variations" heat map
  const [selectedRegion, setSelectedRegion] = useState(null);

  // Heat map data
  const regionalData = {
    London: { avgPrice: 35000, avgDaysToSell: 15, inventory: 25 },
    Manchester: { avgPrice: 32000, avgDaysToSell: 20, inventory: 18 },
    Birmingham: { avgPrice: 31500, avgDaysToSell: 18, inventory: 15 },
    Edinburgh: { avgPrice: 33000, avgDaysToSell: 22, inventory: 12 },
    Cardiff: { avgPrice: 30500, avgDaysToSell: 25, inventory: 8 }
  };

  // (3) Auction data
  const auctionData = [
    {
      details: '2022 BMW 3 Series M Sport',
      platform: 'eBay Motors',
      location: 'London',
      currentBid: 27000,
      estimatedValue: 30000,
      date: '2025-01-25',
      endTime: '5:00 PM',
      mileage: 15000,
      condition: 'Good',
      features: ['Navigation', 'Sunroof', 'Heated Seats']
    },
    {
      details: '2021 BMW 3 Series SE',
      platform: 'Manheim Auctions',
      location: 'Manchester',
      currentBid: 25000,
      estimatedValue: 29000,
      date: '2025-01-30',
      endTime: '3:00 PM',
      mileage: 18000,
      condition: 'Fair',
      features: ['Leather Seats', 'LED Headlights']
    },
    {
      details: '2020 BMW 3 Series Sport',
      platform: 'Copart UK',
      location: 'Birmingham',
      currentBid: 22000,
      estimatedValue: 27000,
      date: '2025-02-01',
      endTime: '10:00 AM',
      mileage: 25000,
      condition: 'Good',
      features: ['Parking Sensors', 'Cruise Control']
    }
  ];

  // Handle form input changes
  function handleInputChange(e) {
    setCarDetails({
      ...carDetails,
      [e.target.name]: e.target.value
    });
  }

  // Custom tooltip for the historical prices chart
  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-bold">{`Year: ${payload[0].payload.year}`}</p>
          <p>{`Value: £${payload[0].value.toLocaleString()}`}</p>
          <div className="mt-2 text-sm">
            <p>Example listing:</p>
            <p>2022 BMW 3 Series, 15,000 miles</p>
            <p>Price: £32,500</p>
            <p>Location: London</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Real-Time Market Value Section */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Real-Time Market Value</h2>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            // You can implement "calculate value" logic here if needed
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numberPlate">Number Plate</Label>
              <Input
                id="numberPlate"
                name="numberPlate"
                value={carDetails.numberPlate}
                onChange={handleInputChange}
                placeholder="Enter number plate"
              />
            </div>
            <div>
              <Label htmlFor="make">Make</Label>
              <Input
                id="make"
                name="make"
                value={carDetails.make}
                onChange={handleInputChange}
                placeholder="e.g. BMW"
              />
            </div>
            <div>
              <Label htmlFor="model">Model</Label>
              <Input
                id="model"
                name="model"
                value={carDetails.model}
                onChange={handleInputChange}
                placeholder="e.g. 3 Series"
              />
            </div>
            <div>
              <Label htmlFor="subModel">Sub-Model</Label>
              <Input
                id="subModel"
                name="subModel"
                value={carDetails.subModel}
                onChange={handleInputChange}
                placeholder="e.g. M Sport"
              />
            </div>
            <div>
              <Label htmlFor="mileage">Mileage</Label>
              <Input
                id="mileage"
                name="mileage"
                value={carDetails.mileage}
                onChange={handleInputChange}
                placeholder="e.g. 15000"
              />
            </div>
            <div>
              <Label htmlFor="engineSize">Engine Size</Label>
              <Input
                id="engineSize"
                name="engineSize"
                value={carDetails.engineSize}
                onChange={handleInputChange}
                placeholder="e.g. 2.0"
              />
            </div>
            <div>
              <Label htmlFor="doors">Doors</Label>
              <Input
                id="doors"
                name="doors"
                value={carDetails.doors}
                onChange={handleInputChange}
                placeholder="e.g. 4"
              />
            </div>
            <div>
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                name="year"
                value={carDetails.year}
                onChange={handleInputChange}
                placeholder="e.g. 2022"
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">
            Calculate Value
          </Button>
        </form>

        <Alert
          title="Estimated Value Range"
          description="£31,000 - £33,500"
        />
        {/* 2. Add this block under the Alert */}
        <div className="mt-4">
          <h3 className="font-semibold">
            Similar cars currently on the market
          </h3>
          <div className="space-y-2 mt-2">
            {similarCars.map((car, idx) => (
              <div key={idx} className="border p-2 rounded">
                <p>
                  {car.year} {car.make} {car.model} &bull;{' '}
                  {car.mileage.toLocaleString()} miles &bull;{' '}
                  {car.location}
                </p>
                <p className="font-medium">
                  £{car.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Historical Pricing Section */}
      <Card>
        <h2 className="text-xl font-bold mb-4">
          Historical Pricing &amp; Depreciation
        </h2>
        <div className="h-64 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalPrices}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `£${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Geographical Price Variations */}
      <Card>
        <h2 className="text-xl font-bold mb-4">
          Geographical Price Variations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionalPrices.map((region) => (
            <div key={region.region} className="border rounded p-4 bg-white">
              <h3 className="font-semibold">{region.region}</h3>
              <div className="space-y-1 mt-2 text-sm">
                <p>Average Price: £{region.avgPrice.toLocaleString()}</p>
                <p>Available Units: {region.inventory}</p>
                <p>Avg. Days to Sell: {region.daysToSell}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Market Availability & Demand with Monthly Details */}
      <Card>
        <h2 className="text-xl font-bold mb-4">
          Market Availability &amp; Demand
        </h2>
        <div className="h-64 md:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={marketData}
              onClick={(chartData) => {
                // chartData.activeLabel might be 'Jan', 'Feb', etc.
                if (chartData && chartData.activeLabel) {
                  setSelectedMonth(chartData.activeLabel);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="supply"
                fill="#8884d8"
                stroke="#8884d8"
              />
              <Bar
                yAxisId="right"
                dataKey="avgDaysToSell"
                fill="#82ca9d"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="demand"
                stroke="#ff7300"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {selectedMonth && monthlyDetailsData[selectedMonth] && (
          <div className="mt-6 space-y-4">
            <h3 className="font-semibold text-lg">
              Details for {selectedMonth}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Market Metrics */}
              <div className="border rounded p-4">
                <h4 className="font-medium mb-2">Market Metrics</h4>
                <p>
                  New Listings:{' '}
                  {monthlyDetailsData[selectedMonth].marketMetrics.newListings}
                </p>
                <p>
                  Total Inventory:{' '}
                  {
                    monthlyDetailsData[selectedMonth].marketMetrics
                      .totalInventory
                  }
                </p>
                <p>
                  Average Price: £
                  {monthlyDetailsData[
                    selectedMonth
                  ].marketMetrics.averagePrice.toLocaleString()}
                </p>
                <p>
                  Price Change:{' '}
                  {monthlyDetailsData[selectedMonth].marketMetrics.priceChange}
                </p>
              </div>

              {/* Demand Metrics */}
              <div className="border rounded p-4">
                <h4 className="font-medium mb-2">Demand Metrics</h4>
                <p>
                  Search Volume:{' '}
                  {
                    monthlyDetailsData[selectedMonth].demandMetrics
                      .searchVolume
                  }
                </p>
                <p>
                  Lead Generation:{' '}
                  {
                    monthlyDetailsData[selectedMonth].demandMetrics
                      .leadGeneration
                  }
                </p>
                <p>
                  Avg. Time on Market:{' '}
                  {
                    monthlyDetailsData[selectedMonth].demandMetrics
                      .averageTimeOnMarket
                  }{' '}
                  days
                </p>
              </div>

              {/* Competitive Context */}
              <div className="border rounded p-4">
                <h4 className="font-medium mb-2">Competitive Context</h4>
                <p>
                  Similar Models:{' '}
                  {
                    monthlyDetailsData[selectedMonth].competitiveContext
                      .similarModelsAvailable
                  }
                </p>
                <p>
                  Price Positioning:{' '}
                  {
                    monthlyDetailsData[selectedMonth].competitiveContext
                      .pricePositioning
                  }
                </p>
                <p>
                  Market Share:{' '}
                  {
                    monthlyDetailsData[selectedMonth].competitiveContext
                      .marketShare
                  }
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Regional Analysis with Heat Map */}
      <Card>
        <h2 className="text-xl font-bold mb-4">
          Regional Price Variations (Heat Map)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(regionalData).map(([region, data]) => (
            <HeatMapRegion
              key={region}
              region={region}
              data={data}
              isSelected={selectedRegion === region}
              onSelect={(r) => setSelectedRegion(r)}
            />
          ))}
        </div>
        {selectedRegion && <RegionalExamples region={selectedRegion} />}
      </Card>

      {/* Auction Tracker */}
      <Card>
        <h2 className="text-xl font-bold mb-4">Live Auction Tracker</h2>
        <div className="space-y-4">
          {auctionData.map((auction, index) => (
            <div key={index} className="border rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{auction.details}</h3>
                  <p className="text-sm text-gray-600">
                    {auction.platform} - {auction.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    Current Bid: £{auction.currentBid.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Est. Value: £{auction.estimatedValue.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-sm space-y-1">
                  <p>Date: {auction.date}</p>
                  <p>End Time: {auction.endTime}</p>
                  <p>Mileage: {auction.mileage.toLocaleString()}</p>
                  <p>Condition: {auction.condition}</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Key Features:</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {auction.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default Trial;
