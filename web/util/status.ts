export function getStatusColorClass(status: string): string {
  const statusColorClasses: { [key: string]: string } = {
    not_started: "#9ca3af",
    pending: "#facc15",
    finished: "#4ade80",
    failed: "#f87171",
  };

  return statusColorClasses[status] || "#9ca3af"; // default to "bg-gray-400" if status is not recognized
}