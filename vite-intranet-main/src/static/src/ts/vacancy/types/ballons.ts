export type TYPE_BALLONS = Promise<{
  enableReadOnlyMode: (customName: string) => {};
  disableReadOnlyMode: (customName: string) => {};
  getData: () => string | null;
  setData: (arg: string) => void;
  on: (arg: string, cb: () => void) => void;
  model: {
    document: {
      on: (arg: string, cb: () => void) => void;
    };
  };
  isReadOnly: boolean;
  customName: string;
}>;
