import React, { useMemo } from 'react';
import { useAuth } from '../../hooks/useAuth';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import ProgressCard from '../../components/dashboard/ProgressCard';
import RecommendedMateri from '../../components/dashboard/RecommendedMateri';
import EvaluasiDashboardCard from '../../components/dashboard/EvaluasiDashboardCard';
import ActivityCard from '../../components/dashboard/ActivityCard';
import AchievementCard from '../../components/dashboard/AchievementCard';
import { dummyUser } from '../../data/userData';
import { materiService } from '../../services/materiService';
import { quizService } from '../../services/quizService';

export default function DashboardPage() {
  const { user } = useAuth();
  const userId = user?.id || 'usr-001';

  // Compute live progress from localStorage via materiService, quizService, & simulationService
  const materiStats = useMemo(() => {
    return materiService.getProgressStatistics(userId);
  }, [userId]);

  const quizStats = useMemo(() => {
    return quizService.getQuizStats(userId);
  }, [userId]);

  // Combine live AuthContext user with dynamic learning progress & quiz results
  const completedExams = quizStats.totalExams > 0 ? quizStats.passedExams : (user?.completedExams || dummyUser.completedExams);
  const averageScore = quizStats.totalExams > 0 ? quizStats.averageScore : (user?.averageScore || dummyUser.averageScore);

  const currentUser = {
    ...dummyUser,
    ...user,
    completedMateri: materiStats.completed,
    totalMateri: materiStats.totalMateri,
    completedExams,
    totalExams: 10,
    averageScore,
    xp: user?.xp || dummyUser.xp,
    badges: user?.badges || dummyUser.badges,
    recentActivities: user?.recentActivities || dummyUser.recentActivities,
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeIn">
      
      {/* 1. Welcome Section */}
      <WelcomeCard />

      {/* 2 & 3. Statistik & Progress Pembelajaran Dinamis */}
      <ProgressCard user={currentUser} />

      {/* 4. Fitur Evaluasi Pretest & Posttest */}
      <EvaluasiDashboardCard userId={userId} />

      {/* 5. Materi Rekomendasi */}
      <RecommendedMateri />

      {/* 6 & 7. Aktivitas Terakhir & Pencapaian */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7">
          <ActivityCard activities={currentUser.recentActivities} />
        </div>

        <div className="lg:col-span-5">
          <AchievementCard badges={currentUser.badges} user={currentUser} />
        </div>
      </div>

    </div>
  );
}
