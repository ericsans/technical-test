<?php

namespace App\Http\Controllers;

use App\Extensions\Autoincrement;
use App\Http\Requests\SalesInvoiceRequest;
use App\Models\SalesInvoice;
use Illuminate\Http\Request;

class SalesInvoicesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $salesInvoices = SalesInvoice::query()
            ->when($request->from_date, function ($query, $fromDate) {
                $query->whereDate('invoice_date', '>=', date('Y-m-d', strtotime($fromDate)));
            })
            ->when($request->to_date, function ($query, $toDate) {
                $query->whereDate('invoice_date', '<=', date('Y-m-d', strtotime($toDate)));
            })
            ->with('Customer')
            ->get();
		return $this
			->addViewVar('salesInvoices', $salesInvoices)
			->respondOk();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SalesInvoice  $salesInvoice
     * @return \Illuminate\Http\Response
     */
    public function show(SalesInvoice $salesInvoice)
    {
        return $this
			->addViewVar('salesInvoice', SalesInvoice::query()->where('id', $salesInvoice->id)->with('SalesInvoiceDetails')->first())
			->respondOk();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\SalesInvoiceRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SalesInvoiceRequest $request, SalesInvoice $salesInvoice)
    {
        $autoincrement = ['code' => Autoincrement::increment($salesInvoice->getTable(), 'code', 1, 'INV-')];
        $salesInvoice = SalesInvoice::create($request->validated() + $autoincrement + $this->getSubTotalInvoice($request));
        foreach ($request->input('sales_invoice_details', []) as $salesInvoiceDetail) {
            $salesInvoice->SalesInvoiceDetails()->create($salesInvoiceDetail);
        }

        return $this
            ->addViewVar('salesInvoice', $salesInvoice)
            ->respondCreated();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\SalesInvoiceRequest  $request
     * @param  \App\Models\SalesInvoice  $salesInvoice
     * @return \Illuminate\Http\Response
     */
    public function update(SalesInvoiceRequest $request, SalesInvoice $salesInvoice)
    {
        $salesInvoice->update($request->validated() + $this->getSubTotalInvoice($request));
        $salesInvoice->SalesInvoiceDetails()->delete();
        foreach ($request->input('sales_invoice_details', []) as $salesInvoiceDetail) {
            $salesInvoice->SalesInvoiceDetails()->create($salesInvoiceDetail);
        }

        return $this
            ->addViewVar('salesInvoice', $salesInvoice)
            ->respondOK();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SalesInvoice  $salesInvoice
     * @return \Illuminate\Http\Response
     */
    public function destroy(SalesInvoice $salesInvoice)
    {
        $salesInvoice->delete();
		return $this
			->addViewVar('salesInvoice', $salesInvoice)
			->respondOk();
    }

    /**
     * Get SubTotal invoice.
     *
     * @param  \App\Http\Requests\SalesInvoiceRequest  $request
     * @return array
     */
    protected function getSubTotalInvoice(SalesInvoiceRequest $request) {
        $subTotal = 0;
        foreach ($request->input('sales_invoice_details', []) as $salesInvoiceDetail) {
            $subTotal = $subTotal + $salesInvoiceDetail['total'];
        }

        return ['sub_total' => $subTotal];
    }
}
