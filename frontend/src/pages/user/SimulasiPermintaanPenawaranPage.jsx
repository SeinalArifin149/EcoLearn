import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getSimulationById } from '../../data/simulationData';
import { calculateSupplyDemand } from '../../utils/simulationCalculations';
import { simulationService } from '../../services/simulationService';
import SimulationHeader from '../../components/simulasi/SimulationHeader';
import PriceControl from '../../components/simulasi/PriceControl';
import SupplyDemandChart from '../../components/simulasi/SupplyDemandChart';
import EquilibriumResult from '../../components/simulasi/EquilibriumResult';
import SimulationChallenge from '../../components/simulasi/SimulationChallenge';
import SimulationResultModal from '../../components/simulasi/SimulationResultModal';

export default function SimulasiPermintaanPenawaranPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  const simulation = getSimulationById('sim-supply-demand');

  // Parameter State
  const [price, setPrice] = useState(10000);
  const [income, setIncome] = useState(100);
  const [buyers, setBuyers] = useState(100);
  const [productionCost, setProductionCost] = useState(100);
  const [technology, setTechnology] = useState(100);

  // Status Tantangan (Challenges)
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  // Restore draft if exists
  useEffect(() => {
    const draft = simulationService.getSimulationDraft(userId, simulation.id);
    if (draft) {
      if (draft.price) setPrice(draft.price);
      if (draft.income) setIncome(draft.income);
      if (draft.buyers) setBuyers(draft.buyers);
      if (draft.productionCost) setProductionCost(draft.productionCost);
      if (draft.technology) setTechnology(draft.technology);
      if (draft.completedChallenges) setCompletedChallenges(draft.completedChallenges);
    }
  }, [userId, simulation.id]);

  // Live Economic Calculation
  const result = useMemo(() => {
    return calculateSupplyDemand({
      price,
      income,
      buyers,
      productionCost,
      technology,
    });
  }, [price, income, buyers, productionCost, technology]);

  // Evaluasi pencapaian tantangan secara otomatis saat siswa bereksperimen
  useEffect(() => {
    const updated = { ...completedChallenges };
    let hasChanged = false;

    // Challenge 1: Titik Keseimbangan (Equilibrium)
    if (result.marketStatus === 'equilibrium' && !updated['c-sd-1']) {
      updated['c-sd-1'] = true;
      hasChanged = true;
    }

    // Challenge 2: Kelebihan Permintaan (Shortage >= 15 unit)
    if (result.marketStatus === 'shortage' && Math.abs(result.difference) >= 15 && !updated['c-sd-2']) {
      updated['c-sd-2'] = true;
      hasChanged = true;
    }

    // Challenge 3: Kelebihan Penawaran (Surplus >= 15 unit)
    if (result.marketStatus === 'surplus' && Math.abs(result.difference) >= 15 && !updated['c-sd-3']) {
      updated['c-sd-3'] = true;
      hasChanged = true;
    }

    if (hasChanged) {
      setCompletedChallenges(updated);
      simulationService.saveSimulationDraft(userId, simulation.id, {
        price,
        income,
        buyers,
        productionCost,
        technology,
        completedChallenges: updated,
      });
    }
  }, [result, completedChallenges, userId, simulation.id, price, income, buyers, productionCost, technology]);

  // Handler reset faktor non-harga
  const handleResetFactors = () => {
    setIncome(100);
    setBuyers(100);
    setProductionCost(100);
    setTechnology(100);
  };

  const handleFactorChange = (factor, value) => {
    if (factor === 'income') setIncome(value);
    if (factor === 'buyers') setBuyers(value);
    if (factor === 'productionCost') setProductionCost(value);
    if (factor === 'technology') setTechnology(value);
  };

  // Selesaikan simulasi & simpan skor
  const handleFinishSimulation = () => {
    const earnedPoints = simulation.challenges.reduce((acc, c) => {
      return acc + (completedChallenges[c.id] ? c.points || 0 : 0);
    }, 0);

    const record = simulationService.recordSimulationCompletion(userId, simulation.id, {
      score: earnedPoints,
      challengeResults: completedChallenges,
      summary: {
        lastPrice: price,
        equilibriumPrice: result.equilibriumPrice,
        marketStatus: result.marketStatus,
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
        characterExpression="learning"
        onBack={() => navigate('/simulasi')}
      />

      {/* Main Grid: Interactive Controls & Visual Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Controls & Analysis */}
        <div className="lg:col-span-7 space-y-6">
          <PriceControl
            price={price}
            income={income}
            buyers={buyers}
            productionCost={productionCost}
            technology={technology}
            onPriceChange={setPrice}
            onFactorChange={handleFactorChange}
            onResetFactors={handleResetFactors}
          />

          <EquilibriumResult
            qDemand={result.qDemand}
            qSupply={result.qSupply}
            difference={result.difference}
            marketStatus={result.marketStatus}
            statusLabel={result.statusLabel}
            statusColor={result.statusColor}
            explanation={result.explanation}
            equilibriumPrice={result.equilibriumPrice}
            equilibriumQuantity={result.equilibriumQuantity}
          />
        </div>

        {/* Right Column (5 cols): Visual Curve Chart & Challenge Card */}
        <div className="lg:col-span-5 space-y-6">
          <SupplyDemandChart
            curvePoints={result.curvePoints}
            currentPrice={price}
            qDemand={result.qDemand}
            qSupply={result.qSupply}
            equilibriumPrice={result.equilibriumPrice}
            equilibriumQuantity={result.equilibriumQuantity}
            marketStatus={result.marketStatus}
          />

          <SimulationChallenge
            challenges={simulation.challenges}
            completedChallenges={completedChallenges}
            onFinishSimulation={handleFinishSimulation}
          />
        </div>

      </div>

      {/* Result & Reward Modal */}
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
          setPrice(10000);
          handleResetFactors();
        }}
        onBackToMenu={() => navigate('/simulasi')}
      />

    </div>
  );
}
