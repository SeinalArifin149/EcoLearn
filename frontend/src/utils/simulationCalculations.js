/**
 * Modul Perhitungan Ekonomi Murni untuk Simulasi EcoLearn
 * Memisahkan rumus matematis dan logika ekonomi dari komponen presentasi
 */

// ============================================================================
// 1. SIMULASI PERMINTAAN DAN PENAWARAN (SUPPLY & DEMAND)
// ============================================================================

export function calculateSupplyDemand({
  price = 10000,
  income = 100, // 80 - 150 %
  buyers = 100, // 80 - 150 %
  productionCost = 100, // 70 - 140 %
  technology = 100, // 80 - 160 %
  baseA = 120,
  baseB = 0.005,
  baseC = 20,
  baseD = 0.005,
  minPrice = 6000,
  maxPrice = 18000,
  priceStep = 500,
}) {
  // Faktor pengali non-harga
  // Pendapatan & jumlah konsumen menggeser kurva permintaan ke kanan (meningkatkan a)
  const demandShift = (income / 100) * (buyers / 100);
  const adjustedA = baseA * demandShift;

  // Teknologi meningkatkan kapasitas penawaran; biaya produksi tinggi menekan penawaran
  const supplyShift = (technology / 100) / (productionCost / 100);
  const adjustedC = baseC * supplyShift;

  // Jumlah permintaan dan penawaran pada harga P yang dipilih
  const qDemand = Math.max(0, Math.round(adjustedA - baseB * price));
  const qSupply = Math.max(0, Math.round(adjustedC + baseD * price));

  // Titik Keseimbangan (Equilibrium: Qd = Qs -> a - bP = c + dP -> P = (a - c)/(b + d))
  const eqPriceRaw = (adjustedA - adjustedC) / (baseB + baseD);
  const equilibriumPrice = Math.max(minPrice, Math.min(maxPrice, Math.round(eqPriceRaw / 100) * 100));
  const equilibriumQuantity = Math.max(0, Math.round(adjustedA - baseB * equilibriumPrice));

  // Status Pasar
  const diff = qDemand - qSupply;
  let marketStatus = 'equilibrium';
  let statusLabel = 'Pasar Seimbang (Equilibrium)';
  let statusColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let statusBadge = 'Ekuilibrium Tercapai';

  if (price < equilibriumPrice - 200 || diff > 2) {
    marketStatus = 'shortage';
    statusLabel = 'Kelebihan Permintaan (Shortage)';
    statusColor = 'text-rose-700 bg-rose-50 border-rose-200';
    statusBadge = `Defisit Pasokan (${Math.abs(diff)} unit)`;
  } else if (price > equilibriumPrice + 200 || diff < -2) {
    marketStatus = 'surplus';
    statusLabel = 'Kelebihan Penawaran (Surplus)';
    statusColor = 'text-amber-700 bg-amber-50 border-amber-200';
    statusBadge = `Surplus Stok (${Math.abs(diff)} unit)`;
  }

  // Generate titik kurva untuk visualisasi grafik SVG
  const curvePoints = [];
  for (let p = minPrice; p <= maxPrice; p += priceStep) {
    const qd = Math.max(0, Math.round(adjustedA - baseB * p));
    const qs = Math.max(0, Math.round(adjustedC + baseD * p));
    curvePoints.push({ price: p, qDemand: qd, qSupply: qs });
  }

  // Analisis Edukatif Dinamis
  let explanation = '';
  if (marketStatus === 'equilibrium') {
    explanation = `Pada harga Rp ${price.toLocaleString('id-ID')}, jumlah beras yang ingin dibeli konsumen (${qDemand} unit) tepat sama dengan jumlah yang ingin dijual produsen (${qSupply} unit). Tidak ada barang sisa maupun pembeli yang kehabisan barang.`;
  } else if (marketStatus === 'shortage') {
    explanation = `Harga Rp ${price.toLocaleString('id-ID')} berada di bawah harga keseimbangan. Harga murah memicu lonjakan minat beli (${qDemand} unit), namun produsen enggan memproduksi banyak (${qSupply} unit), sehingga terjadi kelangkaan/antrean (shortage) sebesar ${Math.abs(diff)} unit.`;
  } else {
    explanation = `Harga Rp ${price.toLocaleString('id-ID')} berada di atas harga keseimbangan. Harga tinggi membuat produsen bersemangat memasok (${qSupply} unit), tetapi pembeli menahan konsumsi (${qDemand} unit), sehingga terjadi tumpukan barang yang belum laku (surplus) sebesar ${Math.abs(diff)} unit.`;
  }

  return {
    price,
    qDemand,
    qSupply,
    difference: diff,
    equilibriumPrice,
    equilibriumQuantity,
    marketStatus,
    statusLabel,
    statusColor,
    statusBadge,
    curvePoints,
    explanation,
    adjustedA,
    adjustedC,
  };
}

// ============================================================================
// 2. SIMULASI TRANSAKSI PASAR (SELLER & BUYER BARGAINING)
// ============================================================================

export function evaluateMarketTransaction({
  role = 'seller', // 'seller' | 'buyer'
  commodity,
  proposedPrice,
  quantity = 1,
  virtualPartner,
  userWallet = 150000,
  userStock = 10,
}) {
  const itemCost = commodity.productionCost;
  const suggestedPrice = commodity.suggestedPrice;
  const minSellerAccept = commodity.minAcceptableSeller;
  const maxBuyerBudget = Math.round(suggestedPrice * (virtualPartner?.willingnessPercent || 1.0));

  let isAccepted = false;
  let reason = '';
  let counterOffer = null;

  if (role === 'seller') {
    // Siswa sebagai PENJUAL, menentukan harga jual ke pembeli virtual
    if (userStock < quantity) {
      return {
        success: false,
        error: 'Stok barang tidak mencukupi untuk transaksi ini!',
      };
    }

    if (proposedPrice <= maxBuyerBudget) {
      isAccepted = true;
      reason = `${virtualPartner.name} menyetujui harga Rp ${proposedPrice.toLocaleString('id-ID')} karena sesuai anggaran belanjanya.`;
    } else if (proposedPrice <= maxBuyerBudget * 1.08) {
      // Penawaran balik (counter offer)
      counterOffer = Math.round((maxBuyerBudget + proposedPrice) / 2 / 500) * 500;
      reason = `${virtualPartner.name} merasa harga sedikit kemahalan dan menawar balik Rp ${counterOffer.toLocaleString('id-ID')}.`;
    } else {
      isAccepted = false;
      reason = `${virtualPartner.name} menolak karena harga Rp ${proposedPrice.toLocaleString('id-ID')} melampaui batas kemampuan maksimalnya (Rp ${maxBuyerBudget.toLocaleString('id-ID')}).`;
    }

    const revenue = isAccepted ? proposedPrice * quantity : 0;
    const totalCost = isAccepted ? itemCost * quantity : 0;
    const profit = revenue - totalCost;

    return {
      success: true,
      isAccepted,
      reason,
      counterOffer,
      revenue,
      totalCost,
      profit,
      dealPrice: isAccepted ? proposedPrice : null,
      quantity,
    };
  } else {
    // Siswa sebagai PEMBELI, menawar harga ke penjual virtual
    const totalSpending = proposedPrice * quantity;
    if (totalSpending > userWallet) {
      return {
        success: false,
        error: `Saldo uang tidak cukup! Butuh Rp ${totalSpending.toLocaleString('id-ID')}, saldo kamu Rp ${userWallet.toLocaleString('id-ID')}.`,
      };
    }

    if (proposedPrice >= minSellerAccept) {
      isAccepted = true;
      reason = `Penjual menyepakati tawaran Rp ${proposedPrice.toLocaleString('id-ID')} karena masih memberikan margin keuntungan.`;
    } else if (proposedPrice >= itemCost) {
      counterOffer = Math.round((minSellerAccept + proposedPrice) / 2 / 500) * 500;
      reason = `Penjual menolak tawaran Rp ${proposedPrice.toLocaleString('id-ID')} karena laba terlalu tipis, tapi menawarkan harga damai Rp ${counterOffer.toLocaleString('id-ID')}.`;
    } else {
      isAccepted = false;
      reason = `Penjual menolak keras karena harga Rp ${proposedPrice.toLocaleString('id-ID')} berada di bawah biaya modal produksi (Rp ${itemCost.toLocaleString('id-ID')}).`;
    }

    const savings = isAccepted ? (suggestedPrice - proposedPrice) * quantity : 0;

    return {
      success: true,
      isAccepted,
      reason,
      counterOffer,
      totalSpending: isAccepted ? totalSpending : 0,
      savings,
      dealPrice: isAccepted ? proposedPrice : null,
      quantity,
    };
  }
}

// ============================================================================
// 3. SIMULASI PENGELOLAAN KEUANGAN (FINANCIAL BUDGETING)
// ============================================================================

export function calculateBudgetSummary(initialAllowance = 500000, expenses = []) {
  let totalNeeds = 0;
  let totalWants = 0;
  let totalSavings = 0;

  expenses.forEach((item) => {
    const amount = Number(item.amount) || 0;
    if (item.type === 'tabungan') {
      totalSavings += amount;
    } else if (item.type === 'kebutuhan') {
      totalNeeds += amount;
    } else {
      totalWants += amount;
    }
  });

  const totalConsumptive = totalNeeds + totalWants;
  const totalAllocated = totalConsumptive + totalSavings;
  const remainingBalance = initialAllowance - totalAllocated;

  // Persentase alokasi
  const savingsRatio = initialAllowance > 0 ? Math.round((totalSavings / initialAllowance) * 100) : 0;
  const needsRatio = totalConsumptive > 0 ? Math.round((totalNeeds / totalConsumptive) * 100) : 0;
  const consumptiveRatio = initialAllowance > 0 ? Math.round((totalConsumptive / initialAllowance) * 100) : 0;

  // Status Finansial
  const isDeficit = remainingBalance < 0;
  const meetsSavingsTarget = savingsRatio >= 20;
  const meetsNeedsPriority = needsRatio >= 60;

  let financialHealth = 'Sehat & Terencana';
  let healthColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  let advice = '';

  if (isDeficit) {
    financialHealth = 'Defisit Anggaran';
    healthColor = 'text-rose-700 bg-rose-50 border-rose-200';
    advice = 'Pengeluaranmu melebihi uang saku yang dimiliki. Kurangi pos-pos keinginan untuk menyeimbangkan kembali anggaran.';
  } else if (!meetsSavingsTarget) {
    financialHealth = 'Kurang Menabung';
    healthColor = 'text-amber-700 bg-amber-50 border-amber-200';
    advice = `Tabunganmu baru ${savingsRatio}% dari target ideal minimal 20% (Rp ${(initialAllowance * 0.2).toLocaleString('id-ID')}). Sisihkan tabungan di awal sebelum berbelanja keinginan.`;
  } else if (!meetsNeedsPriority && totalConsumptive > 0) {
    financialHealth = 'Dominasi Keinginan';
    healthColor = 'text-amber-700 bg-amber-50 border-amber-200';
    advice = 'Pengeluaran untuk pos keinginan masih terlalu mendominasi. Dahulukan kebutuhan primer agar tidak mengorbankan hal-hal esensial.';
  } else {
    financialHealth = 'Sangat Sehat & Bijak';
    healthColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    advice = 'Luar biasa! Anggaranmu memenuhi prinsip menabung 20%, mengutamakan kebutuhan pokok, dan bebas dari risiko defisit.';
  }

  return {
    initialAllowance,
    totalNeeds,
    totalWants,
    totalSavings,
    totalConsumptive,
    totalAllocated,
    remainingBalance,
    savingsRatio,
    needsRatio,
    consumptiveRatio,
    isDeficit,
    meetsSavingsTarget,
    meetsNeedsPriority,
    financialHealth,
    healthColor,
    advice,
  };
}

// ============================================================================
// 4. SIMULASI ARUS KEGIATAN EKONOMI (CIRCULAR FLOW ENGINE)
// ============================================================================

export function calculateEconomicFlow({
  batches = 2,
  rawMaterials = [],
  laborCostPerBatch = 20000,
  unitsPerBatch = 25,
  distributorMarkup = 1500, // margin per unit distributor
  retailMarkup = 1500, // margin per unit retailer
}) {
  // 1. Biaya Bahan Baku per batch
  const materialCostPerBatch = rawMaterials.reduce(
    (acc, m) => acc + m.costPerUnit * m.requiredPerBatch,
    0
  );

  // Total Biaya Produksi Produsen
  const totalProductionCost = (materialCostPerBatch + laborCostPerBatch) * batches;
  const totalUnitsProduced = batches * unitsPerBatch;
  const hppPerUnit = totalUnitsProduced > 0 ? Math.round(totalProductionCost / totalUnitsProduced) : 0;

  // 2. Tahap Penjualan Produsen ke Distributor (Harga Pabrik)
  const factoryPricePerUnit = hppPerUnit + 1000; // margin produsen Rp 1.000/unit
  const producerRevenue = factoryPricePerUnit * totalUnitsProduced;
  const producerProfit = producerRevenue - totalProductionCost;

  // 3. Tahap Penyaluran Distributor ke Pengecer / Toko Ritel
  const wholesalePricePerUnit = factoryPricePerUnit + distributorMarkup;
  const distributorLogisticsTotal = 15000 * batches;
  const distributorRevenue = wholesalePricePerUnit * totalUnitsProduced;
  const distributorCost = producerRevenue + distributorLogisticsTotal;
  const distributorProfit = distributorRevenue - distributorCost;

  // 4. Tahap Penjualan Ritel ke Konsumen Akhir
  const retailPricePerUnit = wholesalePricePerUnit + retailMarkup;
  const consumerSpending = retailPricePerUnit * totalUnitsProduced;
  const retailerCost = distributorRevenue;
  const retailerProfit = consumerSpending - retailerCost;

  // Total Nilai Tambah Ekonomi (Total Value Added)
  const totalValueAdded = consumerSpending - (materialCostPerBatch * batches);

  return {
    batches,
    totalUnitsProduced,
    materialCostPerBatch,
    totalProductionCost,
    hppPerUnit,
    factoryPricePerUnit,
    producerRevenue,
    producerProfit,
    wholesalePricePerUnit,
    distributorLogisticsTotal,
    distributorCost,
    distributorRevenue,
    distributorProfit,
    retailPricePerUnit,
    consumerSpending,
    retailerProfit,
    totalValueAdded,
  };
}
