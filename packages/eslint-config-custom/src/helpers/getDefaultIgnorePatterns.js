const getDefaultIgnorePatterns = () => {
  return [
    // Hacky way to silence @yarnpkg/doctor about node_modules detection
    `**/node_modules`,
    '.cache',
    '**/.cache',
    '**/build',
    '**/dist'
  ];
};

module.exports = {
  getDefaultIgnorePatterns,
};
