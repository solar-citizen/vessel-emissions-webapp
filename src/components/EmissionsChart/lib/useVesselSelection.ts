import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

/**
 * Hook for managing vessel selection state synchronized with URL parameters.
 *
 * Automatically reads vessel IDs from URL query params on mount and provides
 * methods to update both local state and URL params simultaneously.
 *
 * @returns Object containing selected vessel IDs and update function
 * @returns {number[]} selectedVessels - Array of currently selected vessel IDs
 * @returns {(vesselIds: number[]) => void} updateSelection - Function to update selection and URL
 */
export function useVesselSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedVessels, setSelectedVessels] = useState<number[]>([]);

  useEffect(() => {
    const vesselIds = searchParams.get('vessels');
    if (vesselIds) {
      const ids = vesselIds
        .split(',')
        .map(id => parseInt(id))
        .filter(id => !isNaN(id));
      setSelectedVessels(ids);
    }
  }, [searchParams]);

  function updateSelection(vesselIds: number[]) {
    setSelectedVessels(vesselIds);

    const params = new URLSearchParams(searchParams);
    if (vesselIds.length > 0) {
      params.set('vessels', vesselIds.join(','));
    } else {
      params.delete('vessels');
    }

    router.replace(`/?${params.toString()}`, { scroll: false });
  }

  return {
    selectedVessels,
    updateSelection,
  };
}
