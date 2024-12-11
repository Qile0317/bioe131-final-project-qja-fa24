'use client';
import { MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useMemo, useState, useEffect } from 'react';

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => <div>Loading map...</div>
});

interface Country {
  name: string;
  displayName: string;
  coordinates: [number, number];
  genomeAssembly: string;
}

const countries: Country[] = [
  {
    name: "China_Wuhan",
    displayName: "China (Wuhan)",
    coordinates: [30.5928, 114.3055],
    genomeAssembly: "China_Wuhan.fna"
  },
  {
    name: "Australia",
    displayName: "Australia",
    coordinates: [-25.2744, 133.7751],
    genomeAssembly: "Australia.fna"
  },
  {
    name: "Sweden",
    displayName: "Sweden",
    coordinates: [60.1282, 18.6435],
    genomeAssembly: "Sweden.fna"
  },
  {
    name: "Italy",
    displayName: "Italy",
    coordinates: [41.8719, 12.5674],
    genomeAssembly: "Italy.fna"
  },
  {
    name: "USA_California",
    displayName: "USA (California)",
    coordinates: [36.7783, -119.4179],
    genomeAssembly: "USA_(California).fna"
  },
  {
    name: "USA_Illinois",
    displayName: "USA (Illinois)",
    coordinates: [40.6331, -89.3985],
    genomeAssembly: "USA_(Illinois).fna"
  },
  {
    name: "USA_Texas",
    displayName: "USA (Texas)",
    coordinates: [31.9686, -99.9018],
    genomeAssembly: "USA_(Texas).fna"
  },
  {
    name: "USA_Cruise",
    displayName: "USA (Cruise)",
    coordinates: [25.7617, -80.1918], // Miami coordinates for cruise
    genomeAssembly: "USA_(Cruise).fna"
  },
  {
    name: "Taiwan",
    displayName: "Taiwan",
    coordinates: [23.5937, 121.0254],
    genomeAssembly: "Taiwan.fna"
  },
  {
    name: "India",
    displayName: "India",
    coordinates: [20.5937, 78.9629],
    genomeAssembly: "India.fna"
  },
  {
    name: "Nepal",
    displayName: "Nepal",
    coordinates: [28.3949, 84.1240],
    genomeAssembly: "Nepal.fna"
  },
  {
    name: "Korea",
    displayName: "Korea",
    coordinates: [35.9078, 127.7669],
    genomeAssembly: "Korea.fna"
  },
  {
    name: "China",
    displayName: "China",
    coordinates: [35.8617, 104.1954],
    genomeAssembly: "China.fna"
  },
  {
    name: "Hong_Kong",
    displayName: "Hong Kong",
    coordinates: [22.3193, 114.1694],
    genomeAssembly: "Hong_Kong.fna"
  },
  {
    name: "Brazil",
    displayName: "Brazil",
    coordinates: [-14.2350, -51.9253],
    genomeAssembly: "Brazil.fna"
  }
];

export default function WorldMap({
    onCountrySelect,
  }: {
    onCountrySelect: (country: Country) => void;
  }) {

    const [plotWidth, setPlotWidth] = useState<number>(1000);

    useEffect(() => {
      // Access `window` only after the component mounts
      const handleResize = () => setPlotWidth(window.innerWidth);
      handleResize(); // Set initial value
      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const data: Partial<Plotly.PlotData>[] = [
      {
        type: 'scattergeo' as const,
        lon: countries.map((country) => country.coordinates[1]),
        lat: countries.map((country) => country.coordinates[0]),
        text: countries.map((country) => country.displayName),
        mode: "markers",
        marker: {
          size: 8,
          color: 'red',
          symbol: 'circle',
        },
        hoverinfo: 'text',
      },
    ];  
  
    const layout = {
      geo: {
        scope: 'world',
        showland: true,
        landcolor: 'black',
        bgcolor: 'rgba(0,0,0,0)',
        showocean: true,
        oceancolor: 'white',
        showframe: false,
        showcountries: true,
        countrycolor: 'gray',
        projection: { type: 'equirectangular' },
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 0, b: 0, l: 0, r: 0 },
      height: 600,
      width: 1000,
    };
  
    const handleClick = (event: { points: Array<{ pointIndex: number }> }) => {
      const point = event.points[0];
      if (point && typeof point.pointIndex === 'number') {
        const selectedCountry = countries[point.pointIndex];
        onCountrySelect(selectedCountry);
      }
    };
  
    return (
      <div className="relative w-full min-h-screen">
        {/* Plotly Map */}
        <Plot
          data={data}
          layout={layout}
          onClick={handleClick}
          style={{ width: '100%', height: '600px' }}
        />
  
        {/* Background Map with Pins */}
        <div
          style={{
            backgroundImage: "url('/world-map.svg')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '100vw',
            height: '50vh',
          }}
        >
          {countries.map((country) => (
            <button
              key={country.name}
              style={{
                left: `${((country.coordinates[1] + 180) * 100) / 360}%`,
                top: `${((90 - country.coordinates[0]) * 100) / 180}%`,
                position: 'absolute',
              }}
              onClick={() => onCountrySelect(country)}
            >
              <MapPin className="w-6 h-6 text-blue-500 transition-colors hover:text-red-600" />
              <span
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 
                           bg-slate-800 text-white px-2 py-1 rounded text-sm opacity-0 
                           group-hover:opacity-100 transition-opacity whitespace-nowrap"
              >
                {country.displayName}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
}
