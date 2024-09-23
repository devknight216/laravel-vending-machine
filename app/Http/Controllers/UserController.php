<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;

class UserController extends Controller
{

    public function updateDeposit(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|in:5,10,20,50,100',
        ]);

        $user = auth()->user();
        $user->deposit += $request->amount;
        $user->save();

        return response()->json(['message' => 'Deposit updated successfully', 'user' => $user]);
    }

    public function resetDeposit(Request $request)
    {
        $user = auth()->user();
        $user->deposit = 0;
        $user->save();

        return response()->json(['message' => 'Deposit reset successfully', 'user' => $user]);
    }

    public function buyProduct(Request $request)
    {
        $user = auth()->user();
        $product = Product::find($request->productId);
        try {
            $user->buyProduct($product);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }

        return response()->json(['message' => 'Product bought successfully', 'user' => $user]);
    }
}
