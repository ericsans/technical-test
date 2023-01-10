<?php

namespace App\Http\Controllers;

use App\Http\Requests\SupplierRequest;
use App\Models\Supplier;

class SuppliersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suppliers = Supplier::all();
		return $this
			->addViewVar('suppliers', $suppliers)
			->respondOk();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function show(Supplier $supplier)
    {
        return $this
			->addViewVar('supplier', $supplier)
			->respondOk();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SupplierRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SupplierRequest $request)
    {
        $supplier = supplier::create($request->validated());
		return $this
			->addViewVar('supplier', $supplier)
			->respondCreated();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\SupplierRequest  $request
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function update(SupplierRequest $request, Supplier $supplier)
    {
		$supplier->update($request->validated());
		return $this
			->addViewVar('supplier', $supplier)
			->respondOk();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supplier  $supplier
     * @return \Illuminate\Http\Response
     */
    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
		return $this
			->addViewVar('supplier', $supplier)
			->respondOk();
    }
}
