import { storageService } from './storageService';
import { appConfig } from '../data/appConfig';
import { sanitizeInput, isValidUrl } from '../utils/security';

const CONFIG_KEY = 'ecolearn_app_config';

const defaultConfig = {
  appName: appConfig.appName || 'EcoLearn',
  fullName: appConfig.fullName || 'EconomyLearn',
  tagline: appConfig.tagline || 'Play • Learn • Understand Economics',
  padletPretestUrl: appConfig.padletPretestUrl || 'https://padlet.com',
  padletPosttestUrl: appConfig.padletPosttestUrl || 'https://padlet.com',
  kkmScore: 70,
  examDurationMinutes: 60,
  schoolName: 'SMA Negeri 1 EcoLearn',
  teacherName: 'Dr. Aldi Pratama, M.Pd.',
  teacherNip: '19850412 201001 1 012',
  academicYear: '2026/2027',
  semester: 'Ganjil',
  maxOptions: 5,
  allowStudentRegistration: true,
  mobilePreviewMode: false,
};

export const configService = {
  getConfig() {
    return storageService.get(CONFIG_KEY, defaultConfig);
  },

  updateConfig(newConfig) {
    const current = this.getConfig();

    const sanitized = {
      ...current,
      ...newConfig,
      schoolName: sanitizeInput(newConfig.schoolName || current.schoolName, 100),
      teacherName: sanitizeInput(newConfig.teacherName || current.teacherName, 100),
      academicYear: sanitizeInput(newConfig.academicYear || current.academicYear, 30),
      semester: sanitizeInput(newConfig.semester || current.semester, 20),
      kkmScore: Math.min(100, Math.max(0, Number(newConfig.kkmScore) || 70)),
      examDurationMinutes: Math.min(180, Math.max(10, Number(newConfig.examDurationMinutes) || 60)),
    };

    if (newConfig.padletPretestUrl) {
      sanitized.padletPretestUrl = newConfig.padletPretestUrl.trim();
    }
    if (newConfig.padletPosttestUrl) {
      sanitized.padletPosttestUrl = newConfig.padletPosttestUrl.trim();
    }

    storageService.set(CONFIG_KEY, sanitized);
    return sanitized;
  },

  resetConfig() {
    storageService.set(CONFIG_KEY, defaultConfig);
    return defaultConfig;
  }
};
