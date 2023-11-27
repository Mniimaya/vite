export const getApprovalItemStatus = (
  isApprove: string,
  reasonReject: string | null
) => {
  if (Number(isApprove) === 0) {
    return [`Отправлено приглашение`, `waiting`];
  }

  if (Number(isApprove) === 1 && Boolean(reasonReject)) {
    return [`Отказ от участия`, `reject`];
  }

  if (Number(isApprove) === 1) {
    return [`Согласовано`, `approve`];
  }

  if (Number(isApprove) === 2) {
    return [`На согласовании`, `waiting`];
  }

  if (Number(isApprove) === 3) {
    return [`Согласовано`, `approve`];
  }

  if (Number(isApprove) === 4) {
    return [`Отказано`, `reject`];
  }
};
