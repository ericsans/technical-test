<?php

namespace App\Observers;

use App\Models\Product;
use Illuminate\Support\Facades\Auth;

class ProductObserver
{
    /**
     * Handle the Product "creating" event.
     *
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function creating(Product $product)
    {
        $product->created_by = Auth::user()->email ?? '';
        $product->last_updated_by = Auth::user()->email ?? '';
    }

    /**
     * Handle the Product "updating" event.
     *
     * @param  \App\Models\Product  $product
     * @return void
     */
    public function updating(Product $product)
    {
        $product->last_updated_by = Auth::user()->email ?? '';
    }
}
