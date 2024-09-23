<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class ProductController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $products = Product::all();
        return response()->json(['products' => $products]);
    }

    public function show(Product $product)
    {
        return response()->json(['product' => $product]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'cost' => 'required|numeric|min:0',
            'amountAvailable' => 'required|integer|min:0',
        ]);

        $product = $request->user()->products()->create($request->all());

        return response()->json(['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $this->authorize('update', $product);

        $product->update($request->all());

        return response()->json(['product' => $product]);
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
