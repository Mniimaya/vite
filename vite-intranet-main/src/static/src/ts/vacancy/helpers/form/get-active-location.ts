// Helpers;
import { LocationStatus } from "../../const";

// Types;
import type { TYPE_ADDRESS } from "../../types/address";

export const getActiveLocation = (addresses: TYPE_ADDRESS[]) => {
  return addresses.filter(
    ({ status }) => Number(status) === LocationStatus.ACTIVE
  );
};
