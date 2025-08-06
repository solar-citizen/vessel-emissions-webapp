'use client';
import { useEffect, useRef } from 'react';

type VesselOption = { imo: number; name: string };
type VesselSelectorProps = {
  availableVessels: VesselOption[];
  selectedVessels: number[];
  onSelectionChange: (vesselIds: number[]) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
};

/**
 * A dropdown component that allows users to select one or more vessels from a provided list.
 * @param props - Component props.
 * @returns The VesselSelector component.
 *
 */
function VesselSelector({
  availableVessels,
  selectedVessels,
  onSelectionChange,
  isOpen,
  onToggleOpen,
}: VesselSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onToggleOpen();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onToggleOpen]);

  const toggleVessel = (imo: number) => {
    const newSelection = selectedVessels.includes(imo)
      ? selectedVessels.filter(id => id !== imo)
      : [...selectedVessels, imo];

    onSelectionChange(newSelection);
  };

  return (
    <div ref={containerRef} className='relative inline-block'>
      <button
        onClick={onToggleOpen}
        className='px-4 py-2 border border-green-600 rounded-md bg-green-300 hover:bg-emerald-300 
        cursor-pointer'
      >
        {selectedVessels.length === 0
          ? 'Select Vessels'
          : `${selectedVessels.length} vessel(-s) selected`}
      </button>

      {isOpen && (
        <div
          className='absolute z-10 mt-1 w-2xl bg-white border border-gray-300 rounded-md 
        shadow-lg max-h-60 overflow-y-auto'
        >
          {availableVessels?.map(vessel => (
            <label
              key={vessel.imo}
              className='flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer'
            >
              <input
                type='checkbox'
                checked={selectedVessels.includes(vessel.imo)}
                onChange={() => toggleVessel(vessel.imo)}
                className='mr-3'
              />
              <span className='text-sm'>
                {vessel.name} ({vessel.imo})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default VesselSelector;
