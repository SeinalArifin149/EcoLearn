import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { getSimulationById } from '../../data/simulationData';
import { calculateBudgetSummary } from '../../utils/simulationCalculations';
import { simulationService } from '../../services/simulationService';
import SimulationHeader from '../../components/simulasi/SimulationHeader';
import BudgetPanel from '../../components/simulasi/BudgetPanel';
import ExpenseList from '../../components/simulasi/ExpenseList';
import BudgetChart from '../../components/simulasi/BudgetChart';
import FinancialSummary from '../../components/simulasi/FinancialSummary';
import SimulationChallenge from '../../components/simulasi/SimulationChallenge';
import SimulationResultModal from '../../components/simulasi/SimulationResultModal';

export default function SimulasiKeuanganPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  const simulation = getSimulationById('sim-finance');

  // Initial Allowance
  const [allowance, setAllowance] = useState(simulation.initialAllowance || 500000);

  // Pre-seeded initial expenses for realistic scenario
  const [expenses, setExpenses] = useState([
    { id: 'exp-1', name: 'Makan Siang di Kantin Sekolah', amount: 180000, type: 'kebutuhan' },
    { id: 'exp-2', name: 'Ongkos Transportasi / Bus', amount: 90000, type: 'kebutuhan' },
    { id: 'exp-3', name: 'Buku Tulis & Fotokopi Tugas', amount: 40000, type: 'kebutuhan' },
    { id: 'exp-4', name: 'Paket Data Internet 25 GB', amount: 50000, type: 'kebutuhan' },
    { id: 'exp-5', name: 'Nongkrong Minum Es Boba', amount: 35000, type: 'keinginan' },
    { id: 'exp-6', name: 'Tabungan Celengan Siswa', amount: 105000, type: 'tabungan' },
  ]);

  // Challenges tracking
  const [completedChallenges, setCompletedChallenges] = useState({});
  const [isResultOpen, setIsResultOpen] = useState(false);
  const [completionData, setCompletionData] = useState(null);

  // Restore draft if exists
  useEffect(() => {
    const draft = simulationService.getSimulationDraft(userId, simulation.id);
    if (draft) {
      if (draft.expenses) setExpenses(draft.expenses);
      if (draft.allowance) setAllowance(draft.allowance);
      if (draft.completedChallenges) setCompletedChallenges(draft.completedChallenges);
    }
  }, [userId, simulation.id]);

  // Live Budget Calculation
  const budget = useMemo(() => {
    return calculateBudgetSummary(allowance, expenses);
  }, [allowance, expenses]);

  // Auto-evaluate challenges whenever expenses change
  useEffect(() => {
    const updated = { ...completedChallenges };
    let hasChanged = false;

    // Challenge 1: Tabungan minimal 20%
    if (budget.meetsSavingsTarget && !updated['c-fin-1']) {
      updated['c-fin-1'] = true;
      hasChanged = true;
    } else if (!budget.meetsSavingsTarget && updated['c-fin-1']) {
      updated['c-fin-1'] = false;
      hasChanged = true;
    }

    // Challenge 2: Prioritas Kebutuhan minimal 60%
    if (budget.meetsNeedsPriority && !updated['c-fin-2']) {
      updated['c-fin-2'] = true;
      hasChanged = true;
    } else if (!budget.meetsNeedsPriority && updated['c-fin-2']) {
      updated['c-fin-2'] = false;
      hasChanged = true;
    }

    // Challenge 3: Bebas Defisit (Saldo >= 0)
    if (!budget.isDeficit && !updated['c-fin-3']) {
      updated['c-fin-3'] = true;
      hasChanged = true;
    } else if (budget.isDeficit && updated['c-fin-3']) {
      updated['c-fin-3'] = false;
      hasChanged = true;
    }

    if (hasChanged) {
      setCompletedChallenges(updated);
      simulationService.saveSimulationDraft(userId, simulation.id, {
        allowance,
        expenses,
        completedChallenges: updated,
      });
    }
  }, [budget, completedChallenges, userId, simulation.id, allowance, expenses]);

  // Expense Handlers
  const handleAddExpense = (newExp) => {
    setExpenses((prev) => [...prev, newExp]);
  };

  const handleUpdateExpense = (id, updatedItem) => {
    setExpenses((prev) => prev.map((exp) => (exp.id === id ? updatedItem : exp)));
  };

  const handleDeleteExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
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
        totalSavings: budget.totalSavings,
        savingsRatio: budget.savingsRatio,
        remainingBalance: budget.remainingBalance,
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

      {/* Main Grid: Budget Overview & Expenses */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols): Budget Panel & Expense Items Management */}
        <div className="lg:col-span-7 space-y-6">
          <BudgetPanel
            initialAllowance={allowance}
            totalNeeds={budget.totalNeeds}
            totalWants={budget.totalWants}
            totalSavings={budget.totalSavings}
            remainingBalance={budget.remainingBalance}
            savingsRatio={budget.savingsRatio}
            isDeficit={budget.isDeficit}
            meetsSavingsTarget={budget.meetsSavingsTarget}
          />

          <ExpenseList
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        </div>

        {/* Right Column (5 cols): Allocation Donut Chart & Challenges */}
        <div className="lg:col-span-5 space-y-6">
          <BudgetChart
            totalNeeds={budget.totalNeeds}
            totalWants={budget.totalWants}
            totalSavings={budget.totalSavings}
            remainingBalance={budget.remainingBalance}
            initialAllowance={allowance}
          />

          <FinancialSummary
            financialHealth={budget.financialHealth}
            healthColor={budget.healthColor}
            advice={budget.advice}
            isDeficit={budget.isDeficit}
            meetsSavingsTarget={budget.meetsSavingsTarget}
            meetsNeedsPriority={budget.meetsNeedsPriority}
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
        }}
        onBackToMenu={() => navigate('/simulasi')}
      />

    </div>
  );
}
