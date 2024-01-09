const ProgressLoader = () => {
  return (
    <div class="relative h-2 bg-gray-200 shadow-md">
      <div class="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 to-gray-100 animate-progress-animation"></div>
    </div>
  );
};

export default ProgressLoader;
