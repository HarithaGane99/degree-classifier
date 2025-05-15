import { useState, useEffect } from 'react';
import { calculateIndicatorScore, calculateClassification } from '../utils/calculations';
import { FiRefreshCw, FiAlertCircle } from 'react-icons/fi';
import { MdCalculate, MdOutlineSchool } from 'react-icons/md';
import '../styles/main.css';

interface Module {
  level: 5 | 6;
  credits: number;
  mark: number;
  id: string;
  name: string;
}

export default function DegreeCalculator() {
  const [modules, setModules] = useState<Module[]>([]);
  const [results, setResults] = useState<{ score: number; classification: string } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const level5Modules = [
      'Object Oriented Programming',
      'Database Systems',
      'Algorithms',
      'SDGP',
      'Machine Learning and Data Mining',
      'Optional Module Level 5'
    ];

    const level6Modules = [
      'Concurrent Programming',
      'Formal Methods', 
      'Cyber Security',
      'Optional Module Level 6',
      'Final Year Project'
    ];

    const initialModules = [
      ...level5Modules.map((name, i) => ({
        level: 5 as const,
        credits: 20,
        mark: [89, 40, 47, 70, 78, 56][i],
        id: `l5-${i}`,
        name
      })),
      ...level6Modules.slice(0, 4).map((name, i) => ({
        level: 6 as const,
        credits: 20,
        mark: [50, 66, 84, 0][i],
        id: `l6-20-${i}`,
        name
      })),
      {
        level: 6 as const,
        credits: 40,
        mark: 43,
        id: 'l6-40',
        name: level6Modules[4]
      }
    ];
    setModules(initialModules);
  }, []);

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const score = calculateIndicatorScore(modules);
      setResults({
        score: Math.round(score),
        classification: calculateClassification(score)
      });
      setIsCalculating(false);
    }, 800);
  };

  const handleMarkChange = (id: string, value: number) => {
    setModules(prev => prev.map(m => 
      m.id === id ? { ...m, mark: Math.min(100, Math.max(0, value || 0)) } : m
    ));
    setResults(null);
  };

  return (
    <div className="app-container">
      <header className="header animate-fade">
        <h1 className="title">
          <MdOutlineSchool />
          University Degree Classifier
        </h1>
        <p className="subtitle">
          <FiAlertCircle />
          Enter your marks and calculate your classification
        </p>
      </header>

      <div className="modules-grid">
        {/* Level 5 Modules */}
        <div className="module-card">
          <h2 className="card-title">Level 5 Modules (20 Credits Each)</h2>
          {modules.filter(m => m.level === 5).map((module) => (
            <div key={module.id} className="module-row">
              <div className="module-name">{module.name}</div>
              <input
                type="number"
                className="module-input"
                value={module.mark}
                onChange={(e) => handleMarkChange(module.id, parseInt(e.target.value))}
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>

        {/* Level 6 Modules */}
        <div className="module-card">
          <h2 className="card-title">Level 6 Modules</h2>
          {modules.filter(m => m.level === 6).map((module) => (
            <div key={module.id} className="module-row">
              <div className="module-name">
                {module.name} ({module.credits} Credits)
              </div>
              <input
                type="number"
                className="module-input"
                value={module.mark}
                onChange={(e) => handleMarkChange(module.id, parseInt(e.target.value))}
                min="0"
                max="100"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="calculate-btn"
        onClick={handleCalculate}
        disabled={isCalculating}
      >
        {isCalculating ? (
          <>
            <FiRefreshCw className="animate-spin" />
            Calculating...
          </>
        ) : (
          <>
            <MdCalculate />
            Calculate Classification
          </>
        )}
      </button>

      {results && (
        <div className="results-card animate-fade">
          <h3>Indicator Score</h3>
          <div className="score-display">{results.score}</div>
          <div className="classification-badge">
            {results.classification} Class Honours
          </div>
          <div className="module-name">
            <FiAlertCircle /> Based on {modules.length} modules
          </div>
          <div className="module-name">
            <FiAlertCircle /> Excluding lowest scoring module
          </div>
        </div>
      )}
    </div>
  );
}