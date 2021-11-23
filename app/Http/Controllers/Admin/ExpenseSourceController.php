<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ExpenseSource;
use App\Models\User;
use Helper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ExpenseSourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $expenseSource = ExpenseSource::all();
        return Helper::formatResponse($expenseSource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $expenseSource = ExpenseSource::create([
            'name' => $request->name,
            'organization_id' => $request->user()->organization()->first()->id
        ]);

        return Helper::formatResponse($expenseSource, 'Expense source successfully Added');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param ExpenseSource $expenseSource
     * @return JsonResponse
     */
    public function update(Request $request, ExpenseSource $expenseSource): JsonResponse
    {
        $expenseSource = ExpenseSource::update([
            'name' => $request->name,
        ]);

        return Helper::formatResponse($expenseSource, 'Expense source successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ExpenseSource $expenseSource
     * @return JsonResponse
     */
    public function destroy(ExpenseSource $expenseSource): JsonResponse
    {
        $expenseSource->delete();
        return Helper::formatResponse($expenseSource, 'Expense source successfully Deleted');
    }
}
