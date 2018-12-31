export function formatVideoDuration(seconds) {
  const mm = Math.floor(seconds / 60) || 0;
  const ss = ('0' + Math.floor(seconds % 60)).slice(-2);

  return mm + ':' + ss;
}
