<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'supplier_id' => 1, 
            'code' => $this->faker->randomNumber(5),
            'name' => $this->faker->text(50),
            'price' => 1000,
            'created_by' => 'demo@technical.test',
            'last_updated_by' => 'demo@technical.test',
        ];
    }
}
