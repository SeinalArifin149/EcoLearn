import React from 'react';

export default function SupplyDemandChart({
  curvePoints = [],
  currentPrice = 10000,
  qDemand = 70,
  qSupply = 70,
  equilibriumPrice = 10000,
  equilibriumQuantity = 70,
  marketStatus = 'equilibrium',
  minPrice = 6000,
  maxPrice = 18000,
}) {
  // Chart dimensions in SVG coordinates
  const svgWidth = 500;
  const svgHeight = 320;
  const padding = { top: 30, right: 40, bottom: 50, left: 65 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Max quantity for X scale (default up to 130 unit)
  const maxQ = 130;

  // Coordinate mapping functions
  const getX = (q) => padding.left + (Math.max(0, Math.min(maxQ, q)) / maxQ) * plotWidth;
  const getY = (p) => padding.top + plotHeight - ((Math.max(minPrice, Math.min(maxPrice, p)) - minPrice) / (maxPrice - minPrice)) * plotHeight;

  // Build SVG path strings for Demand & Supply curves
  const demandPath = curvePoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.qDemand).toFixed(1)} ${getY(pt.price).toFixed(1)}`)
    .join(' ');

  const supplyPath = curvePoints
    .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(pt.qSupply).toFixed(1)} ${getY(pt.price).toFixed(1)}`)
    .join(' ');

  // Coordinates of Key Points
  const currentY = getY(currentPrice);
  const qdX = getX(qDemand);
  const qsX = getX(qSupply);

  const eqX = getX(equilibriumQuantity);
  const eqY = getY(equilibriumPrice);

  // Y-axis ticks (Price)
  const priceTicks = [6000, 9000, 12000, 15000, 18000];
  // X-axis ticks (Quantity)
  const qTicks = [0, 25, 50, 75, 100, 125];

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-100 shadow-sm space-y-4">
      {/* Header & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-black text-slate-900">Kurva Permintaan & Penawaran</h4>
          <p className="text-[11px] text-slate-400 font-medium">Visualisasi grafis titik temu Qd dan Qs</p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-blue-600 rounded-full" />
            <span className="text-blue-700">Permintaan (D)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-1 bg-emerald-500 rounded-full" />
            <span className="text-emerald-700">Penawaran (S)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-200" />
            <span className="text-amber-800">Equilibrium (E)</span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto max-h-[340px] select-none"
        >
          {/* Grid lines */}
          {priceTicks.map((p) => {
            const y = getY(p);
            return (
              <g key={p}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1.5"
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[10px] fill-slate-400 font-semibold font-mono"
                >
                  {(p / 1000).toFixed(0)}k
                </text>
              </g>
            );
          })}

          {qTicks.map((q) => {
            const x = getX(q);
            return (
              <g key={q}>
                <line
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={padding.top + plotHeight}
                  stroke="#F1F5F9"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={padding.top + plotHeight + 18}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-400 font-semibold font-mono"
                >
                  {q}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={padding.top + plotHeight}
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <line
            x1={padding.left}
            y1={padding.top + plotHeight}
            x2={svgWidth - padding.right}
            y2={padding.top + plotHeight}
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Axes Labels */}
          <text
            x={padding.left - 30}
            y={padding.top - 10}
            className="text-[11px] fill-slate-600 font-bold"
          >
            Harga (P)
          </text>
          <text
            x={svgWidth - padding.right}
            y={padding.top + plotHeight + 35}
            textAnchor="end"
            className="text-[11px] fill-slate-600 font-bold"
          >
            Kuantitas (Q unit)
          </text>

          {/* Demand Curve (Blue) */}
          <path
            d={demandPath}
            fill="none"
            stroke="#2563EB"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text
            x={getX(curvePoints[curvePoints.length - 1]?.qDemand || 30) + 8}
            y={getY(maxPrice) + 12}
            className="text-xs fill-blue-700 font-black"
          >
            D
          </text>

          {/* Supply Curve (Emerald) */}
          <path
            d={supplyPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text
            x={getX(curvePoints[curvePoints.length - 1]?.qSupply || 100) + 8}
            y={getY(maxPrice) + 12}
            className="text-xs fill-emerald-700 font-black"
          >
            S
          </text>

          {/* Shaded Area for Shortage or Surplus */}
          {marketStatus === 'shortage' && (
            <polygon
              points={`${qdX},${currentY} ${qsX},${currentY} ${eqX},${eqY}`}
              fill="rgba(244, 63, 94, 0.15)"
              stroke="rgba(244, 63, 94, 0.4)"
              strokeDasharray="3 3"
            />
          )}
          {marketStatus === 'surplus' && (
            <polygon
              points={`${qsX},${currentY} ${qdX},${currentY} ${eqX},${eqY}`}
              fill="rgba(245, 158, 11, 0.15)"
              stroke="rgba(245, 158, 11, 0.4)"
              strokeDasharray="3 3"
            />
          )}

          {/* Equilibrium Guidelines & Point */}
          <line
            x1={padding.left}
            y1={eqY}
            x2={eqX}
            y2={eqY}
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <line
            x1={eqX}
            y1={eqY}
            x2={eqX}
            y2={padding.top + plotHeight}
            stroke="#F59E0B"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle
            cx={eqX}
            cy={eqY}
            r="6"
            fill="#F59E0B"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            className="drop-shadow-xs"
          />
          <text
            x={eqX + 8}
            y={eqY - 8}
            className="text-[11px] fill-amber-900 font-black"
          >
            E ({equilibriumQuantity}, {(equilibriumPrice / 1000).toFixed(0)}k)
          </text>

          {/* Active Selected Price Line */}
          <line
            x1={padding.left}
            y1={currentY}
            x2={svgWidth - padding.right}
            y2={currentY}
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="5 5"
          />

          {/* Points on Selected Price for Qd and Qs */}
          <circle
            cx={qdX}
            cy={currentY}
            r="5"
            fill="#2563EB"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle
            cx={qsX}
            cy={currentY}
            r="5"
            fill="#10B981"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Mini Visual Explanatory Strip */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold">
        <span className="text-slate-500">
          Titik Keseimbangan (Ekuilibrium):{' '}
          <strong className="text-amber-700">Rp {equilibriumPrice.toLocaleString('id-ID')}</strong> (Q = {equilibriumQuantity} unit)
        </span>
        <span className="text-slate-500">
          Posisi Aktif:{' '}
          <strong className="text-blue-700">Qd: {qDemand} unit</strong> |{' '}
          <strong className="text-emerald-700">Qs: {qSupply} unit</strong>
        </span>
      </div>
    </div>
  );
}
