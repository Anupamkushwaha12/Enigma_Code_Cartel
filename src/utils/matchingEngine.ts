import { MatchEvaluation, Requirement, ResourceListing } from '../types';
import { calculateLandedEconomics } from './landedCostEngine';

export function evaluateResourceMatch(
  resource: ResourceListing,
  requirement: Requirement
): MatchEvaluation {
  // 1. Material Compatibility (35%)
  const isCategoryMatch = resource.category === requirement.category;
  const isConditionMatch = requirement.acceptableCondition.length === 0 || 
    requirement.acceptableCondition.includes(resource.condition);
  
  let materialScore = 0;
  if (isCategoryMatch && isConditionMatch) {
    materialScore = 100;
  } else if (isCategoryMatch) {
    materialScore = 65;
  } else {
    materialScore = 10;
  }

  // 2. Quantity Fit (20%)
  const availableQty = resource.quantity - resource.soldQuantity;
  let quantityScore = 0;
  let quantityAvailable = false;
  if (availableQty >= requirement.quantityRequired) {
    quantityAvailable = true;
    const ratio = requirement.quantityRequired / availableQty;
    // Ideal if exactly matches or surplus is manageable
    quantityScore = ratio >= 0.7 ? 100 : 85;
  } else if (availableQty >= requirement.quantityRequired * 0.5) {
    // Partial fulfill
    quantityAvailable = true;
    quantityScore = 60;
  } else {
    quantityScore = 20;
    quantityAvailable = false;
  }

  // Calculate Landed Economics for this pair
  const economics = calculateLandedEconomics({
    quantity: Math.min(requirement.quantityRequired, availableQty),
    basePrice: resource.commercial.basePrice,
    currency: resource.commercial.currency,
    weightKg: (resource.weightKg / resource.quantity) * Math.min(requirement.quantityRequired, availableQty),
    origin: resource.location,
    destination: requirement.destination,
    maxBuyerBudgetInr: requirement.maxLandedCost,
    refurbishmentRequired: resource.processing.refurbishmentRequired,
    testingRequired: resource.processing.testingRequired,
    certificationRequired: resource.processing.certificationRequired,
  });

  // 3. Economic Feasibility (20%)
  let economicScore = 0;
  const withinBudget = economics.costPerUnitInr <= requirement.maxLandedCost;
  if (withinBudget && economics.isViable) {
    const savingsRatio = (requirement.maxLandedCost - economics.costPerUnitInr) / requirement.maxLandedCost;
    economicScore = Math.min(100, Math.round(75 + (savingsRatio * 50)));
  } else if (withinBudget) {
    economicScore = 55;
  } else {
    economicScore = 10;
  }

  // 4. Distance / Logistics (15%)
  let distanceScore = 0;
  const isCrossBorder = resource.location.country !== requirement.destination.country;
  if (!isCrossBorder) {
    distanceScore = 95; // Domestic India
  } else if (resource.location.country.toLowerCase().includes('usa')) {
    distanceScore = 78; // Direct established air/sea lanes Dallas/NY to Mumbai
  } else if (resource.location.country.toLowerCase().includes('china')) {
    distanceScore = 70; // Direct sea freight Shenzhen to Nhava Sheva
  } else {
    distanceScore = 60;
  }

  // 5. Timing Feasibility (10%)
  const availableUntilDate = new Date(resource.availability.availableUntil).getTime();
  const requiredByDate = new Date(requirement.requiredByDate).getTime();
  let timingScore = 0;
  let timingFeasible = false;

  // Resource available before required-by date minus lead transit time (approx 14 days)
  const transitAllowanceMs = (isCrossBorder ? 14 : 4) * 86400000;
  if (availableUntilDate <= requiredByDate + transitAllowanceMs) {
    timingFeasible = true;
    timingScore = 95;
  } else {
    timingFeasible = false;
    timingScore = 30;
  }

  // Weighted Match Score
  const rawScore = 
    (materialScore * 0.35) +
    (quantityScore * 0.20) +
    (economicScore * 0.20) +
    (distanceScore * 0.15) +
    (timingScore * 0.10);

  const matchScore = Math.round(rawScore);

  // Hard Gate Checks
  const checks = {
    materialCompatible: isCategoryMatch && isConditionMatch,
    quantityAvailable,
    withinBudget,
    logisticsFeasible: distanceScore >= 60,
    timingFeasible,
    complianceCheckPassed: true, // Mock compliance verification
  };

  const isEconomicallyViable = economics.isViable && withinBudget;

  return {
    id: `MATCH-${resource.id}-${requirement.id}`,
    resourceId: resource.id,
    requirementId: requirement.id,
    matchScore,
    breakdown: {
      materialCompatibility: materialScore,
      quantityFit: quantityScore,
      economicFeasibility: economicScore,
      distanceLogistics: distanceScore,
      timingFeasibility: timingScore,
    },
    checks,
    economics,
    isEconomicallyViable,
    status: isEconomicallyViable ? 'recommended' : 'rejected',
  };
}
