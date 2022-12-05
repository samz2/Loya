<?php

namespace App\Http\Controllers;

use App\empleados;
use Illuminate\Http\Request;

class EmpleadosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $empleados = Empleados::all();
        return compact("empleados");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $msj      = "Empleado creado con éxito";
        $type     = "success";
        $empleado = new Empleados();
        $empleado->Documento    = $request->empleado["documento"];
        $empleado->Nombre       = $request->empleado["nombre"];
        $empleado->Apellidos    = $request->empleado["apellidos"];
        $empleado->Fecha_Nac    = $request->empleado["fecha"];
        $empleado->Tipo         = $request->empleado["tipo"];
        $empleado->Sueldo       = $request->empleado["sueldo"];
        $empleado->Horas        = $request->empleado["horas"];
        $empleado->created_at   = date("Y-m-d");
        $empleado->save();
        return compact("msj","type");
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\empleados  $empleados
     * @return \Illuminate\Http\Response
     */
    public function show(empleados $empleados)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\empleados  $empleados
     * @return \Illuminate\Http\Response
     */
    public function edit(empleados $empleados)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\empleados  $empleados
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, empleados $empleados)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\empleados  $empleados
     * @return \Illuminate\Http\Response
     */
    public function destroy(empleados $empleados)
    {
        //
    }
}
