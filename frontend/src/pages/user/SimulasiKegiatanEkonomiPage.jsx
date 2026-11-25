import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getSimulationById } from '../../data/simulationData';
import { calculateEconomicFlow } from '../../utils/simulationCalculations';
import { simulationService } from '../../services/simulationService';
import SimulationHeader from '../../components/simulasi/SimulationHeader';
import EconomicFlowDiagram from '../../components/simulasi/EconomicFlowDiagram';
import ProductionPanel from '../../components/simulasi/ProductionPanel';
import DistributionPanel from '../../components/simulasi/DistributionPanel';
import ConsumptionPanel from '../../components/simulasi/ConsumptionPanel';
import SimulationChallenge from '../../components/simulasi/SimulationChallenge';
import SimulationResultModal from '../../components/simulasi/SimulationResultModal';
import { RotateCcw } from 'lucide-react';
import Button from '../../components/common/Button';

export default function SimulasiKegiatanEkonomiPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  const simulation = getSimulationById('sim-circular-flow');
  const scenario = simulation.scenario;

  // Simulation Stages State: 'production' | 'distribution' | 'consumption' | 'completed'
  const [currentStage, setCurrentStage] = useState('production');
  const [batches, setBatches] = useState(2);
  const [distributorMarkup, setDistributorMarkup] = useState(1000);
  const [isProduced, setIsProduced] = useState(false);
  const [isDistributed, setIsDistributed] = useState(false);
  const [isConsumed, setIsConsumed] = useState(false);

  // Challenges tracking
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  // Restore draft if exists
  useEffect(() => {
    const draft = simulationService.getSimulationDraft(userId, simulation.id);
    if (draft) {
      if (draft.batches) setBatches(draft.batches);
      if (draft.distributorMarkup) setDistributorMarkup(draft.distributorMarkup);
      if (draft.isProduced) setIsProduced(draft.isProduced);
      if (draft.isDistributed) setIsDistributed(draft.isDistributed);
      if (draft.isConsumed) setIsConsumed(draft.isConsumed);
      if (draft.currentStage) setCurrentStage(draft.currentStage);
      if (draft.completedChallenges) setCompletedChallenges(draft.completedChallenges);
    }
  }, [userId, simulation.id]);

  // Live Flow Calculations
  const flow = useMemo(() => {
    return calculateEconomicFlow({
      batches,
      rawMaterials: scenario.rawMaterials,
      laborCostPerBatch: scenario.laborCostPerBatch,
      unitsPerBatch: scenario.outputUnitsPerBatch,
      distributorMarkup,
      retailMarkup: 1500,
    });
  }, [batches, distributorMarkup, scenario]);

  // Stage 1: Produce bread
  const handleProduce = () => {
    setIsProduced(true);
    setCurrentStage('distribution');

    const updated = { ...completedChallenges };
    if (batches >= 2) {
      updated['c-flow-1'] = true;
    }
    setCompletedChallenges(updated);

    simulationService.saveSimulationDraft(userId, simulation.id, {
      batches,
      distributorMarkup,
      isProduced: true,
      isDistributed: false,
      isConsumed: false,
      currentStage: 'distribution',
      completedChallenges: updated,
    });
  };

  // Stage 2: Distribute to retailers
  const handleDistribute = () => {
    setIsDistributed(true);
    setCurrentStage('consumption');

    const updated = { ...completedChallenges, 'c-flow-2': true };
    setCompletedChallenges(updated);

    simulationService.saveSimulationDraft(userId, simulation.id, {
      batches,
      distributorMarkup,
      isProduced: true,
      isDistributed: true,
      isConsumed: false,
      currentStage: 'consumption',
      completedChallenges: updated,
    });
  };

  // Stage 3: Sell to final consumers
  const handleConsume = () => {
    setIsConsumed(true);
    setCurrentStage('completed');

    const updated = { ...completedChallenges, 'c-flow-3': true };
    setCompletedChallenges(updated);

    simulationService.saveSimulationDraft(userId, simulation.id, {
      batches,
      distributorMarkup,
      isProduced: true,
      isDistributed: true,
      isConsumed: true,
      currentStage: 'completed',
      completedChallenges: updated,
    });
  };

  // Reset entire cycle
  const handleResetCycle = () => {
    setIsProduced(false);
    setIsDistributed(false);
    setIsConsumed(false);
    setCurrentStage('production');
  };

  // Selesaikan simulasi & rekam hasil
  const handleFinishSimulation = () => {
    const earnedPoints = simulation.challenges.reduce((acc, c) => {
      return acc + (completedChallenges[c.id] ? c.points || 0 : 0);
    }, 0);

    const record = simulationService.recordSimulationCompletion(userId, simulation.id, {
      score: earnedPoints,
      challengeResults: completedChallenges,
      summary: {
        totalUnitsProduced: flow.totalUnitsProduced,
        totalProductionCost: flow.totalProductionCost,
        producerProfit: flow.producerProfit,
        distributorProfit: flow.distributorProfit,
        retailerProfit: flow.retailerProfit,
        totalValueAdded: flow.totalValueAdded,
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

      {/* Interactive Circular Flow Diagram Banner */}
      <EconomicFlowDiagram
        currentStage={currentStage}
        totalUnits={flow.totalUnitsProduced}
        producerRevenue={flow.producerRevenue}
        distributorRevenue={flow.distributorRevenue}
        consumerSpending={flow.consumerSpending}
      />

      {/* 3 Step Interactive Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        
        {/* Step 1: Produksi */}
        <ProductionPanel
          batches={batches}
          rawMaterials={scenario.rawMaterials}
          laborCostPerBatch={scenario.laborCostPerBatch}
          unitsPerBatch={scenario.outputUnitsPerBatch}
          totalProductionCost={flow.totalProductionCost}
          hppPerUnit={flow.hppPerUnit}
          onBatchesChange={setBatches}
          onProduce={handleProduce}
          isProduced={isProduced}
        />

        {/* Step 2: Distribusi */}
        <DistributionPanel
          isProduced={isProduced}
          isDistributed={isDistributed}
          totalUnits={flow.totalUnitsProduced}
          factoryPricePerUnit={flow.factoryPricePerUnit}
          distributorMarkup={distributorMarkup}
          distributorLogisticsTotal={flow.distributorLogisticsTotal}
          wholesalePricePerUnit={flow.wholesalePricePerUnit}
          distributorRevenue={flow.distributorRevenue}
          distributorProfit={flow.distributorProfit}
          onMarkupChange={setDistributorMarkup}
          onDistribute={handleDistribute}
        />

        {/* Step 3: Konsumsi */}
        <ConsumptionPanel
          isDistributed={isDistributed}
          isConsumed={isConsumed}
          totalUnits={flow.totalUnitsProduced}
          wholesalePricePerUnit={flow.wholesalePricePerUnit}
          retailPricePerUnit={flow.retailPricePerUnit}
          consumerSpending={flow.consumerSpending}
          retailerProfit={flow.retailerProfit}
          totalValueAdded={flow.totalValueAdded}
          onConsume={handleConsume}
        />

      </div>

      {/* Bottom Summary Bar & Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Overall Value Added Recap */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-black text-slate-900">
              Rekapitulasi Nilai Tambah & Laba Pelaku Ekonomi
            </h4>
            <Button
              variant="outline"
              size="sm"
              icon={RotateCcw}
              onClick={handleResetCycle}
            >
              Ulangi Siklus
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
              <span className="text-[10px] font-bold text-slate-400 block">Laba Produsen</span>
              <span className="text-sm sm:text-base font-black text-blue-700">
                Rp {flow.producerProfit.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
              <span className="text-[10px] font-bold text-slate-400 block">Laba Distributor</span>
              <span className="text-sm sm:text-base font-black text-amber-700">
                Rp {flow.distributorProfit.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
              <span className="text-[10px] font-bold text-slate-400 block">Laba Ritel Toko</span>
              <span className="text-sm sm:text-base font-black text-purple-700">
                Rp {flow.retailerProfit.toLocaleString('id-ID')}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
              <span className="text-[10px] font-bold text-slate-400 block">Total Nilai Tambah</span>
              <span className="text-sm sm:text-base font-black text-emerald-700">
                Rp {flow.totalValueAdded.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Challenges */}
        <div className="lg:col-span-5">
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
          handleResetCycle();
        }}
        onBackToMenu={() => navigate('/simulasi')}
      />

    </div>
  );
}
