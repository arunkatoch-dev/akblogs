import CircularSpinner from "@/components/Loaders/CircularSpinner";

const loading = () => {
  return (
    <div className="w-full min-h-screen">
      <CircularSpinner />
    </div>
  );
};

export default loading;
