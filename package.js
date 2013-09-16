Package.describe({
  summary: "The ParaViewWeb JavaScript API"
});

Package.on_use(function (api, where) {
  api.add_files('paraviewweb.js', 'client');
  if (api.export)
    api.export('ParaViewWeb');
});

Package.on_test(function(api) {
  api.use('paraviewweb', 'client');
  api.use(['tinytest', 'test-helpers'], 'client');
  api.add_files('paraviewweb_tests.js', 'client');
});
