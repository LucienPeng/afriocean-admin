import { ReactNode, createContext, useContext } from 'react';
import { useMediaQuery } from '@mui/material';

interface DeviceMetadataContextData {
  readonly isMobileView: boolean;
}

interface DeviceDetectProviderProps {
  readonly children: ReactNode;
}

const DeviceMetadataContext = createContext<DeviceMetadataContextData>({} as DeviceMetadataContextData);

export const useDeviceMetadata = (): DeviceMetadataContextData => useContext(DeviceMetadataContext);

export const DeviceMetadataProvider = (props: DeviceDetectProviderProps) => {
  const isMobileView = useMediaQuery('(max-width:800px)');

  const value: DeviceMetadataContextData = {
    isMobileView,
  };

  return <DeviceMetadataContext.Provider value={value}>{props.children}</DeviceMetadataContext.Provider>;
};
