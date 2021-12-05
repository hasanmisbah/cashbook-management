<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use Helper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $expenses = Expense::orderByDesc('id')->get();
        return Helper::sendResponse($expenses);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        //'organization_id'
        //'source_id'
        //'amount'
        //'description'

        $expense = null;
        return Helper::sendResponse($expense, 'Expense successfully created');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Expense $expense
     * @return JsonResponse
     */
    public function update(Request $request, Expense $expense): JsonResponse
    {
        //'organization_id'
        //'source_id'
        //'amount'
        //'description'

        return Helper::sendResponse($expense, 'Expense successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Expense $expense
     * @return JsonResponse
     */
    public function destroy(Expense $expense): JsonResponse
    {
        $expense->delete();

        return Helper::sendResponse($expense, 'Expense successfully removed');
    }
}
