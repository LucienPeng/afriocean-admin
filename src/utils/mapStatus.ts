import { OperationStatus, OrderStatus } from '../model/localSales.model';

export const mapStatus = (status: OperationStatus) => {
  if (status?.delivered && status?.paid) {
    return OrderStatus.Terminé;
  } else if (status?.delivered && !status?.paid) {
    return OrderStatus.UnPaid;
  } else if (!status?.delivered && status?.paid) {
    return OrderStatus.UnDelievered;
  } else if (!status?.delivered && !status?.paid) {
    return OrderStatus.Start;
  } else {
    return 'Unknown';
  }
};
