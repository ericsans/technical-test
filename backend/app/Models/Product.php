<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
	
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'supplier_id', 'code', 'name', 'price', 'created_by', 'last_updated_by'
    ];
	
	
	/**
     * Get the supplier for the product.
     */
	public function Supplier() {
		return $this->belongsTo(Supplier::class);
	}

	/**
     * Get the sales_invoice_details for the product.
     */
	public function SalesInvoiceDetails() {
		return $this->hasMany(SalesInvoiceDetail::class);
	}
}
