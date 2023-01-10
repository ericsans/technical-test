<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\CustomersController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\SalesInvoicesController;
use App\Http\Controllers\SuppliersController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthenticationController::class, 'login']);
Route::group(['middleware' => ['auth:sanctum']], function () {
	Route::controller(CustomersController::class)->group(function () {
		Route::match(['get'], '/customers/index', 'index')->name('customers.index');
		Route::match(['get'], '/customers/show/{customer}', 'show')->name('customers.show');
		Route::match(['post'], '/customers/store', 'store')->name('customers.add');
		Route::match(['patch', 'put', 'post'], '/customers/update/{customer}', 'update')->name('customers.edit');
		Route::match(['delete', 'post'], '/customers/destroy/{customer}', 'destroy')->name('customers.delete');
	});

	Route::controller(ProductsController::class)->group(function () {
		Route::match(['get'], '/products/index', 'index')->name('products.index');
		Route::match(['get'], '/products/show/{product}', 'show')->name('products.show');
		Route::match(['post'], '/products/store', 'store')->name('products.add');
		Route::match(['patch', 'put', 'post'], '/products/update/{product}', 'update')->name('products.edit');
		Route::match(['delete', 'post'], '/products/destroy/{product}', 'destroy')->name('products.delete');
	});

	Route::controller(SalesInvoicesController::class)->group(function () {
		Route::match(['get'], '/sales-invoices/index', 'index')->name('sales-invoices.index');
		Route::match(['get'], '/sales-invoices/show/{salesInvoice}', 'show')->name('sales-invoices.show');
		Route::match(['post'], '/sales-invoices/store', 'store')->name('sales-invoices.add');
		Route::match(['patch', 'put', 'post'], '/sales-invoices/update/{salesInvoice}', 'update')->name('sales-invoices.edit');
		Route::match(['delete', 'post'], '/sales-invoices/destroy/{salesInvoice}', 'destroy')->name('sales-invoices.delete');
	});

	Route::controller(SuppliersController::class)->group(function () {
		Route::match(['get'], '/suppliers/index', 'index')->name('suppliers.index');
		Route::match(['get'], '/suppliers/show/{supplier}', 'show')->name('suppliers.show');
		Route::match(['post'], '/suppliers/store', 'store')->name('suppliers.add');
		Route::match(['patch', 'put', 'post'], '/suppliers/update/{supplier}', 'update')->name('suppliers.edit');
		Route::match(['delete', 'post'], '/suppliers/destroy/{supplier}', 'destroy')->name('suppliers.delete');
	});

	Route::controller(UsersController::class)->group(function () {
		Route::match(['get'], '/users/index', 'index')->name('users.index');
		Route::match(['get'], '/users/show/{user}', 'show')->name('users.show');
		Route::match(['post'], '/users/store', 'store')->name('users.add');
		Route::match(['patch', 'put', 'post'], '/users/update/{user}', 'update')->name('users.edit');
		Route::match(['delete', 'post'], '/users/destroy/{user}', 'destroy')->name('users.delete');
	});

	Route::middleware('auth:api')->get('/user', function (Request $request) {
		return $request->user();
	});
});