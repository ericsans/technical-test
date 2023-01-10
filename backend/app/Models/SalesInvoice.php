<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesInvoice extends Model
{
    use HasFactory;
	
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'customer_id', 'code', 'invoice_date', 'sub_total',
    ];
	
	/**
     * Get the customer for the sales_invoice.
     */
	public function Customer() {
		return $this->belongsTo(Customer::class);
	}
	
	/**
     * Get the sales_invoice_details for the sales_invoice.
     */
	public function SalesInvoiceDetails() {
		return $this->hasMany(SalesInvoiceDetail::class);
	}
}
