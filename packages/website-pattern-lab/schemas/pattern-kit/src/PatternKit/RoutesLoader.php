<?php

namespace PatternKit;

use Silex\Application;

class RoutesLoader
{
    private $app;

    public function __construct(Application $app)
    {
        $this->app = $app;
        $this->instantiateControllers();

    }

    private function instantiateControllers()
    {
        $this->app['schema.controller'] = $this->app->share(function () {
            return new Controllers\SchemaController();
        });
    }

    public function bindRoutesToControllers()
    {
        $api = $this->app["controllers_factory"];

        $api->get('/tests/{name}/{data_array}', "schema.controller:getTests");

        $this->app->mount('/', $api);
    }
}

