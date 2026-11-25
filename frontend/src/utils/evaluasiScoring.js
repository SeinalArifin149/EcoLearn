/**
 * Modul Evaluasi dan Analisis Performa Pretest & Posttest EcoLearn
 * Perhitungan skor mandiri, analisis topik, dan komparasi hasil belajar
 */

/**
 * Menghitung skor ujian evaluasi dan rincian performa per topik
 */
export function calculateEvaluasiScore(arg1 = {}, arg2 = []) {
  let userAnswers = {};
  let questions = [];

  if (Array.isArray(arg1)) {
    questions = arg1;
    userAnswers = typeof arg2 === 'object' && arg2 !== null ? arg2 : {};
  } else {
    userAnswers = typeof arg1 === 'object' && arg1 !== null ? arg1 : {};
    questions = Array.isArray(arg2) ? arg2 : [];
  }

  if (!questions || questions.length === 0) {
    return {
      totalQuestions: 0,
      correctCount: 0,
      wrongCount: 0,
      unansweredCount: 0,
      score: 0,
      isPassed: false,
      category: 'Perlu Peningkatan',
      categoryColor: 'bg-rose-50 text-rose-700 border-rose-200',
      topicPerformance: {},
    };
  }

  const totalQuestions = questions.length;
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  // Track performa per materi/topik
  const topicMap = {};

  questions.forEach((q) => {
    const topicKey = q.topic || 'Umum';
    if (!topicMap[topicKey]) {
      topicMap[topicKey] = {
        topic: topicKey,
        materiId: q.materiId || 'materi-1',
        total: 0,
        correct: 0,
        wrong: 0,
        unanswered: 0,
      };
    }

    topicMap[topicKey].total += 1;

    const userChoice = userAnswers[q.id];
    if (userChoice === undefined || userChoice === null || userChoice === '') {
      unansweredCount += 1;
      topicMap[topicKey].unanswered += 1;
    } else if (String(userChoice).toUpperCase() === String(q.correctAnswer).toUpperCase()) {
      correctCount += 1;
      topicMap[topicKey].correct += 1;
    } else {
      wrongCount += 1;
      topicMap[topicKey].wrong += 1;
    }
  });

  // Nilai Akhir
  const score = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = score >= 70;

  let category = 'Perlu Peningkatan';
  let categoryColor = 'bg-rose-50 text-rose-700 border-rose-200';

  if (score >= 90) {
    category = 'Sangat Baik';
    categoryColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
  } else if (score >= 80) {
    category = 'Baik';
    categoryColor = 'bg-blue-50 text-blue-700 border-blue-200';
  } else if (score >= 70) {
    category = 'Cukup';
    categoryColor = 'bg-amber-50 text-amber-700 border-amber-200';
  }

  // Hitung persentase dan status ketuntasan per topik
  const topicPerformance = Object.values(topicMap).map((t) => {
    const percentage = t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0;
    let status = 'Perlu Peningkatan';
    let statusColor = 'text-rose-600';

    if (percentage >= 80) {
      status = 'Kuat / Menguasai';
      statusColor = 'text-emerald-600';
    } else if (percentage >= 60) {
      status = 'Cukup';
      statusColor = 'text-amber-600';
    }

    return {
      ...t,
      percentage,
      status,
      statusColor,
    };
  });

  return {
    totalQuestions,
    correctCount,
    wrongCount,
    unansweredCount,
    score,
    isPassed,
    category,
    categoryColor,
    topicPerformance,
  };
}

/**
 * Membandingkan hasil Pretest dan Posttest untuk mengukur perubahan pemahaman siswa
 */
export function compareLearningGrowth(pretestResult = null, posttestResult = null) {
  if (!pretestResult || !posttestResult) {
    return null;
  }

  const preScore = Number(pretestResult.score) || 0;
  const postScore = Number(posttestResult.score) || 0;

  // Peningkatan absolut (Posttest - Pretest)
  const absoluteGain = postScore - preScore;

  // Peningkatan relatif (Persentase pertumbuhan)
  let relativeGain = null;
  let relativeGainText = 'N/A';

  if (preScore > 0) {
    relativeGain = Math.round(((postScore - preScore) / preScore) * 100);
    relativeGainText = `${relativeGain > 0 ? '+' : ''}${relativeGain}%`;
  } else {
    relativeGainText = 'Tidak terdefinisi (Nilai awal 0)';
  }

  const isImproved = absoluteGain > 0;
  const isEqual = absoluteGain === 0;
  const isDecreased = absoluteGain < 0;

  // Kategori peningkatan
  let growthCategory = 'Tidak Ada Perubahan';
  if (absoluteGain >= 30) {
    growthCategory = 'Peningkatan Sangat Signifikan';
  } else if (absoluteGain >= 15) {
    growthCategory = 'Peningkatan Baik';
  } else if (absoluteGain > 0) {
    growthCategory = 'Peningkatan Cukup';
  } else if (absoluteGain === 0) {
    growthCategory = 'Stabil (Tanpa Perubahan)';
  } else {
    growthCategory = 'Perlu Pendalaman Ulang';
  }

  let interpretation = '';
  let badgeColor = '';

  if (isImproved) {
    interpretation = `Luar biasa! Pemahaman ekonomimu meningkat sebesar ${absoluteGain} poin (${growthCategory}) setelah melalui rangkaian pembelajaran.`;
    badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
  } else if (isEqual) {
    interpretation = 'Hasil evaluasi belum menunjukkan perubahan nilai. Siswa disarankan mempelajari ulang konsep-konsep materi.';
    badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
  } else {
    interpretation = 'Hasil evaluasi menunjukkan penurunan nilai. Sangat dianjurkan untuk meninjau kembali materi dan mencoba simulasi interaktif.';
    badgeColor = 'bg-rose-50 text-rose-800 border-rose-200';
  }

  // Komparasi performa per topik
  const preTopicList = Array.isArray(pretestResult.topicPerformance) 
    ? pretestResult.topicPerformance 
    : Object.values(pretestResult.topicPerformance || {});
  const postTopicList = Array.isArray(posttestResult.topicPerformance) 
    ? posttestResult.topicPerformance 
    : Object.values(posttestResult.topicPerformance || {});

  const preTopicMap = {};
  preTopicList.forEach((t) => {
    preTopicMap[t.topic] = t;
  });

  const postTopicMap = {};
  postTopicList.forEach((t) => {
    postTopicMap[t.topic] = t;
  });

  const allTopics = Array.from(
    new Set([...Object.keys(preTopicMap), ...Object.keys(postTopicMap)])
  );

  const topicComparisons = allTopics.map((topic) => {
    const preItem = preTopicMap[topic] || { percentage: 0, materiId: 'materi-1' };
    const postItem = postTopicMap[topic] || { percentage: 0, materiId: 'materi-1' };

    const prePct = preItem.percentage || 0;
    const postPct = postItem.percentage || 0;
    const diff = postPct - prePct;
    const materiId = postItem.materiId || preItem.materiId || 'materi-1';

    let recommendation = '';
    let recommendationType = ''; // 'materi' | 'quiz' | 'simulation'

    if (postPct < 60) {
      recommendation = 'Pelajari materi dasar dan subtopik bab ini kembali';
      recommendationType = 'materi';
    } else if (postPct < 85) {
      recommendation = 'Latihan kuis soal evaluasi untuk memantapkan pemahaman';
      recommendationType = 'quiz';
    } else {
      recommendation = 'Uji pemahaman lebih lanjut melalui simulasi ekonomi pasar';
      recommendationType = 'simulation';
    }

    return {
      topic,
      materiId,
      prePercentage: prePct,
      postPercentage: postPct,
      diff,
      recommendation,
      recommendationType,
    };
  });

  // Topik terbaik & topik yang paling butuh perbaikan
  const sortedTopics = [...topicComparisons].sort((a, b) => b.postPercentage - a.postPercentage);
  const bestTopic = sortedTopics[0] || null;
  const weakestTopic = sortedTopics[sortedTopics.length - 1] || null;

  return {
    preScore,
    postScore,
    pretestScore: preScore,
    posttestScore: postScore,
    absoluteGain,
    relativeGain,
    relativeGainText,
    isImproved,
    isEqual,
    isDecreased,
    hasGain: isImproved,
    isNeutral: isEqual,
    isDrop: isDecreased,
    growthCategory,
    interpretation,
    badgeColor,
    topicComparisons,
    bestTopic,
    weakestTopic,
  };
}
