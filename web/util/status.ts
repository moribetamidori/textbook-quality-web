
export const statusColor = (status: string) => {
    switch (status) {
      case "not_started":
        return "gray";
      case "pending":
        return "yellow";
      case "finished":
        return "green";
      case "failed":
        return "red";
      default:
        return "gray";
    }
  };