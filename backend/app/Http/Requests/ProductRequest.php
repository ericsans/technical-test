<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
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
            'supplier_id' => [
                'required',
                'integer',
                'exists:suppliers,id'
            ],
            'code' => [
                'required',
                'max:50',
                Rule::unique('products')->ignore($this->product)
            ],
            'name' => [
                'required',
                'max:50'
            ],
            'price' => [
                'required',
                'numeric'
            ],
        ];
    }
}
