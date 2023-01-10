<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
	
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'code', 'name',
    ];
	
	/**
     * Get the sales_invoices for the customer.
     */
	public function SalesInvoices() {
		return $this->hasMany(SalesInvoice::class);
	}
}
