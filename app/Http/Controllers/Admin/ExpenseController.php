<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Models\ExpenseSource;
use Helper;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $expenses = Expense::with('source')
            ->orderByDesc('id')->get();
        $sources = ExpenseSource::all();

        $data = [
            'expenses' => $expenses,
            'sources'  => $sources
        ];

        return Helper::sendResponse($data);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function store(Request $request): JsonResponse
    {

        $this->validate($request, [
            'source'      => 'nullable|integer|exists:expense_sources,id',
            'amount'      => 'required|integer',
            'description' => 'nullable|string|min:5|max:150',
        ]);


        $expense = Expense::create([
            'organization_id' => $request->user()->organization()->first()->id,
            'amount'          => $request->amount,
            'description'     => $request->description
        ]);


        if($request->source) {
            $expense->source()->associate($request->source);
            $expense->save();
        }

        $expense->load('source');

        return Helper::sendResponse($expense, 'Expense successfully created');
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Expense $expense
     * @return JsonResponse
     * @throws ValidationException
     */
    public function update(Request $request, Expense $expense): JsonResponse
    {

        $this->validate($request, [
            'source'      => 'nullable|integer|exists:expense_sources,id',
            'amount'      => 'required|integer',
            'description' => 'nullable|string|min:5|max:150',
        ]);

        $expense->update([
            'amount'      => $request->amount,
            'description' => $request->description
        ]);

        if($request->source) {
            $expense->source()->associate($request->source);
        } else {
            $expense->source()->dissociate();
        }

        $expense->save();

        $expense->load('source');

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
