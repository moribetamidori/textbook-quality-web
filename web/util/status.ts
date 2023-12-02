export function getStatusColorClass(status: string): string {
  const statusColorClasses: { [key: string]: string } = {
    not_started: "bg-gray-400",
    pending: "bg-yellow-400",
    finished: "bg-green-400",
    failed: "bg-red-400",
  };

  return statusColorClasses[status] || "bg-gray-400"; // default to "bg-gray-400" if status is not recognized
}