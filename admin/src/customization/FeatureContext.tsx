import * as React from 'react';
import {
  FeatureOptions,
  ResolvedFeatureFlags,
  resolveFeatures,
  DEFAULT_FEATURE_OPTIONS,
} from './featureConfig';

/**
 * Context for providing feature flags to editor components
 */
const FeatureContext = React.createContext<ResolvedFeatureFlags | null>(null);

interface FeatureFlagsProviderProps {
  /**
   * Feature options from Strapi attribute configuration
   */
  options?: FeatureOptions;
  children: React.ReactNode;
}

/**
 * Provider component that resolves feature options and provides them to child components
 */
export function FeatureFlagsProvider({
  options,
  children,
}: FeatureFlagsProviderProps): JSX.Element {
  const flags = React.useMemo(() => resolveFeatures(options), [options]);

  return <FeatureContext.Provider value={flags}>{children}</FeatureContext.Provider>;
}

/**
 * Hook to access feature flags within editor components
 * Must be used within a FeatureFlagsProvider
 */
export function useFeatureFlags(): ResolvedFeatureFlags {
  const context = React.useContext(FeatureContext);

  if (context === null) {
    // Return default flags if used outside provider (for backward compatibility)
    return resolveFeatures(DEFAULT_FEATURE_OPTIONS);
  }

  return context;
}

export { FeatureContext };
