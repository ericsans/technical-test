<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSalesInvoiceDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sales_invoice_details', function (Blueprint $table) {
            $table->id();
			$table->integer('sales_invoice_id');
			$table->string('product_id');
			$table->decimal('quantity');
			$table->decimal('price', 10, 2);
			$table->decimal('total', 10, 2);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sales_invoice_details');
    }
}
