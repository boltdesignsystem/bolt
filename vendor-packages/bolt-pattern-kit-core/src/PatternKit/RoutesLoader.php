<?php
/**
 * @file RoutesLoader.php
 */

namespace PatternKit;

use Silex\Application;

/**
 * Class RoutesLoader
 *
 * @package PatternKit
 */
class RoutesLoader
{
    private $app;

  /**
   * RoutesLoader constructor.
   *
   * @param \Silex\Application $app
   */
  public function __construct(Application $app)
  {
      $this->app = $app;
      $this->instantiateControllers();
  }

  /**
   * Instantiate the controllers.
   */
  private function instantiateControllers()
  {
      $this->app['schema.controller'] = $this->app->share(
      function () {
          return new Controllers\SchemaController();
      }
    );
  }

  /**
   * Bind the route to the controllers.
   */
  public function bindRoutesToControllers()
  {
      $api = $this->app["controllers_factory"];

      $api->get('/tests/{name}/{data_array}', "schema.controller:getTests");

      $this->app->mount('/', $api);
  }
}
