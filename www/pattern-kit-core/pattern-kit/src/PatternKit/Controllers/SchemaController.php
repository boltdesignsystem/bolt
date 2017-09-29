<?php

namespace PatternKit\Controllers;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


class SchemaController
{

    public function getTests($name, $data_array)
    {
        return $name . $data;
    }

    // protected $schemaService;

    // public function __construct($service)
    // {
    //     $this->schemaService = $service;
    // }

    // public function getAll()
    // {
    //     return new JsonResponse($this->schemaService->getAll());
    // }

    // public function save(Request $request)
    // {

    //     $note = $this->getDataFromRequest($request);
    //     return new JsonResponse(array("id" => $this->schemaService->save($note)));

    // }

    // public function update($id, Request $request)
    // {
    //     $note = $this->getDataFromRequest($request);
    //     $this->schemaService->update($id, $note);
    //     return new JsonResponse($note);

    // }

    // public function delete($id)
    // {

    //     return new JsonResponse($this->schemaService->delete($id));

    // }

    // public function getDataFromRequest(Request $request)
    // {
    //     return $note = array(
    //         "note" => $request->request->get("note")
    //     );
    // }
}
