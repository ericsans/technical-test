<?php
    namespace App\Extensions;

    use Illuminate\Support\Facades\DB;

    class Autoincrement {

		public static function increment($table, $field, $seed = 1, $prefix = '', $range = 4, $suffix = '') {
			$default = sprintf('%s%s%s', $prefix, str_pad(0, $range, 0, STR_PAD_LEFT), $suffix);
			$query = DB::table($table)
						->select(DB::raw("MAX({$field}) as increment"))
						->whereRaw("LENGTH({$field}) = LENGTH('{$default}')")
						->whereRaw("LEFT({$field}, LENGTH('{$prefix}')) = '{$prefix}'")
						->whereRaw("RIGHT({$field}, LENGTH('{$suffix}')) = '{$suffix}'")
						->first();

			$result = (empty($query) ? $default : $query->increment);

			if (trim($prefix) !== '') {
				$result = substr($result, strlen($prefix) + 1);
			}

			if (trim($suffix) !== '') {
				$result = substr($result, 0, strlen($suffix) * -1);
			}

			$lastValue = $result + $seed;
			return sprintf('%s%s%s', $prefix, str_pad($lastValue, $range, 0, STR_PAD_LEFT), $suffix);
		}
	}