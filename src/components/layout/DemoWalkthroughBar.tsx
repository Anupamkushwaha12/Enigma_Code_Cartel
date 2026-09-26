import React, { useState } from 'react';
import { DEMO_JOURNEY_STEPS, useApp } from '../../context/AppContext';
import { 
  ArrowLeft, 
  ArrowRight, 
  Compass, 
  HelpCircle, 
  Sparkles, 
  X, 
  ChevronUp, 
  ChevronDown 
} from 'lucide-react';

export const DemoWalkthroughBar: React.FC = () => {
  const { currentDemoStep, setDemoStep, nextDemoStep, prevDemoStep, role, setRole } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const currentStep = DEMO_JOURNEY_STEPS[currentDemoStep - 1];

  if (isDismissed) {
    return (
      <button
        onClick={() => setIsDismissed(false)}
        className="fixed bottom-4 right-4 z-50 bg-white text-slate-800 px-3.5 py-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2 text-xs font-semibold hover:bg-slate-50 transition-transform hover:scale-105 cursor-pointer"
        title="Open 16-Step Hackathon Demo Walkthrough Guide"
      >
        <Compass className="w-4 h-4 text-blue-600 animate-spin-slow" />
        <span>Demo Guide ({currentDemoStep}/16)</span>
      </button>
    );
  }

  return (
    <aside aria-label="Hackathon Demo Walkthrough" className="bg-slate-100/95 text-slate-800 border-b border-slate-200 text-xs transition-all relative z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        
        {/* Step Indicator & Title */}
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="flex items-center gap-1.5 shrink-0 px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold tracking-wider text-[11px] border border-blue-200">
            <Compass className="w-3 h-3 text-blue-600" />
            STEP {currentStep.stepNumber}/16
          </div>
          
          <div className="truncate">
            <span className="font-semibold text-slate-900 mr-2">{currentStep.title}</span>
            <span className="text-slate-500 hidden md:inline truncate">{currentStep.actionHint}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Persona switch shortcut */}
          {role !== currentStep.roleTarget && (
            <button
              onClick={() => setRole(currentStep.roleTarget)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer shadow-2xs"
            >
              Switch to {currentStep.roleTarget.toUpperCase()} View
            </button>
          )}

          {/* Stepper Navigation */}
          <div className="flex items-center gap-1 bg-white p-0.5 rounded border border-slate-200 shadow-2xs">
            <button
              onClick={prevDemoStep}
              disabled={currentDemoStep === 1}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 cursor-pointer"
              title="Previous Step"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] text-slate-600">
              {currentDemoStep} of 16
            </span>
            <button
              onClick={nextDemoStep}
              disabled={currentDemoStep === 16}
              className="p-1 rounded hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-slate-600 cursor-pointer"
              title="Next Step"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Expand All Steps Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-slate-50 text-slate-700 text-[11px] transition-colors cursor-pointer border border-slate-200 shadow-2xs"
          >
            <span>All Steps</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Close / Minimize */}
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-200 transition-colors cursor-pointer ml-1"
            title="Minimize guide"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Step Map Tray */}
      {isExpanded && (
        <div className="border-t border-slate-200 bg-white px-4 sm:px-6 lg:px-8 py-3 max-h-72 overflow-y-auto shadow-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            {DEMO_JOURNEY_STEPS.map((s) => (
              <button
                key={s.stepNumber}
                onClick={() => {
                  setDemoStep(s.stepNumber);
                  setIsExpanded(false);
                }}
                className={`text-left p-2.5 rounded-lg border transition-all cursor-pointer ${
                  s.stepNumber === currentDemoStep
                    ? 'bg-blue-50/70 border-blue-400 text-blue-900 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1">
                  <span className="font-semibold text-blue-600">Step {s.stepNumber}</span>
                  <span className="text-slate-400 font-medium">{s.roleTarget}</span>
                </div>
                <div className="font-semibold text-xs text-slate-900 line-clamp-1">{s.title}</div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{s.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
};
