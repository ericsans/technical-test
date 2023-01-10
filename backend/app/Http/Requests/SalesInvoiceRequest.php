<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesInvoiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'customer_id' => [
                'required',
                'integer',
                'exists:customers,id'
            ],
            'invoice_date' => [
                'required',
                'date',
            ],
            'sales_invoice_details' => [
                'required'
            ],
            'sales_invoice_details.*.product_id' => [
                'required',
                'integer',
                'exists:products,id'
            ],
            'sales_invoice_details.*.quantity' => [
                'required',
                'integer',
                'gt:0',
            ],
            'sales_invoice_details.*.price' => [
                'required',
                'numeric',
                'gt:0',
            ],
            'sales_invoice_details.*.total' => [
                'required',
                'numeric',
                'gt:0',
            ],
        ];
    }
}
