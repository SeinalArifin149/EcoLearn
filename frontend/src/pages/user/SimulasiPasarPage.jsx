import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getSimulationById } from '../../data/simulationData';
import { evaluateMarketTransaction } from '../../utils/simulationCalculations';
import { simulationService } from '../../services/simulationService';
import SimulationHeader from '../../components/simulasi/SimulationHeader';
import SellerPanel from '../../components/simulasi/SellerPanel';
import BuyerPanel from '../../components/simulasi/BuyerPanel';
import MarketTransaction from '../../components/simulasi/MarketTransaction';
import MarketSummary from '../../components/simulasi/MarketSummary';
import SimulationChallenge from '../../components/simulasi/SimulationChallenge';
import SimulationResultModal from '../../components/simulasi/SimulationResultModal';
import { Store, ShoppingCart } from 'lucide-react';

export default function SimulasiPasarPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  const simulation = getSimulationById('sim-market');

  // Role state: 'seller' | 'buyer'
  const [role, setRole] = useState('seller');

  // Selected Commodity & Offer Price
  const [selectedCommodity, setSelectedCommodity] = useState(simulation.commodities[0]);
  const [price, setPrice] = useState(simulation.commodities[0].suggestedPrice);
  const [stock, setStock] = useState(10);
  const [walletBalance, setWalletBalance] = useState(250000);

  // Virtual Partners
  const [selectedPartner, setSelectedPartner] = useState(simulation.virtualBuyers[0]);

  // Virtual Sellers for buyer role
  const virtualSellers = [
    { id: 'seller-1', name: 'Toko Berkah Murah', avatar: '🏪', policy: 'Menolak jika di bawah modal' },
    { id: 'seller-2', name: 'Warung Bu Sri', avatar: '👵', policy: 'Ramah dan terbuka tawar-menawar' },
    { id: 'seller-3', name: 'Minimarket Sentosa', avatar: '🏢', policy: 'Harga pas, margin tetap' },
  ];
  const [selectedSeller, setSelectedSeller] = useState(virtualSellers[0]);

  // Transaction state
  const [lastTransaction, setLastTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Challenges tracking
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  // Restore draft if exists
  useEffect(() => {
    const draft = simulationService.getSimulationDraft(userId, simulation.id);
    if (draft) {
      if (draft.role) setRole(draft.role);
      if (draft.transactions) setTransactions(draft.transactions);
      if (draft.stock !== undefined) setStock(draft.stock);
      if (draft.walletBalance !== undefined) setWalletBalance(draft.walletBalance);
      if (draft.completedChallenges) setCompletedChallenges(draft.completedChallenges);
    }
  }, [userId, simulation.id]);

  // Handle commodity change
  const handleSelectCommodity = (item) => {
    setSelectedCommodity(item);
    setPrice(item.suggestedPrice);
  };

  // Submit Offer
  const handleSubmitOffer = () => {
    const result = evaluateMarketTransaction({
      role,
      commodity: selectedCommodity,
      proposedPrice: price,
      quantity: 1,
      virtualPartner: role === 'seller' ? selectedPartner : selectedSeller,
      userWallet: walletBalance,
      userStock: stock,
    });

    if (!result.success) {
      alert(result.error);
      return;
    }

    const txRecord = {
      ...result,
      commodity: selectedCommodity,
      partnerName: role === 'seller' ? selectedPartner.name : selectedSeller.name,
      proposedPrice: price,
      role,
      timestamp: Date.now(),
    };

    setLastTransaction(txRecord);

    if (result.isAccepted) {
      const updatedTxList = [txRecord, ...transactions];
      setTransactions(updatedTxList);

      if (role === 'seller') {
        setStock((prev) => Math.max(0, prev - 1));
      } else {
        setWalletBalance((prev) => Math.max(0, prev - result.totalSpending));
      }

      checkChallenges(updatedTxList);
    }
  };

  // Accept Counter-offer
  const handleAcceptCounterOffer = (counterPrice) => {
    const result = evaluateMarketTransaction({
      role,
      commodity: selectedCommodity,
      proposedPrice: counterPrice,
      quantity: 1,
      virtualPartner: role === 'seller' ? selectedPartner : selectedSeller,
      userWallet: walletBalance,
      userStock: stock,
    });

    const txRecord = {
      ...result,
      isAccepted: true,
      dealPrice: counterPrice,
      commodity: selectedCommodity,
      partnerName: role === 'seller' ? selectedPartner.name : selectedSeller.name,
      proposedPrice: counterPrice,
      role,
      timestamp: Date.now(),
    };

    setLastTransaction(txRecord);
    const updatedTxList = [txRecord, ...transactions];
    setTransactions(updatedTxList);

    if (role === 'seller') {
      setStock((prev) => Math.max(0, prev - 1));
    } else {
      setWalletBalance((prev) => Math.max(0, prev - txRecord.totalSpending));
    }

    checkChallenges(updatedTxList);
  };

  // Check Challenge triggers
  const checkChallenges = (txList) => {
    const updated = { ...completedChallenges };
    const successfulDeals = txList.filter((t) => t.isAccepted);

    // Challenge 1: Minimal 3 transaksi berhasil
    if (successfulDeals.length >= 3 && !updated['c-mkt-1']) {
      updated['c-mkt-1'] = true;
    }

    // Challenge 2: Total Laba Bersih Penjual >= 30.000
    const totalProfit = successfulDeals
      .filter((t) => t.role === 'seller')
      .reduce((acc, t) => acc + (t.profit || 0), 0);
    if (totalProfit >= 30000 && !updated['c-mkt-2']) {
      updated['c-mkt-2'] = true;
    }

    // Challenge 3: Efisiensi pembeli (membeli dengan penghematan > 0)
    const hasSavings = successfulDeals.some((t) => t.role === 'buyer' && (t.savings || 0) > 0);
    if (hasSavings && !updated['c-mkt-3']) {
      updated['c-mkt-3'] = true;
    }

    setCompletedChallenges(updated);
    simulationService.saveSimulationDraft(userId, simulation.id, {
      role,
      transactions: txList,
      stock,
      walletBalance,
      completedChallenges: updated,
    });
  };

  // Selesaikan simulasi
  const handleFinishSimulation = () => {
    const earnedPoints = simulation.challenges.reduce((acc, c) => {
      return acc + (completedChallenges[c.id] ? c.points || 0 : 0);
    }, 0);

    const record = simulationService.recordSimulationCompletion(userId, simulation.id, {
      score: earnedPoints,
      challengeResults: completedChallenges,
      summary: {
        totalTransactions: transactions.length,
        successfulDeals: transactions.filter((t) => t.isAccepted).length,
      },
    });

    setCompletionData(record);
    setIsResultOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 animate-fadeIn">
      
      {/* Simulation Header */}
      <SimulationHeader
        title={simulation.title}
        category={simulation.category}
        duration={simulation.duration}
        summary={simulation.summary}
        learningObjectives={simulation.learningObjectives}
        characterExpression="explaining"
        onBack={() => navigate('/simulasi')}
      />

      {/* Role Toggle Selector */}
      <div className="bg-white rounded-3xl p-3 border-2 border-slate-100 shadow-sm flex items-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => {
            setRole('seller');
            setLastTransaction(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            role === 'seller'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Sebagai Penjual</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setRole('buyer');
            setLastTransaction(null);
          }}
          className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            role === 'buyer'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Sebagai Pembeli</span>
        </button>
      </div>

      {/* Main Grid: Trading Panel & Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Active Trading Panel & Negotiation */}
        <div className="lg:col-span-7 space-y-6">
          {role === 'seller' ? (
            <SellerPanel
              commodities={simulation.commodities}
              selectedCommodity={selectedCommodity}
              sellingPrice={price}
              stock={stock}
              virtualBuyers={simulation.virtualBuyers}
              selectedBuyer={selectedPartner}
              onSelectCommodity={handleSelectCommodity}
              onPriceChange={setPrice}
              onSelectBuyer={setSelectedPartner}
              onSubmitOffer={handleSubmitOffer}
            />
          ) : (
            <BuyerPanel
              commodities={simulation.commodities}
              selectedCommodity={selectedCommodity}
              bidPrice={price}
              walletBalance={walletBalance}
              virtualSellers={virtualSellers}
              selectedSeller={selectedSeller}
              onSelectCommodity={handleSelectCommodity}
              onPriceChange={setPrice}
              onSelectSeller={setSelectedSeller}
              onSubmitOffer={handleSubmitOffer}
            />
          )}

          {/* Negotiation Dialog / Transaction Result */}
          <MarketTransaction
            lastTransaction={lastTransaction}
            role={role}
            onAcceptCounterOffer={handleAcceptCounterOffer}
            onDismiss={() => setLastTransaction(null)}
          />
        </div>

        {/* Right Column (5 cols): Market Summary & Challenges */}
        <div className="lg:col-span-5 space-y-6">
          <MarketSummary
            transactions={transactions}
            role={role}
          />

          <SimulationChallenge
            challenges={simulation.challenges}
            completedChallenges={completedChallenges}
            onFinishSimulation={handleFinishSimulation}
          />
        </div>

      </div>

      {/* Result Modal */}
      <SimulationResultModal
        isOpen={isResultOpen}
        simulationTitle={simulation.title}
        score={completionData?.historyItem?.score || 0}
        xpEarned={completionData?.xpEarned || 0}
        newBadges={completionData?.newBadges || []}
        challenges={simulation.challenges}
        completedChallenges={completedChallenges}
        onRetry={() => {
          setIsResultOpen(false);
          setTransactions([]);
          setStock(10);
          setWalletBalance(250000);
        }}
        onBackToMenu={() => navigate('/simulasi')}
      />

    </div>
  );
}
