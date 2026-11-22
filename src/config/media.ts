/**
 * Centralized Static ES-Imported WebP Asset Registry
 *
 * Importing images as ES modules ensures Vite automatically bundles, hashes,
 * and serves every optimized WebP photograph reliably in both development
 * (`vite dev`) and production (`vite build`) environments.
 */

import heroCopperCables from '../assets/images/webp/hero-copper-cables.webp';
import copperWireProduction from '../assets/images/webp/copper-wire-production.webp';
import aboutManufacturingFacility from '../assets/images/webp/about-manufacturing-facility.webp';
import qualityMachinery from '../assets/images/webp/quality-cable-machinery.webp';
import qualityCableTesting from '../assets/images/webp/quality-cable-testing.webp';
import qualityInspectionControl from '../assets/images/webp/quality-inspection-control.webp';
import dealershipDistribution from '../assets/images/webp/dealership-cable-distribution.webp';

import houseWires from '../assets/images/webp/product-house-wires.webp';
import pvcWires from '../assets/images/webp/product-pvc-wires.webp';
import copperMultistrand from '../assets/images/webp/product-copper-multistrand.webp';
import flexibleWires from '../assets/images/webp/product-flexible-wires.webp';
import industrialCables from '../assets/images/webp/product-industrial-cables.webp';
import aluminiumConductors from '../assets/images/webp/product-aluminium-conductors.webp';
import powerCables from '../assets/images/webp/product-power-cables.webp';
import electricalCables from '../assets/images/webp/product-electrical-cables.webp';
import submersibleCables from '../assets/images/webp/product-submersible-cables.webp';
import solarCables from '../assets/images/webp/product-solar-cables.webp';
import weldingCables from '../assets/images/webp/product-welding-cables.webp';

export const mediaAssets = {
  heroCopperCables,
  copperWireProduction,
  aboutManufacturingFacility,
  qualityMachinery,
  qualityCableTesting,
  qualityInspectionControl,
  dealershipDistribution,
  houseWires,
  pvcWires,
  copperMultistrand,
  flexibleWires,
  industrialCables,
  aluminiumConductors,
  powerCables,
  electricalCables,
  submersibleCables,
  solarCables,
  weldingCables,
} as const;
