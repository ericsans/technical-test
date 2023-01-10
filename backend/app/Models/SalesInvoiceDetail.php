<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalesInvoiceDetail extends Model
{
    use HasFactory;
	
    public $timestamps = false;
        
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sales_invoice_id', 'product_id', 'quantity', 'price', 'total'
    ];
	
	/**
     * Get the sales_invoice for the sales_invoice_detail.
     */
	public function SalesInvoice() {
		return $this->belongsTo(SalesInvoice::class);
	}
	
	/**
     * Get the product for the sales_invoice_detail.
     */
	public function Product() {
		return $this->belongsTo(Product::class);
	}
}
